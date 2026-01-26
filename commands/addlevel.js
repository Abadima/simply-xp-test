const { Colors } = require("discord.js");
const xp = require("simply-xp");

module.exports = {
    category: "Economy",
    description: "Add Levels",

    slash: true,
    testOnly: false,
    guildOnly: true,
    cooldown: "5s",

    minArgs: 1,
    maxArgs: 2,
    expectedArgs: "<Level> <User>",
    options: [
        {
            name: "level",
            description: "Amount of levels to add",
            required: true,
            type: 10
        },
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
        const amount = interaction.options.getNumber("level");

        xp.addLevel(interaction, targetId, guild.id, amount).then((res) => {
            interaction.editReply({
                embeds: [{
                    title: "Result of Function",
                    description: JSON.stringify(res),
                    color: Colors.DarkGreen
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