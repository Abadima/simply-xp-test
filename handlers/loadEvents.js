const { readdir } = require("fs").promises;
const { join } = require("path");
const { Logena } = require("logena");

/**
 * Load all events from events/ folder
 * @param {import("discord.js").Client} client 
 */
async function loadEvents(client) {
    client.events = new Map();

    const startTime = performance.now();
    const eventDir = join(__dirname, "..", "events");
    const files = await readdir(eventDir);

    if (!files.length) {
        Logena.warn("NO EVENT FILES FOUND");
        return;
    }

    let loaded = 0;

    await Promise.all(files.filter(f => f.endsWith(".js")).map(async file => {
        try {
            const eventData = require(join(eventDir, file));
            if (!eventData?.execute) return;

            const eventName = file.replace(/\.js$/, "");
            const execute = (...args) => eventData.execute(...args, client);

            client.events.set(eventName, execute);

            if (eventData.custom) await execute(client);

            client[eventData.once ? "once" : "on"](eventName, execute);

            loaded++;
        } catch (err) {
            Logena.error(`FAILED TO LOAD EVENT '${file}': ${err}`);
        }
    }));

    Logena.debug(`LOADED ${loaded} EVENTS IN ${(performance.now() - startTime).toFixed(1)}ms`);
}

module.exports = { loadEvents };
