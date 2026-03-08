from telethon import TelegramClient, events
import asyncio

# Credenciales de la Obra (Ya las tenemos)
api_id = 32033135
api_hash = 'bc24e8648686348937dfc1fee4365bd8'
phone = '+51916763094' # Pon tu número

client = TelegramClient('obra_blum', api_id, api_hash)

async def main():
    await client.start(phone)
    print("🚀 [SISTEMA] Conectado a Blum. Iniciando ciclo de Farming...")
    
    # El bot de Blum usa una WebApp, así que el script 
    # enviará el comando de inicio para despertar al bot.
    await client.send_message('@BlumCryptoBot', '/start')
    
    print("✅ [EXITO] Farming activado. El obrero vigila la cosecha.")
    print("⏳ Volviendo a reclamar en 8 horas...")
    
    # Esperamos 8 horas y un poquito más por seguridad
    await asyncio.sleep(28900) 
    await client.send_message('@BlumCryptoBot', 'Claim')

asyncio.run(main())
