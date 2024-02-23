
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js')

const dotenv = require('dotenv')
dotenv.config()
const { TOKEN, CLIENT_ID, GUILD_ID} = process.env


const fs = require("node:fs")
const path = require("node:path")
const commandsPath = path.join(__dirname,"commands")
const commandsfile = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

const client = new Client({ intents: [GatewayIntentBits.Guilds] })
client.commands = new Collection()

 for(const file of commandsfile)
    {
        const filePath = path.join(commandsPath, file)
        const command = require(filePath)
        if("data" in command && "execute" in command)
        {
            client.commands.set(command.data.name, command)
            console.log(command)
        }
        else 
        {
            console.log(`Esse comando em ${filePath} está com "data" ou "execute ausentes"`)
        }
    }


client.once(Events.ClientReady, readyClient => {
	console.log(`Pronto o login foi realizado como ${readyClient.user.tag}`)
})

client.login(TOKEN)

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;

    const commandName = interaction.commandName;
    const command = client.commands.get(commandName);

    if (!command) {
        console.error(`Comando "${commandName}" não encontrado.`);
        return;
    }
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply("Houve um erro neste comando.");
    }
});
