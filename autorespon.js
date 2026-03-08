const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

// DATOS ACTUALIZADOS
const TOKEN = 'MTA5MzM2NjIzMDU2NTUyMzQ4Nw.GhfNpb.w87-e56_F91x1-rqXZAAOpVcegiPBW_CXFsezE';
const OBJETIVOS = [
    '1394021604127936772',
    '1423439348430405722',
    '1429177016703516764',
    '1446586105553227807',
    '1459383813930094770',
    '1457863120759423213',
    '1447142638326120458'
];

const MENSAJE = '<@1423439348430405722> OYE PUTEM NADA DE ESCAPAR AJJAJA<@1394021604127936772> <@1459383813930094770> SEGURA DE ATACAR PERRA???? SE TE VIENE APLACADA RAOIDA POR SI LAS DUFAS NITA JSKDJDJDJDJS TE HE ESTADO VIENDO CON MIEDO DESDE CURNTAS REAL PERRA MALDOT4😂😂🖕🤣🤣 '1394021604127936772',    <@1423439348430405722>,    <@1429177016703516764>,    <@1446586105553227807>,    <@1459383813930094770>,    <@1457863120759423213>,    <@1447142638326120458> Attachments: https://media.discordapp.net/attachments/1454578263807758580/1462224499989807346/IMG_20251220_160052_335.jpg?ex=696d6a2f&is=696c18af&hm=8da471229b74d196cba38d92dbb02b4c2c406447abe5bd54992ef5ed31b2d580& https://media.discordapp.net/attachments/1454578263807758580/1462224500635598848/SPOILER_InShot_20251001_222721621.mp4?ex=696d6a2f&is=696c18af&hm=6c0b4d7d221026a628b8ffb43470e83f5b22e0c3fbbf826be6c2a3b6745e39a1& https://media.discordapp.net/attachments/1454578263807758580/1462224501046509649/Screenshot_20251222_003837.jpg?ex=696d6a2f&is=696c18af&hm=ad951ae2ad27dcd90312af044a966cb3575a99f21c3a7548829bc737552e91db& https://media.discordapp.net/attachments/1454578263807758580/1462224501487173753/grok_video_2025-12-16-23-41-28.mp4?ex=696d6a2f&is=696c18af&hm=103bfed3ca2515e668202d51267e2949ba5b064f7b407bee20337528aa056ad8& https://media.discordapp.net/attachments/1454578263807758580/1462224501831110799/Screenshot_20251119_130014.jpg?ex=696d6a30&is=696c18b0&hm=2d2bc83abb7847417176e07376bbccf2ec0f0b2bf4cd502598a31afb5dc2d66f&';

// LÓGICA DE COLA Y RATE LIMIT
let ultimaRespuesta = 0;
const RATE_LIMIT = 2500;
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
