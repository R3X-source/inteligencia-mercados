const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

// ================= CONFIGURACIÓN =================
const MI_TOKEN = 'MTQ2MDQ5ODYxNzIxODM2NzYxMg.GSm7Zg.4opQtqCb7Bo2vvhqqGkrPJs6BZFogvV7SxzrNc';

// ASEGÚRATE DE QUE ESTAS IDs SEAN LAS QUE QUIERES AHORA
const OBJETIVOS = ['1451280807627981066', '1453947333988319275', '1438662990021922869', '1458314974794616902'];

const TEXTO_ATAQUE = 'https://discord.gg/bQNH6JwY';
let gruposCreados = 0;
// =================================================

client.on('ready', () => {
    console.log('------------------------------------------');
    console.log(`✅ BOT CONECTADO: ${client.user.tag}`);
    console.log(`👥 OBJETIVOS ACTUALES: ${OBJETIVOS.join(', ')}`);
    console.log('------------------------------------------');
    ejecutarBucle();
});

async function ejecutarBucle() {
    // ESTO SE MOSTRARÁ SÍ O SÍ CADA 65 SEGUNDOS
    console.log(`\n📊 [INTENTO #${gruposCreados + 1}] Iniciando proceso...`);

    try {
        const grupo = await client.channels.createGroupDM(OBJETIVOS);

        await grupo.setName(`${TEXTO_ATAQUE} #${Math.floor(Math.random() * 9999)}`);
        await grupo.send(TEXTO_ATAQUE);

        gruposCreados++; // Solo aumenta si el grupo se creó bien

        console.log(`🔥 [ÉXITO] Grupo #${gruposCreados} creado y mensaje enviado.`);

        // Salida automática
        setTimeout(async () => {
            try { await grupo.delete(); console.log(' 🚪 Bot salió del grupo.'); } catch (e) {}
        }, 10000);

    } catch (error) {
        console.error(`❌ [ERROR] No se pudo crear el grupo: ${error.message}`);
    }

    console.log(`📈 ACUMULADO TOTAL: ${gruposCreados} grupos exitosos.`);
    console.log('------------------------------------------');

    setTimeout(ejecutarBucle, 1000);
}

client.login(MI_TOKEN).catch(err => console.log("Token inválido."));
