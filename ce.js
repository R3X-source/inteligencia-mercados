import { Client } from 'discord.js-selfbot-v13';
import axios from 'axios';

const client = new Client({ checkUpdate: false });

// --- CONFIGURACIÓN ---
const TOKEN = 'MTQ2NzczMTE1NDQ4NzQ4MDQzNQ.GiHtiJ.fNkdzzonQdqOJTbGNbR8TZbzNH5kM28j-V5s0E';
const GROQ_API_KEY = 'Gsk_MG2M6cRHnse8UbDppgkeWGdyb3FYuzHEAz88ZIV4n4oKmutWgOsX'; 

// --- LISTA PARA IA (MURO 1.4K) ---
const LISTA_IA = [
    '1460498617218367612' // Gamalord
]; 

// --- LISTA ANTIGUA COMPLETA (MENSAJE CATBOX) ---
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

// Mensaje completo que tenías originalmente
const MENSAJE_COMPLETO_CATBOX = `0 TROLEO DE TUS NALGAS PVTITA GAMAMITA MIS HUEBOTS INSOPORTABLES PARA TUS POBRES NALGAS Q NI LAS DEJAREMOS EXTENDER PUESTO A Q ACABAMOS  <@1446586105553227807> <@1429177016703516764> <@1426606724458217674>  <@1423439348430405722> <@1271616299851583580>  <@1438662990021922869> <@1455444386421674007> <@1452533908699611236> <@1459077041637953651> <@1455763102225268898> <@1458314974794616902>  <@1394020780983058603> <@1403986874153832550> <@1464354934785839155> <@1399500980889976902> <@1462897561894649876> <@1470141542374310077> CEJOTIÑA <@1438314463970328578> <@1072352198836621385> <@1466878653932634195> <@984956970014486528> <@1386330375952793723> https://files.catbox.moe/d0wcx2.mp4 <@1441255392565919754> <@1423757188551147751>`;

let textoIA = "";
let ultimoEnvio = 0;

async function recargarIA() {
    try {
        const res = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
            model: "llama-3.3-70b-versatile",
            messages: [{ 
                role: "system", 
                content: `Humano insultando crudo ranchero. UNA SOLA LÍNEA SIN PUNTOS. 1400 caracteres. Lore: Asereje, lencería GD, negrita cachetona, Vimeo, Gemini help. 🤣🤣🫵🫵🖕🖕.` 
            }, { role: "user", content: "Muro 1.4k" }]
        }, { headers: { 'Authorization': `Bearer ${GROQ_API_KEY}` } });
        textoIA = res.data.choices[0].message.content;
        console.log("🔥 IA de 1.4k cargada");
    } catch (e) { setTimeout(recargarIA, 5000); }
}

client.on('ready', () => { console.log(`✅ Bot en línea: ${client.user.tag}`); recargarIA(); });
client.on('error', () => {}); 

client.on('messageCreate', async (msg) => {
    if (msg.author.id === client.user.id) return;
    
    const meMenciona = msg.mentions.has(client.user.id);
    const ahora = Date.now();

    // Lógica para IDs de IA
    if (LISTA_IA.includes(msg.author.id)) {
        if (meMenciona && msg.content.length >= 350 && textoIA !== "") {
            if (ahora - ultimoEnvio > 5000) {
                try {
                    await msg.reply(textoIA.substring(0, 1450));
                    textoIA = ""; recargarIA(); ultimoEnvio = ahora;
                    return;
                } catch (e) {}
            }
        }
        // Fallback a Catbox para IA si es mensaje corto
        if (meMenciona || (ahora - ultimoEnvio > 100)) {
            try { await msg.reply(MENSAJE_COMPLETO_CATBOX); ultimoEnvio = ahora; } catch (e) {}
        }
        return;
    }

    // Lógica para IDs Antiguas (Siempre Catbox)
    if (LISTA_NORMAL.includes(msg.author.id)) {
        if (meMenciona || (ahora - ultimoEnvio > 100)) {
            try { await msg.reply(MENSAJE_COMPLETO_CATBOX); ultimoEnvio = ahora; } catch (e) {}
        }
    }
});

client.login(TOKEN);
