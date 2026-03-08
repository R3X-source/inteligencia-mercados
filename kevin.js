const { Client } = require('discord.js-selfbot-v13');
const client = new Client();

// --- CONFIGURACIÓN ---

// 1. IDs de los canales donde se enviará el mensaje
const targetChannelIDs = [
  '1440029758913122434',
  '1454690893042024580',
  '1440017458655395952',
  '1440010210113753158',
  '1439802214624395266',
  '1239701315580592151',
  '1240012616328544419',
  '1266542890767876229',
  '1270239207071420450',
  '1445821478900863016',
  '1265446522372227145'
];

// 2. Tu mensaje configurado con menciones y enlaces
const spamMessage = '<@1195495311045558272> <@1369070242684473485> ESOS PERFILES PINCHE PERRA QUE RISA GENERAS QUERIENDO JODER USANDO FOTO DE HOMOSEXUAL Y ENCIMA ROLEANDO CON LA PUTITA DE LONJAS  <@984956970014486528> <@1072352198836621385> CULOMBIANO ARGENCHANGAS  <@1435003733393281055> <@1400251089361567885> <@1429177016703516764>  https://cdn.discordapp.com/attachments/1439802742431285358/1446679683390378121/image.png?ex=693585b2&is=69343432&hm=9a1047758c4cc0aa13b2ff1f3894a8a72479d7334f5ce7862c1007918195baea& https://cdn.discordapp.com/attachments/1439802742431285358/1446678231716597882/image.png?ex=69358458&is=693432d8&hm=af198b51158a8763d0706bff8352d545188a76bb0a83a6c4b494d1969da986d9& DANIELA <@1438314463970328578> Q PSA CHILENA PUTA???? ESTAS LOCA MUJER,TE VAS A IR PRELADA <@1384045898958508085> 😂 <@1429177016703516764> CALLESE CJOTIÑA RANCHERA Q CAMBIA  <@1446586105553227807> TUS NAKGAS EVASIRAS <@1452154841676775567> DANIELA <@957014429822750771> https://media.discordapp.net/attachments/1275562378427367576/1453429897681961090/meme.mp4?ex=694d6b93&is=694c1a13&hm=563194792303bb7daf887ee5d55a59a829864c1bb2a123eb16a89e91f9b024cf& NALGONGA DE NEGA Q NO SE PUEDE MENXIONAR H AISLA SHE <@1423439348430405722> GORDINA TANGINA RISA COMO SE DIFUNDE LA CHICHUDA DE CEJOTIÑA Y FILTRA LA CARA DE SU HERMANITA 🤣🤣🤣🤣 RAOZN: ELLA NO VA A LA ESCUELA Y ESPECTRALA IGUAL POR ENDE ES ELLA SHE, SE TE JODERA CON ESO BASTARDA🤣🤣🤣 https://cdn.discordapp.com/attachments/1457097099509239961/1457144094085222625/YouCut_20260103_174804058.mp4?ex=695aeeb0&is=69599d30&hm=6cf8718930b3607c5c98a73bcc577397f278cff886d05055525b0bda10b16091& CJOTIÑA LA PEQUEÑA NIÑA QUE GANA MENOS DE 100 DOLARES A LA SEMANA🤣🤣 AKI EN VR PERR4 https://cdn.discordapp.com/attachments/1456823162955239628/1457150121094680698/YouCut_20260103_181139384.mp4?ex=695af44d&is=6959a2cd&hm=b65ea307509eab793886056be6bd32affb7393bed8f4c4194b22b51cb44f045a&';

// 3. El intervalo de tiempo (8000ms = 8 segundos)
const interval = 8000;

// 4. Tu Token de Discord
const userToken = 'MTQ1ODYzMDYyMzE5ODU4MDgyMQ.GquFHf.di8N6wxhsuJ9bi6bbLLP-OUdMdP2ngoN1jbdYw';

// --- LÓGICA DEL BOT ---

client.on('ready', async () => {
  console.log(`✅ Logueado como: ${client.user.username}`);

  const startSpam = async () => {
    for (const id of targetChannelIDs) {
      try {
        const channel = await client.channels.fetch(id);
        await channel.send(spamMessage);
        console.log(`[${new Date().toLocaleTimeString()}] Mensaje enviado a: ${id}`);
      } catch (error) {
        console.error(`[!] Error enviando a ${id}: Token o ID inválido.`);
      }
    }
    setTimeout(startSpam, interval);
  };

  startSpam();
});

client.login(userToken).catch(() => {
  console.error('❌ Error de login: Revisa si el token sigue siendo válido.');
});
