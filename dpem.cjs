const { Client } = require('discord.js-selfbot-v13');
const client = new Client();

// --- TU CONFIGURACIÓN MANTENIDA ---

const targetChannelIDs = [
  '1469357448665104592'
];

const spamMessage = '@sam32678.<@1467397075204309034> <@1456448797403119903> PVTITA NALGA AGUADA AGUDA JSKSHDJEKD <@1432913588619579518> *la penetra*';

const interval = 4000;

const userToken = 'MTQ2NzczMTE1NDQ4NzQ4MDQzNQ.G86emN.2aZHIyWJ35FJSahz2l2KfuvfBuP2t94PHipfy4';

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
