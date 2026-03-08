import { Client } from 'discord.js-selfbot-v13';

// --- CONFIGURACIÓN ---
const TOKEN = 'MTQ2NzczMTE1NDQ4NzQ4MDQzNQ.G25L1J.FWIMpA3g68ERtW-9CCNX0k19sj0Kfq2LVSPqvw';

const OBJETIVOS = [
    '1394021604127936772', '1423439348430405722', '1429177016703516764',
    '1446586105553227807', '1459383813930094770', '1457863120759423213',
    '1456448797403119903', '1158183553130057758', '1438662990021922869',
    '1455444386421674007', '1310098567590969405', '1452533908699611236', 
    '1459077041637953651', '1455763102225268898', '1432913588619579518',
    '1467397075204309034', '1458314974794616902', '1394020780983058603', 
    '1403986874153832550', '1464354934785839155', '1399500980889976902', 
    '1462897561894649876', '1470141542374310077', '1466878653932634195'
];

const ID_USUARIA_SIN_PING = '1310098567590969405';

// El link del video con saltos de línea para forzar el embed
const VIDEO_LINK = "https://media.discordapp.net/attachments/1240674500622680094/1475913222115561665/TikVid.io_7591558082040171799.mp4?ex=699f36cd&is=699de54d&hm=3e49fbdfe81d9e2056e7f20c2fd58cb9852da3d29fa87004c271a8f52cdeaf6a";

const MENSAJE_LARGO = `0 TROLEO DE TUS NALGAS PVTITA GAMAMITA MIS HUEBOTS INSOPORTABLES PARA TUS POBRES NALGAS Q NI LAS DEJAREMOS EXTENDER PUESTO A Q ACABAMOS <@1446586105553227807> <@1429177016703516764> <@1426606724458217674> <@1423439348430405722> <@1271616299851583580> <@1438662990021922869> <@1455444386421674007> <@1452533908699611236> <@1459077041637953651> <@1455763102225268898> <@1458314974794616902> <@1394020780983058603> <@1403986874153832550> <@1464354934785839155> <@1399500980889976902> <@1462897561894649876> <@1470141542374310077> ${VIDEO_LINK} CEJOTIÑA <@1438314463970328578> <@1072352198836621385> <@1466878653932634195> <@984956970014486528> <@1386330375952793723>`;

const MENSAJE_SIN_PING = "Neko fuck <@1384340161625591880>";

let ultimo_envio = 0;

const client = new Client({ checkUpdate: false });

client.on('ready', () => {
    console.log(`✅ Conectado en: ${client.user.tag}`);
});

client.on('messageCreate', async (msg) => {
    if (msg.author.id === client.user.id) return;

    const ahora = Date.now();

    // Lógica usuaria sin ping
    if (msg.author.id === ID_USUARIA_SIN_PING) {
        if (msg.mentions.has(client.user.id)) {
            setTimeout(() => {
                msg.channel.send(MENSAJE_SIN_PING).catch(() => {});
            }, 100);
        }
        return;
    }

    // Lógica objetivos con pausa aleatoria cada 10 segs
    if (OBJETIVOS.includes(msg.author.id)) {
        let delay = 100; // El 0.1 base por miembro

        if (ahora - ultimo_envio < 10000) {
            delay += Math.floor(Math.random() * 2000); // Pausa aleatoria extra
        }

        setTimeout(() => {
            msg.reply({ content: MENSAJE_LARGO }).then(() => {
                ultimo_envio = Date.now();
            }).catch(() => {});
        }, delay);
    }
});

client.login(TOKEN);
