const { Client } = require('discord.js-selfbot-v13');
const Markov = require('markov-strings').default;
const client = new Client({ checkUpdate: false });
const fs = require('fs');

const TOKEN = "MTQ1NDE4ODUzMjM4MDczMzQ3MA.Gl56gU.Ev1-6S40p7QMgxb66jm6DUY8RPwuOLeNMF3Mts";
const MI_PROPIA_ID = "1454188532380733470"; 

const IDS_TEXTO = `
1386330375952793723
1467397075204309034
1446586105553227807
1476167379481395222
1477357169908387840
829828407104765952

`;
const OBJETIVOS = IDS_TEXTO.trim().split(/\s+/);

// CARGA DEL NUEVO JSON MEJORADO
let datosRaw = JSON.parse(fs.readFileSync('./insultos.json', 'utf8'));
const markov = new Markov({ stateSize: 1 }); 
markov.addData(datosRaw);

process.on('unhandledRejection', () => {});
process.on('uncaughtException', () => {});

client.on('ready', () => console.log(`🔥 MODO BARDERO REAL ACTIVO - Munición cargada.`));

client.on('messageCreate', async (message) => {
    // Blindaje: No DMs, no a ti mismo, no a otros bots
    if (!message.guild || message.author.id === client.user.id || message.author.id === MI_PROPIA_ID) return;

    if (OBJETIVOS.includes(message.author.id)) {
        // 0.1s de reacción inicial
        await new Promise(r => setTimeout(r, 100));

        for (let i = 0; i < 3; i++) {
            try {
                // Generar bardeo: Forzamos a que combine piezas y no sea idéntico al original
                const res = markov.generate({
                    maxTries: 2000,
                    filter: (r) => r.string.length > 15 && !datosRaw.includes(r.string)
                });
                
                let bardeo = res.string.toUpperCase();
                await message.channel.send(`<@${message.author.id}> ${bardeo}`).catch(() => {});
                
                // ESPERA REAL DE 2 SEGUNDOS ENTRE DISPAROS
                if (i < 2) {
                    await new Promise(r => setTimeout(r, 2200)); 
                }
            } catch (e) {
                // Si la IA no puede inventar algo nuevo, mezcla dos del JSON al azar
                const r1 = datosRaw[Math.floor(Math.random() * datosRaw.length)];
                const r2 = datosRaw[Math.floor(Math.random() * datosRaw.length)];
                await message.channel.send(`<@${message.author.id}> ${r1} ${r2}`.toUpperCase()).catch(() => {});
                if (i < 2) await new Promise(r => setTimeout(r, 2200));
            }
        }
    }
});

client.login(TOKEN);
