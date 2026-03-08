const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

// --- TUS DATOS EXACTOS ---
const TOKEN = 'MTQ1MTI4MDgwNzYyNzk4MTA2Ng.GOLr4c.esdKRT4itXn3qwXjswh9q2EoPn1vCGBYfRVvmM';

const OBJETIVOS = [
    '1394021604127936772', '1423439348430405722', '1429177016703516764',
    '1446586105553227807', '1459383813930094770', '1457863120759423213',
    '1456448797403119903', '1158183553130057758', '1438662990021922869',
    '1455444386421674007'
];

const ID_USUARIA_SIN_PING = '1310098567590969405';

const MENSAJE_GENERAL = `0 TROLEO DE TUS NALGAS PVTITA GAMAMITA VAS A TENER Q CHUPAR MIS HUEBOTS QUE VAN A SER INSOPORTABLES PARA TUS POBRES NALGAS Q NI LAS DEJAREMOS EXTENDER PUESTO A Q ACABAMOS con la putita de cjotiña 🤣 🤣🤣😂😂😂 viniste por vengaza y te tiras bien penetrada putit4 rolera jsjsjaja. burla a chatarrera gamamita do monclova ENTENDISTE ZORR4??? NOSOTROS COMO BUENOS SWATEANOS TE APLACAMOS FEO LA PANOCHA GAMAMITA 🤣🤣🤣 🤣 HEY PUTA TE TOCARÁ FILTRAR A TU MACHA INSANA POR ANDAR HABLANDO DE TU NALGA Y PIDIENDO Q NO, O TENES MIEDO PERR4???? <@1446586105553227807> CHATARRERA GAMAMITA VIOLADA 🤣 PESORRAZO MONCLOVEÑI GAMAMITEANO <@1429177016703516764> <@1426606724458217674> callese indiaka irrelevante pe Attachments: https://media.discordapp.net/attachments/1430982734066749604/1460382350620753993/Screenshot_20251116_223554.jpg https://media.discordapp.net/attachments/1430982734066749604/1460382350939652310/SPOILER_Screenshot_2025-11-03-11-48-34-947_com.ludashi.superboost-edit.jpg https://media.discordapp.net/attachments/1430982734066749604/1460382351468007689/IMG_20251012_182350.jpg https://media.discordapp.net/attachments/1430982734066749604/1460382351841296527/Screenshot_2023-02-02-19-52-33-94_f9ee0578fe1cc94de7482bd41accb329.jpg https://cdn.discordapp.com/attachments/1460394559996559425/1460406516904366140/Screenshot_20251222_003837.jpg <@1423439348430405722> <@1271616299851583580> QLO DE DUENDA <@1438662990021922869> TRANQUILA MAMITA, DSNILEA YA LLEVA SEMSNAS CALLAFA CONTRA MI PENE Y EN ESTE KISMO SV SE VE OEOR TUS NALGSS FUEORN CILAPSADAS POR MAS DE 850 DE MDS🤣😂 <@1455444386421674007> cierra la naoga trul`;

const MENSAJE_PERSONALIZADO_ELLA = "Neko fuck <@1384340161625591880> FUCKING PUSSY PO";

// --- CONTROL DE LÓGICA ---
let ultimaVezActiva = Date.now();
let yaCerroConversacion = true;
let canalActual = null;
let ultimoContenido = "";
let contadorIguales = 0;

client.on('ready', () => {
    console.log('====================================');
    console.log(`✅ AUTO-RESPONDEDOR ELITE READY: ${client.user.tag}`);
    console.log('====================================');
    setInterval(chequearSilencio, 10000); // Revisa cada 10 seg
});

async function chequearSilencio() {
    const ahora = Date.now();
    // Si ella se calla por 2 minutos (120000ms) y la pelea estaba activa
    if (ahora - ultimaVezActiva > 120000 && !yaCerroConversacion && canalActual) {
        console.log("🏆 Ella se calló. Mandando los 3 de cierre para ganar...");
        try {
            for (let i = 0; i < 3; i++) {
                await canalActual.send(`${MENSAJE_PERSONALIZADO_ELLA} [GANANDO DISCUSIÓN ${i+1}/3]`);
                await new Promise(r => setTimeout(r, 3000));
            }
            yaCerroConversacion = true;
        } catch (e) { console.error("Error cierre:", e.message); }
    }
}

client.on('messageCreate', async (msg) => {
    if (!OBJETIVOS.includes(msg.author.id) || msg.author.id === client.user.id) return;

    // Detectar si repite mensajes (Spam de 30)
    if (msg.content === ultimoContenido) {
        contadorIguales++;
    } else {
        contadorIguales = 0;
        ultimoContenido = msg.content;
    }

    // Actualizar estado para la "Última Palabra"
    ultimaVezActiva = Date.now();
    yaCerroConversacion = false;
    canalActual = msg.channel;

    // Lógica de respuesta
    let retraso = 1000;
    if (contadorIguales >= 30) {
        // Modo moderado: Responde más lento si ella spamea lo mismo
        retraso = Math.random() * 4000 + 2000;
        console.log(`[!] Modo Moderado: ${msg.author.username} está repitiendo mucho.`);
    }

    setTimeout(async () => {
        try {
            await msg.channel.sendTyping();
            if (msg.author.id === ID_USUARIA_SIN_PING) {
                await msg.channel.send(MENSAJE_PERSONALIZADO_ELLA);
            } else {
                await msg.reply({ content: MENSAJE_GENERAL, allowedMentions: { repliedUser: true } });
            }
            console.log(`✅ Respondido a: ${msg.author.username}`);
        } catch (e) { console.error("Error:", e.message); }
    }, retraso);
});

client.login(TOKEN);
