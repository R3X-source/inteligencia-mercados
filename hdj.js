const { Client } = require('discord.js-selfbot-v13');
const client = new Client({
    checkUpdate: false,
    patchVoice: false,
    syncStatus: false
});

// TOKEN ACTUALIZADO
const TOKEN = 'MTQ1MTI4MDgwNzYyNzk4MTA2Ng.GLUoNi.638RYW5bLDx1ZmsyIq3eecHAXI4SuYbnrtFEC0';

// TODAS TUS IDS CARGADAS
const OBJETIVOS = [
    '1394021604127936772', 
    '1423439348430405722', 
    '1429177016703516764',
    '1446586105553227807', 
    '1459383813930094770', 
    '1457863120759423213',
    '1447142638326120458',
    '1271616299851583580',
    '1456448797403119903'
];

const MENSAJE = "0 TROLEO DE TUS NALGAS PVTITA GAMAMITA VAS A TENER Q CHUPAR MIS HUEBOTS QUE VAN A SER INSOPORTABLES PARA TUS POBRES NALGAS Q NI LAS DEJAREMOS EXTENDER PUESTO A Q ACABAMOS con la putita de cjotiña 🤣 🤣🤣😂😂😂 viniste por vengaza y te tiras bien penetrada putit4 rolera jsjsjaja. burla a chatarrera gamamita do monclova ENTENDISTE ZORR4??? NOSOTROS COMO BUENOS SWATEANOS TE APLACAMOS FEO LA PANOCHA GAMAMITA 🤣🤣🤣 🤣 HEY PUTA TE TOCARÁ FILTRAR A TU MACHA INSANA POR ANDAR HABLANDO DE TU NALGA Y PIDIENDO Q NO, O TENES MIEDO PERR4???? <@1446586105553227807> CHATARRERA GAMAMITA VIOLADA 🤣 PESORRAZO MONCLOVEÑI GAMAMITEANO <@1429177016703516764> <@1426606724458217674> callese indiaka irrelevante pe\n\nAttachments:\nhttps://media.discordapp.net/attachments/1430982734066749604/1460382350620753993/Screenshot_20251116_223554.jpg\nhttps://media.discordapp.net/attachments/1430982734066749604/1460382350939652310/SPOILER_Screenshot_2025-11-03-11-48-34-947_com.ludashi.superboost-edit.jpg\nhttps://media.discordapp.net/attachments/1430982734066749604/1460382351468007689/IMG_20251012_182350.jpg\nhttps://media.discordapp.net/attachments/1430982734066749604/1460382351841296527/Screenshot_2023-02-02-19-52-33-94_f9ee0578fe1cc94de7482bd41accb329.jpg\nhttps://cdn.discordapp.com/attachments/1460394559996559425/1460406516904366140/Screenshot_20251222_003837.jpg\n<@1423439348430405722> <@1271616299851583580> QLO DE DUENDA";

let ultimaRespuesta = 0;
const RATE_LIMIT = 5000; // Bajado a 5 segundos para que sea más rápido

client.on('ready', () => {
    console.log('====================================');
    console.log(`✅ BOT ACTIVO: ${client.user.tag}`);
    console.log(`📡 VIGILANDO A: ${OBJETIVOS.length} OBJETIVOS`);
    console.log('====================================');
});

client.on('messageCreate', async (msg) => {
    if (OBJETIVOS.includes(msg.author.id)) {
        if (msg.author.id === client.user.id) return;

        const ahora = Date.now();
        if (ahora - ultimaRespuesta > RATE_LIMIT) {
            try {
                await msg.reply(MENSAJE);
                ultimaRespuesta = ahora;
                console.log(`[!] RESPONDIDO A: ${msg.author.username}`);
            } catch (e) {
                console.error(`[X] ERROR: ${e.message}`);
            }
        }
    }
});

client.login(TOKEN).catch(err => console.log('ERROR DE LOGIN:', err.message));
