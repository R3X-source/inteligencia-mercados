import { Client } from 'discord.js-selfbot-v13';

const client = new Client({ checkUpdate: false });

// --- DATOS ---
const TOKEN = 'MTQ2MDQ5ODYxNzIxODM2NzYxMg.G_BpDO.V-ixtjnK5zcdafbd3PxKa6slwxSuH4oz6aNY7s';

// Limpiamos las IDs por si acaso
const OBJETIVOS = [
    '1394021604127936772', '1423439348430405722', '1429177016703516764',
    '1446586105553227807', '1459383813930094770', '1457863120759423213',
    '1456448797403119903', '1158183553130057758', '1438662990021922869',
    '1455444386421674007', '1310098567590969405', '1452533908699611236', 
    '1459077041637953651', '1455763102225268898', '1432913588619579518',
    '1467397075204309034', '1399500980889976902'
].map(id => id.trim());

const ID_USUARIA_SIN_PING = '1310098567590969405';
const MENSAJE_LARGO = `0 TROLEO DE TUS NALGAS PVTITA GAMAMITA... [PON AQUÍ TU TEXTO COMPLETO]`;

client.on('ready', () => {
    console.log(`🚀 ATAQUE INICIADO EN: ${client.user.tag}`);
});

client.on('messageCreate', async (msg) => {
    if (msg.author.id === client.user.id) return;

    // Esto te confirmará en pantalla si la ID que lee es IGUAL a alguna de la lista
    const esObjetivo = OBJETIVOS.includes(msg.author.id);
    console.log(`[REVISANDO] Usuario: ${msg.author.username} | ID: ${msg.author.id} | ¿Es objetivo?: ${esObjetivo}`);

    if (esObjetivo) {
        try {
            // Intentamos enviar directamente al canal
            await msg.channel.send(MENSAJE_LARGO);
            console.log(`🔥 ¡DISPARO HECHO a ${msg.author.username}!`);
        } catch (err) {
            console.log(`❌ NO PUDE RESPONDER: ${err.message}`);
        }
    }

    // Respuesta a la usuaria especial
    if (msg.author.id === ID_USUARIA_SIN_PING && msg.mentions.has(client.user.id)) {
        msg.channel.send("Neko fuck <@1384340161625591880>").catch(() => {});
    }
});

client.login(TOKEN);
