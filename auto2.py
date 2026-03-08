import discord
import time

# --- PARCHE PARA EVITAR EL ERROR DE 'NONETYPE' EN TERMUX ---
from discord.enums import Enum
class FriendFlags(Enum):
    all = 0
    none = 0
    _from_dict = classmethod(lambda cls, data: cls.none)
discord.enums.FriendFlags = FriendFlags
# ---------------------------------------------------------

TOKEN = 'MTQ1NTc3NTUxMTgzNjg4OTA4OQ.GtT0l1.jsMDgDMby4TQ6e0pmUVwEt9b0RQbH3jAjWv0JY'
ID_OBJETIVO = 1458315274007744543
MENSAJE = '0 TROLEO DE TUS NALGAS PVTITA GAMAMITA... (tu mensaje largo)'
ESPERA = 5

class MyClient(discord.Client):
    def __init__(self):
        super().__init__()
        self.ultima_respuesta = 0

    async def on_ready(self):
        print(f'>>> CONECTADO: {self.user}')
        print(f'>>> OBJETIVO: {ID_OBJETIVO}')

    async def on_message(self, message):
        if message.author.id == self.user.id:
            return
        
        if message.author.id == ID_OBJETIVO:
            ahora = time.time()
            if ahora - self.ultima_respuesta > ESPERA:
                try:
                    await message.channel.send(MENSAJE)
                    self.ultima_respuesta = ahora
                    print(f'[OK] Respondido en {message.guild.name if message.guild else "Privado"}')
                except Exception as e:
                    print(f'[ERROR]: {e}')

client = MyClient()
client.run(TOKEN)
