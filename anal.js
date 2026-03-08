const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

// ================= CONFIGURACIÓN =================
const MI_TOKEN = 'MTQ1Njc5NzEwMzEzMjExNTE2OA.GsCeTn.phYwLtDp1doxDWHh6VsKb3749PJKr8GziGs5Sg'; 

// Las IDs deben ir dentro de un array []
const OBJETIVOS = ['1426485779462357074', '1438662990021922869']; 

const NOMBRE_BASE = 'OBEY OR BE PREÑATED BY WARSZLA';
// =================================================

client.on('ready', async () => {
    console.log(`✅ BOT EN LÍNEA: ${client.user.tag}`);
    ejecutarBucle();
});

async function ejecutarBucle() {
    try {
        console.log(`📡 Intentando crear grupo con ${OBJETIVOS.length} objetivos...`);

        // Creamos el grupo con el array de IDs
        const grupo = await client.channels.createGroupDM(OBJETIVOS);
        
        // Cambiamos el nombre para que les salte la notificación
        await grupo.setName(`${NOMBRE_BASE} #${Math.floor(Math.random() * 9999)}`);
        
        console.log(`🔥 Grupo creado con éxito: ${grupo.name}`);
        console.log(`👥 Miembros intentados: ${OBJETIVOS.join(', ')}`);

    } catch (error) {
        console.error('❌ Error en el ciclo:', error.message);
        if (error.message.includes('Invalid Users length')) {
            console.log('💡 Tip: Verifica que tengas agregadas estas IDs como amigos.');
        }
    }

    // Intervalo de 60 segundos
    setTimeout(ejecutarBucle, 60000);
}

client.login(MI_TOKEN).catch(() => console.log("Error: Token inválido."));
