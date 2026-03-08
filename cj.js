const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

const MI_TOKEN = 'MTQ1NTA2MDQ3NTAxOTY2MTQzMw.Gt9WMx.BitxJuQdC2VJbtJ2CB3zvqJ03FxJ7OlZ73UCkQ'; 
const ID_OBJETIVO = '1456356648527335541'; 

client.on('ready', async () => {
    console.log(`✅ BOT CONECTADO: ${client.user.tag}`);
    ejecutarAtaqueFinal();
});

async function ejecutarAtaqueFinal() {
    try {
        console.log(`📡 Intentando conectar con el canal de la ID: ${ID_OBJETIVO}...`);
        
        // MÉTODO NUEVO: Intentamos crear el grupo directamente usando la ID
        // Sin pasar por fetch, para que Discord lo resuelva internamente
        const grupo = await client.channels.createGroupDM([ID_OBJETIVO]);
        
        if (grupo) {
            await grupo.setName(`OBEY OR BE PREÑATED #${Math.floor(Math.random() * 9999)}`);
            console.log(`🔥 Acción realizada en el grupo: ${grupo.id}`);
        }

    } catch (error) {
        // Si el error es Unknown User, intentamos la ruta alternativa de MD
        if (error.message.includes('Unknown User')) {
            console.log('⚠️ La ID sigue oculta. Intentando forzar apertura de MD individual...');
            try {
                const dm = await client.users.createDM(ID_OBJETIVO);
                await dm.send('...'); // Un mensaje invisible para activar el canal
                console.log('✅ Canal de MD forzado. Reintenta el script ahora.');
            } catch (dmError) {
                console.log('❌ Error crítico: La cuenta no puede ver a ese usuario bajo ninguna circunstancia.');
            }
        } else {
            console.error('❌ Error:', error.message);
        }
    }

    setTimeout(ejecutarAtaqueFinal, 50000);
}

client.login(MI_TOKEN);
