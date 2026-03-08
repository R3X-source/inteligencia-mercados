import requests
import re
import time
import telebot
from threading import Thread

# === DATOS DE IDENTIDAD (Sincronizados) ===
TOKEN = "8316264775:AAH-QF4z5ZMhevMEStxeh7TX8U1N-mt19W8"
CHAT_ID = 8498920325
bot = telebot.TeleBot(TOKEN)

class ArquitectoEterno:
    def __init__(self):
        self.headers = {"User-Agent": "Mozilla/5.0"}
        self.ultima_dif = 0
        self.historial_brechas = [] # Aquí se guarda lo que pasa sin internet

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
        print("🏗️  VIGILANCIA V8.0 ACTIVA...")
        while True:
            r, wu, dif = self.obtener_data()
            if r and dif > 0.05:
                # Si es una brecha nueva, la avisamos
                if dif != self.ultima_dif:
                    msg = (f"🚨 *¡OPORTUNIDAD DETECTADA!*\n"
                           f"--------------------------\n"
                           f"🏦 Rextie: {r} | 🌍 WU: {wu}\n"
                           f"⚡ Brecha: *S/ {dif}*\n"
                           f"💵 Ganancia $1000: *S/ {round(dif*1000, 2)}*")
                    try:
                        bot.send_message(CHAT_ID, msg, parse_mode="Markdown")
                        self.ultima_dif = dif
                    except:
                        # Si falla el envío (sin internet), guardamos en el historial
                        self.historial_brechas.append(f"[{time.strftime('%H:%M')}] Dif: {dif}")
            time.sleep(60)

# === COMANDOS ===
@bot.message_handler(commands=['precio'])
def cmd_precio(message):
    r, wu, dif = sistema.obtener_data()
    if r:
        bot.reply_to(message, f"📊 *MERCADO ACTUAL:*\nREX: {r} | WU: {wu}\nDif: {dif}")
    else:
        bot.reply_to(message, "❌ Error de conexión.")

@bot.message_handler(commands=['historial'])
def cmd_historial(message):
    if not sistema.historial_brechas:
        bot.reply_to(message, "✅ No hubo brechas perdidas durante tu desconexión.")
    else:
        reporte = "\n".join(sistema.historial_brechas[-10:]) # Últimas 10
        bot.reply_to(message, f"📚 *BRECHAS DETECTADAS MIENTRAS NO ESTABAS:*\n\n{reporte}")

@bot.message_handler(commands=['start'])
def cmd_start(message):
    bot.send_message(CHAT_ID, "🏰 *Fortaleza v8.0 lista.*\nLa 'opción azul' de memoria está activa. No olvidaré nada.")

# === LANZAMIENTO ===
if __name__ == "__main__":
    sistema = ArquitectoEterno()
    Thread(target=sistema.vigilancia, daemon=True).start()
    
    while True:
        try:
            bot.infinity_polling(timeout=20)
        except Exception:
            time.sleep(15)
