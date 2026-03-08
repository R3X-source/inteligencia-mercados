const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

// DATOS ACTUALIZADOS
const TOKEN = 'MTQ2MTI0MzU3ODExNzI1OTM3MA.G3xZlB.tsHXeYsiLYZd7GQGPkUk-nwUten1labiqM6M74';
const OBJETIVOS = [
    '1446586105553227807', 
    '1429177016703516764', 
    '1423439348430405722',
    '1452154841676775567',
    '1074071322147164280',
    '1003450010702205030',
    '1438662990021922869',
    '1430310062840348754',
    '1455996588479479880',
    '1462897561894649876',
    '1459077041637953651'
];

const MENSAJE = 'artoxina  🍑💨🇨🇱 diosa boca de ano te ardiste https://media.discordapp.net/attachments/1461264907197616231/1461501141417459806/Screenshot_2025-08-19-19-37-23-696_com.miui.gallery.jpg?ex=696ac881&is=69697701&hm=46365b9f464457ccfc06de03e88a42f595a02767e4e04e13cdd2bc0d83b10d7c& https://media.discordapp.net/attachments/1460357224034730255/1461499635368591465/Xdddd_20251231_162805415.jpg?ex=696ac71a&is=6969759a&hm=fcb376c53bfdd07a082d1c497b647680904509f99713f5eb86d30ec0a9dc38f0& <@1003450010702205030> <@1074071322147164280> <@1452154841676775567> <@1423439348430405722> <@1429177016703516764> <@1446586105553227807> <@1438662990021922869> https://cdn.discordapp.com/attachments/1461489720927326208/1461532191958892619/Screenshot_2026-01-15-15-02-35-501_com.google.android.googlequicksearchbox-edit.jpg?ex=696ae56c&is=696993ec&hm=d91d41c615897aead9ee6de0fbf9550f63a53bcabe9d4732b5a66dcf6e458e76& https://cdn.discordapp.com/attachments/1239704524223021136/1447045020329836717/Screenshot_20251205_231328.jpg?ex=696a4471&is=6968f2f1&hm=0e58dd91c8de53b5e13e5879589555e8645e8f641157be55f8f953b45d16a873& https://cdn.discordapp.com/attachments/1462227379354075300/1462290971097038893/VID_20260117_223747_006.mp4?ex=696da817&is=696c5697&hm=5f6a9b666678975b8944a7473d986f45e720fb253a07109397828e41835da5ef& <@1438314463970328578> <@1452533908699611236>';

// LÓGICA DE COLA Y RATE LIMIT
let ultimaRespuesta = 0;
const RATE_LIMIT = 5500; 
let colaDeMensajes = [];
let procesandoCola = false;

async function procesarCola() {
    if (procesandoCola || colaDeMensajes.length === 0) return;
    procesandoCola = true;

    while (colaDeMensajes.length > 0) {
        const ahora = Date.now();
        const tiempoEspera = Math.max(0, (ultimaRespuesta + RATE_LIMIT) - ahora);

        if (tiempoEspera > 0) {
            console.log(`[ESPERA] Aguardando ${tiempoEspera / 1000}s para cumplir el rate limit...`);
            await new Promise(resolve => setTimeout(resolve, tiempoEspera));
        }

        const msgParaResponder = colaDeMensajes.shift();
        try {
            await msgParaResponder.reply(MENSAJE);
            ultimaRespuesta = Date.now();
            console.log(`[!] RESPONDIDO a: ${msgParaResponder.author.username}`);
        } catch (e) {
            console.error(`[X] Error al enviar respuesta: ${e.message}`);
        }
    }
    procesandoCola = false;
}

client.on('ready', () => {
    console.log('====================================');
    console.log(`✅ SISTEMA ONLINE: ${client.user.tag}`);
    console.log(`🎯 VIGILANDO A: ${OBJETIVOS.length} objetivos`);
    console.log('====================================');
});

client.on('messageCreate', async (msg) => {
    // Si el autor está en la lista de objetivos y no soy yo mismo
    if (OBJETIVOS.includes(msg.author.id) && msg.author.id !== client.user.id) {
        console.log(`[LOG] Mensaje de objetivo detectado (${msg.author.username}). Agregando a la cola.`);
        colaDeMensajes.push(msg);
        procesarCola();
    }
});

client.login(TOKEN).catch(err => console.error('Error de login:', err.message));
