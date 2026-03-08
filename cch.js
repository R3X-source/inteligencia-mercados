import { Client } from 'discord.js-selfbot-v13';
import axios from 'axios';

// --- INICIALIZACIÓN DEL CLIENTE ---
const client = new Client({ checkUpdate: false });

// --- CONFIGURACIÓN DE TOKENS Y LLAVES ---
const TOKEN = 'MTQ2NzczMTE1NDQ4NzQ4MDQzNQ.G25L1J.FWIMpA3g68ERtW-9CCNX0k19sj0Kfq2LVSPqvw';
const GROQ_API_KEY = 'Gsk_MG2M6cRHnse8UbDppgkeWGdyb3FYuzHEAz88ZIV4n4oKmutWgOsX'; 

// --- IDs ANTIGUAS (ESTÁTICAS) ---
const OBJETIVOS = [
    '1394021604127936772', '1423439348430405722', '1429177016703516764',
    '1446586105553227807', '1459383813930094770', '1457863120759423213',
    '1456448797403119903', '1158183553130057758', '1438662990021922869',
    '1455444386421674007', '1310098567590969405', '1452533908699611236', '1459077041637953651',
    '1455763102225268898', '1432913588619579518', '1467397075204309034', '1458314974794616902',
    '1394020780983058603', '1403986874153832550', '1464354934785839155',
    '1399500980889976902', '1462897561894649876', '1470141542374310077',
    '1466878653932634195', '984956970014486528', '1441255392565919754', '1423757188551147751'
];

// --- NUEVAS IDs (IA GROQ) ---
const OBJETIVOS_TEXTOS_LARGOS = [
    'ID_NUEVA_AQUÍ', 
    'OTRA_ID_NUEVA_AQUÍ'
];

const ID_USUARIA_SIN_PING = '1310098567590969405';

const MENSAJE_LARGO = `0 TROLEO DE TUS NALGAS PVTITA GAMAMITA MIS HUEBOTS INSOPORTABLES PARA TUS POBRES NALGAS Q NI LAS DEJAREMOS EXTENDER PUESTO A Q ACABAMOS  <@1446586105553227807> <@1429177016703516764> <@1426606724458217674>  <@1423439348430405722> <@1271616299851583580>  <@1438662990021922869> <@1455444386421674007> <@1452533908699611236> <@1459077041637953651> <@1455763102225268898> <@1458314974794616902>  <@1394020780983058603> <@1403986874153832550> <@1464354934785839155> <@1399500980889976902> <@1462897561894649876> <@1470141542374310077> CEJOTIÑA <@1438314463970328578> <@1072352198836621385> <@1466878653932634195> <@984956970014486528> <@1386330375952793723> https://files.catbox.moe/d0wcx2.mp4 <@1441255392565919754> <@1423757188551147751>`;

const MENSAJE_SIN_PING = "Neko fuck <@1384340161625591880>";

let textoPreGenerado = "";
let contadorUsoTextoIA = 0;
let cooldown = 0;

// Función para pre-generar texto y ganar velocidad
async function preGenerarTexto() {
    try {
        const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
            model: "llama-3.3-70b-versatile",
            messages: [
                { 
                    role: "system", 
                    content: `Humano insultando crudo, ranchero michoacano, shitposting. UNA SOLA LÍNEA SIN PUNTOS NI SIGNOS. Longitud: 1250-1400 caracteres. Emojis: 🤣🤣🫵🫵🖕🖕. Lore: Asereje, lencería para GD, negrita cachetona, Wink le tiró los canales, gatea en Vimeo, ayuda de Gamamita/Gemini/Master.`
                },
                { role: "user", content: "Genera el siguiente ataque masivo de una pantalla completa." }
            ]
        }, {
            headers: { 'Authorization': `Bearer ${GROQ_API_KEY}`, 'Content-Type': 'application/json' }
        });
        textoPreGenerado = response.data.choices[0].message.content;
        contadorUsoTextoIA = 0;
    } catch (e) { console.log("Error al pre-generar"); }
}

client.on('ready', async () => {
    console.log(`✅ Auto-respondedor activo: ${client.user.tag}`);
    await preGenerarTexto();
});

client.on('messageCreate', async (msg) => {
    if (msg.author.id === client.user.id) return;
    const ahora = Date.now();
    const meMenciono = msg.mentions.has(client.user.id);

    // 1. Lógica Sin Ping
    if (msg.author.id === ID_USUARIA_SIN_PING) {
        let esRespuestaAMi = false;
        if (msg.reference) {
            try {
                const original = await msg.channel.messages.fetch(msg.reference.messageId);
                esRespuestaAMi = original.author.id === client.user.id;
            } catch (e) {}
        }
        if (esRespuestaAMi || meMenciono) {
            try { await msg.channel.send(MENSAJE_SIN_PING); cooldown = ahora; } catch (e) {}
        }
        return;
    }

    // 2. Lógica para NUEVAS IDs (IA con Pre-generación y Anti-spam)
    if (OBJETIVOS_TEXTOS_LARGOS.includes(msg.author.id)) {
        if (meMenciono && msg.content.length >= 350 && contadorUsoTextoIA < 5) {
            if (ahora - cooldown > 5000) {
                try {
                    await msg.reply({ content: textoPreGenerado.substring(0, 1400) });
                    contadorUsoTextoIA++;
                    cooldown = ahora;
                    preGenerarTexto(); // Prepara el siguiente de fondo
                    return;
                } catch (e) {}
            }
        }
        // Si es corto, no hay mención o ya se spameó 5 veces -> Mensaje Catbox
        if (meMenciono || ahora - cooldown > 100) {
            try { await msg.reply({ content: MENSAJE_LARGO }); cooldown = ahora; } catch (e) {}
        }
        return;
    }

    // 3. Lógica para OBJETIVOS ANTIGUOS (Mensaje Catbox siempre)
    if (OBJETIVOS.includes(msg.author.id)) {
        if (meMenciono || ahora - cooldown > 100) {
            try { await msg.reply({ content: MENSAJE_LARGO }); cooldown = ahora; } catch (e) {}
        }
    }
});

client.login(TOKEN);
