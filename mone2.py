import telebot
import requests
import time
import threading

# --- CONFIGURACIÓN ---
TOKEN = "8474716431:AAFQPaRR0EmJtmsuVs6qldI29TsMYGYmf-M"
CHAT_ID = 8498920325
WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyGHr5HTh4fsUN7YCQhQUXr5gCNd4gjHK5VaA0oB7q12pvCPIKA7fdOowcmmwt6TFcD/exec"
CAPITAL_INICIAL = 100

bot = telebot.TeleBot(TOKEN)
precio_apertura = None

def obtener_datos():
    try:
        r = requests.get("https://api.exchangerate-api.com/v4/latest/USD", timeout=10)
        precio = r.json()['rates']['PEN']
        balance = ((CAPITAL_INICIAL / 3.3520) * precio) - CAPITAL_INICIAL
        return round(precio, 4), round(balance, 4)
    except Exception as e:
        print(f"❌ Error de Red: {e}")
        return None, None

def enviar_todo(etiqueta="AUTO"):
    precio, balance = obtener_datos()
    if precio:
        fecha = time.strftime("%H:%M:%S")
        # 1. Mostrar en Termux (Para que no tengas miedo)
        print(f"✅ [{fecha}] {etiqueta} | Precio: {precio} | Balance: {balance} S/")
        
        # 2. Enviar a Excel
        try:
            res = requests.get(WEB_APP_URL, params={'fecha': fecha, 'precio': precio, 'balance': balance}, timeout=10)
            if res.status_code == 200:
                print(f"   📊 Excel actualizado con éxito.")
        except:
            print(f"   ⚠️ No se pudo enviar al Excel (Revisa internet).")
        return precio, balance
    return None, None

@bot.message_handler(commands=['start', 'reporte'])
def comando_reporte(message):
    p, b = enviar_todo("MANUAL")
    if p:
        bot.send_message(CHAT_ID, f"🛡️ **REPORTE ACTUAL**\n💵 Precio: {p} S/\n💰 Balance: {b} S/")

def bucle_vigilancia():
    global precio_apertura
    while True:
        ahora = time.strftime("%H:%M")
        p, b = enviar_todo("VIGILANCIA")
        
        if ahora == "09:00":
            precio_apertura = p
            bot.send_message(CHAT_ID, f"☀️ **MERCADO ABIERTO**\nPrecio base: {p} S/")
            
        time.sleep(600) # Cada 10 min

if __name__ == "__main__":
    print("🏰 INICIANDO CENTINELA R3X AGRESIVO...")
    # ACCIÓN INMEDIATA: Mandar datos apenas prende
    enviar_todo("INICIO")
    bot.send_message(CHAT_ID, "🛡️ Centinela R3X encendido y reportando.")
    
    threading.Thread(target=bucle_vigilancia, daemon=True).start()
    bot.infinity_polling()
