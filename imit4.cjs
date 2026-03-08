const { Client } = require('discord.js-selfbot-v13');
const Markov = require('markov-strings').default;
const client = new Client({ checkUpdate: false });
const fs = require('fs');

// --- TU TOKEN DIRECTO ---
const TOKEN = "MTQ1NDE4ODUzMjM4MDczMzQ3MA.Gl56gU.Ev1-6S40p7QMgxb66jm6DUY8RPwuOLeNMF3Mts";

// --- LISTA DE IDS (SOLO PEGA EL NÚMERO ABAJO DEL OTRO) ---
const IDS_TEXTO = `
1386330375952793723
1467397075204309034
1446586105553227807
1476167379481395222
1477357169908387840
829828407104765952
`;

const IDS_OBJETIVO = IDS_TEXTO.trim().split(/\s+/);

// Cargar memoria de insultos
let datos = JSON.parse(fs.readFileSync('./insultos.json', 'utf8'));
const markov = new Markov({ stateSize: 1 }); 
markov.addData(datos);

process.on('unhandledRejection', () => {});
process.on('uncaughtException', () => {});

client.on('ready', () => {
    console.log(`IA GENERATIVA ACTIVA - Objetivos: ${IDS_OBJETIVO.length}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.id === client.user.id) return;

    if (IDS_OBJETIVO.includes(message.author.id)) {
        // Reacción técnica de 0.1s
        await new Promise(r => setTimeout(r, 100));

        try {
            // Generar ráfaga de 3 mensajes generados por IA
            for (let i = 0; i < 3; i++) {
                const res = markov.generate({
                    maxTries: 300,
                    filter: (r) => r.string.length > 15
                });
                
                const textongo = res.string.toUpperCase();
                await message.channel.send(`<@${message.author.id}> ${textongo}`).catch(() => {});
                
                // Pausa de 2 segundos entre mensajes
                if (i < 2) await new Promise(r => setTimeout(r, 2000));
            }
        } catch (e) {
            const r1 = datos[Math.floor(Math.random() * datos.length)];
            await message.channel.send(`<@${message.author.id}> ${r1}`).catch(() => {});
        }
    }
});

client.login(TOKEN);

