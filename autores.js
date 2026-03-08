const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

const TOKEN = 'MTQ1NTc3NTUxMTgzNjg4OTA4OQ.GtT0l1.jsMDgDMby4TQ6e0pmUVwEt9b0RQbH3jAjWv0JY';
const OBJETIVOS = ['1426606724458217674', '1458315274007744543'];

// USAREMOS BACKTICKS ( ` ) PARA EVITAR ERRORES DE LECTURA
const MENSAJE = `0 TROLEO DE TUS NALGAS PVTITA GAMAMITA VAS A TENER Q CHUPAR MIS HUEBOTS QUE VAN A SER INSOPORTABLES PARA TUS POBRES NALGAS Q NI LAS DEJAREMOS EXTENDER PUESTO A Q ACABAMOS con la putita de cjotiña 🤣 🤣🤣😂😂😂 viniste por vengaza y te tiras bien penetrada putit4 rolera jsjsjaja. burla a chatarrera gamamita do monclova

https://youtu.be/L4Rm6ofojoA 

ENTENDISTE ZORR4??? NOSOTROS COMO BUENOS SWATEANOS TE APLACAMOS FEO LA PANOCHA GAMAMITA 🤣🤣🤣🤣 HEY PUTA TE TOCARÁ FILTRAR A TU MACHA INSANA POR ANDAR HABLANDO DE TU NALGA Y PIDIENDO Q NO, O TENES MIEDO PERR4???? 

<@1446586105553227807> CHATARRERA GAMAMITA VIOLADA 🤣 PESORRAZO MONCLOVEÑI GAMAMITEANO <@1429177016703516764> <@1426606724458217674> callese indiaka irrelevante pe 

PRUEBAS:
https://media.discordapp.net/attachments/1430982734066749604/1460382350620753993/Screenshot_20251116_223554.jpg
https://media.discordapp.net/attachments/1430982734066749604/1460382350939652310/SPOILER_Screenshot_2025-11-03-11-48-34-947_com.ludashi.superboost-edit.jpg
https://media.discordapp.net/attachments/1430982734066749604/1460382351468007689/IMG_20251012_182350.jpg
https://media.discordapp.net/attachments/1430982734066749604/1460382351841296527/Screenshot_2023-02-02-19-52-33-94_f9ee0578fe1cc94de7482bd41accb329.jpg`;

let ultimaRespuesta = 0;
const RATE_LIMIT = 5000; 

client.on('ready', () => {
    console.log(`\n✅ SISTEMA ONLINE: ${client.user.tag}`);
    console.log(`📡 Cooldown: 5s | Objetivos: ${OBJETIVOS.length}`);
});

client.on('messageCreate', async (msg) => {
    if (OBJETIVOS.includes(msg.author.id)) {
        if (msg.author.id === client.user.id) return;

        const ahora = Date.now();
        if (ahora - ultimaRespuesta > RATE_LIMIT) {
            try {
                // El reply fuerza la mención y ayuda a que el mensaje no sea ignorado
                await msg.reply({ content: MENSAJE, allowedMentions: { repliedUser: true } });
                ultimaRespuesta = ahora;
                console.log(`[!] Respondido a: ${msg.author.username}`);
            } catch (e) {
                console.log(`[X] Error: ${e.message}`);
                // Si sale error 400 es por los links, si sale 401 es el token
            }
        }
    }
});

client.login(TOKEN);
