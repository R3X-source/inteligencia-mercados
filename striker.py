import requests
import re
import time
import telebot
from threading import Thread

# === DATOS DE IDENTIDAD ===
TOKEN = "8316264775:AAH-QF4z5ZMhevMEStxeh7TX8U1N-mt19W8"
CHAT_ID = 8498920325
bot = telebot.TeleBot(TOKEN)

class ArquitectoEterno:
    def __init__(self):
        self.ultima_dif = 0
        self.historial_brechas = []

    def obtener_data(self):
        try:
            r_h = requests.get("https://www.rextie.com/", timeout=10).text
            w_h = requests.get("https://www.westernunion.com/pe/es/home.html/", timeout=10).text
            r = [float(n) for n in re.findall(r'3\.\d{3,4}', r_h)][0]
            wu = [float(n) for n in re.findall(r'3\.\d{3,4}', w_h)][0]
            return r, wu, round(abs(r - wu), 4)
        except:
            return None, None, None

    def vigilancia(self):
        print("🏗️  VIGILANCIA V8.1 ACTIVA...")
        while True:
            try:
                r, wu, dif = self.obtener_data()
                if r and dif > 0.05:
                    if dif != self.ultima_dif:
                        msg = (f"🚨 *¡OPORTUNIDAD!*\nDif: *S/ {dif}*\n$1000 -> *S/ {round(dif*1000, 2)}*")
                        bot.send_message(CHAT_ID, msg, parse_mode="Markdown")
                        self.ultima_dif = dif
            except Exception as e:
                print(f"⚠️ Error en vigilancia: {e}")
            time.sleep(60) # Revisión cada minuto

# === COMANDOS ===
@bot.message_handler(commands=['precio'])
def cmd_precio(message):
    r, wu, dif = sistema.obtener_data()
    if r: bot.reply_to(message, f"📊 REX: {r} | WU: {wu}\nDif: {dif}")

@bot.message_handler(commands=['status'])
def cmd_status(message):
    bot.reply_to(message, "✅ Fortaleza v8.1 Online")

# === LANZAMIENTO SEGURO ===
if __name__ == "__main__":
    sistema = ArquitectoEterno()
    Thread(target=sistema.vigilancia, daemon=True).start()
    
    print("🤖 Bot conectando... (v8.1)")
    
    while True:
        try:
            # none_stop=True y un interval mayor para evitar el error de "Break polling"
            bot.polling(none_stop=True, interval=3, timeout=30)
        except Exception as e:
            print(f"🔄 Error detectado: {e}. Enfriando conexión por 15s...")
            time.sleep(15) # Pausa obligatoria antes de reintentar
