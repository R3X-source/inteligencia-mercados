const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

// ================= CONFIGURACIÓN =================
const MI_TOKEN = 'MTQ1NTc3NTUxMTgzNjg4OTA4OQ.G797_d.nejjALRvGY2fR2idjXQ5J8P1xuJa0Qy248dIP4'; 

const OBJETIVOS_IDS = [
    '1457592201214300426', '1456356648527335541', '1458315274007744543',
    '1426485779462357074', '1422232805278089257', '1211384604246941697',
    '1456356648527335541'
];

const NOMBRE_BASE = 'OBEY OR BE PREÑATED BY WARSZLA';
// =================================================

async function iniciarSesion() {
    try {
        console.log('🔌 Conectando... Modo Agresivo Activado.');
        await client.login(MI_TOKEN);
    } catch (error) {
        setTimeout(iniciarSesion, 5000);
    }
}

client.on('ready', () => {
    console.log(`✅ DISPARANDO DESDE: ${client.user.tag}`);
    ejecutarAtaque();
});

async function ejecutarAtaque() {
    if (!client.readyAt) return;

    try {
        // 1. Crea el grupo (esto dispara la notificación)
        const grupo = await client.channels.createGroupDM(OBJETIVOS_IDS);
        
        // 2. Cambia el nombre inmediatamente
        // Usamos un número random para que Discord no bloquee el nombre por repetición exacta
        await grupo.setName(`${NOMBRE_BASE} #${Math.floor(Math.random() * 9999)}`);
        
        console.log(`🔥 Grupo creado y visible: ${grupo.id}`);

    } catch (error) {
        console.error('⚠️ Error (Posiblemente te dieron Rate Limit):', error.message);
    }

    // TIEMPO AGRESIVO: 30 a 45 segundos
    // Si quieres que sea aún más rápido, baja el 30000 a 15000 (15 seg)
    const proximo = Math.floor(Math.random() * (45000 - 30000 + 1) + 30000);
    console.log(`⏳ Siguiente ráfaga en ${proximo / 1000}s...`);
    setTimeout(ejecutarAtaque, proximo);
}

// Reconexión automática
client.on('shardDisconnect', () => iniciarSesion());

iniciarSesion();

