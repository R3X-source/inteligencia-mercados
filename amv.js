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

// Corregido: Se eliminaron las comillas triples y se unificó el texto
const MENSAJE = '<@1423439348430405722> OYE PUTEM NADA DE ESCAPAR AJJAJA <@1394021604127936772> <@1459383813930094770> SEGURA DE ATACAR???? SE TE VIENE APLACADA RAPIDA POR SI LAS DUDAS TE HE ESTADO VIENDO CON MIEDO DESDE CUENTAS REAL 😂🖕🤣🤣 <@1394021604127936772> <@1423439348430405722> <@1429177016703516764> <@1446586105553227807> <@1459383813930094770> <@1457863120759423213> <@1447142638326120458> Attachments: https://media.discordapp.net/attachments/1454578263807758580/1462226479869067469/Screenshot_20251222_003837.jpg?ex=696d6c07&is=696c1a87&hm=a3746ae779c1dc2cc607830792c7dd1b2f1075c90b0b899ebea0abcf25b2e7b3& https://media.discordapp.net/attachments/1454578263807758580/1462226480296755385/IMG_20251220_160052_335.jpg?ex=696d6c07&is=696c1a87&hm=82ac2791a097e91342d6820748fa2b9e8c7360d0d3fa768681ca5cec391e7338& https://media.discordapp.net/attachments/1454578263807758580/1462226480745676810/SPOILER_InShot_20251001_222721621.mp4?ex=696d6c07&is=696c1a87&hm=944ec40b145f38ddc70e3039d221cf6f0f56a0caa093c3d2f81afc34bc7a2cc2& https://media.discordapp.net/attachments/1454578263807758580/1462226481169170689/grok_video_2025-12-16-23-41-28.mp4?ex=696d6c07&is=696c1a87&hm=70b6a764c11a83d0923fd62cdd94f6809450da1b0c291627fba625528344f339& https://media.discordapp.net/attachments/1454578263807758580/1462226482079338639/Screenshot_20251119_130014.jpg?ex=696d6c08&is=696c1a88&hm=0e217406e0902f2166212f9e33b913e3bcba3b7e0e4ff79d1a279da821b71783& https://cdn.discordapp.com/attachments/1462227379354075300/1462290971097038893/VID_20260117_223747_006.mp4?ex=696da817&is=696c5697&hm=5f6a9b666678975b8944a7473d986f45e720fb253a07109397828e41835da5ef&';

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
    if (OBJETIVOS.includes(msg.author.id) && msg.author.id !== client.user.id) {
        console.log(`[LOG] Mensaje de objetivo detectado (${msg.author.username}). Agregando a la cola.`);
        colaDeMensajes.push(msg);
        procesarCola();
    }
});

client.login(TOKEN).catch(err => console.error('Error de login:', err.message));
