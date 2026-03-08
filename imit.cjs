const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

// --- CONFIGURACIÓN DE IDS ---
const TOKEN = "MTQ1NDE4ODUzMjM4MDczMzQ3MA.GF7OH7.xDXkx5CCJCfk7NAENHPC9l3DozrjIfd5NnJago";
const ID_IMITACION = "1454188532380733470"; // A quien copia todo

// Lista de IDs a las que insulta SIEMPRE (Excepción)
const IDS_OBJETIVO = [
    "1386330375952793723", 
    "1467397075204309034",
    "1446586105553227807"
]; 

// --- TU REPERTORIO DEFAULT ---
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

client.on('ready', () => {
    console.log(`Bot encendido en Termux como: ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.id === client.user.id) return;

    const ahora = Date.now();

    // --- LÓGICA DE IDS DE OBJETIVO (Insulto directo) ---
    // Verificamos si la ID del que escribió está en nuestra lista de objetivos
    if (IDS_OBJETIVO.includes(message.author.id)) {
        // Pausa aleatoria (respetando tus notas de 10s)
        await new Promise(r => setTimeout(r, Math.random() * (10000 - 5000) + 5000));
        
        message.channel.sendTyping();
        setTimeout(() => {
            const frase = MIS_FRASES[Math.floor(Math.random() * MIS_FRASES.length)];
            message.channel.send(`<@${message.author.id}> ${frase}`);
        }, 2000);
        
        ultimaActividad = ahora; // Reset contador de silencio
        return; 
    }

    // --- LÓGICA DE ID IMITACIÓN ---
    if (message.author.id === ID_IMITACION) {
        // Espera base de 0.1s
        await new Promise(r => setTimeout(r, 100));

        // Solo actúa si no han pasado más de 2 minutos (120,000 ms)
        const tiempoSilencio = ahora - ultimaActividad;
        
        if (tiempoSilencio < 120000) {
            message.channel.sendTyping();
            
            setTimeout(async () => {
                // Copia el contenido
                let contenido = message.content || "";
                let adjuntos = message.attachments.map(a => a.url);

                // Envía la imitación + insulto
                await message.channel.send({ content: contenido, files: adjuntos });
                
                const frase = MIS_FRASES[Math.floor(Math.random() * MIS_FRASES.length)];
                await message.channel.send(`<@${ID_IMITACION}> ${frase}`);
            }, 3000);

            ultimaActividad = ahora;
        } else {
            console.log("Se calló por más de 2 min. Esperando nuevo mensaje...");
            // Si escribe después del silencio, se reinicia el ciclo
            ultimaActividad = ahora;
        }
    }
});

client.login(TOKEN);
