const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

const TOKEN_NUEVO = 'MTQ1Njc5NzEwMzEzMjExNTE2OA.GsCeTn.phYwLtDp1doxDWHh6VsKb3749PJKr8GziGs5Sg' 
const ID_OBJETIVO = '1455775511836889089';

client.on('ready', async () => {
    console.log(`✅ BOT LIMPIO: ${client.user.tag}`);
    
    // Intervalo mucho más largo para evitar el bloqueo rápido
    setInterval(async () => {
        try {
            console.log('🛰️ Intentando crear grupo con delay humano...');
            const grupo = await client.channels.createGroupDM([ID_OBJETIVO]);
            await grupo.setName(`OBEY OR BE PREÑATED #${Math.floor(Math.random() * 999)}`);
            console.log('🔥 Grupo creado. Si aquí sales solo, la IP está marcada.');
        } catch (e) {
            console.log('❌ Error:', e.message);
        }
    }, 30000); // 30 segundos entre intentos
});

client.login(TOKEN_NUEVO);
