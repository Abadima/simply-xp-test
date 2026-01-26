module.exports = {
    once: false, // true if it should only run once
    custom: false, // optional: execute on load

    execute: async (interaction, client) => {
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.callback({ client, guild: interaction.guild, interaction, user: interaction.user });
        } catch (err) {
            console.error(err);
        }
    }
};
