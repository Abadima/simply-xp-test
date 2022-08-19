const { Colors } = require("discord.js");
const xp = require("simply-xp");

module.exports = {
    category: "Economy",
    description: "Add Experience",

    slash: true,
    testOnly: false,
    guildOnly: true,
    cooldown: "5s",

    minArgs: 1,
    maxArgs: 3,
    expectedArgs: "<Exp> <User> <Max Exp>",
    options: [
        {
            name: "exp",
            description: "Amount of experience to add",
            required: true,
            type: 10
        },
        {
            name: "user",
            description: "Select a User",
            required: false,
            type: 6
        },
        {
            name: "max",
            description: "Max experience to add (this makes exp the minimum)",
            required: false,
            type: 10
        }
    ],

    callback: async ({ args, guild, interaction, user }) => {
        const choices = interaction.options
        await interaction.deferReply()

        if (choices.getNumber('max')) {
            xp.addXP(interaction, choices.getUser("user")?.id || user.id, guild.id, {
                min: choices.getNumber("exp"),
                max: choices.getNumber("max")
            }).then((res) => {
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
        } else {
            xp.addXP(interaction, args[1] || user.id, guild.id, args[0]).then((res) => {
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
}