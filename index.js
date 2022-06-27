require("dotenv").config();
require("simply-xp").connect(process.env.DB, { notify: false }); // you'll need to set this to your own MongoDB URI
const { Client, Intents } = require("discord.js");
const Wok = require("wokcommands");
const path = require("path");

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS
	], 
	presence: {
		status: "online",
		activities: [{
			name: require(path.join(__dirname, "package.json")).version,
			type: "WATCHING"
		}]
	}
})

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
}); client.login(process.env.TOKEN) // you'll need to set this to your own Discord Bot Token