import httpx
import asyncio
import discord
from discord.ext import commands

# 1. DATOS DE CONEXIÓN
TOKEN = 'MTQ2Mjk0ODI1MDQ2NTA3OTU3MA.GDFylC.k-wBlkSYsoAGkJj5kzrltBwXaV99T5a6fz0NQk'

# 2. LISTA DE OBJETIVOS (ID numérico)
OBJETIVOS = [
   "1451280807627981066"
]

# 3. ORGANIZACIÓN DEL MENSAJE
# Menciones principales
MENCIONES = "<@1423439348430405722> <@1394021604127936772> <@1459383813930094770>"
TEXTO_ATAQUE = "OYE PUTEM NADA DE ESCAPAR AJJAJA. SEGURA DE ATACAR???? SE TE VIENE APLACADA RAPIDA POR SI LAS DUDAS. TE HE ESTADO VIENDO CON MIEDO DESDE CUENTAS REAL 😂🖕🤣🤣"

# Links de archivos (organizados por líneas)
LINKS = (
    "https://media.discordapp.net/attachments/1454578263807758580/1462224499989807346/IMG_20251220_160052_335.jpg\n"
    "https://media.discordapp.net/attachments/1454578263807758580/1462224500635598848/SPOILER_InShot_20251001_222721621.mp4\n"
    "https://media.discordapp.net/attachments/1454578263807758580/1462224501046509649/Screenshot_20251222_003837.jpg"
)

# Unión final del mensaje
MENSAJE_FINAL = f"{MENCIONES}\n{TEXTO_ATAQUE}\n\n{LINKS}"

# 4. CONFIGURACIÓN DE SEGURIDAD (HTTPX)
HEADERS = {
    "Authorization": TOKEN,
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
}

bot = commands.Bot(command_prefix="!", self_bot=True)
ultima_respuesta = 0
RATE_LIMIT = 2.5

async def enviar_con_httpx(channel_id, message_id):
    url = f"https://discord.com/api/v9/channels/{channel_id}/messages"
    payload = {
        "content": MENSAJE_FINAL,
        "message_reference": {
            "channel_id": str(channel_id),
            "message_id": str(message_id)
        }
    }

    async with httpx.AsyncClient() as client:
        try:
            r = await client.post(url, json=payload, headers=HEADERS)
            if r.status_code == 200:
                print(f"✅ [OK] Respuesta enviada al canal: {channel_id}")
            else:
                print(f"❌ [ERROR] Status {r.status_code}")
        except Exception as e:
            print(f"⚠️ [FALLO] {e}")

@bot.event
async def on_ready():
    print(f"--- SISTEMA ONLINE | USUARIO: {bot.user} ---")
    print(f"--- VIGILANDO {len(OBJETIVOS)} OBJETIVOS ---")

@bot.event
async def on_message(message):
    global ultima_respuesta
    if message.author.id in OBJETIVOS and message.author.id != bot.user.id:
        ahora = asyncio.get_event_loop().time()
        if ahora - ultima_respuesta < RATE_LIMIT:
            await asyncio.sleep(RATE_LIMIT - (ahora - ultima_respuesta))

        print(f"🎯 Detectado: {message.author.name} ({message.author.id})")
        await enviar_con_httpx(message.channel.id, message.id)
        ultima_respuesta = asyncio.get_event_loop().time()

bot.run(TOKEN)
