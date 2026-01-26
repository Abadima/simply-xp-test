const { Colors } = require("discord.js")
const xp = require("simply-xp");

module.exports = {
    category: "Economy",
    description: "Create New Member",

    slash: true,
    testOnly: false,
    guildOnly: true,
    cooldown: "5s",

    minArgs: 0,
    maxArgs: 1,
    expectedArgs: "<User>",
    options: [
        {
            name: "user",
            description: "Select a User",
            required: false,
            type: 6
        }
    ],

    callback: async ({ guild, interaction, user }) => {
        await interaction.deferReply()

        const targetId = interaction.options.getUser("user")?.id || user.id;

        xp.create(targetId, guild.id).then((res) => {
            interaction.editReply({
                embeds: [{
                    title: "Result of Function",
                    description: JSON.stringify(res) || "Nothing Returned (Likely User Already Exists)",
                    color: res ? Colors.DarkGreen : Colors.DarkOrange
                }]
            })
        }).catch((err) => {
            interaction.editReply({
                embeds: [{
                    title: "Result of Function",
                    description: err.toString().substring(0, 1024),
                    color: Colors.Red
                }]
            })
        })
    }
}