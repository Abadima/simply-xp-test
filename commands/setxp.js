const { Colors } = require("discord.js");
const xp = require("simply-xp");

module.exports = {
    category: "Economy",
    description: "Set User Exp",

    slash: true,
    testOnly: false,
    guildOnly: true,
    cooldown: "5s",

    minArgs: 1,
    maxArgs: 2,
    expectedArgs: "<Exp> <User>",
    options: [
        {
            name: "exp",
            description: "Experience to set",
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
        const expValue = interaction.options.getNumber("exp");

        xp.setXP(targetId, guild.id, expValue).then((res) => {
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