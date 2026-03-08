import { Client } from 'discord.js-selfbot-v13';
                                                      // --- INICIALIZACIÓN DEL CLIENTE ---
const client = new Client({ checkUpdate: false });    
// --- TU TOKEN ---                                   
const TOKEN = 'MTQ3OTU1NzUyOTI0MjcwMTg0OQ.GOyl8m.fatxZuFCgDN3QgTJeWKAFt9xDTHbA6xpu5u-io';                   
const OBJETIVOS = [
    '1457984414121459856', '1429177016703516764', '1446586105553227807',
    '1467397075204309034', '1447142638326120458', '1479748142722191514',
    '1466878653932634195'                             ];
                                                      const ID_USUARIA_SIN_PING = '1310098567590969405';
                                                      const MENSAJE_LARGO = `QUIERES PENE CEJOTIÑA? DALE CEJOTORRA JAKSJSJSJS https://cdn.discordapp.com/attachments/1478635459365179433/1478659994659328030/InShot_20260303_203821072.mp4?ex=69a9ddae&is=69a88c2e&hm=13b42b17f1eac8c21b2bb9a9cbf36cfac8ad7eb221322404bb4387adb6f000b2& <@1457984414121459856> PERRA VEN A GRASOSAS Y ACEPTA SOLICIYUD JAJAJAJJAJAJJAA `
                                                      const MENSAJE_SIN_PING = "Neko fuck <@1384340161625591880>";                                                
let cooldown = 0;                                     
client.on('ready', () => {                                console.log(`✅ Auto-respondedor activo: ${client.user.tag}`);                                          });

// --- LÓGICA DE MENSAJES ---
client.on('messageCreate', async (msg) => {
    if (msg.author.id === client.user.id) return;     
    const ahora = Date.now();                         
    if (msg.author.id === ID_USUARIA_SIN_PING) {              let esRespuestaAMi = false;
        if (msg.reference) {                                      try {
                const original = await msg.channel.messages.fetch(msg.reference.messageId);
                esRespuestaAMi = original.author.id === client.user.id;
            } catch (e) {}                                    }
        const meMenciono = msg.mentions.has(client.user.id);
                                                              if (esRespuestaAMi || meMenciono) {
            try {                                                     await msg.channel.send(MENSAJE_SIN_PING);                                                                   cooldown = ahora;
            } catch (e) {}                                    }
        return;                                           }
                                                          if (OBJETIVOS.includes(msg.author.id) && msg.mentions.has(client.user.id)) {                                    try {
            await msg.reply({ content: MENSAJE_LARGO });
            cooldown = ahora;                                     return;
        } catch (e) {}                                    }
                                                          if (OBJETIVOS.includes(msg.author.id) && ahora - cooldown > 100) {                                              try {
            await msg.reply({ content: MENSAJE_LARGO });
            cooldown = ahora;                                 } catch (e) {}
    }                                                 });

// --- LÓGICA DE REACCIONES (NUEVO) ---
client.on('messageReactionAdd', async (reaction, user) => {
    if (user.id === client.user.id) return; // Ignora si tú mismo reaccionas
    
    // Solo si reaccionan a UN MENSAJE TUYO
    if (reaction.message.author.id !== client.user.id) return;

    const ahora = Date.now();
    
    // Si la usuaria especial reacciona a tu mensaje
    if (user.id === ID_USUARIA_SIN_PING) {
        try {
            await reaction.message.channel.send(MENSAJE_SIN_PING);
            cooldown = ahora;
        } catch (e) {}
        return;
    }

    // Si alguien de la lista de objetivos reacciona a tu mensaje
    if (OBJETIVOS.includes(user.id) && ahora - cooldown > 100) {
        try {
            await reaction.message.channel.send(MENSAJE_LARGO);
            cooldown = ahora;
        } catch (e) {}
    }
});

client.login(TOKEN);
