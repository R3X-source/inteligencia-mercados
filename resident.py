import requests
import re
import time
import telebot
from threading import Thread

# === CONFIGURACIÓN ===
TOKEN = "8316264775:AAH-QF4z5ZMhevMEStxeh7TX8U1N-mt19W8"
CHAT_ID = "6348624107"
bot = telebot.TeleBot(TOKEN)

class ArquitectoMaestro:
    def __init__(self):
        self.headers = {"User-Agent": "Mozilla/5.0"}
        self.activo = True
        self.ultima_dif = 0

    def obtener_data(self):
        try:
            # Extraemos precios con patrones 3.XXXX
            r_html = requests.get("https://www.rextie.com/", timeout=10).text
            wu_html = requests.get("https://www.westernunion.com/pe/es/home.html", timeout=10).text
            
            r = [float(n) for n in re.findall(r'3\.\d{3,4}', r_html)][0]
            wu = [float(n) for n in re.findall(r'3\.\d{3,4}', wu_html)][0]
            dif = round(abs(r - wu), 4)
            return r, wu, dif
        except:
            return None, None, None

    def bucle_vigilancia(self):
        print("🏗️  VIGILANCIA ACTIVA...")
        while self.activo:
            r, wu, dif = self.obtener_data()
            if r and dif > 0.05 and dif != self.ultima_dif:
                msg = (f"🚨 *¡BRECHA DE DINERO!*\n"
                       f"--------------------------\n"
                       f"🏢 Rextie: S/ {r}\n"
                       f"🌍 WU: S/ {wu}\n"
                       f"⚡ Diferencia: *S/ {dif}*\n\n"
                       f"💰 Ganancia por $1000: *S/ {round(dif*1000, 2)}*")
                bot.send_message(CHAT_ID, msg, parse_mode="Markdown")
                self.ultima_dif = dif
            time.sleep(60)

# === COMANDOS DEL BOT ===
@bot.message_handler(commands=['precio'])
def cmd_precio(message):
    r, wu, dif = sistema.obtener_data()
    if r:
        bot.send_message(CHAT_ID, f"📊 *MERCADO ACTUAL:*\nRextie: {r}\nWU: {wu}\nDif: {dif}", parse_mode="Markdown")
    else:
        bot.send_message(CHAT_ID, "❌ Error al conectar.")

@bot.message_handler(commands=['status'])
def cmd_status(message):
    bot.send_message(CHAT_ID, "✅ *SISTEMA ONLINE*\nArquitectura v6.0 corriendo en Termux.", parse_mode="Markdown")

@bot.message_handler(commands=['ayuda'])
def cmd_ayuda(message):
    bot.send_message(CHAT_ID, "🛠️ *COMANDOS:*\n/precio - Ver precios ahora\n/status - Estado del bot\n/ayuda - Esta lista", parse_mode="Markdown")

# === LANZAMIENTO CON RECONEXIÓN INFINITA ===
if __name__ == "__main__":
    sistema = ArquitectoMaestro()
    Thread(target=sistema.bucle_vigilancia, daemon=True).start()
    
    print("🤖 Bot iniciado. Presiona Ctrl+C para detener.")
    
    while True:
        try:
            bot.polling(none_stop=True, interval=0, timeout=20)
        except Exception as e:
            print(f"⚠️ Error de conexión: {e}. Reintentando en 15s...")
            time.sleep(15)
