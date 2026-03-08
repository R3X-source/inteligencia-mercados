const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

// --- CONFIGURACIÓN ---
const TOKEN = "MTQ1NDE4ODUzMjM4MDczMzQ3MA.Gl56gU.Ev1-6S40p7QMgxb66jm6DUY8RPwuOLeNMF3Mts";
const MI_PROPIA_ID = "1454188532380733470"; // Tu ID para imitar y aprender

const IDS_OBJETIVO = [
    "1386330375952793723",
    "1467397075204309034",
    "1446586105553227807",
    "1476167379481395222",
    "1476648357261873263",
    "1477357169908387840"
];

// Repertorio base que se expandirá con tu historial
let memoriaEstilo = [
    "NALGOTANGA",
    "SOY TU TÍO EL Q COMPARTE TU ANISERU PU",
    "GANÓ TU ANLG4 SEBTONEANDO PENMARRANA",
    "SENTONESTE AL EDUATDO SHE",
    "TE HUELE LA BAJINA A ATÚN SHE",
    "Q CULITO DE ARJENTA SHE",
    "POS TE VEO EL ANUTE",
    "NO POS TE CLAVO EL AGUION",
    "SHAKITAM BI",
    "CEJOTIÑA"
];

let ultimaActividad = Date.now();

client.on('ready', async () => {
    console.log(`CLON ACTIVO: ${client.user.tag}`);
    console.log(`Escaneando tu historial para copiar tu esencia...`);

    // Escaneo masivo inicial de tus mensajes reales
    const canales = client.channels.cache.filter(c => c.type === 'GUILD_TEXT');
    for (const [id, canal] of canales) {
        try {
            const mensajes = await canal.messages.fetch({ limit: 100 });
            // Filtramos tus mensajes que no sean los del bot (mensajes largos y reales)
            const tusMensajesReales = mensajes.filter(m => m.author.id === MI_PROPIA_ID && m.content.length > 20);
            tusMensajesReales.forEach(m => {
                if (!memoriaEstilo.includes(m.content)) memoriaEstilo.push(m.content);
            });
        } catch (e) { /* Canales sin permiso */ }
    }
    console.log(`Memoria cargada con ${memoriaEstilo.length} frases de tu estilo.`);
});

client.on('messageCreate', async (message) => {
    // Evitar que el bot entre en un bucle infinito consigo mismo
    if (message.author.id === client.user.id) return;

    const ahora = Date.now();

    // --- SI EL QUE HABLA ES UN OBJETIVO ---
    if (IDS_OBJETIVO.includes(message.author.id)) {

        // Regla de 0.1s de espera técnica
        await new Promise(r => setTimeout(r, 2000));

        // Función para disparar ráfaga con tu estilo
        const dispararRafaga = async () => {
            for (let i = 0; i < 3; i++) {
                // Selecciona un insulto largo de tu memoria para que no sea infantil
                const frasesPesadas = memoriaEstilo.filter(f => f.length > 15);
                const insultoClon = frasesPesadas[Math.floor(Math.random() * frasesPesadas.length)];

                await message.channel.send(`<@${message.author.id}> ${insultoClon}`);
                await new Promise(r => setTimeout(r, 500)); // Ráfaga de medio segundo
            }
        };

        // Si están en plena pelea (menos de 2 min de silencio) o es el primer ataque
        if (ahora - ultimaActividad < 120000 || ultimaActividad === 0) {
            await dispararRafaga();
        } else {
            console.log("Reiniciando ataque tras silencio de la víctima.");
            await dispararRafaga();
        }

        ultimaActividad = ahora;
    }

    // --- APRENDIZAJE: Si tú escribes algo nuevo, el bot lo absorbe ---
    if (message.author.id === MI_PROPIA_ID && message.content.length > 20) {
        if (!memoriaEstilo.includes(message.content)) {
            memoriaEstilo.push(message.content);
            console.log("Nueva frase absorbida de tu cuenta.");
        }
    }
});

client.login(TOKEN);
