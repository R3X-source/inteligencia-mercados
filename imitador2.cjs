const { Client } = require('discord.js-selfbot-v13');
// checkUpdate: false ayuda a que inicie más rápido en Termux
const client = new Client({ checkUpdate: false });

// --- CONFIGURACIÓN ---
const TOKEN = "MTQ1NDE4ODUzMjM4MDczMzQ3MA.Gl56gU.Ev1-6S40p7QMgxb66jm6DUY8RPwuOLeNMF3Mts";
const MI_PROPIA_ID = "1454188532380733470"; 
const IDS_OBJETIVO = ["1386330375952793723", "1467397075204309034", "1446586105553227807", "1476167379481395222", 
"1477357169908387840"];

const FILTRO_INSULTOS = ["nalga", "perra", "pedorro", "cule", "puta", "mami", "hija", "clavo", "aguion", "aceitada", "hedionda", "foll", "mierda", "basura", "estupida", "cringe"];
let memoriaEstilo = ["NALGOTANGA", "SOY TU TÍO EL Q COMPARTE TU ANISERU PU", "GANÓ TU ANLG4 SEBTONEANDO PENMARRANA", "SENTONESTE AL EDUATDO SHE", "TE HUELE LA BAJINA A ATÚN SHE", "Q CULITO DE ARJENTA SHE", "POS TE VEO EL ANUTE", "NO POS TE CLAVO EL AGUION", "SHAKITAM BI", "CEJOTIÑA"];
let ultimaActividad = Date.now();

// --- SISTEMA INMORTAL Y AUTO-RECONEXIÓN ---
process.on('unhandledRejection', error => { console.log('Error de red/Discord ignorado.'); });
process.on('uncaughtException', error => { console.log('Excepción crítica ignorada.'); });

// Si el bot se desconecta, intentará loguearse de nuevo cada 10 segundos
client.on('shardDisconnect', () => {
    console.log('Internet caído o desconexión de Discord. Reintentando en 10s...');
    setTimeout(() => { client.login(TOKEN).catch(() => {}); }, 10000);
});

client.on('ready', () => console.log(`CLON INMORTAL Y AUTO-RECONECTABLE: ${client.user.tag}`));

client.on('messageCreate', async (message) => {
    if (message.author.id === client.user.id) return;
    const ahora = Date.now();

    if (IDS_OBJETIVO.includes(message.author.id)) {
        // Tu regla de 0.1s
        await new Promise(r => setTimeout(r, 15000));

        const dispararRafaga = async () => {
            for (let i = 0; i < 3; i++) {
                const frasesPesadas = memoriaEstilo.filter(f => f.length > 15);
                const insultoClon = frasesPesadas[Math.floor(Math.random() * frasesPesadas.length)];
                
                // El .catch evita que el error de permisos (50013) mate el proceso
                await message.channel.send(`<@${message.author.id}> ${insultoClon}`).catch(() => {});
                await new Promise(r => setTimeout(r, 600));
            }
        };

        // Ráfaga de 2 minutos continua
        if (ahora - ultimaActividad < 120000 || ultimaActividad === 0) {
            await dispararRafaga();
        } else {
            console.log("Reiniciando masacre tras silencio.");
            await dispararRafaga();
        }
        ultimaActividad = ahora;
    }

    // Aprendizaje de tu estilo (solo insultos pesados)
    if (message.author.id === MI_PROPIA_ID && FILTRO_INSULTOS.some(p => message.content.toLowerCase().includes(p)) && message.content.length > 15) {
        if (!memoriaEstilo.includes(message.content)) {
            memoriaEstilo.push(message.content);
            console.log("Nueva frase pesada aprendida.");
        }
    }
});

// Inicio de sesión inicial con catch para fallos de red al arrancar
client.login(TOKEN).catch(err => {
    console.log("Error al iniciar sesión. Reintentando en 15s...");
    setTimeout(() => { client.login(TOKEN).catch(() => {}); }, 15000);
});
