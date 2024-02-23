const { REST } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const fs = require('fs');
const path = require('path');
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const commands = [];

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        console.log(`Resetando ${commands.length} comandos ...`);

        await rest.put(
            // Corrigindo a construção da URL
            `/applications/${CLIENT_ID}/guilds/${GUILD_ID}/commands`,
            { body: commands }
        );

        console.log('Comandos registrados com sucesso');
    } catch (error) {
        console.error(error);
    }
})();
