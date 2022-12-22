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
	console.log(`BOT ACTIVE: ${client.user.tag}`);

	new Wok({

		client,

		commandsDir: path.join(__dirname, "commands"),

		cooldownConfig: {
			errorMessage: "Please wait {TIME} before doing that again.",
			botOwnersBypass: true,
			dbRequired: 60,
		},

		delErrMsgCooldown: 5,

		defaultLangauge: "english",

		dbOptions: {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			strictQuery: false,
			keepAlive: true,
		},

		disabledDefaultCommands: [
			Wok.DefaultCommands.ChannelCommand,
			Wok.DefaultCommands.CustomCommand,
			Wok.DefaultCommands.Prefix,
			Wok.DefaultCommands.RequiredPermissions,
			Wok.DefaultCommands.RequiredRoles,
			Wok.DefaultCommands.ToggleCommand
		],

		mongoUri: process.env.DB,
	});
}); client.on('levelUp', async (message, data, role) => { console.log(data) }) // <= This is optional but can be used to send a message to the user when they level up.

client.login(process.env.TOKEN) // you'll need to set this to your own Discord Bot Token