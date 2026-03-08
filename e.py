import httpx
import asyncio
import discord
from discord.ext import commands

# --- PARCHE PARA EL ERROR 'NoneType' ---
from discord import enums
def patch_friend_flags():
    original_from_dict = enums.FriendFlags._from_dict
    def new_from_dict(data):
        if data is None: return original_from_dict({'all': True})
        return original_from_dict(data)
    enums.FriendFlags._from_dict = new_from_dict

patch_friend_flags()
# ---------------------------------------

TOKEN = 'MTA5MzM2NjIzMDU2NTUyMzQ4Nw.GhfNpb.w87-e56_F91x1-rqXZAAOpVcegiPBW_CXFsezE'
OBJETIVOS = [
    1394021604127936772, 1423439348430405722, 1429177016703516764,
    1446586105553227807, 1459383813930094770, 1457863120759423213,
    1447142638326120458
]

MENCIONES = "<@1423439348430405722> <@1394021604127936772> <@1459383813930094770>"
TEXTO_ATAQUE = "OYE PUTEM NADA DE ESCAPAR AJJAJA. SEGURA DE ATACAR???? SE TE VIENE APLACADA RAPIDA POR SI LAS DUDAS. TE HE ESTADO VIENDO CON MIEDO 😂🖕🤣🤣"
LINKS = (
    "https://media.discordapp.net/attachments/1454578263807758580/1462224499989807346/IMG_20251220_160052_335.jpg\n"
    "https://media.discordapp.net/attachments/1454578263807758580/1462224500635598848/SPOILER_InShot_20251001_222721621.mp4\n"
    "https://media.discordapp.net/attachments/1454578263807758580/1462224501046509649/Screenshot_20251222_003837.jpg"
)
MENSAJE_FINAL = f"{MENCIONES}\n{TEXTO_ATAQUE}\n\n{LINKS}"

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
        "message_reference": {"channel_id": str(channel_id), "message_id": str(message_id)}
    }
    async with httpx.AsyncClient() as client:
        try:
            r = await client.post(url, json=payload, headers=HEADERS)
            if r.status_code == 200:
                print(f"✅ Respuesta enviada con éxito.")
            else:
                print(f"❌ Error HTTPX: {r.status_code}")
        except Exception as e:
            print(f"⚠️ Fallo: {e}")

@bot.event
async def on_ready():
    print(f"--- SISTEMA ONLINE: {bot.user} ---")

@bot.event
async def on_message(message):
    global ultima_respuesta
    if message.author.id in OBJETIVOS and message.author.id != bot.user.id:
        ahora = asyncio.get_event_loop().time()
        if ahora - ultima_respuesta < RATE_LIMIT:
            await asyncio.sleep(RATE_LIMIT - (ahora - ultima_respuesta))
        print(f"🎯 Detectado: {message.author.name}")
        await enviar_con_httpx(message.channel.id, message.id)
        ultima_respuesta = asyncio.get_event_loop().time()

bot.run(TOKEN)
