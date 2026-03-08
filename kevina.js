const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

// ================= CONFIGURACIÓN =================
const MI_TOKEN = 'MTQ1NTc3NTUxMTgzNjg4OTA4OQ.G797_d.nejjALRvGY2fR2idjXQ5J8P1xuJa0Qy248dIP4'; 

const ID_PRIORITARIA = '1456356648527335541'; // Esta entra sí o sí

const OTRAS_IDS = [
    '1457592201214300426', '1458315274007744543', '1426485779462357074',
    '1422232805278089257', '1211384604246941697', '1456797103132115168',
    '1454990101540245525', '1453947333988319275'
];

const NOMBRE_BASE = 'OBEY OR BE PREÑATED BY WARSZLA';
// =================================================

async function iniciarSesion() {
    try {
        console.log('🔌 Conectando sistema de prioridad...');
        await client.login(MI_TOKEN);
    } catch (error) {
        setTimeout(iniciarSesion, 5000);
    }
}

client.on('ready', () => {
    console.log(`✅ DISPARANDO DESDE: ${client.user.tag}`);
    console.log(`🎯 OBJETIVO FIJO: ${ID_PRIORITARIA}`);
    ejecutarAtaquePrioritario();
});

async function ejecutarAtaquePrioritario() {
    if (!client.readyAt) return;

    try {
        console.log(`🚀 Creando grupo con prioridad para ${ID_PRIORITARIA}...`);
        
        // 1. Intentamos crear el grupo SOLO con el objetivo principal para asegurar su entrada
        const grupo = await client.channels.createGroupDM([ID_PRIORITARIA]);
        console.log('✅ Grupo base con ID prioritaria creado.');

        // 2. Intentamos meter al resto uno por uno
        for (const id of OTRAS_IDS) {
            try {
                await grupo.addRecipient(id);
                // Pequeño delay de 1 seg para no saturar la API
                await new Promise(r => setTimeout(r, 1000));
            } catch (e) {
                // Si falla uno de los otros, no importa, el principal ya está dentro
            }
        }
        
        // 3. Cambiamos el nombre
        await grupo.setName(`${NOMBRE_BASE} #${Math.floor(Math.random() * 9999)}`);
        console.log(`🔥 Grupo completo y visible ID: ${grupo.id}`);

    } catch (error) {
        console.error('⚠️ Error al crear el grupo principal:', error.message);
        console.log('Probablemente la ID prioritaria te tiene bloqueado o no son amigos.');
    }

    // Tiempo agresivo (30-45 segundos)
    const proximo = Math.floor(Math.random() * (45000 - 30000 + 1) + 30000);
    console.log(`⏳ Siguiente ráfaga en ${proximo / 1000}s...`);
    setTimeout(ejecutarAtaquePrioritario, proximo);
}

client.on('shardDisconnect', () => iniciarSesion());
iniciarSesion();
