const { Client } = require('discord.js-selfbot-v13');

// TOKENS CONFIGURADOS
const TOKENS = [
    'MTQ1NDcxODE0MDA1NDM3NjUyMA.GWY7Gw.q_x1eANxMv-bwei64ki9y6esKcq9kzJggshMdk',
    'MTQ2MTI0NDMxNzkwODg2NTEyOQ.GMe4tV.PX1kOTRoVayf0t3bUDP5sgnc9fyiP3OvmNx0no'
];

// IDs DE CANALES PARA EL SPAM
const CANALES_OBJETIVO = [
    '1239701315580592151', '1240012616328544419', '1266542890767876229', '1270239207071420450' // Añade los IDs de los canales donde quieres el spam
];

const TEXTO_MENSAJE = `<@1423439348430405722> OYE PUTEM NADA DE ESCAPAR AJJAJA <@1394021604127936772> <@1459383813930094770> SEGURA DE ATACAR???? SE TE VIENE APLACADA RAPIDA POR SI LAS DUDAS TE HE ESTADO VIENDO CON MIEDO DESDE CUENTAS REAL 😂🖕🤣🤣 <@1394021604127936772> <@1423439348430405722> <@1429177016703516764> <@1446586105553227807> <@1459383813930094770> <@1457863120759423213> <@1447142638326120458> <@1133823431293542461> femba`;

const ARCHIVOS = [
    'https://cdn.discordapp.com/attachments/1462227379354075300/1462290971097038893/VID_20260117_223747_006.mp4?ex=69724557&is=6970f3d7&hm=6f24557ac19bfc724842ab6caa7762e4b7e8dd2c40bacf42f4f6ac035c05a87c&'
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const iniciarSpam = async (token) => {
    const client = new Client({ checkUpdate: false });

    client.on('ready', async () => {
        console.log(`[+] SESIÓN ACTIVA: ${client.user.tag}`);
        
        while (true) {
            for (const canalID of CANALES_OBJETIVO) {
                try {
                    const canal = await client.channels.fetch(canalID);
                    if (canal) {
                        await canal.send({
                            content: TEXTO_MENSAJE,
                            files: ARCHIVOS
                        });
                        console.log(`[!] ${client.user.username} -> Mensaje enviado.`);
                    }
                } catch (e) {
                    console.error(`[X] Error en ${client.user.username}: ${e.message}`);
                    if (e.message.includes('rate limited')) {
                        await sleep(5000); // Si hay limitación, espera 5 seg extras
                    }
                }
                // ESPERA DE 2 A 4 SEGUNDOS ENTRE MENSAJES
                await sleep(Math.floor(Math.random() * (4000 - 2000 + 1)) + 2000);
            }
        }
    });

    client.login(token).catch(() => console.log(`Error al loguear un token.`));
};

// Arrancar las 5 cuentas con un desfase mínimo de 1.5 segundos
(async () => {
    for (const token of TOKENS) {
        iniciarSpam(token);
        await sleep(1500); 
    }
})();
