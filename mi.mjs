import { Client } from 'discord.js-selfbot-v13';

const client = new Client({ checkUpdate: false });

// --- CONFIGURACIÓN ---
const TOKEN = 'MTQ2ODAxNzI3NjY2MTAwNjU5Mw.GBv0l2.PvW930XIyeBrr-gKUZ5cA4JghgkIo-97aS8k3A';
const SERVER_ID = '1468017909308850342';

// IDs DE PERSONAS QUE NO QUIERES EXPULSAR (Pon las IDs aquí)
const WHITELIST = [
    'TU_ID_AQUI', 
    'ID_DE_AMIGO_1',
    'ID_DE_AMIGO_2'
];

// Configuración de velocidad (Equilibrio máximo)
const DELAY_RAFAGA = 1; // Milisegundos entre cada expulsión
const BLOQUE_TAMANO = 25; // Cada 25 personas, hace una pausa más larga
const PAUSA_SEGURIDAD = 2000; // 2 segundos de respiro tras cada bloque

client.on('ready', async () => {
    console.clear();
    console.log(🚀 MODO PURGA PRO ACTIVADO: ${client.user.tag});

    try {
        const servidor = await client.guilds.fetch(SERVER_ID);
        if (!servidor) return console.log("❌ Error: Servidor no encontrado.");

        console.log(📡 Descargando lista de miembros de ${servidor.name}...);
        const miembros = await servidor.members.fetch();
        const victimas = miembros.filter(m => 
            !WHITELIST.includes(m.id) && 
            m.id !== client.user.id && 
            m.kickable
        );

        console.log(🔥 Objetivos: ${victimas.size} | Omitidos: ${miembros.size - victimas.size});
        console.log("------------------------------------------------------------");

        let contador = 0;
        
        for (const [id, miembro] of victimas) {
            try {
                const ahora = new Date();
                const timestamp = ${ahora.getHours()}:${ahora.getMinutes()}:${ahora.getSeconds()}.${ahora.getMilliseconds()};

                await miembro.kick('Purga Optimizada');
                contador++;
                
                console.log([${timestamp}] ✅ #${contador} Expulsado: ${miembro.user.tag});

                // Control de Ráfaga
                if (contador % BLOQUE_TAMANO === 0) {
                    console.log(⏳ Pausa de seguridad para evitar baneo de cuenta...);
                    await new Promise(r => setTimeout(r, PAUSA_SEGURIDAD));
                } else {
                    await new Promise(r => setTimeout(r, DELAY_RAFAGA));
                }

            } catch (err) {
                if (err.code === 429) {
                    const espera = err.retryAfter || 5000;
                    console.log(⚠️ RATE LIMIT: Esperando ${espera/1000}s...);
                    await new Promise(r => setTimeout(r, espera));
                } else {
                    console.log(❌ Error con ${miembro.user.id}: ${err.message});
                }
            }
        }

        console.log("------------------------------------------------------------");
        console.log(🏁 FIN DE LA OPERACIÓN. Total: ${contador});

    } catch (err) {
        console.error(❌ Error fatal: ${err.message});
    }
});

client.login(TOKEN);
