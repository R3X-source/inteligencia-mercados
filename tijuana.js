import { Client } from 'discord.js-selfbot-v13';
import axios from 'axios';

const client = new Client({ checkUpdate: false });

const TOKEN = 'MTQ2NzczMTE1NDQ4NzQ4MDQzNQ.G25L1J.FWIMpA3g68ERtW-9CCNX0k19sj0Kfq2LVSPqvw';
const GROQ_API_KEY = 'Gsk_MG2M6cRHnse8UbDppgkeWGdyb3FYuzHEAz88ZIV4n4oKmutWgOsX'; 

const LISTA_IA = ['1460498617218367612']; 
const LISTA_NORMAL = ['1394021604127936772', '1423439348430405722', '1429177016703516764', '1446586105553227807', '1459383813930094770', '1457863120759423213', '1456448797403119903', '1158183553130057758', '1438662990021922869', '1455444386421674007', '1310098567590969405', '1452533908699611236', '1459077041637953651', '1455763102225268898', '1432913588619579518', '1467397075204309034', '1458314974794616902', '1394020780983058603', '1403986874153832550', '1464354934785839155', '1399500980889976902', '1462897561894649876', '1470141542374310077', '1466878653932634195', '984956970014486528', '1441255392565919754', '1423757188551147751'];

const MENSAJE_CATBOX = `0 TROLEO DE TUS NALGAS PVTITA GAMAMITA... https://files.catbox.moe/d0wcx2.mp4`;

let textoIA = "";
let ultimoEnvio = 0;

async function recargarIA() {
    try {
        console.log("📡 Solicitando nuevo texto a Groq...");
        const res = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "system", content: "Insultos crudos rancheros, una sola linea, 1300 caracteres, emojis risa y dedo medio. Lore: Asereje, lencería GD, negrita cachetona, Vimeo." }]
        }, { headers: { 'Authorization': `Bearer ${GROQ_API_KEY}` } });
        
        textoIA = res.data.choices[0].message.content;
        console.log("✅ IA CARGADA. Tamaño:", textoIA.length, "caracteres.");
    } catch (e) {
        console.error("❌ ERROR DE API GROQ:", e.response ? e.response.data : e.message);
        setTimeout(recargarIA, 5000);
    }
}

client.on('ready', async () => {
    console.log(`✅ Bot en línea: ${client.user.tag}`);
    await recargarIA();
});

client.on('messageCreate', async (msg) => {
    if (msg.author.id === client.user.id) return;

    const meMencionan = msg.mentions.has(client.user.id);
    const esIA = LISTA_IA.includes(msg.author.id);
    
    if (esIA) {
        console.log(`[DEBUG] Mensaje de objetivo IA. Mención: ${meMencionan}, Longitud: ${msg.content.length}`);
        
        if (meMencionan && msg.content.length >= 350) {
            if (textoIA !== "") {
                console.log("🚀 Enviando respuesta de IA...");
                await msg.reply(textoIA.substring(0, 1400));
                textoIA = ""; // Limpiar para el siguiente
                recargarIA();
                return;
            } else {
                console.log("⚠️ Intento de IA pero el texto aún no carga.");
            }
        }
        
        // Si no cumple biblia o no hay IA cargada, tira Catbox
        if (meMencionan || (Date.now() - ultimoEnvio > 100)) {
            await msg.reply(MENSAJE_CATBOX);
            ultimoEnvio = Date.now();
        }
    } else if (LISTA_NORMAL.includes(msg.author.id)) {
        if (meMencionan || (Date.now() - ultimoEnvio > 100)) {
            await msg.reply(MENSAJE_CATBOX);
            ultimoEnvio = Date.now();
        }
    }
});

client.login(TOKEN);
