const {SlashCommandBuilder} = require('discord.js')

module.exports =
{
    data: new SlashCommandBuilder()
        .setName("playlist")
        .setDescription("Coloca uma playlist "),
    
    async execute(interaction)
    {
        await interaction.reply("https://open.spotify.com/playlist/5lXSIv4JuaR4CwAZNdJGWi?si=d3ad4c936af14fec")
    }
    
}