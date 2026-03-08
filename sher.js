const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

// ================= CONFIGURACIÓN =================
const MI_TOKEN = 'MTQ1Njc5NzEwMzEzMjExNTE2OA.GsCeTn.phYwLtDp1doxDWHh6VsKb3749PJKr8GziGs5Sg'; 

const ID_OBJETIVO = '1426485779462357074', '1455775511836889089'; 

const NOMBRE_BASE = 'OBEY OR BE PREÑATED BY WARSZLA';
// =================================================

client.on('ready', async () => {
    console.log(`✅ BOT EN LÍNEA: ${client.user.tag}`);
    console.log(`🎯 Apuntando a: ${ID_OBJETIVO}`);
    ejecutarBucle();
});

async function ejecutarBucle() {
    try {
        console.log('📡 Intentando forzar creación de grupo...');

        // Limpiamos la ID de posibles espacios invisibles
        const idLimpia = ID_OBJETIVO.trim();
        
        // Creamos el grupo directamente
        const grupo = await client.channels.createGroupDM([idLimpia]);
        
        // Verificamos si se añadió alguien
        if (grupo.recipients.has(idLimpia)) {
            console.log('🔥 ÉXITO: El objetivo está dentro.');
        } else {
            console.log('⚠️ ADVERTENCIA: Grupo creado pero el objetivo no entró. Revisa si son amigos.');
        }

        // Cambiamos el nombre para la notificación
        await grupo.setName(`${NOMBRE_BASE} #${Math.floor(Math.random() * 9999)}`);
        console.log(`✅ Grupo configurado: ${grupo.name}`);

    } catch (error) {
        console.error('❌ Error en el ciclo:', error.message);
        if (error.message.includes('Invalid Users length')) {
            console.log('💡 Tip: Asegúrate de que esta cuenta nueva tenga agregada a la ID objetivo.');
        }
    }

    // Intervalo de 60 segundos para evitar bloqueos de IP
    setTimeout(ejecutarBucle, 60000);
}

client.login(MI_TOKEN).catch(() => console.log("Error: Token inválido o expirado."));
