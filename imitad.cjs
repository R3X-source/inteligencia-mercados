const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

// --- CONFIGURACIÓN ---
const TOKEN = "MTQ1NDE4ODUzMjM4MDczMzQ3MA.Gl56gU.Ev1-6S40p7QMgxb66jm6DUY8RPwuOLeNMF3Mts";
const MI_PROPIA_ID = "1454188532380733470"; 

const IDS_OBJETIVO = [
    "1386330375952793723",
    "1467397075204309034",
    "1446586105553227807",
    "1476167379481395222",
    "1477357169908387840"
];

// Diccionario de "Veneno": Solo aprenderá frases que contengan algo de esto
const FILTRO_INSULTOS = [
    "nalga", "perra", "pedorro", "culo", "puta", "mami", "hija", "clavo", "aguion", 
    "aceitada", "hedionda", "foll", "mierda", "basura", "estupida", "cringe"
];

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

// Función para validar si el mensaje es un insulto real según tu estilo
const esInsultoReal = (texto) => {
    const contenido = texto.toLowerCase();
    return FILTRO_INSULTOS.some(palabra => contenido.includes(palabra)) && texto.length > 15;
};

client.on('ready', async () => {
    console.log(`CLON AGRESIVO ACTIVO: ${client.user.tag}`);
    
    const canales = client.channels.cache.filter(c => c.type === 'GUILD_TEXT');
    for (const [id, canal] of canales) {
        try {
            const mensajes = await canal.messages.fetch({ limit: 100 });
            // SOLO aprende si pasa el filtro de insultos pesados
            const tusInsultos = mensajes.filter(m => m.author.id === MI_PROPIA_ID && esInsultoReal(m.content));
            tusInsultos.forEach(m => {
                if (!memoriaEstilo.includes(m.content)) memoriaEstilo.push(m.content);
            });
        } catch (e) { }
    }
    console.log(`Memoria cargada con ${memoriaEstilo.length} insultos filtrados.`);
});

client.on('messageCreate', async (message) => {
    if (message.author.id === client.user.id) return;

    const ahora = Date.now();

    // --- ATAQUE A OBJETIVOS ---
    if (IDS_OBJETIVO.includes(message.author.id)) {
        
        // Regla de 0.1s de espera técnica (ajustado a tu preferencia de velocidad)
        await new Promise(r => setTimeout(r, 100));

        const dispararRafaga = async () => {
            for (let i = 0; i < 3; i++) {
                // Filtramos la memoria para sacar solo lo más pesado
                const frasesPesadas = memoriaEstilo.filter(f => f.length > 20);
                const insultoClon = frasesPesadas[Math.floor(Math.random() * frasesPesadas.length)];

                // Mención limpia solo a la ID del objetivo
                await message.channel.send(`<@${message.author.id}> ${insultoClon}`);
                await new Promise(r => setTimeout(r, 600)); 
            }
        };

        if (ahora - ultimaActividad < 120000 || ultimaActividad === 0) {
            await dispararRafaga();
        } else {
            console.log("Reiniciando masacre tras silencio.");
            await dispararRafaga();
        }

        ultimaActividad = ahora;
    }

    // --- APRENDIZAJE SELECTIVO ---
    // El bot solo absorbe el mensaje si tiene palabras del FILTRO_INSULTOS
    if (message.author.id === MI_PROPIA_ID && esInsultoReal(message.content)) {
        if (!memoriaEstilo.includes(message.content)) {
            memoriaEstilo.push(message.content);
            console.log("Nuevo insulto pesado absorbido.");
        }
    }
});

client.login(TOKEN);
