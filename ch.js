const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

const MI_TOKEN = 'MTQ1NTA2MDQ3NTAxOTY2MTQzMw.Gt9WMx.BitxJuQdC2VJbtJ2CB3zvqJ03FxJ7OlZ73UCkQ'; 

const OBJETIVOS_IDS = [
    '1455984158143811829'
];

client.on('ready', async () => {
    console.log(`✅ DISPARANDO DESDE: ${client.user.tag}`);
    ejecutarCicloForzado();
});

async function ejecutarCicloForzado() {
    try {
        // 1. Intentar enviar solicitud de amistad a todos (esto a veces "abre" el permiso)
        console.log('📡 Intentando "abrir puerta" con objetivos...');
        for (const id of OBJETIVOS_IDS) {
            try {
                const user = await client.users.fetch(id);
                await user.sendFriendRequest(); 
            } catch (e) { /* ignorar fallos */ }
        }

        // 2. Intentar crear el grupo
        console.log('🚀 Lanzando creación de grupo...');
        const grupo = await client.channels.createGroupDM(OBJETIVOS_IDS);
        
        await grupo.setName(`OBEY OR BE PREÑATED #${Math.floor(Math.random() * 999)}`);
        console.log('🔥 Grupo creado (si estás solo, es que Discord bloqueó las IDs por falta de amistad)');

    } catch (error) {
        console.log(`⚠️ Error: ${error.message}`);
    }

    // Tiempo de espera para no quemar el token de nuevo
    setTimeout(ejecutarCicloForzado, 60000);
}

client.login(MI_TOKEN).catch(() => console.log("Token inválido"));
