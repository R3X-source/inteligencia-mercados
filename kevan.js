const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

// ================= CONFIGURACIÓN =================
const MI_TOKEN = 'MTQ1NTc3NTUxMTgzNjg4OTA4OQ.G797_d.nejjALRvGY2fR2idjXQ5J8P1xuJa0Qy248dIP4'; 

const ID_PRIORITARIA = '1456356648527335541'; 

const OTRAS_IDS = [
    '1457592201214300426', '1458315274007744543', '1426485779462357074',
    '1422232805278089257', '1211384604246941697', '1456797103132115168',
    '1454990101540245525', '1453947333988319275'
];

const NOMBRE_BASE = 'OBEY OR BE PREÑATED BY WARSZLA';
// =================================================

async function iniciarSesion() {
    try {
        await client.login(MI_TOKEN);
    } catch (e) {
        setTimeout(iniciarSesion, 5000);
    }
}

client.on('ready', () => {
    console.log(`✅ DISPARANDO DESDE: ${client.user.tag}`);
    ejecutarAtaqueForzado();
});

async function ejecutarAtaqueForzado() {
    if (!client.readyAt) return;

    try {
        console.log(`📡 Abriendo canal con ${ID_PRIORITARIA}...`);
        
        // Buscamos al usuario prioritario
        const usuario = await client.users.fetch(ID_PRIORITARIA);
        
        // TRUCO: Creamos el grupo enviando las IDs en un array limpio
        // Si no son amigos, este método es el que mejor funciona
        const grupo = await client.channels.createGroupDM([ID_PRIORITARIA, ...OTRAS_IDS.slice(0, 2)]);
        
        console.log('✅ Grupo creado. Intentando forzar al resto...');

        // Cambiamos nombre para que salte la notificación
        await grupo.setName(`${NOMBRE_BASE} #${Math.floor(Math.random() * 999)}`);

        // Intentamos añadir a los que falten por si Discord los filtró al inicio
        for (const id of OTRAS_IDS) {
            try {
                await grupo.addRecipient(id);
                await new Promise(r => setTimeout(r, 800)); // Delay rápido
            } catch (e) { 
                // Ignoramos si fallan los secundarios
            }
        }

        console.log(`🔥 Grupo listo: ${grupo.id}`);

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.log('Si dice "Cannot send messages to this user", es que la ID prioritaria tiene los MD cerrados.');
    }

    // Tiempo rápido para no perder el ritmo
    const proximo = Math.floor(Math.random() * (45000 - 30000 + 1) + 30000);
    setTimeout(ejecutarAtaqueForzado, proximo);
}

client.on('shardDisconnect', () => iniciarSesion());
iniciarSesion();
