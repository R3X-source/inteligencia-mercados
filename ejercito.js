const { Client } = require('discord.js-selfbot-v13');

// 1. COLOCA AQUÍ TUS 5 TOKENS
const tokens = [
  'MTQ1ODE1Njg2NTU5Nzk5NzM1OQ.GCYchM.2AkEfRCNi6XiRbzoOLw8X0jrhSJpUAyCl5RKsA',
  'MTQ1ODE1OTU2ODkzNTg0NjAxMA.GZSyqI.YvDg-3IlpWMELTzA8AatTVS-L8MgX5UbdnF_fg',
  'MTQ1ODYzMDYyMzE5ODU4MDgyMQ.GquFHf.di8N6wxhsuJ9bi6bbLLP-OUdMdP2ngoN1jbdYw',
  'MTQ1Njc5NzEwMzEzMjExNTE2OA.GsCeTn.phYwLtDp1doxDWHh6VsKb3749PJKr8GziGs5Sg',
  'MTQ1NzE2NDczODExNDA5MzA1Nw.GQJUI6.D-RaRgmkaJR5Xw8ONpiK8ofQ25VPU6QS_1Znbo',
  'MTQ1ODY2ODk2OTI0NTQxMzM5NA.GkzKFM.yNynd9reXNjm_NJVVWbmfllZkX2wWj4QPVRxFE',
  'MTQ1NjgyMjU4OTgxMjExMzQ4MQ.GcyXpD.aoS4r5BQdKuft77sQBKAUnQcRMUXAK_uoWxA2M',
  'MTQ1ODY3MzgwMjQ4MDQ1NTcwMg.GFTPrL.-ElvL8u67Tu2WGJMAQQl7Z3uyiSdX68WdL3yuA'
];

// 2. IDS DE CANALES
const targetChannelIDs = [
  '1440029758913122434', '1454690893042024580', '1440017458655395952', 
  '1440010210113753158', '1439802214624395266', '1239701315580592151', 
  '1240012616328544419', '1266542890767876229', '1270239207071420450', 
  '1445821478900863016', '1265446522372227145', '1429177016703516764'
];

// 3. TU MENSAJE (Asegúrate de actualizar los links si caducan)
const spamMessage = `<@1195495311045558272> <@1369070242684473485> ESOS PERFILES PINCHE PERRA QUE RISA GENERAS QUERIENDO JODER USANDO FOTO DE HOMOSEXUAL Y ENCIMA ROLEANDO CON LA PUTITA DE LONJAS  <@984956970014486528> <@1072352198836621385> CULOMBIANO ARGENCHANGAS  <@1435003733393281055> <@1400251089361567885> <@1429177016703516764>    DANIELA <@1438314463970328578> Q PSA CHILENA PUTA???? ESTAS LOCA MUJER,TE VAS A IR PRELADA <@1384045898958508085> 😂 <@1429177016703516764> CALLESE CJOTIÑA RANCHERA Q CAMBIA  <@1446586105553227807> TUS NAKGAS EVASIRAS <@1452154841676775567> DANIELA <@957014429822750771>  NALGONGA DE NEGA Q NO SE PUEDE MENXIONAR H AISLA SHE <@1423439348430405722> GORDINA TANGINA RISA COMO SE DIFUNDE LA CHICHUDA DE CEJOTIÑA Y FILTRA LA CARA DE SU HERMANITA 🤣🤣🤣🤣 RAOZN: ELLA NO VA A LA ESCUELA Y ESPECTRALA IGUAL POR ENDE ES ELLA SHE, SE TE JODERA CON ESO BASTARDA🤣🤣🤣  CJOTIÑA LA PEQUEÑA NIÑA QUE GANA MENOS DE 100 DOLARES A LA SEMANA🤣🤣 AKI EN VR PERR4 https://cdn.discordapp.com/attachments/1458157312656281653/1458660392610959514/VID_20260107_221455_207.mp4?ex=696072da&is=695f215a&hm=7f0a13a9c555dacfa7c87abb4e9fa5cf3b768bf0d8da7b91a9e38e2aea25289b& https://cdn.discordapp.com/attachments/1240674500622680094/1458308109255577734/meme.mp4?ex=695fd383&is=695e8203&hm=1ede81fc7a8663d97c5e3c46401a4ed87ecdb6dd198cf8b855ad5f1597cb9297& https://cdn.discordapp.com/attachments/1458157312656281653/1458660393382842592/VID_20260107_221514_226.mp4?ex=696072da&is=695f215a&hm=6825977ab980a32b54ecd13c080387b4a8fae3843399fed60233e5ed627b7c62& https://cdn.discordapp.com/attachments/1458157312656281653/1458660392279605409/VID_20260107_221447_038.mp4?ex=696072da&is=695f215a&hm=28577162549865bfd26c21170599020e7a71c81ad02a482ebf787d9579c3fa56& https://cdn.discordapp.com/attachments/999492218949746691/1003774279772557363/b14ca3ac3be660af02b717d8c1a35c6e-1.gif <@1455444386421674007> LILIZ MAMITH4M`;

const interval = 14000; // 12 segundos (para que 5 cuentas no saturen la IP)

function iniciarInstancia(token, index) {
  const client = new Client({ checkUpdate: false });

  client.on('ready', async () => {
    console.log(`✅ Cuenta ${index + 1} activa: ${client.user.username}`);

    const ejecutar = async () => {
      for (const id of targetChannelIDs) {
        try {
          const channel = await client.channels.fetch(id);
          await channel.send(spamMessage);
          console.log(`🚀 [${client.user.username}] Envío exitoso a ${id}`);
        } catch (err) {
          console.log(`⚠️ [${client.user.username}] Error en canal ${id}`);
        }
      }
      setTimeout(ejecutar, interval);
    };
    ejecutar();
  });

  client.login(token).catch(() => console.log(`❌ Token ${index + 1} no sirve.`));
}

// Arranca las 5 cuentas
tokens.forEach((t, i) => iniciarInstancia(t, i));
