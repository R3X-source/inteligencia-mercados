import discord
from discord.ext import commands
import asyncio  # Necesario para el tiempo de espera

TOKEN = 'MTQ2Mjk0MjE0NjIwMTEyNDkwNQ.G3Jcrh.Dw3fWQwNpH4GdPwLovA1qaSJEA7Z-EkJK39FgM'
SERVER_ID = "1239701315580592148"

bot = commands.Bot(command_prefix='!', self_bot=True)

@bot.command()
async def ejecutar(ctx):
    guild = bot.get_guild(SERVER_ID)

    if guild is None:
        print("Servidor no encontrado.")
        return

    print(f'Limpiando {guild.name}...')

    for member in guild.members:
        if member.id != bot.user.id:
            try:
                await member.kick(reason="Limpieza")
                print(f'Expulsado: {member.name}')

                # --- CONTROL DE RATE LIMIT ---
                # Espera 2 segundos entre cada expulsión
                await asyncio.sleep(0.1)

            except discord.Forbidden:
                print(f'Error: No tienes rango suficiente para sacar a {member.name}')
            except discord.HTTPException as e:
                if e.status == 429: # Error de Rate Limit
                    print("¡Cuidado! Discord nos está frenando. Esperando 30 segundos...")
                    await asyncio.sleep(30)
                else:
                    print(f'Error: {e}')

    print("Proceso finalizado.")

bot.run(TOKEN)
