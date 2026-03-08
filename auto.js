const { Client } = require('discord.js-selfbot-v13');
const client = new Client({
    checkUpdate: false, // Evita distracciones por actualizaciones
});

// --- CONFIGURACIÓN ---
const MI_TOKEN = 'MTQ1NTc3NTUxMTgzNjg4OTA4OQ.GtT0l1.jsMDgDMby4TQ6e0pmUVwEt9b0RQbH3jAjWv0JY';
const ID_USUARIO_OBJETIVO = '1458315274007744543'; 
const MENSAJE_DE_RESPUESTA = '0 TROLEO DE TUS NALGAS PVTITA GAMAMITA VAS A TENER Q CHUPAR MIS HUEBOTS QUE VAN A SER INSOPORTABLES PARA TUS POBRES NALGAS Q NI LAS DEJAREMOS EXTENDER PUESTO A Q ACABAMOS CON LA PUTITA DE CJOTIÑA 🤣🤣🤣😂😂😂 VINISTE POR VENGAZA Y TE TIRAS BIEN PENETRADA PUTIT4 ROLERA JSJSJAJA. BURLA A CHATARRERA GAMAMITA DO MONCLOVA https://cdn.discordapp.com/attachments/1460311116528750602/1460313252834840676/SPOILER_Screenshot_2025-11-03-11-48-34-947_com.ludashi.superboost-edit.jpg?ex=69667632&is=696524b2&hm=c6c649f46e6ad5f31f5935e9600e24763d514f4d1d97a794a14e5a7d0cc738fe& https://cdn.discordapp.com/attachments/1460311116528750602/1460313253392548118/Screenshot_20251116_223323.jpg?ex=69667632&is=696524b2&hm=b49acc1e01fba7857ac925729ae74f979f2d0049ad448db855509cccc14c9f44& https://cdn.discordapp.com/attachments/1460311116528750602/1460313784349622375/IMG_20260112_002524_810.jpg?ex=696676b1&is=69652531&hm=9c12cfb4faa743b70f969b747f1ce0486a677cdf166c1245bf82dc69a089ddae& https://youtu.be/L4Rm6ofojoA ENTENDISTE ZORR4??? NOSOTROS COMO BUENOS SWATEANOS TE APLACAMOS FEO LA PANOCHA GAMAMITA 🤣🤣🤣🤣 HEY PUTA TE TOCARÁ FILTRAR A TU MACHA INSANA POR ANDAR HABLANDO DE TU NALGA Y PIDIENDO Q NO, O TENES MIEDO PERR4???? https://cdn.discordapp.com/attachments/1460311116528750602/1460315299084632064/Screenshot_20251222_003837.jpg?ex=6966781a&is=6965269a&hm=2ceecd629b6d454e5d0441b66be4ad0a5befe553c2933ff6aa2b2c5ef6513cdf& <@1446586105553227807> CHATARRERA GAMAMITA VIOLADA 🤣 PESORRAZO MONCLOVEÑI GAMAMITEANO';
const SEGUNDOS_ESPERA = 5; 

// Variable para controlar el tiempo
let ultimoMensajeTime = 0;

client.on('ready', () => {
    console.log(`Bot activo en: ${client.user.tag}`);
    console.log('Esperando mensajes...');
});

client.on('messageCreate', async (message) => {
    // 1. Verifica si el mensaje es de la persona correcta
    if (message.author.id !== ID_USUARIO_OBJETIVO) return;
    
    // 2. Verifica que no sea nuestro propio mensaje
    if (message.author.id === client.user.id) return;

    const ahora = Date.now();
    const tiempoTranscurrido = (ahora - ultimoMensajeTime) / 1000;

    // 3. Solo responde si pasaron más de 5 segundos
    if (tiempoTranscurrido > SEGUNDOS_ESPERA) {
        try {
            await message.channel.sendTyping(); // Simula que estás escribiendo
            setTimeout(async () => {
                await message.reply(MENSAJE_DE_RESPUESTA);
                ultimoMensajeTime = Date.now();
                console.log(`Respuesta enviada a las ${new Date().toLocaleTimeString()}`);
            }, 1000); // Pequeña pausa de 1 segundo de "escritura"
        } catch (error) {
            console.error('Error al responder:', error);
        }
    } else {
        console.log(`Mensaje ignorado (cooldown): faltan ${SEGUNDOS_ESPERA - tiempoTranscurrido}s`);
    }
});

// --- RECONEXIÓN AUTOMÁTICA ---
client.on('disconnect', () => {
    console.log('El bot se desconectó. Intentando reconectar...');
    client.login(MI_TOKEN);
});

client.on('error', (err) => {
    console.error('Error de conexión:', err);
    // Intenta reconectar después de 5 segundos si hay un error grave
    setTimeout(() => client.login(MI_TOKEN), 5000);
});

client.login(MI_TOKEN);
