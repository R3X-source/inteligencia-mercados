const { Client } = require('discord.js-selfbot-v13');
const Markov = require('markov-strings').default;
const client = new Client({ checkUpdate: false });
const fs = require('fs');

// --- CONFIGURACIÓN ---
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
const IDS_OBJETIVO = IDS_TEXTO.trim().split(/\s+/);

// --- CEREBRO CON PARCHE DE FRAGMENTACIÓN ---
let datosRaw = JSON.parse(fs.readFileSync('./insultos.json', 'utf8'));
// Aquí rompemos las frases para que la IA no repita mensajes enteros
const markov = new Markov({ stateSize: 1 }); 
markov.addData(datosRaw);

process.on('unhandledRejection', () => {});

client.on('ready', () => console.log(`IA GENERADORA DE TEXTONGOS: ${client.user.tag}`));

client.on('messageCreate', async (message) => {
    // ESCUDO DE PRIVACIDAD: Ignora DMs
    if (message.channel.type === 'DM' || message.author.id === client.user.id) return;

    // 1. APRENDIZAJE: Si tú escribes, el bot absorbe palabras nuevas
    if (message.author.id === MI_PROPIA_ID && message.content.length > 8) {
        if (!datosRaw.includes(message.content)) {
            datosRaw.push(message.content);
            fs.writeFileSync('./insultos.json', JSON.stringify(datosRaw, null, 2));
            markov.addData([message.content]);
        }
    }

    // 2. ATAQUE: Mezcla total de insultos
    if (IDS_OBJETIVO.includes(message.author.id)) {
        await new Promise(r => setTimeout(r, 100)); // 0.1s reacción

        try {
            for (let i = 0; i < 3; i++) {
                // Generamos un textongo que NO esté en el JSON original
                const res = markov.generate({
                    maxTries: 1000, // Forzamos a la IA a que busque combinaciones locas
                    filter: (r) => r.string.length > 15 && !datosRaw.includes(r.string) 
                });
                
                const insultoNuevo = res.string.toUpperCase();
                await message.channel.send(`<@${message.author.id}> ${insultoNuevo}`).catch(() => {});
                
                if (i < 2) await new Promise(r => setTimeout(r, 2000)); // 2s ráfaga
            }
        } catch (e) {
            // SI LA IA FALLA: Agarra palabras al azar y las pega (Caos absoluto)
            const todasLasPalabras = datosRaw.join(' ').split(/\s+/);
            let emergencia = "";
            for(let j=0; j<8; j++) {
                emergencia += todasLasPalabras[Math.floor(Math.random() * todasLasPalabras.length)] + " ";
            }
            await message.channel.send(`<@${message.author.id}> ${emergencia.trim().toUpperCase()}`).catch(() => {});
        }
    }
});

client.login(TOKEN);
