import telebot
import requests
import time
import threading

# --- CONFIGURACIÓN LIGERA ---
TOKEN = "8474716431:AAFQPaRR0EmJtmsuVs6qldI29TsMYGYmf-M"
CHAT_ID = 8498920325
WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyGHr5HTh4fsUN7YCQhQUXr5gCNd4gjHK5VaA0oB7q12pvCPIKA7fdOowcmmwt6TFcD/exec"
CAPITAL_INICIAL = 100

bot = telebot.TeleBot(TOKEN)
precio_apertura = None  # Se fijará a las 9:00 AM
ultimo_precio_conocido = 3.75 # Por si te quedas sin internet

def obtener_datos():
    global ultimo_precio_conocido
    try:
        r = requests.get("https://api.exchangerate-api.com/v4/latest/USD", timeout=10)
        precio = r.json()['rates']['PEN']
        ultimo_precio_conocido = precio
        balance = ((CAPITAL_INICIAL / 3.3520) * precio) - CAPITAL_INICIAL
        return round(precio, 4), round(balance, 4), False
    except:
        # Modo Offline: usa el último precio que guardó en memoria
        balance = ((CAPITAL_INICIAL / 3.3520) * ultimo_precio_conocido) - CAPITAL_INICIAL
        return ultimo_precio_conocido, round(balance, 4), True

def crear_barra(balance):
    # Gráfico de texto: [||||||....]
    if balance > 0: return "📈 " + "🟢" * min(int(balance*2)+1, 10)
    if balance < 0: return "📉 " + "🔴" * min(int(abs(balance)*2)+1, 10)
    return "⚪ Estable"

@bot.message_handler(commands=['start', 'reporte'])
def enviar_reporte(message):
    precio, balance, offline = obtener_datos()
    aviso_red = "⚠️ (Modo Offline)" if offline else "✅ En línea"
    barra = crear_barra(balance)
    
    # Lógica de comparación con la apertura
    comp_apertura = ""
    if precio_apertura:
        dif = round(precio - precio_apertura, 4)
        comp_apertura = f"\nVar. desde 9AM: {'+' if dif >= 0 else ''}{dif}"

    texto = (f"🏰 **CENTINELA R3X REPORT**\n"
             f"{'--'*10}\n"
             f"💵 Precio: {precio} S/{comp_apertura}\n"
             f"💰 Balance: {balance} S/\n"
             f"{barra}\n"
             f"{'--'*10}\n"
             f"{aviso_red}")
    bot.send_message(CHAT_ID, texto)

def vigilancia_9am():
    global precio_apertura
    while True:
        ahora = time.strftime("%H:%M")
        precio, balance, offline = obtener_datos()
        
        # Captura de apertura
        if ahora == "09:00":
            precio_apertura = precio
            bot.send_message(CHAT_ID, f"☀️ **APERTURA DE MERCADO**\nPrecio base fijado: {precio} S/")

        # Registro en Excel (solo si hay internet)
        if not offline:
            try: requests.get(WEB_APP_URL, params={'fecha': ahora, 'precio': precio, 'balance': balance}, timeout=10)
            except: pass
        
        time.sleep(60) # Revisa el reloj cada minuto

if __name__ == "__main__":
    print("🚀 Centinela R3X 'Light' activado. Sin gráficos para cuidar el cel.")
    threading.Thread(target=vigilancia_9am, daemon=True).start()
    bot.infinity_polling()
