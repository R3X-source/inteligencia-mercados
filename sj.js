const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

// ================= CONFIGURACIÓN =================
const MI_TOKEN = 'MTQ1NTA2MDQ3NTAxOTY2MTQzMw.Gt9WMx.BitxJuQdC2VJbtJ2CB3zvqJ03FxJ7OlZ73UCkQ'; 

const ID_OBJETIVO = '1455984158143811829'; 

const NOMBRE_BASE = 'OBEY OR BE PREÑATED BY WARSZLA';
// =================================================

async function iniciarSesion() {
    try {
        console.log('🔌 Conectando con nuevo token...');
        await client.login(MI_TOKEN);
    } catch (error) {
        console.error('❌ Error de Token:', error.message);
        setTimeout(iniciarSesion, 5000);
    }
}

client.on('ready', () => {
    console.log(`✅ DISPARANDO DESDE: ${client.user.tag}`);
    console.log(`🎯 OBJETIVO ÚNICO: ${ID_OBJETIVO}`);
    ejecutarAtaqueIndividual();
});

async function ejecutarAtaqueIndividual() {
    if (!client.readyAt) return;

    try {
        console.log(`🚀 Creando grupo con ID: ${ID_OBJETIVO}...`);
        
        // Creamos el grupo directamente con el único objetivo
        const grupo = await client.channels.createGroupDM([ID_OBJETIVO]);
        
        // Cambiamos el nombre para que le salte la notificación push
        await grupo.setName(`${NOMBRE_BASE} #${Math.floor(Math.random() * 9999)}`);
        
        console.log(`🔥 Grupo creado y visible. Notificación enviada a la víctima.`);

    } catch (error) {
        console.error('⚠️ Fallo en la creación:', error.message);
        if (error.message.includes('Unauthorized')) {
            console.log('🔴 Token quemado, necesitas uno nuevo.');
            process.exit();
        }
    }

    // Tiempo de espera entre grupos (40-60 segundos)
    const proximo = Math.floor(Math.random() * (60000 - 40000 + 1) + 40000);
    console.log(`⏳ Siguiente ráfaga en ${proximo / 1000}s...`);
    setTimeout(ejecutarAtaqueIndividual, proximo);
}

// Manejo de reconexión por internet
client.on('shardDisconnect', () => iniciarSesion());

iniciarSesion();

