const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

const TOKEN = 'MTQ1NTc3NTUxMTgzNjg4OTA4OQ.GtT0l1.jsMDgDMby4TQ6e0pmUVwEt9b0RQbH3jAjWv0JY';
const OBJETIVOS = ['1426606724458217674', '1458315274007744543'];
const MENSAJE = '0 TROLEO DE TUS NALGAS PVTITA GAMAMITA VAS A TENER Q CHUPAR MIS HUEBOTS QUE VAN A SER INSOPORTABLES PARA TUS POBRES NALGAS Q NI LAS DEJAREMOS EXTENDER PUESTO A Q ACABAMOS con la putita de cjotiña 🤣 🤣🤣😂😂😂 viniste por vengaza y te tiras bien penetrada putit4 rolera jsjsjaja. burla a chatarrera gamamita do monclova https://youtu.be/L4Rm6ofojoA ENTENDISTE ZORR4??? NOSOTROS COMO BUENOS SWATEANOS TE APLACAMOS FEO LA PANOCHA GAMAMITA 🤣🤣🤣🤣 HEY PUTA TE TOCARÁ FILTRAR A TU MACHA INSANA POR ANDAR HABLANDO DE TU NALGA Y PIDIENDO Q NO, O TENES MIEDO PERR4???? <@1446586105553227807> CHATARRERA GAMAMITA VIOLADA 🤣 PESORRAZO MONCLOVEÑI GAMAMITEANO <@1429177016703516764> <@1426606724458217674> callese indiaka irrelevante pe Attachments: https://media.discordapp.net/attachments/1430982734066749604/1460382350620753993/Screenshot_20251116_223554.jpg?ex=6966b68c&is=6965650c&hm=e50c8d475a0140b5f337733b8eb295d888b56d5de9e7dec169aa2a9cd4a68307& https://media.discordapp.net/attachments/1430982734066749604/1460382350939652310/SPOILER_Screenshot_2025-11-03-11-48-34-947_com.ludashi.superboost-edit.jpg?ex=6966b68d&is=6965650d&hm=20b8e36df513232c93ade5e775a3a4aa9e4a9bb0be6be51cf54d426f27145a61& https://media.discordapp.net/attachments/1430982734066749604/1460382351468007689/IMG_20251012_182350.jpg?ex=6966b68d&is=6965650d&hm=401078b4e33327527078de379416c194671ba860e88b3b5a4f0ea2f03e2b175a& https://media.discordapp.net/attachments/1430982734066749604/1460382351841296527/Screenshot_2023-02-02-19-52-33-94_f9ee0578fe1cc94de7482bd41accb329.jpg?ex=6966b68d&is=6965650d&hm=9dc8457d1a78abb0cedb531d52c9e733c94979d92faa3874583880cbdcb09cba& https://cdn.discordapp.com/icons/1460105084078784664/eddcac6346285f29d47ce9ed15d81e96.webp?size=2048'

// Variable para controlar el tiempo (Rate Limit)
let ultimaRespuesta = 0;
const RATE_LIMIT = 5000; // 5 segundos en milisegundos

client.on('ready', () => {
    console.log(`\n✅ SISTEMA ONLINE: ${client.user.tag}`);
    console.log(`📡 Respondiendo con reply (5s de cooldown) a ${OBJETIVOS.length} objetivos.\n`);
});

client.on('messageCreate', async (msg) => {
    // Si el autor es uno de los objetivos
    if (OBJETIVOS.includes(msg.author.id)) {
        if (msg.author.id === client.user.id) return;
        
        const ahora = Date.now();
        
        // Verificar si ya pasaron los 5 segundos
        if (ahora - ultimaRespuesta > RATE_LIMIT) {
            try {
                // USAMOS .reply() para que sea respuesta directa
                await msg.reply(MENSAJE);
                ultimaRespuesta = ahora;
                console.log(`[!] Respondido con reply a: ${msg.author.username}`);
            } catch (e) {
                console.log(`[X] Error al enviar: ${e.message}`);
            }
        } else {
            console.log(`[.] Ignorando mensaje de ${msg.author.username} (Cooldown activo)`);
        }
    }
});

client.login(TOKEN);
