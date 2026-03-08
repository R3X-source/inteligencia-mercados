import telebot
import requests
import time
import threading

# --- CREDENCIALES VERIFICADAS ---
TOKEN = "8474716431:AAFQPaRR0EmJtmsuVs6qldI29TsMYGYmf-M"
CHAT_ID = 8498920325
WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyGHr5HTh4fsUN7YCQhQUXr5gCNd4gjHK5VaA0oB7q12pvCPIKA7fdOowcmmwt6TFcD/exec"
CAPITAL_INICIAL = 100

bot = telebot.TeleBot(TOKEN)
ultimo_balance = None

# --- FUNCIÓN DE CÁLCULO ---
def obtener_datos():
    try:
        r = requests.get("https://api.exchangerate-api.com/v4/latest/USD", timeout=15)
        precio_actual = r.json()['rates']['PEN']
        balance = ((CAPITAL_INICIAL / 3.3520) * precio_actual) - CAPITAL_INICIAL
        return round(precio_actual, 4), round(balance, 4)
    except:
        return None, None

# --- ESCUCHA DE MENSAJES (COMANDOS) ---
@bot.message_handler(func=lambda message: True)
def responder_mensajes(message):
    if message.chat.id == CHAT_ID:
        precio, balance = obtener_datos()
        if precio:
            respuesta = (f"🛡️ **ESTADO ACTUAL**\n"
                         f"💵 Precio USD: {precio} S/\n"
                         f"💰 Balance: {balance} S/\n"
                         f"📊 Capital: {CAPITAL_INICIAL} S/")
            bot.reply_to(message, respuesta)
        else:
            bot.reply_to(message, "⚠️ Error al conectar con el mercado.")

# --- VIGILANCIA AUTOMÁTICA ---
def vigilancia_automatica():
    global ultimo_balance
    while True:
        precio, balance = obtener_datos()
        if precio:
            fecha = time.strftime("%H:%M")
            # Enviar a Google Sheets
            try:
                requests.get(WEB_APP_URL, params={'fecha': fecha, 'precio': precio, 'balance': balance}, timeout=15)
            except: pass

            # Notificar solo si hay cambios
            if ultimo_balance is not None and balance != ultimo_balance:
                emoji = "🚀" if balance > ultimo_balance else "📉"
                bot.send_message(CHAT_ID, f"{emoji} **CAMBIO DETECTADO**\nBalance: {balance} S/")
            
            ultimo_balance = balance
        time.sleep(600)

# --- INICIO DEL SISTEMA ---
if __name__ == "__main__":
    print("🏰 Centinela R3X en línea y escuchando...")
    # Iniciar la vigilancia en un hilo separado
    hilo_vigilancia = threading.Thread(target=vigilancia_automatica)
    hilo_vigilancia.daemon = True
    hilo_vigilancia.start()
    
    # Iniciar la escucha de mensajes
    bot.infinity_polling()
