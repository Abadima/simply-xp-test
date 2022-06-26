require("dotenv").config();
require("simply-xp").connect(process.env.DB, { notify: false });
const { Client, Intents } = require("discord.js");
const Wok = require("wokcommands");
const path = require("path");

const client = new Client({
	partials: ["CHANNEL", "MESSAGE"],
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGES
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

		testServers: ["950190034852646912"],

		botOwners: [`326815959358898189`, `875010010583826443`],

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
}); client.login(process.env.TOKEN)