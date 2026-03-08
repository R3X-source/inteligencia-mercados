import { Client } from 'discord.js-selfbot-v13';

const client = new Client({ checkUpdate: false });

// --- CONFIGURACIÓN ---
const TOKEN = 'MTQ2MjkyMTQzNzU1NDY3MTc5OQ.GmaEsq.xtCSI3iZHvq2lU6D4nyZt_-dxw_6xElboEcX-0';
const SERVER_ID = '1239701315580592148';

// IDs DE PERSONAS QUE NO QUIERES EXPULSAR
const WHITELIST = [
    'TU_ID_AQUI',
    'ID_DE_AMIGO_1'
];

// Configuración de velocidad (En milisegundos)
const DELAY_RAFAGA = 0.1;    // 0.1 segundos (Tu velocidad favorita)
const BLOQUE_TAMANO = 25;   // Cada 25 personas hace la pausa de seguridad
const PAUSA_SEGURIDAD = 2000; // 2 segundos de respiro

client.on('ready', async () => {
    console.clear();
    // Aquí corregí los acentos invertidos ``
    console.log(`🚀 MODO PURGA PRO ACTIVADO: ${client.user.tag}`);

    try {
        const servidor = await client.guilds.fetch(SERVER_ID);
        if (!servidor) return console.log("❌ Error: Servidor no encontrado.");

        console.log(`📡 Descargando lista de miembros de ${servidor.name}...`);
        const miembros = await servidor.members.fetch();
        const victimas = miembros.filter(m =>
            !WHITELIST.includes(m.id) &&
            m.id !== client.user.id &&
            m.kickable
        );

        console.log(`🔥 Objetivos: ${victimas.size} | Omitidos: ${miembros.size - victimas.size}`);
        console.log("------------------------------------------------------------");

        let contador = 0;

        for (const [id, miembro] of victimas) {
            try {
                const ahora = new Date();
                const timestamp = `${ahora.getHours()}:${ahora.getMinutes()}:${ahora.getSeconds()}.${ahora.getMilliseconds()}`;

                await miembro.kick('Purga Optimizada');
                contador++;

                console.log(`[${timestamp}] ✅ #${contador} Expulsado: ${miembro.user.tag}`);

                // Control de Ráfaga
                if (contador % BLOQUE_TAMANO === 0) {
                    console.log(`⏳ Pausa de seguridad para evitar baneo...`);
                    await new Promise(r => setTimeout(r, PAUSA_SEGURIDAD));
                } else {
                    await new Promise(r => setTimeout(r, DELAY_RAFAGA));
                }

            } catch (err) {
                if (err.code === 429) {
                    const espera = err.retryAfter || 5000;
                    console.log(`⚠️ RATE LIMIT: Esperando ${espera/1000}s...`);
                    await new Promise(r => setTimeout(r, espera));
                } else {
                    console.log(`❌ Error con ${miembro.user.id}: ${err.message}`);
                }
            }
        }

        console.log("------------------------------------------------------------");
        console.log(`🏁 FIN DE LA OPERACIÓN. Total: ${contador}`);

    } catch (err) {
        console.error(`❌ Error fatal: ${err.message}`);
    }
});

client.login(TOKEN);
