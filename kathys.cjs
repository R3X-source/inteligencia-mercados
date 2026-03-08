const { Client } = require('discord.js-selfbot-v13');
const Markov = require('markov-strings').default;
const client = new Client({ checkUpdate: false });
const fs = require('fs');

const TOKEN = "MTQ1NDE4ODUzMjM4MDczMzQ3MA.Gl56gU.Ev1-6S40p7QMgxb66jm6DUY8RPwuOLeNMF3Mts";
const MI_PROPIA_ID = "1454188532380733470"; 

const IDS_ATAQUE = `
1386330375952793723
1467397075204309034
1446586105553227807
1476167379481395222
1477357169908387840
829828407104765952
`;

const OBJETIVOS = IDS_ATAQUE.trim().split(/\s+/);

let datosRaw = JSON.parse(fs.readFileSync('./insultos.json', 'utf8'));
const markov = new Markov({ stateSize: 1 }); 
markov.addData(datosRaw);

process.on('unhandledRejection', () => {});
process.on('uncaughtException', () => {});

client.on('ready', () => console.log(`🔥 IA DE BARDEO PURO ACTIVA`));

client.on('messageCreate', async (message) => {
    if (!message.guild || message.author.id === client.user.id || message.author.id === MI_PROPIA_ID) return;

    if (OBJETIVOS.includes(message.author.id)) {
        await new Promise(r => setTimeout(r, 100));

        try {
            for (let i = 0; i < 3; i++) {
                const res = markov.generate({
                    maxTries: 1500, // Buscamos mucho más para que sea perfecto
                    filter: (r) => 
                        r.string.length > 20 && // Que no sea un mensaje corto
                        !r.string.includes(':v') && // PROHIBIDO EL PACMAN
                        !r.string.includes('v:') 
                });
                
                let bardeo = res.string.toUpperCase();
                await message.channel.send(`<@${message.author.id}> ${bardeo}`).catch(() => {});
                
                // Pausa aleatoria para no parecer bot
                const pausa = Math.floor(Math.random() * 3000) + 2000;
                if (i < 2) await new Promise(r => setTimeout(r, pausa));
            }
        } catch (e) {
            // Si falla, tira un bardeo pesado del JSON al azar
            const r1 = datosRaw[Math.floor(Math.random() * datosRaw.length)];
            await message.channel.send(`<@${message.author.id}> ${r1.toUpperCase()}`).catch(() => {});
        }
    }
});

client.login(TOKEN);
