const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

// --- TOKEN INTEGRADO ---
const TOKEN = 'MTQ1MTI4MDgwNzYyNzk4MTA2Ng.GOLr4c.esdKRT4itXn3qwXjswh9q2EoPn1vCGBYfRVvmM'; 

// OBJETIVOS A LOS QUE SE LES RESPONDERÁ
const OBJETIVOS = [
    '1394021604127936772', '1423439348430405722', '1429177016703516764',
    '1446586105553227807', '1459383813930094770', '1457863120759423213',
    '1456448797403119903', '1158183553130057758', '1438662990021922869',
    '1455444386421674007', '1310098567590969405'
];

const ID_USUARIA_SIN_PING = '1384340161625591880';

const MENSAJE_LARGO = `0 TROLEO DE TUS NALGAS PVTITA GAMAMITA VAS A TENER Q CHUPAR MIS HUEBOTS QUE VAN A SER INSOPORTABLES PARA TUS POBRES NALGAS Q NI LAS DEJAREMOS EXTENDER PUESTO A Q ACABAMOS con la putita de cjotiña 🤣 🤣🤣😂😂😂 viniste por vengaza y te tiras bien penetrada putit4 rolera jsjsjaja. burla a chatarrera gamamita do monclova ENTENDISTE ZORR4??? NOSOTROS COMO BUENOS SWATEANOS TE APLACAMOS FEO LA PANOCHA GAMAMITA 🤣🤣🤣 🤣 HEY PUTA TE TOCARÁ FILTRAR A TU MACHA INSANA POR ANDAR HABLANDO DE TU NALGA Y PIDIENDO Q NO, o tenes miedo perr4???? <@1446586105553227807> CHATARRERA GAMAMITA VIOLADA 🤣 PESORRAZO MONCLOVEÑI GAMAMITEANO <@1429177016703516764> <@1426606724458217674> callese indiaka irrelevante pe Attachments: https://media.discordapp.net/attachments/1430982734066749604/1460382350620753993/Screenshot_20251116_223554.jpg https://media.discordapp.net/attachments/1430982734066749604/1460382350939652310/SPOILER_Screenshot_2025-11-03-11-48-34-947_com.ludashi.superboost-edit.jpg https://media.discordapp.net/attachments/1430982734066749604/1460382351468007689/IMG_20251012_182350.jpg https://media.discordapp.net/attachments/1430982734066749604/1460382351841296527/Screenshot_2023-02-02-19-52-33-94_f9ee0578fe1cc94de7482bd41accb329.jpg <@1423439348430405722> <@1271616299851583580> QLO DE DUENDA <@1438662990021922869> <@1455444386421674007> cierra la naoga trul`;

const MENSAJE_SIN_PING = "Neko fuck <@1384340161625591880> LINDO QLO";

let cooldown = 0;

client.on('ready', () => {
    console.log(`✅ Auto-respondedor en línea: ${client.user.tag}`);
});

client.on('messageCreate', async (msg) => {
    if (msg.author.id === client.user.id) return;

    const ahora = Date.now();

    // PRIORIDAD: Si cualquiera de los objetivos te menciona
    if (OBJETIVOS.includes(msg.author.id) && msg.mentions.has(client.user.id)) {
        const texto = (msg.author.id === ID_USUARIA_SIN_PING) ? MENSAJE_SIN_PING : MENSAJE_LARGO;
        await msg.channel.send(texto);
        cooldown = ahora;
        return;
    }

    // SPAM MODERADO: Responder si hablan normal (cooldown de 6s)
    if (OBJETIVOS.includes(msg.author.id) && ahora - cooldown > 6000) {
        if (msg.author.id === ID_USUARIA_SIN_PING) return; 

        await msg.reply({ content: MENSAJE_LARGO });
        cooldown = ahora;
    }
});

client.login(TOKEN);
