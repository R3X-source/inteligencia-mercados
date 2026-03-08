import telebot
import requests
import time
import threading
import os

# --- CONFIGURACIÓN ---
TOKEN = "8474716431:AAFQPaRR0EmJtmsuVs6qldI29TsMYGYmf-M"
CHAT_ID = 8498920325
CAPITAL_INICIAL = 100
ARCHIVO_LOCAL = "bitacora.txt"

bot = telebot.TeleBot(TOKEN)

# Configurar Comandos
bot.set_my_commands([
    telebot.types.BotCommand("start", "Reiniciar"),
    telebot.types.BotCommand("reporte", "Ver precio y balance"),
    telebot.types.BotCommand("historial", "Ver últimos registros"),
    telebot.types.BotCommand("limpiar", "Borrar bitácora local")
])

def obtener_datos():
    try:
        r = requests.get("https://api.exchangerate-api.com/v4/latest/USD", timeout=5)
        precio = r.json()['rates']['PEN']
        balance = ((CAPITAL_INICIAL / 3.3520) * precio) - CAPITAL_INICIAL
        return round(precio, 4), round(balance, 4), True
    except:
        return None, None, False

def guardar_local(precio, balance):
    fecha = time.strftime("%d/%m %H:%M:%S")
    linea = f"{fecha} | S/ {precio} | Bal: {balance}\n"
    with open(ARCHIVO_LOCAL, "a") as f:
        f.write(linea)

@bot.message_handler(commands=['reporte'])
def comando_reporte(message):
    p, b, online = obtener_datos()
    if online:
        guardar_local(p, b)
        bot.reply_to(message, f"📊 **REPORTE ACTUAL**\n💵 Precio: {p} S/\n💰 Balance: {b} S/\n✅ Guardado en bitácora.")
    else:
        bot.reply_to(message, "⚠️ Sin conexión. No pude obtener datos nuevos.")

@bot.message_handler(commands=['historial'])
def ver_historial(message):
    if os.path.exists(ARCHIVO_LOCAL):
        with open(ARCHIVO_LOCAL, "r") as f:
            lineas = f.readlines()
            # Mostrar solo las últimas 10 líneas
            resumen = "".join(lineas[-10:])
            bot.send_message(CHAT_ID, f"📝 **ÚLTIMOS REGISTROS:**\n```\n{resumen}```", parse_mode="Markdown")
    else:
        bot.send_message(CHAT_ID, "La bitácora está vacía.")

@bot.message_handler(commands=['limpiar'])
def limpiar_bitacora(message):
    if os.path.exists(ARCHIVO_LOCAL):
        os.remove(ARCHIVO_LOCAL)
        bot.send_message(CHAT_ID, "🧹 Bitácora local eliminada por seguridad.")
    else:
        bot.send_message(CHAT_ID, "No hay nada que limpiar.")

def vigilante_silencioso():
    while True:
        p, b, online = obtener_datos()
        if online:
            guardar_local(p, b)
            print(f"✅ Auto-registro: S/ {p}")
        time.sleep(600) # Auto-guarda cada 10 minutos

if __name__ == "__main__":
    print("🚀 Centinela R3X: Blindaje Local Activado.")
    threading.Thread(target=vigilante_silencioso, daemon=True).start()
    bot.infinity_polling()
