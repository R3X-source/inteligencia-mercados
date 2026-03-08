const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ 
    checkUpdate: false,
    patchVoice: false,
    syncStatus: false // No sincroniza estado para evitar patrones de bot
});

// TOKEN ACTUALIZADO
const TOKEN = 'MTQ1MTI4MDgwNzYyNzk4MTA2Ng.GlAkwm.r-2gYaYSjUv0dXqwZsEtaWfAP7I7zOeHfi0e6M';

// IDS DE OBJETIVOS
const OBJETIVOS = [
    '1394021604127936772', '1423439348430405722', '1429177016703516764',
    '1446586105553227807', '1459383813930094770', '1457863120759423213',
    '1447142638326120458', '1384340161625591880', '1455444386421674007'
];

// ID DE ELLA (Excepción de ping y gatillo de mención)
const ID_USUARIA_SIN_PING = '1384340161625591880'; 

// MENSAJE GENERAL (Organizado con saltos de línea limpios)
const MENSAJE_GENERAL = `0 TROLEO DE TUS NALGAS PVTITA GAMAMITA VAS A TENER Q CHUPAR MIS HUEBOTS QUE VAN A SER INSOPORTABLES PARA TUS POBRES NALGAS Q NI LAS DEJAREMOS EXTENDER PUESTO A Q ACABAMOS con la putita de cjotiña 🤣 🤣🤣😂😂😂 viniste por vengaza y te tiras bien penetrada putit4 rolera jsjsjaja. burla a chatarrera gamamita do monclova ENTENDISTE ZORR4??? NOSOTROS COMO BUENOS SWATEANOS TE APLACAMOS FEO LA PANOCHA GAMAMITA 🤣🤣🤣 🤣 HEY PUTA TE TOCARÁ FILTRAR A TU MACHA INSANA POR ANDAR HABLANDO DE TU NALGA Y PIDIENDO Q NO, O TENES MIEDO PERR4???? <@1446586105553227807> CHATARRERA GAMAMITA VIOLADA 🤣 PESORRAZO MONCLOVEÑI GAMAMITEANO <@1429177016703516764> <@1426606724458217674> callese indiaka irrelevante pe Attachments: https://media.discordapp.net/attachments/1430982734066749604/1460382350620753993/Screenshot_20251116_223554.jpg https://media.discordapp.net/attachments/1430982734066749604/1460382350939652310/SPOILER_Screenshot_2025-11-03-11-48-34-947_com.ludashi.superboost-edit.jpg https://media.discordapp.net/attachments/1430982734066749604/1460382351468007689/IMG_20251012_182350.jpg https://media.discordapp.net/attachments/1430982734066749604/1460382351841296527/Screenshot_2023-02-02-19-52-33-94_f9ee0578fe1cc94de7482bd41accb329.jpg https://cdn.discordapp.com/attachments/1460394559996559425/1460406516904366140/Screenshot_20251222_003837.jpg <@1423439348430405722> <@1271616299851583580> QLO DE DUENDA <@1455444386421674007> me la pelan irrelevantes como malaya.`;

const MENSAJE_PERSONALIZADO_ELLA = "Neko fuck <@1384340161625591880> FUCKING PUSSY PO";

let ultimaRespuesta = 0;

// ANTI-BAN: Rate limit con variación aleatoria para no parecer un robot
function getRateLimit() {
    return Math.floor(Math.random() * (4000 - 2500 + 1)) + 2500; // Entre 2.5 y 4 segundos
}

client.on('ready', () => {
    console.log('====================================');
    console.log(`✅ SISTEMA AGRESIVO ONLINE: ${client.user.tag}`);
    console.log(`📡 VIGILANDO: ${OBJETIVOS.length} OBJETIVOS`);
    console.log('====================================');
});

client.on('messageCreate', async (msg) => {
    if (OBJETIVOS.includes(msg.author.id) && msg.author.id !== client.user.id) {
        
        const ahora = Date.now();
        if (ahora - ultimaRespuesta > getRateLimit()) {
            try {
                // REGLA PARA ELLA: Solo si te menciona
                if (msg.author.id === ID_USUARIA_SIN_PING) {
                    if (msg.mentions.has(client.user.id)) {
                        await msg.channel.send(MENSAJE_PERSONALIZADO_ELLA);
                        console.log(`[!] ELLA te mencionó. Respuesta personalizada enviada.`);
                        ultimaRespuesta = ahora;
                    }
                } 
                // REGLA GENERAL: Auto-respond para los demás
                else {
                    await msg.reply({ 
                        content: MENSAJE_GENERAL, 
                        allowedMentions: { repliedUser: true } 
                    });
                    console.log(`[!] Respondido a: ${msg.author.username}`);
                    ultimaRespuesta = ahora;
                }
            } catch (e) {
                console.error(`[X] Error: ${e.message}`);
            }
        }
    }
});

client.login(TOKEN);
