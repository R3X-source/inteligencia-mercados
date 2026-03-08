import discord
import time
import asyncio

# --- DATOS ---
TOKEN = 'MTQ1NTc3NTUxMTgzNjg4OTA4OQ.GtT0l1.jsMDgDMby4TQ6e0pmUVwEt9b0RQbH3jAjWv0JY'
ID_OBJETIVO = 1458315274007744543
MENSAJE = '0 TROLEO DE TUS NALGAS PVTITA GAMAMITA... (tu mensaje largo)'

class MyClient(discord.Client):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.ultima_respuesta = 0

    async def on_ready(self):
        print(f'\n===============================')
        print(f'¡CONECTADO CON ÉXITO!')
        print(f'Usuario: {self.user}')
        print(f'===============================\n')

    async def on_message(self, message):
        if message.author.id == ID_OBJETIVO:
            ahora = time.time()
            if ahora - self.ultima_respuesta > 5:
                try:
                    await message.channel.send(MENSAJE)
                    self.ultima_respuesta = ahora
                    print(f'>>> Respondido en {message.guild.name if message.guild else "Privado"}')
                except Exception as e:
                    print(f'>>> Error al enviar: {e}')

# CONFIGURACIÓN DE CONEXIÓN AGRESIVA
client = MyClient(
    chunk_guilds_at_startup=False,
    heartbeat_timeout=60.0,
    guild_subscriptions=False
)

try:
    client.run(TOKEN)
except Exception as e:
    print(f'Error crítico de conexión: {e}')
