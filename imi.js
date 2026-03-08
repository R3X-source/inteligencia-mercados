const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

// --- CONFIGURACIÓN DE IDS ---
const TOKEN = "MTQ1NDE4ODUzMjM4MDczMzQ3MA.GF7OH7.xDXkx5CCJCfk7NAENHPC9l3DozrjIfd5NnJago";
const ID_IMITACION = "1454188532380733470"; // A quien copia
const ID_OBJETIVO = "1467397075204309034", "1386330375952793723";  // A quien insulta siempre (Excepción)

// --- REPERTORIO DEFAULT ---
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
    "CEJOTRUÑA",
    "NALGOTANGA"
];

let ultimaActividad = 0;

client.on('ready', () => {
    console.log(`Conectado como ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    // Evitar que el bot se responda a sí mismo
    if (message.author.id === client.user.id) return;

    const ahora = Date.now();

    // --- LÓGICA DE ID OBJETIVO (Excepción: Insulta siempre) ---
    if (message.author.id === ID_OBJETIVO) {
        // Pausa aleatoria de 5 a 10s (tus reglas)
        await new Promise(r => setTimeout(r, Math.random() * (10000 - 5000) + 5000));
        
        message.channel.sendTyping();
        setTimeout(() => {
            const frase = MIS_FRASES[Math.floor(Math.random() * MIS_FRASES.length)];
            message.channel.send(`<@${ID_OBJETIVO}> ${frase}`);
        }, 2000);
        
        ultimaActividad = ahora;
        return;
    }

    // --- LÓGICA DE ID IMITACIÓN ---
    if (message.author.id === ID_IMITACION) {
        // Regla de 0.1s de espera base
        await new Promise(r => setTimeout(r, 100));
        
        // Solo imita si NO han pasado más de 2 minutos de silencio
        // (O si es el primer mensaje)
        if (ultimaActividad === 0 || (ahora - ultimaActividad) < 120000) {
            
            message.channel.sendTyping();
            setTimeout(async () => {
                // Reenvía contenido y archivos
                const files = message.attachments.map(a => a.url);
                await message.channel.send({
                    content: message.content || " ",
                    files: files
                });

                // También le suelta una frase después de imitarlo
                const frase = MIS_FRASES[Math.floor(Math.random() * MIS_FRASES.length)];
                message.channel.send(`<@${ID_IMITACION}> ${frase}`);
            }, 3000);

            ultimaActividad = ahora;
        } else {
            console.log("Han pasado más de 2 minutos. Bot en espera...");
            // Si vuelve a hablar, se reinicia el contador
            ultimaActividad = ahora;
        }
    }
});

client.login(TOKEN);

