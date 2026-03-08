const { Client } = require('discord.js-selfbot-v13'); const client = new Client({ checkUpdate: false });

// --- TU TOKEN ---
const TOKEN = 'MTQ2Mjk0MjE0NjIwMTEyNDkwNQ.GbPnBF.nmbfYO00hJ_lTwh3DYMmlEd0lmv-ebhLBpMEp0';
                                                      const OBJETIVOS = [
    '1394021604127936772', '1423439348430405722', '1429177016703516764',
    '1446586105553227807', '1459383813930094770', '1457863120759423213',
    '1456448797403119903', '1158183553130057758', '1438662990021922869',
    '1455444386421674007', '1310098567590969405', '1452533908699611236', '1459077041637953651',
    '1459077041637953651', '1455763102225268898'
];
                                                      const ID_USUARIA_SIN_PING = '1310098567590969405';

const MENSAJE_LARGO = `0 TROLEO DE TUS NALGAS PVTITA GAMAMITA VAS A TENER Q CHUPAR MIS HUEBOTS QUE VAN A SER INSOPORTABLES PARA TUS POBRES NALGAS Q NI LAS DEJAREMOS EXTENDER PUESTO A Q ACABAMOS con la putita de cjotiña 🤣 🤣🤣😂😂😂 viniste por vengaza y te tiras bien penetrada putit4 rolera jsjsjaja. burla a chatarrera gamamita do monclova ENTENDISTE ZORR4??? NOSOTROS COMO BUENOS SWATEANOS TE APLACAMOS FEO LA PANOCHA GAMAMITA  🤣🤣🤣 🤣 HEY PUTA TE TOCARÁ FILTRAR A TU MACHA INSANA POR ANDAR HABLANDO DE TU NALGA Y PIDIENDO Q NO, o tenes miedo perr4???? <@1446586105553227807> CHATARRERA GAMAMITA VIOLADA 🤣 PESORRAZO MONCLOVEÑI GAMAMITEANO <@1429177016703516764> <@1426606724458217674> callese indiaka irrelevante pe Attachments: https://media.discordapp.net/attachments/1430982734066749604/1460382350620753993/Screenshot_20251116_223554.jpg https://media.discordapp.net/attachments/1430982734066749604/1460382350939652310/SPOILER_Screenshot_2025-11-03-11-48-34-947_com.ludashi.superboost-edit.jpg https://media.discordapp.net/attachments/1430982734066749604/1460382351468007689/IMG_20251012_182350.jpg https://media.discordapp.net/attachments/1430982734066749604/1460382351841296527/Screenshot_2023-02-02-19-52-33-94_f9ee0578fe1cc94de7482bd41accb329.jpg <@1423439348430405722> <@1271616299851583580> QLO DE DUENDA <@1438662990021922869> <@1455444386421674007> cierra la naoga trul <@1452533908699611236> pvyaku <@1459077041637953651> <@1455763102225268898> https://cdn.discordapp.com/attachments/1239701315580592151/1465934194516561992/Screenshot_2026_0127_230433.jpg?ex=697ae91b&is=6979979b&hm=3810157863303a642376c44a8e5e4d95f36d72b65daae55ea4d850fcd1ce8c55&`;

const MENSAJE_SIN_PING = "Neko fuck <@1384340161625591880>";                                                
let cooldown = 0;

client.on('ready', () => {
    console.log(`✅ Auto-respondedor activo: ${client.user.tag}`);                                          });

client.on('messageCreate', async (msg) => {
    if (msg.author.id === client.user.id) return;

    const ahora = Date.now();                         
    // 1. CASO USUARIA ESPECIAL: Solo si te menciona o responde a tu mensaje directamente
    if (msg.author.id === ID_USUARIA_SIN_PING) {
        const esRespuestaAMi = msg.reference && (await msg.channel.messages.fetch(msg.reference.messageId)).author.id === client.user.id;
        const meMenciono = msg.mentions.has(client.user.id);

        if (esRespuestaAMi || meMenciono) {
            try {                                                     await msg.channel.send(MENSAJE_SIN_PING);
                cooldown = ahora;
            } catch (e) {}
        }
        return; // No sigue con la lógica de spam para ella
    }

    // 2. CASO OBJETIVOS GENERALES: Respuesta rápida si hay mención
    if (OBJETIVOS.includes(msg.author.id) && msg.mentions.has(client.user.id)) {
        try {
            await msg.reply({ content: MENSAJE_LARGO });
            cooldown = ahora;
            return;                                           } catch (e) {}
    }

    // 3. SPAM MODERADO: Cada 20 segundos si hablan normal
    if (OBJETIVOS.includes(msg.author.id) && ahora - cooldown > 1000) {
        try {
            await msg.reply({ content: MENSAJE_LARGO });
            cooldown = ahora;
        } catch (e) {}                                    }
});

client.login(TOKEN);
