const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

// ================= CONFIGURACIÓN =================
const MI_TOKEN = 'MTQ1Njc5NzEwMzEzMjExNTE2OA.GsCeTn.phYwLtDp1doxDWHh6VsKb3749PJKr8GziGs5Sg'; 

// PON AQUÍ SOLO LAS IDs QUE QUIERES (Asegúrate de borrar la vieja)
const OBJETIVOS = ['1458509527233069191', '1438662990021922869'];

const TEXTO_ATAQUE = 'OBEY OR BE PREÑATED BY WARSZLA';
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
    console.log(`\n📊 [INTENTO #${gruposCreados + 1}]`);

    try {
        // Creamos el grupo
        const grupo = await client.channels.createGroupDM(OBJETIVOS);
        
        // Configuramos nombre y mensaje
        await grupo.setName(`${TEXTO_ATAQUE} #${Math.floor(Math.random() * 9999)}`);
        await grupo.send(TEXTO_ATAQUE);
        
        gruposCreados++; 
        
        console.log(`🔥 [ÉXITO] Grupo #${gruposCreados} creado.`);
        console.log(`✅ Los objetivos están en el grupo y el bot NO se saldrá.`);

    } catch (error) {
        console.error(`❌ [ERROR]: ${error.message}`);
        if (error.message.includes('Unknown User')) {
            console.log('⚠️ Revisa las IDs, una de ellas no es visible para el bot.');
        }
    }

    console.log(`📈 ACUMULADO TOTAL: ${gruposCreados}`);
    console.log('------------------------------------------');
    
    // Espera de 65 segundos para proteger el token
    setTimeout(ejecutarBucle, 65000);
}

client.login(MI_TOKEN).catch(err => console.log("Token inválido."));
