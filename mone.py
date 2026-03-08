import telebot
import requests
import time
import threading
import matplotlib.pyplot as plt
import io
from telebot import types

# --- CONFIGURACIÓN ---
TOKEN = "8474716431:AAFQPaRR0EmJtmsuVs6qldI29TsMYGYmf-M"
CHAT_ID = 8498920325
WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyGHr5HTh4fsUN7YCQhQUXr5gCNd4gjHK5VaA0oB7q12pvCPIKA7fdOowcmmwt6TFcD/exec"
CAPITAL_INICIAL = 100

bot = telebot.TeleBot(TOKEN)
ultimo_balance = None

# --- FUNCIONES DE APOYO ---
def obtener_datos():
    try:
        r = requests.get("https://api.exchangerate-api.com/v4/latest/USD", timeout=10)
        precio = r.json()['rates']['PEN']
        balance = ((CAPITAL_INICIAL / 3.3520) * precio) - CAPITAL_INICIAL
        return round(precio, 4), round(balance, 4)
    except Exception as e:
        print(f"❌ Error API: {e}")
        return None, None

def generar_grafico(balance):
    plt.figure(figsize=(5, 3))
    plt.bar(['Base', 'Actual'], [CAPITAL_INICIAL, CAPITAL_INICIAL + balance], color=['blue', 'green' if balance >= 0 else 'red'])
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    plt.close()
    return buf

# --- VIGILANCIA (EXCEL Y ALERTAS) ---
def vigilancia_eterna():
    global ultimo_balance
    print("📡 Hilo de Vigilancia iniciado...")
    while True:
        precio, balance = obtener_datos()
        if precio:
            fecha = time.strftime("%H:%M")
            # 1. Forzar envío a Excel
            try:
                res = requests.get(WEB_APP_URL, params={'fecha': fecha, 'precio': precio, 'balance': balance}, timeout=10)
                print(f"📊 [{fecha}] Excel: {res.status_code} | Precio: {precio}")
            except Exception as e:
                print(f"⚠️ Fallo Excel: {e}")

            # 2. Alerta por cambio
            if ultimo_balance is not None and abs(balance - ultimo_balance) > 0.001:
                bot.send_message(CHAT_ID, f"🔔 **CAMBIO DETECTADO**\nNuevo Balance: {balance} S/")
            
            ultimo_balance = balance
        
        time.sleep(600) # 10 minutos

# --- COMANDOS ---
@bot.message_handler(commands=['start'])
def start(message):
    markup = types.ReplyKeyboardMarkup(resize_keyboard=True)
    markup.add('📊 Ver Reporte', '🌐 Abrir Excel')
    bot.send_message(CHAT_ID, "🏰 **Centinela R3X Activo**\nUsa los botones para consultar.", reply_markup=markup)

@bot.message_handler(func=lambda m: m.text == '📊 Ver Reporte')
def reporte(message):
    precio, balance = obtener_datos()
    if precio:
        bot.send_message(CHAT_ID, f"💵 Precio: {precio} S/\n💰 Balance: {balance} S/")
        bot.send_photo(CHAT_ID, generar_grafico(balance))

# --- ARRANQUE SEGURO ---
if __name__ == "__main__":
    print("🚀 Iniciando Centinela R3X...")
    
    # Lanzamos la vigilancia en segundo plano
    t = threading.Thread(target=vigilancia_eterna)
    t.daemon = True 
    t.start()

    # El bot principal se queda escuchando
    print("👂 Escuchando mensajes en Telegram...")
    bot.infinity_polling(timeout=60, long_polling_timeout=5)
