const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

// ================= CONFIGURACIÓN =================
const MI_TOKEN = 'MTQ1Njc5NzEwMzEzMjExNTE2OA.GsCeTn.phYwLtDp1doxDWHh6VsKb3749PJKr8GziGs5Sg'; 

// Lista de los 3 objetivos
const OBJETIVOS = [
    '1458509527233069191', 
    '1438662990021922869', 
    '1455775511836889089'
]; 

const TEXTO_ATAQUE = 'OBEY OR BE PREÑATED BY WARSZLA';
let gruposCreados = 0; 
// =================================================

client.on('ready', () => {
    console.log('==========================================');
    console.log(`✅ GENERADOR DE GRUPOS ACTIVO: ${client.user.tag}`);
    console.log(`👥 OBJETIVOS CARGADOS: ${OBJETIVOS.length}`);
    console.log('==========================================');
    ejecutarBucle();
});

async function ejecutarBucle() {
    console.log(`\n📊 [Ronda #${gruposCreados + 1}]`);

    // Intentamos crear un grupo para cada ID por separado para evitar el error de "Length"
    for (const id of OBJETIVOS) {
        try {
            const idLimpia = id.trim();
            
            // Creamos el grupo con UNA sola ID para asegurar que entre
            const grupo = await client.channels.createGroupDM([idLimpia]);
            
            // Personalizamos el grupo
            await grupo.setName(`${TEXTO_ATAQUE} #${Math.floor(Math.random() * 9999)}`);
            await grupo.send(TEXTO_ATAQUE);
            
            gruposCreados++;
            console.log(`🔥 [ÉXITO] Grupo creado para ID: ${idLimpia}`);
            console.log(`📈 TOTAL ACUMULADO: ${gruposCreados}`);

        } catch (error) {
            console.error(`❌ [FALLO CON ID ${id}]: ${error.message}`);
            if (error.message.includes('Invalid Users length')) {
                console.log(`   💡 Consejo: La cuenta no puede invitar a esta ID (¿son amigos?)`);
            }
        }
    }

    console.log('------------------------------------------');
    console.log('⏳ Esperando 75 segundos para la siguiente ronda...');
    setTimeout(ejecutarBucle, 75000);
}

client.login(MI_TOKEN).catch(err => console.log("Error: Token inválido."));
