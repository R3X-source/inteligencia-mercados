import { Client } from 'discord.js-selfbot-v13';
import axios from 'axios';

const client = new Client({ checkUpdate: false });

// --- CONFIGURACIÓN ---
const TOKEN = 'MTQ2NzczMTE1NDQ4NzQ4MDQzNQ.G25L1J.FWIMpA3g68ERtW-9CCNX0k19sj0Kfq2LVSPqvw';
const GROQ_API_KEY = 'Gsk_MG2M6cRHnse8UbDppgkeWGdyb3FYuzHEAz88ZIV4n4oKmutWgOsX'; 

// --- LISTA PRIORITARIA (IA) ---
const LISTA_IA = [
    '1460498617218367612' // ID de gamalordroidero28
]; 

// --- LISTA NORMAL (ESTÁTICOS) ---
const LISTA_NORMAL = [
    '1394021604127936772', '1423439348430405722', '1429177016703516764',
    '1446586105553227807', '1459383813930094770', '1457863120759423213',
    '1456448797403119903', '1158183553130057758', '1438662990021922869',
    '1455444386421674007', '1310098567590969405', '1452533908699611236', '1459077041637953651',
    '1455763102225268898', '1432913588619579518', '1467397075204309034', '1458314974794616902',
    '1394020780983058603', '1403986874153832550', '1464354934785839155',
    '1399500980889976902', '1462897561894649876', '1470141542374310077',
    '1466878653932634195', '984956970014486528', '1441255392565919754', '1423757188551147751'
];

const MENSAJE_CATBOX = `0 TROLEO DE TUS NALGAS PVTITA GAMAMITA MIS HUEBOTS INSOPORTABLES PARA TUS POBRES NALGAS Q NI LAS DEJAREMOS EXTENDER PUESTO A Q ACABAMOS  <@1446586105553227807> <@1429177016703516764> <@1426606724458217674>  <@1423439348430405722> <@1271616299851583580>  <@1438662990021922869> <@1455444386421674007> <@1452533908699611236> <@1459077041637953651> <@1455763102225268898> <@1458314974794616902>  <@1394020780983058603> <@1403986874153832550> <@1464354934785839155> <@1399500980889976902> <@1462897561894649876> <@1470141542374310077> CEJOTIÑA <@1438314463970328578> <@1072352198836621385> <@1466878653932634195> <@984956970014486528> <@1386330375952793723> https://files.catbox.moe/d0wcx2.mp4 <@1441255392565919754> <@1423757188551147751>`;

let textoIA = "";
let contadorSpam = 0;
let ultimoEnvio = 0;

// Cargar IA rápido
async function recargarIA() {
    try {
        const res = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
            model: "llama-3.3-70b-versatile",
            messages: [{
                role: "system",
                content: "Eres un humano insultando crudo, ranchero, shitposting agresivo. UNA SOLA LÍNEA SIN PUNTOS NI SIGNOS. 1250-1400 caracteres. Emojis: 🤣🤣🫵🫵🖕🖕. Lore: Fingió ser mujer en 'Asereje' para seducir a GD, lencería ante él, negrita cachetona, crush de quien la abusó, Wink le tiró los canales, gatea en Vimeo, ayuda de Gamamita/Gemini/Master."
            }, { role: "user", content: "Ataque masivo." }]
        }, { headers: { 'Authorization': `Bearer ${GROQ_API_KEY}` } });
        textoIA = res.data.choices[0].message.content;
        contadorSpam = 0;
        console.log("🔥 IA LISTA PARA EL DESTROZO");
    } catch (e) { setTimeout(recargarIA, 3000); }
}

client.on('ready', async () => {
    console.log(`✅ Conectado como: ${client.user.tag}`);
    await recargarIA();
});

client.on('messageCreate', async (msg) => {
    if (msg.author.id === client.user.id) return;
    const ahora = Date.now();
    const meMencionan = msg.mentions.has(client.user.id);

    // --- BLOQUE 1: PRIORIDAD ABSOLUTA PARA LISTA DE IA ---
    if (LISTA_IA.includes(msg.author.id)) {
        // ¿Es biblia (+350), me mencionan, hay IA y no es spam (+5)?
        if (meMencionan && msg.content.length >= 350 && textoIA !== "" && contadorSpam < 5) {
            if (ahora - ultimoEnvio > 5000) {
                try {
                    await msg.reply({ content: textoIA.substring(0, 1400) });
                    contadorSpam++;
                    ultimoEnvio = ahora;
                    recargarIA(); // Prepara el siguiente insulto
                    return; // Salimos para que no ejecute NADA más
                } catch (e) {}
            }
        }
        
        // Si la ID de IA manda algo corto, o ya hubo spam, o no hay mención...
        // ...solo responde si pasan 100ms o hay mención para mantener el flujo.
        if (meMencionan || (ahora - ultimoEnvio > 100)) {
            try { await msg.reply({ content: MENSAJE_CATBOX }); ultimoEnvio = ahora; } catch (e) {}
        }
        return; // IMPORTANTE: No deja que pase al bloque de lista normal
    }

    // --- BLOQUE 2: LISTA NORMAL (SIEMPRE CATBOX) ---
    if (LISTA_NORMAL.includes(msg.author.id)) {
        if (meMencionan || (ahora - ultimoEnvio > 100)) {
            try { await msg.reply({ content: MENSAJE_CATBOX }); ultimoEnvio = ahora; } catch (e) {}
        }
    }
});

client.login(TOKEN);
