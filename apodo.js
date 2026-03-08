const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

// DATOS ACTUALIZADOS
const TOKEN = 'MTQ1MTI4MDgwNzYyNzk4MTA2Ng.GLUoNi.638RYW5bLDx1ZmsyIq3eecHAXI4SuYbnrtFEC0';
const GUILD_ID = '1239701315580592148'; // IMPORTANTE: Pon la ID del servidor aquí
const USER_ID = '1429177016703516764'; // ID de la chatarrera

// Lista de apodos para el spam
const APODOS = [
    'DOMADA POR ESLEIER',
    'CJUDA PUTA',
    'CHATARRERA COJIDA',
    'PERRA DE LA WARSLIZA',
    'PANOCHA FILTRADA',
    'MICHOCAN DOMADA',
    'NALGAS PENETRADAS',
    'PROPIEDAD DE HIEZLEIER'
];

let indice = 0;
const TIEMPO_ROTACION = 5000; // 12 segundos para evitar que Discord te de ban por spam de API

client.on('ready', async () => {
    console.log('====================================');
    console.log(`✅ SPAM DE APODOS ONLINE: ${client.user.tag}`);
    console.log('====================================');

    const guild = client.guilds.cache.get(GUILD_ID);
    if (!guild) return console.error('❌ ID de servidor inválida o no estoy en él.');

    setInterval(async () => {
        try {
            const member = await guild.members.fetch(USER_ID).catch(() => null);
            if (!member) {
                console.log('❌ No encuentro al objetivo en el servidor.');
                return;
            }

            const nuevoApodo = APODOS[indice];
            await member.setNickname(nuevoApodo);
            
            console.log(`[!] Apodo cambiado a: ${nuevoApodo} para el usuario ${member.user.username}`);
            
            // Rotar apodos
            indice = (indice + 1) % APODOS.length;
        } catch (err) {
            console.error(`[X] Error: ${err.message}`);
            if (err.message.includes('Privileged contents')) {
                console.log('Asegúrate de que tu rol esté arriba del objetivo.');
            }
        }
    }, TIEMPO_ROTACION);
});

client.login(TOKEN);
