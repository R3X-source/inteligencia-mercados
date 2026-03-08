const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

// ================= CONFIGURACIÓN =================
const MI_TOKEN = 'MTQ3OTU1NzUyOTI0MjcwMTg0OQ.Gcutvi.h-CPLC5U_mvtDKDCz8Y9GWXIXMA6rTIhPHkdY8'; 

// ASEGÚRATE DE QUE ESTAS IDs SEAN LAS QUE QUIERES AHORA
const OBJETIVOS = ['1446586105553227807', '1464354934785839155']; 

const TEXTO_ATAQUE = 'https://discord.gg/haqUaQxagH GOLDA O STYA GORDA';
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
            try { await grupo.delete(); console.log('🚪 Bot salió del grupo.'); } catch (e) {}
        }, 10000);

    } catch (error) {
        console.error(`❌ [ERROR] No se pudo crear el grupo: ${error.message}`);
    }

    console.log(`📈 ACUMULADO TOTAL: ${gruposCreados} grupos exitosos.`);
    console.log('------------------------------------------');
    
    setTimeout(ejecutarBucle, 1000);
}

client.login(MI_TOKEN).catch(err => console.log("Token inválido."));
