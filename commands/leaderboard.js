const xp = require("simply-xp");

module.exports = {
    category: "Economy",
    description: "Leaderboard System",

    slash: true,
    testOnly: false,
    guildOnly: true,
    cooldown: "8s",
    minArgs: 0,
    maxArgs: 1,
    expectedArgs: "<Limit>",
    options: [{
        name: "limit",
        description: "Limit Results",
        required: false,
        type: 10
    }],

    callback: async ({ args, interaction, client }) => {
        await interaction.deferReply()

        xp.leaderboard(client, interaction.guild.id, args[0] || 5).then((res) => {
            let lead = ""; res.forEach(user => {
                lead += `Level ${user.level} - ${user.tag} - ${user.xp} XP\n`
            })
            interaction.editReply({
                embeds: [{
                    title: "Result of Function",
                    description: lead,
                    color: lead.length ? "GREEN" : "ORANGE",
                    fields: [{
                        name: "Example Result (Per User)",
                        value: `{
                        guildID: ${interaction.guild.id}
                        userID: ${interaction.user.id}
                        xp: 25000
                        position: 1
                        username: ${interaction.user.username}
                        tag: ${interaction.user.tag}
                        shortxp: 25k
                        }`
                    }]
                }]
            })
        }).catch((err) => {
            console.log(err)
            interaction.editReply({
                embeds: [{
                    title: "Result of Function",
                    description: `${err}`,
                    color: "RED"
                }]
            })
        })
    }
}