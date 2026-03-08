import telebot
import requests
import time
import threading
import os
import qrcode
import config # Jala tus datos de config.py

bot = telebot.TeleBot(config.TOKEN)
ARCHIVO_LOG = "bitacora.txt"

# --- FUNCIONES DE LÓGICA ---

def obtener_datos():
    try:
        r = requests.get("https://api.exchangerate-api.com/v4/latest/USD", timeout=5)
        precio = r.json()['rates']['PEN']
        # Usamos el precio base que tenías de 3.3520
        balance = ((100 / 3.3520) * precio) - 100
        return round(precio, 4), round(balance, 4), True
    except:
        return None, None, False

def guardar_local(precio, balance):
    fecha = time.strftime("%d/%m %H:%M:%S")
    with open(ARCHIVO_LOG, "a") as f:
        f.write(f"{fecha} | S/ {precio} | Bal: {balance}\n")

# --- COMANDOS DE TELEGRAM ---

@bot.message_handler(commands=['start', 'reporte'])
def send_report(message):
    p, b, ok = obtener_datos()
    if ok:
        guardar_local(p, b)
        bot.reply_to(message, f"📊 **REPORTE R3X**\n💵 Precio: {p} S/\n💰 Balance: {b} S/\n✅ Registro actualizado.")
    else:
        bot.reply_to(message, "⚠️ Error de conexión. Intentando usar datos locales...")

@bot.message_handler(commands=['historial'])
def show_history(message):
    if os.path.exists(ARCHIVO_LOG):
        with open(ARCHIVO_LOG, "r") as f:
            lineas = f.readlines()[-10:]
            bot.send_message(message.chat.id, "📝 **ÚLTIMOS 10 REGISTROS:**\n```\n" + "".join(lineas) + "```", parse_mode="Markdown")
    else:
        bot.send_message(message.chat.id, "Bitácora vacía.")

@bot.message_handler(commands=['premium'])
def pay_service(message):
    # Generar QR dinámico
    qr = qrcode.make(config.BILLETERA_USDT)
    qr.save("pago.png")
    with open("pago.png", "rb") as photo:
        bot.send_photo(
            message.chat.id, photo, 
            caption=f"💎 **ACCESO PREMIUM**\n\nEnvía: `{config.PRECIO_BOT}`\nRed: **TRC-20**\nDirección:\n`{config.BILLETERA_USDT}`"
        )
    os.remove("pago.png")

@bot.message_handler(commands=['limpiar'])
def clean_logs(message):
    if os.path.exists(ARCHIVO_LOG):
        os.remove(ARCHIVO_LOG)
        bot.reply_to(message, "🧹 Bitácora borrada por seguridad.")

# --- VIGILANTE EN SEGUNDO PLANO ---

def vigilante():
    while True:
        p, b, ok = obtener_datos()
        if ok:
            guardar_local(p, b)
            # Solo avisa a las 9:00 AM exactas
            if time.strftime("%H:%M") == "09:00":
                bot.send_message(config.MI_ID, f"☀️ **APERTURA 9:00 AM**\nPrecio: {p} S/")
        time.sleep(600) # Revisa cada 10 min

if __name__ == "__main__":
    print("🛡️ Centinela R3X en línea...")
    threading.Thread(target=vigilante, daemon=True).start()
    bot.infinity_polling()
