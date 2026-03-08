import telebot
import requests
import time
import threading

TOKEN = "8474716431:AAFQPaRR0EmJtmsuVs6qldI29TsMYGYmf-M"
CHAT_ID = 8498920325
# ASEGÚRATE QUE ESTE LINK TERMINE EN /exec
WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyGHr5HTh4fsUN7YCQhQUXr5gCNd4gjHK5VaA0oB7q12pvCPIKA7fdOowcmmwt6TFcD/exec"
CAPITAL_INICIAL = 100

bot = telebot.TeleBot(TOKEN)

# 1. FORZAR MENÚ DE COMANDOS
bot.set_my_commands([
    telebot.types.BotCommand("start", "Recargar Centinela"),
    telebot.types.BotCommand("reporte", "Estado inmediato")
])

def obtener_datos():
    try:
        r = requests.get("https://api.exchangerate-api.com/v4/latest/USD", timeout=10)
        precio = r.json()['rates']['PEN']
        balance = ((CAPITAL_INICIAL / 3.3520) * precio) - CAPITAL_INICIAL
        return round(precio, 4), round(balance, 4)
    except: return None, None

def reporte_total(fuente="SISTEMA"):
    p, b = obtener_datos()
    if p:
        ahora = time.strftime("%H:%M:%S")
        print(f"✅ [{ahora}] {fuente} -> Precio: {p} | Balance: {b}")
        
        # PROBAR EXCEL CON RESPUESTA VISIBLE
        try:
            res = requests.get(WEB_APP_URL, params={'fecha': ahora, 'precio': p, 'balance': b}, timeout=10)
            print(f"📊 EXCEL RESPONDIO: {res.status_code}")
            if res.status_code != 200:
                print("⚠️ Error: Google rechazó el dato. Revisa si la App está como 'Cualquiera'.")
        except Exception as e:
            print(f"❌ ERROR CRÍTICO EXCEL: {e}")
        return p, b
    return None, None

@bot.message_handler(commands=['start', 'reporte'])
def handle_cmds(message):
    p, b = reporte_total("USUARIO")
    bot.reply_to(message, f"🛡️ **REPORTE R3X**\n💵 Precio: {p} S/\n💰 Balance: {b} S/")

def vigilante():
    print("👀 Vigilante de 9:00 AM iniciado...")
    while True:
        ahora = time.strftime("%H:%M")
        p, b = reporte_total("VIGILANCIA")
        
        if ahora == "09:00":
            bot.send_message(CHAT_ID, f"☀️ **9:00 AM: APERTURA**\nPrecio: {p} S/")
        
        time.sleep(30) # Revisar cada 30 seg para no fallar

if __name__ == "__main__":
    print("🚀 ARRANCANDO...")
    reporte_total("INICIO_FORZADO")
    threading.Thread(target=vigilante, daemon=True).start()
    bot.infinity_polling()
