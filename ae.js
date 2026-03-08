import { Client } from 'discord.js-selfbot-v13';
import axios from 'axios';

const client = new Client({ checkUpdate: false });

const TOKEN = 'MTQ2NzczMTE1NDQ4NzQ4MDQzNQ.G25L1J.FWIMpA3g68ERtW-9CCNX0k19sj0Kfq2LVSPqvw';
const GROQ_API_KEY = 'Gsk_MG2M6cRHnse8UbDppgkeWGdyb3FYuzHEAz88ZIV4n4oKmutWgOsX'; 

// --- LISTAS DE IDS ---
const OBJETIVOS_TEXTOS_LARGOS = [
    '1460498617218367612' // ID de gamalordroidero28
]; 

const OBJETIVOS_ESTATICOS = [
    '1394021604127936772', '1423439348430405722', '1429177016703516764',
    '1446586105553227807', '1459383813930094770', '1457863120759423213',
    '1456448797403119903', '1158183553130057758', '1438662990021922869',
    '1455444386421674007', '1310098567590969405', '1452533908699611236', '1459077041637953651',
    '1455763102225268898', '1432913588619579518', '1467397075204309034', '1458314974794616902',
    '1394020780983058603', '1403986874153832550', '1464354934785839155',
    '1399500980889976902', '1462897561894649876', '1470141542374310077',
    '1466878653932634195', '984956970014486528', '1441255392565919754', '1423757188551147751'
];

const MENSAJE_LARGO = `0 TROLEO DE TUS NALGAS PVTITA GAMAMITA MIS HUEBOTS INSOPORTABLES PARA TUS POBRES NALGAS Q NI LAS DEJAREMOS EXTENDER PUESTO A Q ACABAMOS  <@1446586105553227807> <@1429177016703516764> <@1426606724458217674>  <@1423439348430405722> <@1271616299851583580>  <@1438662990021922869> <@1455444386421674007> <@1452533908699611236> <@1459077041637953651> <@1455763102225268898> <@1458314974794616902>  <@1394020780983058603> <@1403986874153832550> <@1464354934785839155> <@1399500980889976902> <@1462897561894649876> <@1470141542374310077> CEJOTIÑA <@1438314463970328578> <@1072352198836621385> <@1466878653932634195> <@984956970014486528> <@1386330375952793723> https://files.catbox.moe/d0wcx2.mp4 <@1441255392565919754> <@1423757188551147751>`;

let textoPreGenerado = "";
let contadorUsoTextoIA = 0;
let cooldown = 0;

async function preGenerarTexto() {
    try {
        const resp = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
            model: "llama-3.3-70b-versatile",
            messages: [{
                role: "system",
                content: "Humano insultando crudo, ranchero, shitposting agresivo. UNA SOLA LÍNEA SIN PUNTOS NI SIGNOS. 1250-1400 caracteres. Emojis: 🤣🤣🫵🫵🖕🖕. Lore: Asereje, lencería para GD, negrita cachetona, Wink le tiró los canales, gatea en Vimeo, ayuda de Gamamita/Gemini/Master."
            }, { role: "user", content: "Genera el ataque masivo." }]
        }, { headers: { 'Authorization': `Bearer ${GROQ_API_KEY}` } });
        textoPreGenerado = resp.data.choices[0].message.content;
        contadorUsoTextoIA = 0;
        console.log("✅ IA Cargada");
    } catch (e) { setTimeout(preGenerarTexto, 5000); }
}

client.on('ready', async () => {
    console.log(`✅ Bot activo: ${client.user.tag}`);
    await preGenerarTexto();
});

client.on('messageCreate', async (msg) => {
    if (msg.author.id === client.user.id) return;
    const ahora = Date.now();
    const meMenciono = msg.mentions.has(client.user.id);

    // CASO 1: LA ID ES DE "TEXTOS LARGOS" (IA)
    if (OBJETIVOS_TEXTOS_LARGOS.includes(msg.author.id)) {
        // ¿Mención + Texto largo + IA lista + No spam? -> IA
        if (meMenciono && msg.content.length >= 350 && textoPreGenerado !== "" && contadorUsoTextoIA < 5) {
            if (ahora - cooldown > 5000) {
                try {
                    await msg.reply({ content: textoPreGenerado.substring(0, 1400) });
                    contadorUsoTextoIA++;
                    cooldown = ahora;
                    preGenerarTexto(); 
                    return;
                } catch (e) {}
            }
        }
        // Si no cumple lo de arriba, manda Catbox (pero solo si me menciona o por cooldown)
        if (meMenciono || (ahora - cooldown > 100)) {
            try { await msg.reply({ content: MENSAJE_LARGO }); cooldown = ahora; } catch (e) {}
        }
        return; // IMPORTANTE: Termina aquí para que no ejecute la lógica de abajo
    }

    // CASO 2: ID ANTIGUA NORMAL
    if (OBJETIVOS_ESTATICOS.includes(msg.author.id)) {
        if (meMenciono || (ahora - cooldown > 100)) {
            try { await msg.reply({ content: MENSAJE_LARGO }); cooldown = ahora; } catch (e) {}
        }
    }
});

client.login(TOKEN);
