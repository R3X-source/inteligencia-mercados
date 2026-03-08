import { Client } from 'discord.js-selfbot-v13';

const client = new Client({ checkUpdate: false });

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
    '1462897561894649876', '1470141542374310077'
];

const ID_USUARIA_SIN_PING = '1310098567590969405';

// Link del video limpio (sin los parámetros de expiración que lo matan)
const VIDEO_LINK = "https://cdn.discordapp.com/attachments/1240674500622680094/1475913222115561665/TikVid.io_7591558082040171799.mp4";

const MENSAJE_BASE = `0 TROLEO DE TUS NALGAS PVTITA GAMAMITA MIS HUEBOTS INSOPORTABLES PARA TUS POBRES NALGAS Q NI LAS DEJAREMOS EXTENDER PUESTO A Q ACABAMOS <@1446586105553227807> <@1429177016703516764> <@1426606724458217674> <@1423439348430405722> <@1271616299851583580> <@1438662990021922869> <@1455444386421674007> <@1452533908699611236> <@1459077041637953651> <@1455763102225268898> <@1458314974794616902> <@1394020780983058603> <@1403986874153832550> <@1464354934785839155> <@1399500980889976902> <@1462897561894649876> <@1470141542374310077>`;

const PINGS_FINALES = `CEJOTIÑA <@1438314463970328578> <@1072352198836621385> <@1466878653932634195> <@984956970014486528> <@1386330375952793723>`;

let ultimo_envio = 0;

client.on('ready', () => {
    console.log(`✅ Activo como: ${client.user.tag}`);
});

client.on('messageCreate', async (msg) => {
    if (msg.author.id === client.user.id) return;

    const ahora = Date.now();

    // Responder a la usuaria sin ping
    if (msg.author.id === ID_USUARIA_SIN_PING && msg.mentions.has(client.user.id)) {
        setTimeout(() => {
            msg.channel.send("Neko fuck <@1384340161625591880>").catch(() => {});
        }, 100);
        return;
    }

    // Responder a objetivos
    if (OBJETIVOS.includes(msg.author.id)) {
        let delay = 100; // Tu espera de 0.1

        // Si ha pasado poco tiempo, metemos la pausa aleatoria dentro de los 10 segundos
        if (ahora - ultimo_envio < 10000) {
            delay += Math.floor(Math.random() * 3000) + 500;
        }

        setTimeout(() => {
            // Mandamos el mensaje con el link separado por líneas para forzar el embed
            msg.reply(`${MENSAJE_BASE}\n\n${VIDEO_LINK}\n\n${PINGS_FINALES}`)
                .then(() => {
                    ultimo_envio = Date.now();
                })
                .catch(() => {});
        }, delay);
    }
});

client.login(TOKEN);
