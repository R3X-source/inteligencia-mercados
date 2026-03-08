import sys

# Engañamos al script para que crea que curl_cffi no existe
sys.modules['curl_cffi'] = None 

import discord
from discord.ext import commands
import asyncio

# --- CONFIGURACIÓN ---
TOKEN = 'MTQ2Mjk0MjE0NjIwMTEyNDkwNQ.G3Jcrh.Dw3fWQwNpH4GdPwLovA1qaSJEA7Z-EkJK39FgM'
SERVER_ID = 1239701315580592148 # Pon la ID de tu server aquí

# En selfbots, a veces es necesario desactivar los pre-checks
bot = commands.Bot(command_prefix='!', self_bot=True)

@bot.event
async def on_ready():
    print(f'Conectado como: {bot.user}')
    print(f'Listo para trabajar en el server ID: {SERVER_ID}')

@bot.command()
async def ejecutar(ctx):
    # Verificamos que estamos en el server correcto
    guild = bot.get_guild(SERVER_ID)
    
    if not guild:
        print("No se encontró el servidor. ¿Estás seguro de que la ID es correcta?")
        return

    print(f'Iniciando en: {guild.name}')
    
    # Lista de miembros
    members = guild.members
    
    for member in members:
        if member.id == bot.user.id:
            continue # No te saca a ti
            
        try:
            await member.kick(reason="Acción rápida")
            print(f'Se fue: {member.name}')
            
            # Rate limit de seguridad para evitar ban de cuenta
            await asyncio.sleep(1) 
            
        except discord.Forbidden:
            print(f'Sin permisos para: {member.name}')
        except discord.HTTPException as e:
            if e.status == 429: # Demasiadas peticiones
                print("Discord nos bloqueó por un momento. Esperando 60 segundos...")
                await asyncio.sleep(60)
            else:
                print(f'Error: {e}')

bot.run(TOKEN)
