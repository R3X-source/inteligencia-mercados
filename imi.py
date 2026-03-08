import discord
import asyncio
import random
from datetime import datetime, timedelta

# --- CONFIGURACIÓN ---
TOKEN = "MTQ1NDE4ODUzMjM4MDczMzQ3MA.GF7OH7.xDXkx5CCJCfk7NAENHPC9l3DozrjIfd5NnJago"
ID_VICTIMA = '1467397075204309034', '1386330375952793723'  # La ID a la que vamos a imitar e insultar
IDS_CANALES = [1469357448665104592] # Canales permitidos

# --- TU REPERTORIO DEFAULT ---
MIS_FRASES = [
    "SOY TU TÍO EL Q COMPARTE TU ANISERU PU",
    "TE CONFUNDÍ EL PEDORRO SOE AKI WARSZLA AND EDUARDO",
    "GANÓ TU ANLG4 SEBTONEANDO PENMARRANA",
    "SENTONESTE AL EDUATDO SHE",
    "TE HUELE LA BAJINA A ATÚN SHE",
    "Q CULITO DE ARJENTA SHE",
    "POS TE VEO EL ANUTE",
    "NO POS TE CLAVO EL AGUION",
    "J4J4J4 TU CULO SJE",
    "MAMIT4M",
    "NO POS TU KUKAN SHE",
    "SHAKITAM BI"
]

client = discord.Client()
ultima_actividad = {} # Para rastrear el tiempo de silencio

@client.event
async def on_ready():
    print(f'Bot activado. Objetivo fijado en: {ID_VICTIMA}')

@client.event
async def on_message(message):
    global ultima_actividad

    # Evitar que el bot se responda a sí mismo o lea otros canales
    if message.author.id == client.user.id or message.channel.id not in IDS_CANALES:
        return

    # LÓGICA PRINCIPAL: Solo si es la ID de la víctima
    if message.author.id == ID_VICTIMA:
        ahora = datetime.utcnow()
        
        # 1. IMITACIÓN TOTAL (Copia lo que dijo)
        # Aplicamos tu regla de 0.1s de espera base
        await asyncio.sleep(0.1)
        
        # Pausa aleatoria de tus notas (entre 5 y 10s) para no ser baneado rápido
        await asyncio.sleep(random.uniform(5, 10))

        async with message.channel.typing():
            # Imitación del mensaje original
            contenido_espejo = message.content
            archivos = [await a.to_file() for a in message.attachments]
            await message.channel.send(content=f"Imitando: {contenido_espejo}", files=archivos)
            
            # 2. INSULTO CON MENCIÓN (Acoso)
            await asyncio.sleep(2) # Breve pausa entre imitar e insultar
            insulto = f"<@{ID_VICTIMA}> {random.choice(MIS_FRASES)}"
            await message.channel.send(insulto)

        # Actualizar la última vez que habló
        ultima_actividad[ID_VICTIMA] = ahora

# TAREA EN SEGUNDO PLANO: Revisa si la víctima se calló por 2 minutos
async def check_silencio():
    await client.wait_until_ready()
    while not client.is_closed():
        ahora = datetime.utcnow()
        if ID_VICTIMA in ultima_actividad:
            diferencia = (ahora - ultima_actividad[ID_VICTIMA]).total_seconds()
            
            if diferencia >= 120: # 2 minutos de silencio
                # Aquí el bot deja de hacer nada hasta que la víctima escriba otra vez
                # Solo imprimimos en la consola de Termux para que tú sepas
                print(f"La víctima se calló. Tiempo en silencio: {diferencia}s")
                # Limpiamos para que no spamee el log
                del ultima_actividad[ID_VICTIMA]
        
        await asyncio.sleep(30) # Revisa cada 30 segundos

# Ejecutar el check de silencio junto con el bot
client.loop.create_task(check_silencio())
client.run(TOKEN, bot=False)
