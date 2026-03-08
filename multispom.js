const { Client } = require('discord.js-selfbot-v13');

const TOKENS = [
    'MTQ1NjgyMjU4OTgxMjExMzQ4MQ.GEoKgz.hgtWUjPN3lu6b8E86wPrxB_7oIv3JIJrzH8-NI',
    'MTQ1NDcxODE0MDA1NDM3NjUyMA.GWY7Gw.q_x1eANxMv-bwei64ki9y6esKcq9kzJggshMdk',
    'MTQ1ODg5MDYxMzY4NzcxNDA2MA.GGJTpw.N6OYu232pxVYWBKTJi5DYcFSBE0xN_Itjm0KGc',
    'MTQ2MDgxNjYxMDE1ODgzNzkyOA.GjHUah.rZgis7liTVvFmxwOHOrqd0glZ4wYpF_XVI5rK4',
    'MTQ2MDg0NTk0ODk3MTM4ODkyOA.GOA1St.-tX32kj2YIVQUeTSniGvGiSvm0N2Vds57i9Ry0'
];

const CANALES_OBJETIVO = ['1239701315580592151', '1240012616328544419', '1266542890767876229', '1270239207071420450'];

// Unimos el texto y los links en una sola cadena para máxima velocidad
const MENSAJE_FINAL = `<@1423439348430405722> OYE PUTEM NADA DE ESCAPAR AJJAJA <@1394021604127936772> <@1459383813930094770> SEGURA DE ATACAR???? SE TE VIENE APLACADA RAPIDA POR SI LAS DUDAS TE HE ESTADO VIENDO CON MIEDO DESDE CUENTAS REAL 😂🖕🤣🤣 <@1394021604127936772> <@1423439348430405722> <@1429177016703516764> <@1446586105553227807> <@1459383813930094770> <@1457863120759423213> <@1447142638326120458>

https://media.discordapp.net/attachments/1454578263807758580/1462226479869067469/Screenshot_20251222_003837.jpg?ex=696d6c07&is=696c1a87&hm=a3746ae779c1dc2cc607830792c7dd1b2f1075c90b0b899ebea0abcf25b2e7b3&

https://cdn.discordapp.com/attachments/1462227379354075300/1462290971097038893/VID_20260117_223747_006.mp4?ex=696e50d7&is=696cff57&hm=c129d3515587d160184ad6182b15c6073f479653ff94322fcff64cbf0e48fa2a&`;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const iniciarSpam = async (token) => {
    const client = new Client({ checkUpdate: false });

    client.on('ready', async () => {
        console.log(`[+] SESIÓN ACTIVA: ${client.user.tag}`);
        
        while (true) {
            for (const canalID of CANALES_OBJETIVO) {
                try {
                    const canal = await client.channels.fetch(canalID).catch(() => null);
                    if (canal) {
                        // Enviamos todo como contenido de texto para evitar errores de buffer
                        await canal.send(MENSAJE_FINAL);
                        console.log(`[!] ${client.user.username} -> Enviado.`);
                    } else {
                        console.log(`[X] ${client.user.username} -> Sin acceso al canal ${canalID}`);
                    }
                } catch (e) {
                    console.error(`[X] Error en ${client.user.username}: ${e.message}`);
                    if (e.message.includes('rate limited')) await sleep(10000);
                }
                // Espera de 2 a 4 segundos
                await sleep(Math.floor(Math.random() * 2000) + 2000);
            }
        }
    });

    client.login(token).catch(() => console.log(`Token inválido.`));
};

(async () => {
    for (const token of TOKENS) {
        iniciarSpam(token);
        await sleep(2000); // 2 segundos entre inicios para estabilidad
    }
})();
