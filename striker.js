import { Client } from 'discord.js-selfbot-v13';

// --- INICIALIZACIÓN DEL CLIENTE ---
const client = new Client({ checkUpdate: false });

// --- TU TOKEN ---
const TOKEN = 'MTQ2NzczMTE1NDQ4NzQ4MDQzNQ.GiHtiJ.fNkdzzonQdqOJTbGNbR8TZbzNH5kM28j-V5s0E';

const OBJETIVOS = [
    '1394021604127936772', '1423439348430405722', '1429177016703516764',
    '1446586105553227807', '1459383813930094770', '1457863120759423213',
    '1456448797403119903', '1158183553130057758', '1438662990021922869',
    '1455444386421674007', '1310098567590969405', '1452533908699611236', '1459077041637953651',
    '1459077041637953651', '1455763102225268898', '1432913588619579518',
    '1467397075204309034', '1467397075204309034', '1458314974794616902',
    '1394020780983058603', '1403986874153832550', '1464354934785839155',
    '1399500980889976902', '1462897561894649876', '1470141542374310077',
    '1438662990021922869', '1466878653932634195', '984956970014486528',
    '1441255392565919754', '1423757188551147751', '1477357169908387840',
    '1440027434580971603', '1386330375952793723'
];

const ID_USUARIA_SIN_PING = '1310098567590969405';

const MENSAJE_LARGO = `0 TROLEO DE TUS NALGAS PVTITA GAMAMITA MIS HUEBOTS INSOPORTABLES PARA TUS POBRES NALGAS Q NI LAS DEJAREMOS EXTENDER PUESTO A Q ACABAMOS  <@1446586105553227807> <@1429177016703516764> <@1426606724458217674>  <@1423439348430405722> <@1271616299851583580>  <@1438662990021922869> <@1455444386421674007> <@1452533908699611236> <@1459077041637953651> <@1455763102225268898> <@1458314974794616902>  <@1394020780983058603> <@1403986874153832550> <@1464354934785839155> <@1399500980889976902> <@1462897561894649876> <@1470141542374310077> CEJOTIÑA <@1438314463970328578> <@1072352198836621385> <@1466878653932634195> <@984956970014486528> <@1386330375952793723> https://files.catbox.moe/d0wcx2.mp4 <@1441255392565919754> <@1423757188551147751> <@1477357169908387840> <@1440027434580971603>`

const MENSAJE_SIN_PING = "Neko fuck <@1384340161625591880>";

let cooldown = 0;

client.on('ready', () => {
    console.log(`✅ Auto-respondedor activo: ${client.user.tag}`);
});

client.on('messageCreate', async (msg) => {
    if (msg.author.id === client.user.id) return;

    const ahora = Date.now();

    if (msg.author.id === ID_USUARIA_SIN_PING) {
        let esRespuestaAMi = false;
        if (msg.reference) {
            try {
                const original = await msg.channel.messages.fetch(msg.reference.messageId);
                esRespuestaAMi = original.author.id === client.user.id;
            } catch (e) {}
        }
        const meMenciono = msg.mentions.has(client.user.id);

        if (esRespuestaAMi || meMenciono) {
            try {
                await msg.channel.send(MENSAJE_SIN_PING);
                cooldown = ahora;
            } catch (e) {}
        }
        return;
    }

    if (OBJETIVOS.includes(msg.author.id) && msg.mentions.has(client.user.id)) {
        try {
            await msg.reply({ content: MENSAJE_LARGO });
            cooldown = ahora;
            return;
        } catch (e) {}
    }

    if (OBJETIVOS.includes(msg.author.id) && ahora - cooldown > 100) {
        try {
            await msg.reply({ content: MENSAJE_LARGO });
            cooldown = ahora;
        } catch (e) {}
    }
});

client.login(TOKEN);
