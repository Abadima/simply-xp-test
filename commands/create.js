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

    callback: async ({ args, guild, interaction, user }) => {
        await interaction.deferReply()

        if (args.length) {
            xp.create(args[0], guild.id).then((res) => {
                interaction.editReply({
                    embeds: [{
                        title: "Result of Function",
                        description: JSON.stringify(res) || "Nothing Returned (Likely User Already Exists)",
                        color: res ? "GREEN" : "ORANGE"
                    }]
                })
            }).catch((err) => {
                interaction.editReply({
                    embeds: [{
                        title: "Result of Function",
                        description: err.toString().substring(0, 1024),
                        color: "RED"
                    }]
                })
            })
        } else {
            xp.create(user.id, guild.id).then((res) => {
                interaction.editReply({
                    embeds: [{
                        title: "Result of Function",
                        description: JSON.stringify(res) || "Nothing Returned (Likely User Already Exists)",
                        color: res ? "GREEN" : "ORANGE"
                    }]
                })
            }).catch((err) => {
                interaction.editReply({
                    embeds: [{
                        title: "Result of Function",
                        description: err.toString().substring(0, 1024),
                        color: "RED"
                    }]
                })
            })
        }
    }
}