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

const IDS_OBJETIVO = IDS_TEXTO.trim().split(/\s+/);

// --- CEREBRO CON LÓGICA (stateSize: 2 para coherencia) ---
let datosRaw = JSON.parse(fs.readFileSync('./insultos.json', 'utf8'));
const markov = new Markov({ stateSize: 2 }); 
markov.addData(datosRaw);

process.on('unhandledRejection', () => {});

client.on('ready', () => console.log(`IA CON LÓGICA ACTIVA - No te bardeo más a ti.`));

client.on('messageCreate', async (message) => {
    // BLINDAJE: Si el mensaje lo enviaste TÚ o es un DM, el bot se apaga.
    if (message.author.id === client.user.id || message.author.id === MI_PROPIA_ID || message.channel.type === 'DM') return;

    // 1. APRENDIZAJE SEGURO (Solo de tus mensajes en grupos)
    // (Esta parte solo se activa si quitas el return de arriba para tu ID, pero mejor dejarlo así para que no haya errores)

    // 2. ATAQUE COORDINADO A OBJETIVOS
    if (IDS_OBJETIVO.includes(message.author.id)) {
        await new Promise(r => setTimeout(r, 100)); // 0.1s reacción

        try {
            for (let i = 0; i < 3; i++) {
                // Generación con Lógica de Conectores
                const res = markov.generate({
                    maxTries: 1000,
                    filter: (r) => r.string.length > 20 && r.string.split(' ').length > 3
                });
                
                let bardeo = res.string.toUpperCase();
                
                // Manda el textongo con mención para que le duela
                await message.channel.send(`<@${message.author.id}> ${bardeo}`).catch(() => {});
                
                if (i < 2) await new Promise(r => setTimeout(r, 2000)); // Ráfaga de 2s
            }
        } catch (e) {
            // Si la IA falla, suelta una frase clásica entera del JSON para no fallar
            const clasico = datosRaw[Math.floor(Math.random() * datosRaw.length)];
            await message.channel.send(`<@${message.author.id}> ${clasico.toUpperCase()}`).catch(() => {});
        }
    }
});

client.login(TOKEN);
