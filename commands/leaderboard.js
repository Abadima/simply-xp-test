const { Colors } = require("discord.js")
const xp = require("simply-xp");

module.exports = {
    category: "Economy",
    description: "Leaderboard System",

    slash: true,
    testOnly: false,
    guildOnly: true,
    cooldown: "5s",
    minArgs: 0,
    maxArgs: 1,
    expectedArgs: "<Limit>",
    options: [{
        name: "limit",
        description: "Limit Results",
        required: false,
        type: 10
    }],

    callback: async ({ interaction, client }) => {
        const requestedLimit = interaction.options.getNumber("limit");
        const guildSize = interaction.guild?.memberCount ?? 50;
        const limit = requestedLimit && requestedLimit > 0 ? requestedLimit : guildSize;
        await interaction.deferReply();

        try {
            const res = await xp.leaderboard(client, interaction.guild.id, limit);
            const lead = res.map(user => `Level ${user.level} - ${user.tag} - ${user.xp} XP`).join("\n") || "(no data yet)";

            interaction.editReply({
                embeds: [{
                    title: "Result of Function",
                    description: lead,
                    color: lead.length ? Colors.DarkGreen : Colors.DarkOrange,
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
            });
        } catch (err) {
            console.log(err);
            interaction.editReply({
                embeds: [{
                    title: "Result of Function",
                    description: `${err}`,
                    color: Colors.Red
                }]
            });
        }
    }
}