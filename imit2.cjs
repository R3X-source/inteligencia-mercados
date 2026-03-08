const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

// --- CONFIGURACIÓN ---
const TOKEN = "MTQ1NDE4ODUzMjM4MDczMzQ3MA.GF7OH7.xDXkx5CCJCfk7NAENHPC9l3DozrjIfd5NnJago";
const ID_IMITACION = "1454188532380733470"; 

const IDS_OBJETIVO = [
    "1386330375952793723",
    "1467397075204309034",
    "1446586105553227807",
    "829828407104765952"
];

const MIS_FRASES = [
    "SOY TU TÍO EL Q COMPARTE TU ANISERU PU",
    "TE CONFUNDÍ EL PEDORRO SOE AKI WARSZLA AND EDUARDO",
    "GANÓ TU ANLG4 SEBTONEANDO PENMARRANA",
    "SENTONESTE AL EDUATDO SHE",
    "TE HUELE LA BAJINA A ATÚN SHE",
    "Q CULITO DE ARJENTA SHE",
    "POS TE VEO EL ANUTE",
    "NO POS TE CLAVO EL AGUION",
    "J4J4J4 TU CULO SJE",
    "MAMIT4M",
    "NO POS TU KUKAN SHE",
    "SHAKITAM BI",
    "CEJOTIÑA",
    "NALGOTANGA",
    "<@1467397075204309034> CEJUDA"
];

let ultimaActividad = Date.now();

client.on('ready', async () => {
    console.log(`SISTEMA DE ATAQUE TOTAL ACTIVO: ${client.user.tag}`);
    console.log("Analizando historiales pesados...");
});

client.on('messageCreate', async (message) => {
    if (message.author.id === client.user.id) return;

    const ahora = Date.now();

    // --- FUNCIÓN DE DISPARO INSTANTÁNEO ---
    const ametralladora = async (targetID, esImitacion = false) => {
        // 1. Imitación (Si aplica) - Sin retrasos extras
        if (esImitacion) {
            let adjuntos = message.attachments.map(a => a.url);
            await message.channel.send({ content: message.content || " ", files: adjuntos });
        }

        // 2. Ráfaga de insultos (3 mensajes casi pegados)
        // Reducimos el delay entre mensajes al mínimo para que sea ráfaga real
        for (let i = 0; i < 3; i++) {
            const frase = MIS_FRASES[Math.floor(Math.random() * MIS_FRASES.length)];
            await message.channel.send(`<@${targetID}> ${frase}`);
            // Pausa técnica mínima para evitar que Discord bloquee el envío (0.4s)
            await new Promise(r => setTimeout(r, 400));
        }
    };

    // --- LÓGICA DE IDS DE OBJETIVO ---
    if (IDS_OBJETIVO.includes(message.author.id)) {
        // Espera de 0.1s técnica y disparo
        await new Promise(r => setTimeout(r, 100));
        await ametralladora(message.author.id);
        ultimaActividad = ahora;
        return;
    }

    // --- LÓGICA DE ID IMITACIÓN ---
    if (message.author.id === ID_IMITACION) {
        // Tu regla de 0.1s
        await new Promise(r => setTimeout(r, 100));

        const tiempoSilencio = ahora - ultimaActividad;

        // Si está en la ventana de 2 minutos de pelea
        if (tiempoSilencio < 120000) {
            await ametralladora(ID_IMITACION, true);
        } else {
            // Reinicia el acoso si vuelve a hablar
            console.log("Objetivo detectado tras silencio. Iniciando ráfaga...");
            await ametralladora(ID_IMITACION, true);
        }
        ultimaActividad = ahora;
    }
});

client.login(TOKEN);
