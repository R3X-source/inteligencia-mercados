import { Client } from 'discord.js-selfbot-v13';
const client = new Client();

// --- TU CONFIGURACIÓN MANTENIDA ---

const targetChannelIDs = [
  '1369174476574687243',
  '1369174478596345897',
  '1379141308131835914',
  '1369174479825145856',
  '1369180836582133820',
  '1369181058490175488'
];

const spamMessage = 'PUES MIRA MARRANA SOY TU TÍO PEDOFILO DE 40 AÑOS CON EL Q TE PELEASTE CHE Y ME HE UNIDO A LA CJ SOLO PARA REÍRME DE TI POR NALGAVEÑA Y POR LA MICHOACANA DE KEVINA🤣🤣🤣  <@1457984414121459856> https://cdn.discordapp.com/attachments/1479539451771490482/1479541930789437632/Screenshot_20251222_003837.jpg?ex=69ac6a4c&is=69ab18cc&hm=988e7bfce0d1556ef08c0d194ac692646cb3178d0c1677ba23f1b3e840af5951& PERRA VEN A GRASOSAS Y ACEPTA SOLICIYUD JAJAJQJAJA';

const interval = 7500;

const userToken = 'MTQ3OTU1NzUyOTI0MjcwMTg0OQ.GOyl8m.fatxZuFCgDN3QgTJeWKAFt9xDTHbA6xpu5u-io';

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
