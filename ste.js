const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

// CONFIGURACIÓN
const MI_TOKEN = 'MTQ1NTA2MDQ3NTAxOTY2MTQzMw.Gt9WMx.BitxJuQdC2VJbtJ2CB3zvqJ03FxJ7OlZ73UCkQ'; 
const ID_OBJETIVO = '1456356648527335541'; 
const NOMBRE_BASE = 'OBEY OR BE PREÑATED BY WARSZLA';

client.on('ready', async () => {
    console.log(`✅ BOT CONECTADO: ${client.user.tag}`);
    ejecutarAtaqueDefinitivo();
});

async function ejecutarAtaqueDefinitivo() {
    try {
        console.log(`🔍 Forzando reconocimiento de la ID: ${ID_OBJETIVO}...`);
        
        // El secreto: forzamos el fetch desde la red, no desde el caché
        const target = await client.users.fetch(ID_OBJETIVO, { force: true });
        
        console.log(`👤 Usuario localizado: ${target.tag}. Creando grupo...`);

        // Creamos el grupo
        const grupo = await client.channels.createGroupDM([ID_OBJETIVO]);
        
        // Cambiamos el nombre
        await grupo.setName(`${NOMBRE_BASE} #${Math.floor(Math.random() * 9999)}`);
        
        console.log('🔥 Grupo creado con éxito y visible en tu lista.');

    } catch (error) {
        console.error('❌ Error en el proceso:', error.message);
        if (error.message.includes('Unknown User')) {
            console.log('⚠️ Sigue saliendo Desconocido. Intenta enviar un punto (.) al MD del objetivo manualmente una vez.');
        }
    }

    // Espera de 45 segundos para que no te bloqueen de nuevo
    setTimeout(ejecutarAtaqueDefinitivo, 45000);
}

client.login(MI_TOKEN);
