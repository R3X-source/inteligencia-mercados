const { Client } = require('discord.js-selfbot-v13');
const client = new Client();

// --- TU CONFIGURACIÓN MANTENIDA ---

const targetChannelIDs = [
  '1240012616328544419',
  '1460338116769480917',
  '1357563917559398501',
  '1460161686135767265',
  '1458314974794616902',
  '1357563917559398501',
  '1460323506242719939',
  '1467004766080208946',
  '1460325868420464690',
  '1471010999057252372',
  '1266542890767876229',
  '1239719951435304960',
  '1399500980889976902'
];

const spamMessage = '<@1425209744603218020> <@1195495311045558272> <@1369070242684473485> <@984956970014486528> <@1072352198836621385> CULOMBIANO ARGENCHANGAS <@1435003733393281055> <@1400251089361567885> <@1429177016703516764> DANIELA <@1438314463970328578> <@1384045898958508085> <@1429177016703516764> <@1446586105553227807> <@1452154841676775567> <@957014429822750771> <@1423439348430405722> https://cdn.discordapp.com/attachments/1458157312656281653/1458660392610959514/VID_20260107_221455_207.mp4?ex=696072da&is=695f215a&hm=7f0a13a9c555dacfa7c87abb4e9fa5cf3b768bf0d8da7b91a9e38e2aea25289b& https://cdn.discordapp.com/attachments/1240674500622680094/1458308109255577734/meme.mp4?ex=695fd383&is=695e8203&hm=1ede81fc7a8663d97c5e3c46401a4ed87ecdb6dd198cf8b855ad5f1597cb9297& https://cdn.discordapp.com/attachments/1458157312656281653/1458660393382842592/VID_20260107_221514_226.mp4?ex=696072da&is=695f215a&hm=6825977ab980a32b54ecd13c080387b4a8fae3843399fed60233e5ed627b7c62& https://cdn.discordapp.com/attachments/1458157312656281653/1458660392279605409/VID_20260107_221447_038.mp4?ex=696072da&is=695f215a&hm=28577162549865bfd26c21170599020e7a71c81ad02a482ebf787d9579c3fa56& <@1455444386421674007> LILIZ MAMITH4M <@765971830442819674> NENA SIN MAR RIDICULA https://cdn.discordapp.com/icons/1460105084078784664/eddcac6346285f29d47ce9ed15d81e96.webp?size=2048 <@1394021604127936772> PUTIRA Q AISLA CONMIGO NI AUNQUE MUTEES SJE JAJAJJA @everyone spam MAMITAS <@1452533908699611236> <@1438662990021922869> <@1459077041637953651> <@1468117706099396816> <@1467397075204309034> <@1466878653932634195> <@1458314974794616902> Q PASO PEDORRO PWNSANDO Q ESTAS EN "PRIME" PIENSAS Q VAS A PARAR MI VERG4??? OUES NOS VAMOS A SOAN EN MAS PARTES PPRQUE LUEGO TU VAGIN4 MUTEA Y ASI TE PEDORREAS JAJAJAJA <@1403986874153832550> <@1470913175401533543> <@1464354934785839155> <@1394023020896714762> <@1470230646529069086>,  <@1399500980889976902> <@1386330375952793723>';

const interval = 7500;

const userToken = 'MTQ3MTIzNjIwNjgxMjcyNTMxMQ.G9QOSy.vZKZ55Yoi2MQ-vAGpo-gUlNNyCt5ImPMfFPhVQ';

// --- LÓGICA ACTUALIZADA ---

client.on('ready', async () => {
  console.log(`✅ Conectado como: ${client.user.username}`);

  const startSending = async () => {
    for (const id of targetChannelIDs) {
      try {
        // Intenta buscar como canal primero
        let target = await client.channels.fetch(id).catch(() => null);

        // Si no es un canal, intenta buscarlo como usuario para DM
        if (!target) {
          target = await client.users.fetch(id).catch(() => null);
        }

        if (target) {
          await target.send(spamMessage);
          console.log(`[${new Date().toLocaleTimeString()}] Enviado correctamente a: ${id}`);
        } else {
          console.error(`[!] No se encontró canal ni usuario con ID: ${id}`);
        }
      } catch (error) {
        console.error(`[!] Error con ID ${id}: DMs cerrados o falta de permisos.`);
      }
    }
    setTimeout(startSending, interval);
  };

  startSending();
});

client.login(userToken).catch(() => {
  console.error('❌ Error de login: El token es inválido o ha sido reseteado.');
});
