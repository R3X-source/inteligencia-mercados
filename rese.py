import requests
import re
import time
import telebot
from threading import Thread

# === DATOS DE IDENTIDAD ===
TOKEN = "8316264775:AAH-QF4z5ZMhevMEStxeh7TX8U1N-mt19W8"
CHAT_ID = 8498920325  # ID actualizado
bot = telebot.TeleBot(TOKEN)

class SistemaResiliente:
    def __init__(self):
        self.headers = {"User-Agent": "Mozilla/5.0"}
        self.ultima_dif = 0

    def obtener_precios(self):
        try:
            # Scraping de las dos fuentes principales
            r_html = requests.get("https://www.rextie.com/", timeout=10).text
            wu_html = requests.get("https://www.westernunion.com/pe/es/home.html", timeout=10).text
            
            # Buscamos los valores del dólar (formato 3.XXXX)
            r = [float(n) for n in re.findall(r'3\.\d{3,4}', r_html)][0]
            wu = [float(n) for n in re.findall(r'3\.\d{3,4}', wu_html)][0]
            dif = round(abs(r - wu), 4)
            return r, wu, dif
        except Exception:
            return None, None, None

    def vigilancia_eterna(self):
        print("🏗️  SISTEMA DE VIGILANCIA ONLINE...")
        while True:
            r, wu, dif = self.obtener_precios()
            # Alerta si la brecha es mayor a 0.05 soles
            if r and dif > 0.05 and dif != self.ultima_dif:
                msg = (f"🚨 *¡BRECHA DETECTADA!*\n"
                       f"--------------------------\n"
                       f"🏢 Rextie: S/ {r}\n"
                       f"🌍 WU: S/ {wu}\n"
                       f"⚡ Diferencia: *S/ {dif}*\n\n"
                       f"💰 Ganancia por $1000: *S/ {round(dif*1000, 2)}*")
                try:
                    bot.send_message(CHAT_ID, msg, parse_mode="Markdown")
                    self.ultima_dif = dif
                except:
                    print("⚠️ No pude enviar el mensaje. Asegúrate de haber iniciado el bot.")
            time.sleep(60)

# === INTERFAZ DE COMANDOS ===
@bot.message_handler(commands=['precio', 'dolar'])
def enviar_precio(message):
    r, wu, dif = sistema.obtener_precios()
    if r:
        bot.reply_to(message, f"📊 *ESTADO ACTUAL:*\n\n🏢 Rextie: {r}\n🌍 WU: {wu}\n⚖️ Spread: {dif}")
    else:
        bot.reply_to(message, "⏳ Las fuentes están ocupadas, intenta en unos segundos.")

@bot.message_handler(commands=['status'])
def enviar_status(message):
    bot.reply_to(message, "✅ *V7.0 ONLINE*\nID: 8498920325\nMonitoreo: Activo")

# === LANZAMIENTO ===
if __name__ == "__main__":
    sistema = SistemaResiliente()
    # Hilo secundario para que la vigilancia no bloquee los comandos
    Thread(target=sistema.vigilancia_eterna, daemon=True).start()
    
    print("🤖 Bot conectado. Usa Ctrl+C o 'pkill -9 python' para cerrar.")
    
    # Bucle de reconexión infinita
    while True:
        try:
            bot.infinity_polling(timeout=20, long_polling_timeout=10)
        except Exception as e:
            print(f"🔄 Reconectando... {e}")
            time.sleep(10)
