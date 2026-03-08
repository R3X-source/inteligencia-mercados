import requests
import re
import time
import telebot
from threading import Thread

# === CONFIGURACIÓN ===
TOKEN = "8316264775:AAH-QF4z5ZMhevMEStxeh7TX8U1N-mt19W8"
CHAT_ID = 6348624107  # Asegúrate de haberle dado a "INICIAR" al bot en Telegram
bot = telebot.TeleBot(TOKEN)

class ArquitectoMaestro:
    def __init__(self):
        self.headers = {"User-Agent": "Mozilla/5.0"}
        self.ultima_dif = 0

    def obtener_data(self):
        try:
            r_html = requests.get("https://www.rextie.com/", timeout=10).text
            wu_html = requests.get("https://www.westernunion.com/pe/es/home.html/", timeout=10).text
            
            # Buscamos patrones de precio
            r = [float(n) for n in re.findall(r'3\.\d{3,4}', r_html)][0]
            wu = [float(n) for n in re.findall(r'3\.\d{3,4}', wu_html)][0]
            dif = round(abs(r - wu), 4)
            return r, wu, dif
        except Exception as e:
            return None, None, None

    def bucle_vigilancia(self):
        print("🏗️  VIGILANCIA ACTIVA...")
        while True:
            r, wu, dif = self.obtener_data()
            # Alerta si la brecha es mayor a 0.05
            if r and dif > 0.05 and dif != self.ultima_dif:
                msg = (f"🚨 *¡BRECHA DE DINERO!*\n"
                       f"--------------------------\n"
                       f"🏢 Rextie: S/ {r}\n"
                       f"🌍 WU: S/ {wu}\n"
                       f"⚡ Diferencia: *S/ {dif}*\n\n"
                       f"💰 Ganancia por $1000: *S/ {round(dif*1000, 2)}*")
                try:
                    bot.send_message(CHAT_ID, msg, parse_mode="Markdown")
                    self.ultima_dif = dif
                except Exception as e:
                    print(f"⚠️ Error al enviar mensaje: {e}. ¿Ya le diste /start al bot?")
            
            time.sleep(60)

# === COMANDOS ===
@bot.message_handler(commands=['precio'])
def cmd_precio(message):
    r, wu, dif = sistema.obtener_data()
    if r:
        bot.reply_to(message, f"📊 *MERCADO ACTUAL:*\nRextie: {r}\nWU: {wu}\nDif: {dif}", parse_mode="Markdown")
    else:
        bot.reply_to(message, "❌ Error al conectar.")

@bot.message_handler(commands=['status'])
def cmd_status(message):
    bot.reply_to(message, "✅ *SISTEMA ONLINE*\nArquitectura v6.1")

# === LANZAMIENTO ===
if __name__ == "__main__":
    sistema = ArquitectoMaestro()
    Thread(target=sistema.bucle_vigilancia, daemon=True).start()
    
    print("🤖 Bot iniciado. Ve a Telegram y dale a INICIAR.")
    
    while True:
        try:
            bot.polling(none_stop=True)
        except:
            time.sleep(15)
