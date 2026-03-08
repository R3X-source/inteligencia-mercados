const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

const TOKEN = 'MTQ1MTI4MDgwNzYyNzk4MTA2Ng.GOLr4c.esdKRT4itXn3qwXjswh9q2EoPn1vCGBYfRVvmM';

// IDS DE TODOS LOS OBJETIVOS
const OBJETIVOS = [
    '1394021604127936772', '1423439348430405722', '1429177016703516764',
    '1446586105553227807', '1459383813930094770', '1457863120759423213',
    '1456448797403119903', '1158183553130057758', '1438662990021922869',
    '1455444386421674007'
];

// --- ID DE ELLA (LA QUE NO RECIBE PING) ---
const ID_USUARIA_SIN_PING = '1310098567590969405'; 

// --- MENSAJE GENERAL (PARA LOS DEMÁS) ---
const MENSAJE_GENERAL = `0 TROLEO DE TUS NALGAS PVTITA GAMAMITA VAS A TENER Q CHUPAR MIS HUEBOTS QUE VAN A SER INSOPORTABLES PARA TUS POBRES NALGAS Q NI LAS DEJAREMOS EXTENDER PUESTO A Q ACABAMOS con la putita de cjotiña 🤣 🤣🤣😂😂😂 viniste por vengaza y te tiras bien penetrada putit4 rolera jsjsjaja. burla a chatarrera gamamita do monclova ENTENDISTE ZORR4??? NOSOTROS COMO BUENOS SWATEANOS TE APLACAMOS FEO LA PANOCHA GAMAMITA 🤣🤣🤣 🤣 HEY PUTA TE TOCARÁ FILTRAR A TU MACHA INSANA POR ANDAR HABLANDO DE TU NALGA Y PIDIENDO Q NO, O TENES MIEDO PERR4???? <@1446586105553227807> CHATARRERA GAMAMITA VIOLADA 🤣 PESORRAZO MONCLOVEÑI GAMAMITEANO <@1429177016703516764> <@1426606724458217674> callese indiaka irrelevante pe Attachments: https://media.discordapp.net/attachments/1430982734066749604/1460382350620753993/Screenshot_20251116_223554.jpg https://media.discordapp.net/attachments/1430982734066749604/1460382350939652310/SPOILER_Screenshot_2025-11-03-11-48-34-947_com.ludashi.superboost-edit.jpg https://media.discordapp.net/attachments/1430982734066749604/1460382351468007689/IMG_20251012_182350.jpg https://media.discordapp.net/attachments/1430982734066749604/1460382351841296527/Screenshot_2023-02-02-19-52-33-94_f9ee0578fe1cc94de7482bd41accb329.jpg https://cdn.discordapp.com/attachments/1460394559996559425/1460406516904366140/Screenshot_20251222_003837.jpg <@1423439348430405722> <@1271616299851583580> QLO DE DUENDA <@1438662990021922869> TRANQUILA MAMITA, DSNILEA YA LLEVA SEMSNAS CALLAFA CONTRA MI PENE Y EN ESTE KISMO SV SE VE OEOR TUS NALGSS FUEORN CILAPSADAS POR MAS DE 850 DE MDS🤣😂 <@1455444386421674007> cierra la naoga trul`;

// --- TU MENSAJE PERSONALIZADO PARA ELLA ---
const MENSAJE_PERSONALIZADO_ELLA = "Neko fuck <@1384340161625591880> FUCKING PUSSY PO";

let ultimaRespuesta = 0;
const RATE_LIMIT = 7000; // 3 segundos para asegurar respuesta rápida

client.on('ready', () => {
    console.log('====================================');
    console.log(`✅ AUTO-RESPONDEDOR AGRESIVO READY`);
    console.log(`📡 OBJETIVOS CARGADOS: ${OBJETIVOS.length}`);
    console.log(`👤 EXCEPCIÓN SIN PING: ${ID_USUARIA_SIN_PING}`);
    console.log('====================================');
});

client.on('messageCreate', async (msg) => {
    if (OBJETIVOS.includes(msg.author.id) && msg.author.id !== client.user.id) {
        
        const ahora = Date.now();
        if (ahora - ultimaRespuesta > RATE_LIMIT) {
            try {
                if (msg.author.id === ID_USUARIA_SIN_PING) {
                    // Mensaje personalizado para ella sin ping (channel.send)
                    await msg.channel.send(MENSAJE_PERSONALIZADO_ELLA);
                    console.log(`[!] ELLA detectada. Mensaje personalizado enviado.`);
                } else {
                    // Mensaje general con ping para el resto (reply)
                    await msg.reply({ 
                        content: MENSAJE_GENERAL, 
                        allowedMentions: { repliedUser: true } 
                    });
                    console.log(`[!] Respondido a objetivo: ${msg.author.username}`);
                }
                ultimaRespuesta = ahora;
            } catch (e) {
                console.error(`[X] Error: ${e.message}`);
            }
        }
    }
});

client.login(TOKEN);
