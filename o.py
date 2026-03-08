import discord
from discord.ext import commands
import httpx
import asyncio

# --- CONFIGURACIÓN ---
TOKEN = 'MTQ2Mjk0ODI1MDQ2NTA3OTU3MA.GDFylC.k-wBlkSYsoAGkJj5kzrltBwXaV99T5a6fz0NQk'
OBJETIVOS = [
    "1451280807627981066"
]

MENCIONES = "<@1423439348430405722> <@1394021604127936772> <@1459383813930094770>"
TEXTO = "OYE PUTEM NADA DE ESCAPAR AJJAJA. SEGURA DE ATACAR???? SE TE VIENE APLACADA RAPIDA POR SI LAS DUDAS 😂🖕🤣🤣"
LINKS = "https://media.discordapp.net/attachments/1454578263807758580/1462224499989807346/IMG_20251220_160052_335.jpg"
MENSAJE_FINAL = f"{MENCIONES}\n{TEXTO}\n{LINKS}"

# Headers para simular navegador
HEADERS = {
    "Authorization": TOKEN,
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
}

# Usamos discord.Client básico para evitar errores de comandos complejos
client = discord.Client(self_bot=True)

async def responder_httpx(channel_id, message_id):
    url = f"https://discord.com/api/v9/channels/{channel_id}/messages"
    payload = {
        "content": MENSAJE_FINAL,
        "message_reference": {"message_id": str(message_id)}
    }
    async with httpx.AsyncClient() as session:
        await session.post(url, json=payload, headers=HEADERS)

@client.event
async def on_ready():
    print(f"🚀 AUTO-RESPONDEDOR GLOBAL ONLINE: {client.user}")

@client.event
async def on_message(message):
    # Si el que escribe es uno de los objetivos...
    if message.author.id in OBJETIVOS and message.author.id != client.user.id:
        print(f"🎯 Detectado en {message.channel}: {message.author.name}")
        await responder_httpx(message.channel.id, message.id)
        await asyncio.sleep(2) # Respetar rate limit

# EJECUCIÓN
try:
    client.run(TOKEN)
except Exception as e:
    print(f"⚠️ Error al conectar: {e}")
