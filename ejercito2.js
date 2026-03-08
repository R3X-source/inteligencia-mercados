const { Client } = require('discord.js-selfbot-v13');

const tokens = [

  'MTQ1ODYzMDYyMzE5ODU4MDgyMQ.Gb1toW.tZQhuq4w6YDYceqrN5o5mPfaBfE0pOdQgaLnvc',
  'MTQ1ODg5MDYxMzY4NzcxNDA2MA.GGJTpw.N6OYu232pxVYWBKTJi5DYcFSBE0xN_Itjm0KGc',
  'MTQ1NTA2MDQ3NTAxOTY2MTQzMw.Gt9WMx.BitxJuQdC2VJbtJ2CB3zvqJ03FxJ7OlZ73UCkQ',
  'MTQ1ODY2ODk2OTI0NTQxMzM5NA.GoUl67.FhCsHSRgVzSJQMgW6xwUeWDbnWNQxLKEh-yLXg',
  'MTQ1ODY3MzgwMjQ4MDQ1NTcwMg.GTPZ_y.ga7T6XP5zloy9kGBSXbnK3r7t3ROu2wHhHvjQg' ,
  'MTQ1Njc5NzEwMzEzMjExNTE2OA.GsCeTn.phYwLtDp1doxDWHh6VsKb3749PJKr8GziGs5Sg',
  'MTQ1ODE1OTU2ODkzNTg0NjAxMA.GZSyqI.YvDg-3IlpWMELTzA8AatTVS-L8MgX5UbdnF_fg',
  'MTQ1ODE1Njg2NTU5Nzk5NzM1OQ.GCYchM.2AkEfRCNi6XiRbzoOLw8X0jrhSJpUAyCl5RKsA',
  'MTQ1NzE2NDczODExNDA5MzA1Nw.GQJUI6.D-RaRgmkaJR5Xw8ONpiK8ofQ25VPU6QS_1Znbo',
  'MTQ1NDcxODE0MDA1NDM3NjUyMA.GWY7Gw.q_x1eANxMv-bwei64ki9y6esKcq9kzJggshMdk',
  'MTQ1NTA1NzAwODY0MTMxMDg2NQ.GaJGcr.dJKrdelDe-qQoqKIJa4khmezYAiwOqI4ky-qhI',
  'MTQ1NjgyMjU4OTgxMjExMzQ4MQ.GcyXpD.aoS4r5BQdKuft77sQBKAUnQcRMUXAK_uoWxA2M',
  'MTQ1ODY2ODk2OTI0NTQxMzM5NA.GoUl67.FhCsHSRgVzSJQMgW6xwUeWDbnWNQxLKEh-yLXg',
  'MTQ1Njc5NzEwMzEzMjExNTE2OA.GsCeTn.phYwLtDp1doxDWHh6VsKb3749PJKr8GziGs5Sg',
  'MTQ1ODk2OTQwNzEzNjIwNjkzMQ.GzYzjI.nL7GJ7EUpFbS80lOixGabYUmX0RY7IimMep3To',
  'MTQ1OTE3OTAzNTQ2MzUyMDI2OA.GbLPjh.9iNfq3XHQa3b602CqMmADqCFCcsqKtuQzJp6Sg',
  'MTQ1OTE4MDMyNDg1NTc0MjYzNw.G3zUwN.lmk4cSqpVtwLV8UNjwJXnN5BGPOBnmdXu1c8Mk',
  'MTQ2MDQwODI5NjIzNzQzMjk3NA.Gw8gLg.iJ92Z9hWdx32hYRaEnqjHYHfO3G6ZeR-MNRHrQ',
  'MTQ1NjgyMjU4OTgxMjExMzQ4MQ.GEoKgz.hgtWUjPN3lu6b8E86wPrxB_7oIv3JIJrzH8-NI',
  'MTQ2MDQ4Nzg5NjY2OTc0OTM1MQ.GZe_kh.jh8Esmr8P0T0Teta6SVSMIk4jXxkzL9GErqKqg',
  'MTQ2MDQ4NTkxNzg4NTMzMzU3OQ.G2YZWm.yoYHI3QnSb-B8kclCMe1B05dhWA3RyUAAnW9L8'
];
const targetIDs = [
  '1239701315580592151', '1240012616328544419','1266542890767876229',
  '1270239207071420450', '1429177016703516764', '1460158289575805054'
];

// TU TEXTO BASE
const baseMessage = '<@1425209744603218020> INDIOTE FEO, GRACIAS A MAMI ALIA TENEMOS TODO DE TU NALGA TRAICIONADA 🤣🤣🤣🤣 <@1195495311045558272> <@1369070242684473485>  <@984956970014486528> <@1072352198836621385> CULOMBIANO ARGENCHANGAS <@1435003733393281055> <@1400251089361567885> <@1429177016703516764> DANIELA <@1438314463970328578>  <@1384045898958508085>  <@1429177016703516764>  <@1446586105553227807>  <@1452154841676775567>  <@957014429822750771>  <@1423439348430405722> GORDINA TANGINA RISA COMO SE DIFUNDE LA CHICHUDA DE CEJOTIÑA Y FILTRA LA CARA DE SU HERMANITA 🤣🤣🤣🤣 RAOZN: ELLA NO VA A LA ESCUELA Y ESPECTRALA IGUAL POR ENDE ES ELLA SHE, SE TE JODERA CON ESO BASTARDA🤣🤣🤣 CJOTIÑA LA PEQUEÑA NIÑA QUE GANA MENOS DE 100 DOLARES A LA SEMANA🤣🤣 AKI EN VR PERR4 https://cdn.discordapp.com/attachments/1458157312656281653/1458660392610959514/VID_20260107_221455_207.mp4?ex=696072da&is=695f215a&hm=7f0a13a9c555dacfa7c87abb4e9fa5cf3b768bf0d8da7b91a9e38e2aea25289b& https://cdn.discordapp.com/attachments/1240674500622680094/1458308109255577734/meme.mp4?ex=695fd383&is=695e8203&hm=1ede81fc7a8663d97c5e3c46401a4ed87ecdb6dd198cf8b855ad5f1597cb9297& https://cdn.discordapp.com/attachments/1458157312656281653/1458660393382842592/VID_20260107_221514_226.mp4?ex=696072da&is=695f215a&hm=6825977ab980a32b54ecd13c080387b4a8fae3843399fed60233e5ed627b7c62& https://cdn.discordapp.com/attachments/1458157312656281653/1458660392279605409/VID_20260107_221447_038.mp4?ex=696072da&is=695f215a&hm=28577162549865bfd26c21170599020e7a71c81ad02a482ebf787d9579c3fa56&   <@1455444386421674007> LILIZ MAMITH4M <@765971830442819674> NENA SIN MAR RIDICULA https://cdn.discordapp.com/icons/1460105084078784664/eddcac6346285f29d47ce9ed15d81e96.webp?size=2048'
const interval = 500;

function generarVariante(msg) {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
    // Agregamos el caracter al final para no arruinar el texto ni los menciones
    return `${msg} [${randomChar}]`;
}

function iniciarInstancia(token, index) {
    const client = new Client({ checkUpdate: false });

    client.on('ready', async () => {
        console.log(`✅ [${index + 1}] ${client.user.username} - EN LÍNEA`);

        const ejecutar = async () => {
            for (const id of targetIDs) {
                const finalMsg = generarVariante(baseMessage); // Crea el mensaje único
                try {
                    let channel = client.channels.cache.get(id) || await client.channels.fetch(id);
                    await channel.send(finalMsg);
                    console.log(`🚀 [${client.user.username}] -> Enviado a ID: ${id}`);
                } catch (err) {
                    try {
                        const user = await client.users.fetch(id);
                        await user.send(finalMsg);
                        console.log(`👤 [${client.user.username}] -> MD Enviado a: ${user.username}`);
                    } catch (err2) {
                        console.log(`⚠️ [${client.user.username}] -> ID ${id} fallida`);
                    }
                }
            }
            setTimeout(ejecutar, interval);
        };
        ejecutar();
    });

    client.login(token).catch(() => console.log(`❌ Token ${index + 1} KO`));
}

tokens.forEach((t, i) => iniciarInstancia(t, i));
