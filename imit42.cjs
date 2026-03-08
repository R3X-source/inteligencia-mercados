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

// --- CARGAR CEREBRO ---
let datos = JSON.parse(fs.readFileSync('./insultos.json', 'utf8'));
// stateSize: 1 es la clave para que NO repita y sea infinito
const markov = new Markov({ stateSize: 1 }); 
markov.addData(datos);

process.on('unhandledRejection', () => {});

client.on('ready', () => {
    console.log(`IA INFINITA Y PRIVADA ACTIVA - Objetivos: ${IDS_OBJETIVO.length}`);
});

client.on('messageCreate', async (message) => {
    // PARCHE DE PRIVACIDAD: Ignorar si es un mensaje directo (DM)
    if (message.channel.type === 'DM') return;
    
    if (message.author.id === client.user.id) return;

    // 1. APRENDIZAJE (Solo en servidores/grupos)
    if (message.author.id === MI_PROPIA_ID && message.content.length > 10) {
        if (!datos.includes(message.content)) {
            datos.push(message.content);
            fs.writeFileSync('./insultos.json', JSON.stringify(datos, null, 2));
            markov.addData([message.content]);
        }
    }

    // 2. ATAQUE (Solo si el objetivo habla en un canal o grupo)
    if (IDS_OBJETIVO.includes(message.author.id)) {
        await new Promise(r => setTimeout(r, 100)); // 0.1s reacción

        try {
            for (let i = 0; i < 3; i++) {
                // Generación con ALTO CAOS para evitar repetición
                const res = markov.generate({
                    maxTries: 500, // Más intentos para buscar frases únicas
                    filter: (r) => r.string.length > 15 && r.score > 1
                });
                
                const textongo = res.string.toUpperCase();
                await message.channel.send(`<@${message.author.id}> ${textongo}`).catch(() => {});
                
                if (i < 2) await new Promise(r => setTimeout(r, 2000)); // 2s ráfaga
            }
        } catch (e) {
            // Si la IA no genera algo nuevo, mezcla 3 palabras al azar del JSON
            const words = datos.join(' ').split(' ');
            const randomMsg = Array.from({length: 8}, () => words[Math.floor(Math.random() * words.length)]).join(' ');
            await message.channel.send(`<@${message.author.id}> ${randomMsg.toUpperCase()}`).catch(() => {});
        }
    }
});

client.login(TOKEN);

