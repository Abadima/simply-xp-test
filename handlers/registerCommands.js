const { ApplicationCommandType, Collection } = require("discord.js");
const { readdir } = require("fs/promises");
const { Logena } = require("logena");
const { join } = require("path");

/**
 * Load & Register Slash Commands
 * @param {import("discord.js").Client} client
 */
async function loadSlashCommands(client) {
    Logena.debug("Registering Slash Commands...");
    const startTime = performance.now();


    // Load Files
    const commandsDirectory = join(__dirname, "..", "commands");
    const commandFiles = await readdir(commandsDirectory);
    const commands = [];

    for (const file of commandFiles.filter(file => file.endsWith(".js"))) {
        try {
            const command = require(join(commandsDirectory, file));
            if (!command || !command.callback) {
                Logena.warn(`SKIPPING INVALID COMMAND FILE: ${file}`);
                continue;
            }

            const commandName = file.replace(".js", "");
            commands.push({ name: commandName, data: command });
        } catch (error) {
            Logena.error(`FAILED TO LOAD ${file}: ${error instanceof Error ? (error.stack || error.message) : String(error)}`);
        }
    }

    client.commands = new Collection(commands.map(command => [command.name, command.data]));

    // Globally Register Commands
    try {
        await client.application.commands.set(commands.map(({ name, data }) => {
            return {
                name,
                type: ApplicationCommandType.ChatInput,
                description: data.description || "No description provided",
                options: data.options || [],
            }
        }));
        Logena.info(`REGISTERED ${commands.length} SLASH COMMANDS GLOBALLY IN ${(performance.now() - startTime).toFixed(2)}MS`);

        // Clear Guild Commands
        const guilds = await client.guilds.fetch();
        for (const [, guild] of guilds) {
            try {
                const g = await guild.fetch();
                await g.commands.set([]);
            } catch { }
        }
    } catch (error) {
        Logena.error(`Failed to register slash commands: ${error instanceof Error ? (error.stack || error.message) : String(error)}`);
    }
}

module.exports = { loadSlashCommands };