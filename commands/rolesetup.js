const { Colors } = require("discord.js")
const xp = require("simply-xp");

module.exports = {
    category: "Economy",
    description: "Setup Level Roles",

    slash: true,
    testOnly: false,
    guildOnly: true,
    cooldown: "5s",
    options: [
        {
            name: "add",
            description: "Add a role",
            options: [
                {
                    name: "level",
                    description: "Level required to get the role.",
                    required: true,
                    type: 10
                },
                {
                    name: "role",
                    description: "The role to provide.",
                    required: true,
                    type: 8
                }
            ], type: 1
        },
        {
            name: "remove",
            description: "Remove roles from a level",
            options: [
                {
                    name: "level",
                    description: "Level required to get the role.",
                    required: true,
                    type: 10
                }
            ], type: 1
        },
        {
            name: "fetch",
            description: "Fetch Level Roles",
            type: 1
        },
        {
            name: "find",
            description: "Find roles for a level",
            options: [
                {
                    name: "level",
                    description: "Level required to get the role.",
                    required: true,
                    type: 10
                }
            ], type: 1
        },
    ],

    callback: async ({ client, interaction, guild }) => {
        await interaction.deferReply()

        switch (interaction.options.getSubcommand()) {
            case "add":
                xp.roleSetup.add(client, guild.id, {
                    level: interaction.options.getNumber("level"),
                    role: interaction.options.getRole("role").id
                }).then((res) => {
                    interaction.editReply({
                        embeds: [{
                            title: "Result of Function",
                            description: JSON.stringify(res) || "Nothing Returned (Something Probably Went Wrong)",
                            color: res ? Colors.DarkGreen : Colors.DarkOrange
                        }]
                    })
                }).catch((err) => {
                    console.log(err)
                    interaction.editReply({
                        embeds: [{
                            title: "Result of Function",
                            description: err.toString().substring(0, 1024),
                            color: "RED"
                        }]
                    })
                }); break
            case "find":
                xp.roleSetup.find(client, guild.id, interaction.options.getNumber("level")).then((res) => {
                    interaction.editReply({
                        embeds: [{
                            title: "Result of Function",
                            description: JSON.stringify(res) || "Nothing Returned (Something Probably Went Wrong)",
                            color: res ? Colors.DarkGreen : Colors.DarkOrange
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
                }); break
            case "fetch":
                xp.roleSetup.fetch(client, guild.id).then((res) => {
                    interaction.editReply({
                        embeds: [{
                            title: "Result of Function",
                            description: JSON.stringify(res) || "Nothing Returned (Something Probably Went Wrong)",
                            color: res ? Colors.DarkGreen : Colors.DarkOrange
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
                }); break
            case "remove":
                xp.roleSetup.remove(client, guild.id, { level: interaction.options.getNumber("level") }).then((res) => {
                    interaction.editReply({
                        embeds: [{
                            title: "Result of Function",
                            description: JSON.stringify(res) || "Nothing Returned (Something Probably Went Wrong)",
                            color: res ? Colors.DarkGreen : Colors.DarkOrange
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
                }); break
            default:
                interaction.editReply({
                    embeds: [{
                        title: "How did you get here?",
                        description: "You can try that again.",
                        color: "RED"
                    }]
                }); break
        }
    }
}