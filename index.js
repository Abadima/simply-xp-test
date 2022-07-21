require("dotenv").config();
require("simply-xp").connect(process.env.DB, { notify: false }); // you'll need to set this to your own MongoDB URI
const { ActivityType, Client, GatewayIntentBits } = require('discord.js');
const Wok = require("wokcommands");
const path = require("path");

const client = new Client({
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

client.on("ready", async () => {
	const wok = new Wok(client, {

		commandsDir: path.join(__dirname, "commands"),

		featuresDir: path.join(__dirname, "features"),

		showWarns: true,

		delErrMsgCooldown: 5,

		defaultLangauge: "english",

		dbOptions: {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			keepAlive: true,
		},

		disabledDefaultCommands: [
			"help",
			"prefix",
			"slash",
			"command",
			"language",
			"requiredrole",
			"channelonly"
		], mongoUri: process.env.DB,
	}).setDefaultPrefix("​")

	wok.on("databaseConnected", async (connection, state) => {
		console.log("WOKCommands > Database", state)
	})
}); client.on('levelUp', async (message, data, role) => { console.log(data) }) // <= This is optional but can be used to send a message to the user when they level up.

client.login(process.env.TOKEN) // you'll need to set this to your own Discord Bot Token