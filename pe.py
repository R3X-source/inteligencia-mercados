import discord
from discord.ext import commands
import asyncio

# --- CONFIGURACIÓN DE OBRA ---
TOKEN_USUARIO = 'MTQ2ODAxNzI3NjY2MTAwNjU5Mw.GBv0l2.PvW930XIyeBrr-gKUZ5cA4JghgkIo-97aS8k3A'
ID_SERVIDOR = 1468017909308850342
TIEMPO_ESPERA = 0.1  # Tu delay de 0.1s por miembro
IDS_EXCLUIDAS = [111222333444, 555666777888]
# -----------------------------

client = commands.Bot(command_prefix="!", self_bot=True)

@client.event
async def on_ready():
    print(f"✅ Arquitecto en línea: {client.user}")
    print(f"⏱️ Delay por miembro: {TIEMPO_ESPERA}s")

@client.command()
async def purga(ctx):
    if ctx.guild.id != ID_SERVIDOR:
        return

    print(f"🏗️ Iniciando demolición en: {ctx.guild.name}")
    
    mi_rol_alto = ctx.author.top_role
    conteo = 0

    for member in ctx.guild.members:
        # Lógica de protección
        if member.id != ctx.author.id and \
           member.id not in IDS_EXCLUIDAS and \
           member.top_role < mi_rol_alto:
            
            try:
                await member.kick(reason="Limpieza de fantasmas")
                conteo += 1
                print(f"🔨 [{conteo}] Expulsado: {member.name}")
                await asyncio.sleep(TIEMPO_ESPERA)
            except Exception as e:
                # Si falla con uno, el script NO se detiene y sigue con el siguiente
                print(f"❌ Error con {member.name}: {e}")
        else:
            print(f"🛡️ Saltado: {member.name}")

    print(f"✨ Obra terminada. {conteo} personas sacadas.")

client.run(TOKEN_USUARIO)
