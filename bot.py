from telethon import TelegramClient, events
from telethon.tl.functions.messages import GetBotCallbackAnswerRequest
import asyncio

# Planos de la Obra
api_id = 32033135
api_hash = 'bc24e8648686348937dfc1fee4365bd8'
phone = '+51916763094' # <-- ASEGÚRATE DE PONER TU NÚMERO AQUÍ
bot_objetivo = '@Dogecoin_Click_Bot' 
mi_wallet = 'TU_BILLETERA_DE_TRUST_WALLET' # <-- PEGA TU DIRECCIÓN AQUÍ

client = TelegramClient('obra_maestra', api_id, api_hash)

async def main():
    await client.start(phone)
    print("🚀 [SISTEMA] HIEZLIZER conectado. Iniciando producción...")
    
    # Iniciar el bot
    await client.send_message(bot_objetivo, '/visit')
    
    @client.on(events.NewMessage(chats=bot_objetivo))
    async def handler(event):
        # Si el bot nos da un mensaje de visita
        if 'Go to website' in event.message.message:
            url = event.message.reply_markup.rows[0].buttons[0].url
            print(f"🔗 [VISITA] Abriendo: {url}")
            
            # Simulamos tiempo de lectura humano (15-20 seg)
            await asyncio.sleep(20)
            print("💰 [ÉXITO] Tarea completada. Sumando al saldo.")
            
            # Pedir la siguiente tarea automáticamente
            await client.send_message(bot_objetivo, '/visit')

        elif 'Sorry, there are no new ads' in event.message.message:
            print("⏳ [PAUSA] Sin material. Reintentando en 5 minutos...")
            await asyncio.sleep(300)
            await client.send_message(bot_objetivo, '/visit')

    print("👷‍♂️ [TRABAJO] El obrero está en el sitio. ¡Buen provecho con el frito!")
    await client.run_until_disconnected()

asyncio.run(main())
