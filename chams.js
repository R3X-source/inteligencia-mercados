const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

const TOKEN = 'MTQ2NzczMTE1NDQ4NzQ4MDQzNQ.G25L1J.FWIMpA3g68ERtW-9CCNX0k19sj0Kfq2LVSPqvw';

const OBJETIVOS = [
    '1394021604127936772', '1423439348430405722', '1429177016703516764',
    '1446586105553227807', '1459383813930094770', '1457863120759423213',
    '1456448797403119903', '1158183553130057758', '1438662990021922869',
    '1455444386421674007', '1310098567590969405', '1452533908699611236', 
    '1459077041637953651', '1455763102225268898', '1432913588619579518',
    '1467397075204309034', '1458314974794616902', '1394020780983058603', 
    '1403986874153832550', '1464354934785839155', '1399500980889976902', 
    '1462897561894649876', '1470141542374310077'
];

const ID_USUARIA_SIN_PING = '1310098567590969405';

// El link del video ahora está separado por saltos de línea para asegurar el embed
const VIDEO_LINK = "https://media.discordapp.net/attachments/1240674500622680094/1475913222115561665/TikVid.io_7591558082040171799.mp4?ex=699f36cd&is=699de54d&hm=3e49fbdfe81d9e2056e7f20c2fd58cb9852da3d29fa87004c271a8f52cdeaf6a";

const MENSAJE_LARGO = `0 TROLEO DE TUS NALGAS PVTITA GAMAMITA MIS HUEBOTS INSOPORTABLES PARA TUS POBRES NALGAS Q NI LAS DEJAREMOS EXTENDER PUESTO A Q ACABAMOS <@1446586105553227807> <@1429177016703516764> <@1426606724458217674> <@1423439348430405722> <@1271616299851583580> <@1438662990021922869> <@1455444386421674007> <@1452533908699611236> <@1459077041637953651> <@1455763102225268898> <@1458314974794616902> <@1394020780983058603> <@1403986874153832550> <@1464354934785839155> <@1399500980889976902> <@1462897561894649876> <@1470141542374310077>

${VIDEO_LINK}

CEJOTIÑA <@1438314463970328578> <@1072352198836621385> <@1466878653932634195> <@984956970014486528> <@1386330375952793723>`;

const MENSAJE_SIN_PING = "Neko fuck <@1384340161625591880>";

let ultimo_envio = 0;

// Función para dormir el proceso (pausa aleatoria)
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

client.on('ready', () => {
    console.log(`🚀 Listo. Operando como: ${client.user.tag}`);
});

client.on('messageCreate', async (msg) => {
    if (msg.author.id === client.user.id) return;

    const ahora = Date.now();

    // Lógica para la usuaria sin ping
    if (msg.author.id === ID_USUARIA_SIN_PING) {
        const meMenciono = msg.mentions.has(client.user.id);
        if (meMenciono) {
            await sleep(100); // Espera de 0.1
            msg.channel.send(MENSAJE_SIN_PING).catch(() => {});
        }
        return;
    }

    // Lógica para objetivos
    if (OBJETIVOS.includes(msg.author.id)) {
        // Pausa aleatoria si estamos dentro del rango de 10 segundos
        if (ahora - ultimo_envio < 10000) {
            const pausaExtra = Math.floor(Math.random() * 3000) + 500; // Entre 0.5 y 3.5 segundos extra
            await sleep(pausaExtra);
        } else {
            await sleep(100); // El 0.1 base que usas por cada miembro
        }

        msg.reply({ content: MENSAJE_LARGO }).then(() => {
            ultimo_envio = Date.now();
        }).catch(() => {});
    }
});

client.login(TOKEN);
