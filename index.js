const { Logena } = require("logena")
require("dotenv").config({ quiet: true });
require("simply-xp").connect(process.env.DB, { notify: false });
const { ActivityType, Client, GatewayIntentBits } = require('discord.js');
const { loadSlashCommands } = require("./handlers/registerCommands");
const { loadEvents } = require("./handlers/loadEvents");

Logena.set({
	debug: true,
	appName: "S-XP T-BOT",
	colors: {
		appName: "magenta",
		debug: "green",
		info: "blue"
	},
	useTimestamps: true
});

let client = new Client({
	intents: [
		GatewayIntentBits.Guilds
	], presence: {
		status: "online",
		activities: [{
			name: require("./package.json").version,
			type: ActivityType.Watching
		}]
	}
});

client.on("clientReady", async () => {
	Logena.info(`${client.user.tag} ONLINE`)
	loadEvents(client);
	loadSlashCommands(client);
}); client.on('levelUp', async (message, data, role) => { console.log(data) }) // <= This is optional but can be used to send a message to the user when they level up.

client.login(process.env.TOKEN) // you'll need to set this to your own Discord Bot Token