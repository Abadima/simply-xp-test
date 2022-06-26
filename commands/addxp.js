const xp = require("simply-xp");

module.exports = {
    category: "Economy",
    description: "Add Exp",

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
            description: "Amount of experience to add",
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

    callback: async ({ args, guild, interaction, user }) => {
        await interaction.deferReply()

        if (args[1]) {
            xp.addXP(interaction, args[1], guild.id, args[0]).then((res) => {
                interaction.editReply({
                    embeds: [{
                        title: "Result of Function",
                        description: JSON.stringify(res),
                        color: "GREEN"
                    }]
                })
            }).catch((err) => {
                interaction.editReply({
                    embeds: [{
                        title: "Result of Function",
                        description: err.toString().substring(1, 1024),
                        color: "RED"
                    }]
                })
            })
        } else {
            xp.addXP(interaction, user.id, guild.id, args[0]).then((res) => {
                interaction.editReply({
                    embeds: [{
                        title: "Result of Function",
                        description: JSON.stringify(res),
                        color: "GREEN"
                    }]
                })
            }).catch((err) => {
                interaction.editReply({
                    embeds: [{
                        title: "Result of Function",
                        description: err.toString().substring(1, 1024),
                        color: "RED"
                    }]
                })
            })
        }
    }
}