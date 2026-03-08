const { Client } = require('discord.js-selfbot-v13');
const Markov = require('markov-strings').default;
const client = new Client({ checkUpdate: false });
const fs = require('fs');

const TOKEN = "MTQ1NDE4ODUzMjM4MDczMzQ3MA.Gl56gU.Ev1-6S40p7QMgxb66jm6DUY8RPwuOLeNMF3Mts";
const MI_PROPIA_ID = "1454188532380733470"; 

const IDS_RECICLAJE = `1459090209634517112`;
const IDS_ATAQUE = `
1386330375952793723
1467397075204309034
1446586105553227807
1476167379481395222
1477357169908387840
829828407104765952
`;

const OBJETIVOS = IDS_ATAQUE.trim().split(/\s+/);
const MAESTROS = IDS_RECICLAJE.trim().split(/\s+/);

// Cargar y procesar datos
let datosRaw = JSON.parse(fs.readFileSync('./insultos.json', 'utf8'));
const markov = new Markov({ stateSize: 1 }); // StateSize 1 garantiza COMBINACIÓN MÁXIMA
markov.addData(datosRaw);

// --- BLINDAJE ABSOLUTO CONTRA CIERRES ---
process.on('unhandledRejection', (e) => { console.log('⚠️ Error de red/Discord evitado.'); });
process.on('uncaughtException', (e) => { console.log('⚠️ Error crítico evitado.'); });

client.on('ready', () => console.log(`🔥 BOT INMORTAL Y GENERATIVO PRENDIDO`));

client.on('messageCreate', async (message) => {
    // Protección de DMs y de uno mismo
    if (!message || !message.guild || !message.channel || message.author.id === client.user.id || message.author.id === MI_PROPIA_ID) return;

    // 1. RECICLAJE (Aprende y despedaza insultos ajenos)
    if (MAESTROS.includes(message.author.id)) {
        const insulto = message.content.replace(/<@!?\d+>/g, '').trim();
        if (insulto.length > 5 && !datosRaw.includes(insulto)) {
            datosRaw.push(insulto);
            fs.writeFileSync('./insultos.json', JSON.stringify(datosRaw, null, 2));
            markov.addData([insulto]);
        }
    }

    // 2. ATAQUE (Generación infinita)
    if (OBJETIVOS.includes(message.author.id)) {
        // Pausa técnica de 0.1s
        await new Promise(r => setTimeout(r, 100));

        try {
            for (let i = 0; i < 3; i++) {
                // Verificar canal antes de cada disparo
                if (!message.channel || !message.channel.send) break;

                const res = markov.generate({
                    maxTries: 1000,
                    // Forzamos que la frase tenga al menos 3 piezas del JSON
                    filter: (r) => r.string.split(' ').length >= 3
                });
                
                let textongo = res.string.toUpperCase();
                
                await message.channel.send(`<@${message.author.id}> ${textongo}`).catch(() => {});
                
                // Pausa aleatoria dentro de los 10 segundos como pediste
                if (i < 2) {
                    const pausaAleatoria = Math.floor(Math.random() * 3000) + 2000; 
                    await new Promise(r => setTimeout(r, pausaAleatoria));
                }
            }
        } catch (e) {
            // Si la IA falla, construye un insulto uniendo 3 palabras al azar
            const m1 = datosRaw[Math.floor(Math.random() * datosRaw.length)];
            const m2 = datosRaw[Math.floor(Math.random() * datosRaw.length)];
            const m3 = datosRaw[Math.floor(Math.random() * datosRaw.length)];
            await message.channel.send(`<@${message.author.id}> ${m1} ${m2} ${m3}`.toUpperCase()).catch(() => {});
        }
    }
});

client.login(TOKEN).catch(() => console.log("Token inválido"));
