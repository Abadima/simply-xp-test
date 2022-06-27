const { verifyPic } = require("../functions.js");
const xp = require("simply-xp");

module.exports = {
    category: "Economy",
    description: "View User Rank",

    slash: true,
    testOnly: false,
    guildOnly: true,
    cooldown: "5s",

    minArgs: 0,
    maxArgs: 5,
    expectedArgs: "<User> <Background> <Color> <LvlBar> <LvlBarBG>",
    options: [
        {
            name: "user",
            description: "Select a User",
            required: false,
            type: 6
        },
        {
            name: "background",
            description: "Background Image URL",
            required: false,
            type: 3
        },
        {
            name: "color",
            description: "Colour Hex Code",
            required: false,
            type: 3
        },
        {
            name: "lvlbar",
            description: "Level Bar Hex Code",
            required: false,
            type: 3
        },
        {
            name: "lvlbarbg",
            description: "Background Hex Code",
            required: false,
            type: 3
        }
    ],

    callback: async ({ guild, interaction, user }) => {
        await interaction.deferReply()

        xp.rank(interaction, interaction.options.getUser("user")?.id || user.id, guild.id, {
            background: verifyPic(interaction.options.getString("background")) ? interaction.options.getString("background") : null,
            lvlbarBg: interaction.options.getString("lvlbarbg") || null,
            lvlbar: interaction.options.getString("lvlbar") || null,
            color: interaction.options.getString("color") || null,
        }).then((res) => {
            interaction.editReply({
                embeds: [{
                    title: "Result of Function",
                    description: "VIEW RANK IN THE ATTACHMENT",
                    image: { url: "attachment://rank.png" }
                }], files: [res]
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