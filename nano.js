const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

// CONFIGURACIÓN (Usa un TOKEN que no hayamos probado hoy si es posible)
const CONFIG = {
    token: 'MTQ1NTA2MDQ3NTAxOTY2MTQzMw.Gt9WMx.BitxJuQdC2VJbtJ2CB3zvqJ03FxJ7OlZ73UCkQ',
    objetivo: '1456356648527335541',
    nombre: 'OBEY OR BE PREÑATED BY WARSZLA',
    espera: 35000 // 35 segundos entre cada grupo
};

client.on('ready', async () => {
    console.log(`🚀 BOT INICIADO: ${client.user.tag}`);
    console.log(`🎯 Foco en: ${CONFIG.objetivo}`);
    bucleAtaque();
});

async function bucleAtaque() {
    try {
        console.log('--- Iniciando nuevo ciclo ---');
        
        // 1. Buscamos al usuario para ver si está disponible
        const target = await client.users.fetch(CONFIG.objetivo);
        
        // 2. Intentamos crear el grupo
        // Ponemos nuestra propia ID y la del objetivo para asegurar el canal
        const grupo = await client.channels.createGroupDM([CONFIG.objetivo]);
        
        if (grupo.recipientIds.includes(CONFIG.objetivo)) {
            console.log('✅ ÉXITO: El objetivo está dentro del grupo.');
            await grupo.setName(`${CONFIG.nombre} #${Math.floor(Math.random() * 999)}`);
        } else {
            console.log('⚠️ ADVERTENCIA: Grupo creado pero estás solo. La cuenta está limitada.');
        }

    } catch (error) {
        console.error('❌ ERROR CRÍTICO:', error.message);
        if (error.message.includes('401: Unauthorized')) {
            console.log('🛑 TOKEN MUERTO. Cambia de cuenta.');
            process.exit();
        }
    }

    console.log(`⏳ Esperando ${CONFIG.espera / 1000}s para no quemar la IP...`);
    setTimeout(bucleAtaque, CONFIG.espera);
}

client.login(CONFIG.token).catch(() => console.log("Token inválido. Revisa las comillas."));
