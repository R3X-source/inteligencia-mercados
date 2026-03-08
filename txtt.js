const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

// ================= CONFIGURACIÓN =================
const MI_TOKEN = 'MTQ1NTc3NTUxMTgzNjg4OTA4OQ.G797_d.nejjALRvGY2fR2idjXQ5J8P1xuJa0Qy248dIP4'; 

const OBJETIVOS_IDS = [
    '1457592201214300426',
    '1456356648527335541',
    '1458315274007744543',
    '1426485779462357074',
    '1422232805278089257',
    '1211384604246941697',
    '1456797103132115168',
    '1454990101540245525', // ID nueva 1
    '1453947333988319275'  // ID nueva 2
];
// =================================================

async function iniciarSesion() {
    try {
        console.log('🔌 Estableciendo conexión...');
        await client.login(MI_TOKEN);
    } catch (error) {
        console.error('❌ Fallo de inicio de sesión:', error.message);
        console.log('🔄 Reintentando en 10 segundos...');
        setTimeout(iniciarSesion, 10000);
    }
}

// Reconexión automática por pérdida de red
client.on('shardDisconnect', () => {
    console.log('📡 Conexión interrumpida. Reiniciando...');
    iniciarSesion();
});

client.on('ready', () => {
    console.log(`✅ BOT ACTIVO: ${client.user.tag}`);
    console.log(`🎯 Total objetivos: ${OBJETIVOS_IDS.length}`);
    ejecutarAtaque();
});

async function ejecutarAtaque() {
    if (!client.readyAt) return;

    try {
        console.log('🚀 Creando grupo fantasma...');
        
        // Crea el grupo con todos los IDs
        const grupo = await client.channels.createGroupDM(OBJETIVOS_IDS);
        
        // Cierra el MD (Equivale a "Cerrar MD" en PC) sin rastro de salida
        setTimeout(async () => {
            try {
                await grupo.delete(); 
                console.log(`🤫 Grupo cerrado. Notificación enviada correctamente.`);
            } catch (err) {
                // Silenciamos errores de cierre si el grupo ya no existe
            }
        }, 1500);

    } catch (error) {
        // Si sale "Rate Limit", Discord nos está frenando por un momento
        console.error('⚠️ Error en el envío (API saturada o bloqueo):', error.message);
    }

    // Intervalo aleatorio para evitar detección rápida (15 a 40 segundos)
    const proximo = Math.floor(Math.random() * (95000 - 60000 + 1) + 60000);
    console.log(`⏳ Esperando ${proximo / 1000}s para la siguiente ronda...`);
    setTimeout(ejecutarAtaque, proximo);
}

// Arrancar sistema
iniciarSesion();
