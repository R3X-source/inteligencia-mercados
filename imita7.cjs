const { Client } = require('discord.js-selfbot-v13');
const Markov = require('markov-strings').default;
const client = new Client({ checkUpdate: false });
const fs = require('fs');

const TOKEN = "MTQ1NDE4ODUzMjM4MDczMzQ3MA.Gl56gU.Ev1-6S40p7QMgxb66jm6DUY8RPwuOLeNMF3Mts";
const MI_PROPIA_ID = "1454188532380733470"; 

// --- IDS PARA RECICLAR (Gente que insulta bien) ---
const IDS_RECICLAJE = `
1459090209634517112
1461246122247848171
`;

// --- IDS PARA ATACAR (Tus objetivos) ---
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

let datosRaw = JSON.parse(fs.readFileSync('./insultos.json', 'utf8'));
const markov = new Markov({ stateSize: 2 }); 
markov.addData(datosRaw);

process.on('unhandledRejection', () => {});

client.on('ready', () => console.log(`MODO RECICLAJE ACTIVO - Aprendiendo de ${MAESTROS.length} personas.`));

client.on('messageCreate', async (message) => {
    // PROTECCIÓN: No responder a DMs ni a ti mismo
    if (message.channel.type === 'DM' || message.author.id === client.user.id || message.author.id === MI_PROPIA_ID) return;

    // --- 1. MODO RECICLAJE: Si el "Maestro" insulta, el bot guarda sus palabras ---
    if (MAESTROS.includes(message.author.id) && message.content.length > 8) {
        if (!datosRaw.includes(message.content)) {
            // Limpiamos menciones para no guardarlas en el cerebro
            const textoLimpio = message.content.replace(/<@!?\d+>/g, '').trim();
            if (textoLimpio.length > 5) {
                datosRaw.push(textoLimpio);
                fs.writeFileSync('./insultos.json', JSON.stringify(datosRaw, null, 2));
                markov.addData([textoLimpio]);
                console.log("Insulto reciclado de un experto.");
            }
        }
    }

    // --- 2. ATAQUE: Usa lo aprendido contra los objetivos ---
    if (OBJETIVOS.includes(message.author.id)) {
        await new Promise(r => setTimeout(r, 100)); // 0.1s reacción

        try {
            for (let i = 0; i < 3; i++) {
                const res = markov.generate({
                    maxTries: 800,
                    filter: (r) => r.string.split(' ').length > 3 // Que sea una frase real
                });
                
                let bardeo = res.string.toUpperCase();
                await message.channel.send(`<@${message.author.id}> ${bardeo}`).catch(() => {});
                
                if (i < 2) await new Promise(r => setTimeout(r, 2000)); // 2s ráfaga
            }
        } catch (e) {
            // Backup con mezcla aleatoria
            const r1 = datosRaw[Math.floor(Math.random() * datosRaw.length)];
            await message.channel.send(`<@${message.author.id}> ${r1.toUpperCase()}`).catch(() => {});
        }
    }
});

client.login(TOKEN);
