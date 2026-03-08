const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

// ================= CONFIGURACIÓN =================
// Volvemos al token de movistarprime_77
const MI_TOKEN = 'MTQ1NTc3NTUxMTgzNjg4OTA4OQ.G797_d.nejjALRvGY2fR2idjXQ5J8P1xuJa0Qy248dIP4'; 

const ID_OBJETIVO = '1456356648527335541'; 

const NOMBRE_BASE = 'OBEY OR BE PREÑATED BY WARSZLA';
// =================================================

async function iniciarSesion() {
    try {
        console.log('🔌 Reintentando con token anterior...');
        await client.login(MI_TOKEN);
    } catch (error) {
        console.error('❌ Error de conexión:', error.message);
        setTimeout(iniciarSesion, 10000);
    }
}

client.on('ready', () => {
    console.log(`✅ CONECTADO COMO: ${client.user.tag}`);
    console.log(`🎯 OBJETIVO: ${ID_OBJETIVO}`);
    ejecutarAtaqueFijo();
});

async function ejecutarAtaqueFijo() {
    if (!client.readyAt) return;

    try {
        console.log(`🚀 Creando grupo para ${ID_OBJETIVO}...`);
        
        // Creamos el grupo con la ID solicitada
        const grupo = await client.channels.createGroupDM([ID_OBJETIVO]);
        
        // Cambiamos el nombre para asegurar la notificación push
        await grupo.setName(`${NOMBRE_BASE} #${Math.floor(Math.random() * 9999)}`);
        
        console.log(`🔥 Grupo creado. Verifica en tu Discord si la persona aparece en la lista.`);

    } catch (error) {
        console.error('⚠️ Fallo en el ciclo:', error.message);
        if (error.message.includes('Unauthorized')) {
            console.log('🔴 Este token también parece haber expirado o la cuenta fue cerrada.');
        }
    }

    // Intervalo de 60 segundos
    setTimeout(ejecutarAtaqueFijo, 60000);
}

client.on('shardDisconnect', () => iniciarSesion());
iniciarSesion();

