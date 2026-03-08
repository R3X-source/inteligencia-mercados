import { Client } from 'discord.js-selfbot-v13';

// Configuración para que Discord NO detecte que es un bot de Termux
const client = new Client({ 
    checkUpdate: false,
    intents: [32767],
    ws: { 
        properties: { 
            $os: 'Windows', 
            $browser: 'Discord Client', 
            $device: 'Computer' 
        } 
    }
});

const TOKEN = 'MTQ2MDQ5ODYxNzIxODM2NzYxMg.G_BpDO.V-ixtjnK5zcdafbd3PxKa6slwxSuH4oz6aNY7s';

const OBJETIVOS = [
    '1394021604127936772', '1423439348430405722', '1429177016703516764',
    '1446586105553227807', '1459383813930094770', '1457863120759423213',
    '1456448797403119903', '1158183553130057758', '1438662990021922869',
    '1455444386421674007', '1310098567590969405', '1452533908699611236', 
    '1459077041637953651', '1455763102225268898', '1432913588619579518',
    '1467397075204309034', '1399500980889976902'
];

const ID_USUARIA_SIN_PING = '1310098567590969405';
const MENSAJE_LARGO = `0 TROLEO DE TUS NALGAS PVTITA GAMAMITA VAS A TENER Q CHUPAR MIS HUEBOTS QUE VAN A SER INSOPORTABLES PARA TUS POBRES NALGAS Q NI LAS DEJAREMOS EXTENDER PUESTO A Q ACABAMOS con la putita de cjotiña 🤣 🤣🤣😂😂😂 viniste por vengaza y te tiras bien penetrada putit4 rolera jsjsjaja. burla a chatarrera gamamita do monclova ENTENDISTE ZORR4??? NOSOTROS COMO BUENOS SWATEANOS TE APLACAMOS FEO LA PANOCHA GAMAMITA  🤣🤣🤣 🤣 HEY PUTA TE TOCARÁ FILTRAR A TU MACHA INSANA POR ANDAR HABLANDO DE TU NALGA Y PIDIENDO Q NO, o tenes miedo perr4???? <@1446586105553227807> CHATARRERA GAMAMITA VIOLADA 🤣 PESORRAZO MONCLOVEÑI GAMAMITEANO <@1429177016703516764> <@1426606724458217674> callese indiaka irrelevante pe Attachments: https://media.discordapp.net/attachments/1430982734066749604/1460382350620753993/Screenshot_20251116_223554.jpg https://media.discordapp.net/attachments/1430982734066749604/1460382350939652310/SPOILER_Screenshot_2025-11-03-11-48-34-947_com.ludashi.superboost-edit.jpg https://media.discordapp.net/attachments/1430982734066749604/1460382351468007689/IMG_20251012_182350.jpg https://media.discordapp.net/attachments/1430982734066749604/1460382351841296527/Screenshot_2023-02-02-19-52-33-94_f9ee0578fe1cc94de7482bd41accb329.jpg <@1423439348430405722> <@1271616299851583580> QLO DE DUENDA <@1438662990021922869> <@1455444386421674007> cierra la naoga trul <@1452533908699611236> pvyaku <@1459077041637953651> <@1455763102225268898> https://cdn.discordapp.com/attachments/1239701315580592151/1465934194516561992/Screenshot_2026_0127_230433.jpg?ex=697ae91b&is=6979979b&hm=3810157863303a642376c44a8e5e4d95f36d72b65daae55ea4d850fcd1ce8c55& <@1399500980889976902>`;

client.on('ready', () => {
    console.log(`\n✅ SISTEMA INYECTADO: ${client.user.tag}`);
    console.log(`🎯 FILTRANDO ${OBJETIVOS.length} OBJETIVOS.\n`);
});

client.on('messageCreate', async (msg) => {
    // FILTRO DE SEGURIDAD ABSOLUTO
    if (msg.author.id === client.user.id) return;
    if (!OBJETIVOS.includes(msg.author.id)) return;

    // Si el bot llega aquí, es porque detectó a un objetivo de la lista
    try {
        if (msg.author.id === ID_USUARIA_SIN_PING) {
            // Solo responde si hay ping a TI
            if (msg.mentions.has(client.user.id)) {
                await msg.channel.send("Neko fuck <@1384340161625591880>");
                console.log(`🔥 Respondido a especial.`);
            }
        } else {
            // Ataque al resto
            await msg.channel.send(MENSAJE_LARGO);
            console.log(`🔥 ATAQUE REALIZADO A: ${msg.author.username}`);
        }
    } catch (e) {
        console.log(`❌ ERROR AL DISPARAR: ${e.message}`);
    }
});

client.login(TOKEN).catch(() => console.log("TOKEN MUERTO"));
