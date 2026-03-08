const { Client } = require('discord.js-selfbot-v13');

// CONFIGURACIÓN DE INTENTS (Esto es lo que permite que funcione en Servidores)
const client = new Client({
    checkUpdate: false,
    intents: [
        'GUILDS',
        'GUILD_MESSAGES',
        'DIRECT_MESSAGES'
    ]
});

const MI_TOKEN = 'MTQ1NTc3NTUxMTgzNjg4OTA4OQ.GtT0l1.jsMDgDMby4TQ6e0pmUVwEt9b0RQbH3jAjWv0JY';
const ID_USUARIO_OBJETIVO = '1458315274007744543';
const MENSAJE_DE_RESPUESTA = '0 TROLEO DE TUS NALGAS PVTITA GAMAMITA VAS A TENER Q CHUPAR MIS HUEBOTS QUE VAN A SER INSOPORTABLES PARA TUS POBRES NALGAS Q NI LAS DEJAREMOS EXTENDER PUESTO A Q ACABAMOS CON LA PUTITA DE CJOTIÑA 🤣🤣🤣😂😂😂 VINISTE POR VENGAZA Y TE TIRAS BIEN PENETRADA PUTIT4 ROLERA JSJSJAJA. BURLA A CHATARRERA GAMAMITA DO MONCLOVA https://cdn.discordapp.com/attachments/1460311116528750602/1460313252834840676/SPOILER_Screenshot_2025-11-03-11-48-34-947_com.ludashi.superboost-edit.jpg?ex=69667632&is=696524b2&hm=c6c649f46e6ad5f31f5935e9600e24763d514f4d1d97a794a14e5a7d0cc738fe& https://cdn.discordapp.com/attachments/1460311116528750602/1460313253392548118/Screenshot_20251116_223323.jpg?ex=69667632&is=696524b2&hm=b49acc1e01fba7857ac925729ae74f979f2d0049ad448db855509cccc14c9f44& https://cdn.discordapp.com/attachments/1460311116528750602/1460313784349622375/IMG_20260112_002524_810.jpg?ex=696676b1&is=69652531&hm=9c12cfb4faa743b70f969b747f1ce0486a677cdf166c1245bf82dc69a089ddae& https://youtu.be/L4Rm6ofojoA ENTENDISTE ZORR4??? NOSOTROS COMO BUENOS SWATEANOS TE APLACAMOS FEO LA PANOCHA GAMAMITA 🤣🤣🤣🤣 HEY PUTA TE TOCARÁ FILTRAR A TU MACHA INSANA POR ANDAR HABLANDO DE TU NALGA Y PIDIENDO Q NO, O TENES MIEDO PERR4???? https://cdn.discordapp.com/attachments/1460311116528750602/1460315299084632064/Screenshot_20251222_003837.jpg?ex=6966781a&is=6965269a&hm=2ceecd629b6d454e5d0441b66be4ad0a5befe553c2933ff6aa2b2c5ef6513cdf& <@1446586105553227807> CHATARRERA GAMAMITA VIOLADA 🤣 PESORRAZO MONCLOVEÑI GAMAMITEANO';

let ultimoMensajeTime = 0;

client.on('ready', () => {
    console.log(`[!] Bot conectado como: ${client.user.tag}`);
    console.log(`[!] Escuchando a la ID: ${ID_USUARIO_OBJETIVO}`);
});

client.on('messageCreate', async (message) => {
    // Si el mensaje NO es de la ID objetivo, ignorar
    if (message.author.id !== ID_USUARIO_OBJETIVO) return;
    
    // IMPORTANTE: Para probarlo tú mismo, asegúrate de que ID_USUARIO_OBJETIVO sea TU ID.
    // Si quieres que responda a otros pero no a ti, deja la ID de la otra persona.

    const ahora = Date.now();
    if (ahora - ultimoMensajeTime > 5000) { // 5000ms = 5 segundos
        try {
            // .send es más efectivo en servidores
            await message.channel.send(MENSAJE_DE_RESPUESTA);
            ultimoMensajeTime = Date.now();
            console.log(`Respuesta enviada en ${message.guild ? 'Servidor: ' + message.guild.name : 'DM'}`);
        } catch (err) {
            console.log("Error al enviar (posibles falta de permisos en el server):", err.message);
        }
    }
});

// RECONEXIÓN AUTOMÁTICA
client.on('error', (err) => {
    console.log("Error de conexión, intentando reconectar en 5s...");
    setTimeout(() => client.login(MI_TOKEN).catch(() => {}), 5000);
});

client.login(MI_TOKEN).catch(err => console.error("Token inválido o error de login:", err));
