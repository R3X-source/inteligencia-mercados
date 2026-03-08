from telethon import TelegramClient, events
import asyncio

# Credenciales de la Obra
api_id = '32033135'
api_hash = 'bc24e8648686348937dfc1fee4365bd8'
phone = '+51916763094' # Ejemplo: +51999888777

client = TelegramClient('sesion_obra', api_id, api_hash)

async def main():
    await client.start(phone)
    print("✅ Obra conectada. Buscando bot de pagos...")
    
    # Objetivo: Bot de LTC/TRX Click Bot (uno de los más estables)
    bot_objetivo = '@LTC_Click_Bot' 
    
    await client.send_message(bot_objetivo, '/visit')
    print("🚀 Empezando a visitar sitios automáticamente...")

    @client.on(events.NewMessage(chats=bot_objetivo))
    async def handler(event):
        if 'Go to website' in event.message.message:
            url = event.message.reply_markup.rows[0].buttons[0].url
            print(f"🔗 Visitando: {url}")
            # Aquí el script simula la visita
            await asyncio.sleep(10) 
            print("💰 Tarea completada. Esperando siguiente...")

    await client.run_until_disconnected()

asyncio.run(main())
