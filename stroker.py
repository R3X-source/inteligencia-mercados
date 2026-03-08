import requests
import re
import time
import telebot
from threading import Thread
from telebot.types import BotCommand

# === DATOS DE IDENTIDAD ===
TOKEN = "8316264775:AAH-QF4z5ZMhevMEStxeh7TX8U1N-mt19W8"
CHAT_ID = "8498920325"
bot = telebot.TeleBot(TOKEN)

# CONFIGURACIÓN DEL MENÚ AZUL
def configurar_menu_azul():
    try:
        comandos = [
            BotCommand("precio", "📊 Ver precios y brecha actual"),
            BotCommand("status", "✅ Verificar estado del sistema"),
            BotCommand("historial", "📚 Ver brechas perdidas (offline)")
        ]
        bot.set_my_commands(comandos)
        print("🔹 Menú azul configurado correctamente.")
    except Exception as e:
        print(f"❌ Error al configurar menú: {e}")

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
        print("🏗️  VIGILANCIA V8.2 ACTIVA...")
        while True:
            try:
                r, wu, dif = self.obtener_data()
                if r and dif > 0.05:
                    if dif != self.ultima_dif:
                        msg = (f"🚨 *¡OPORTUNIDAD!*\n"
                               f"REX: {r} | WU: {wu}\n"
                               f"Dif: *S/ {dif}*")
                        bot.send_message(CHAT_ID, msg, parse_mode="Markdown")
                        self.ultima_dif = dif
            except:
                pass
            time.sleep(60)

# === COMANDOS ===
@bot.message_handler(commands=['precio'])
def cmd_precio(message):
    r, wu, dif = sistema.obtener_data()
    if r: bot.reply_to(message, f"📊 REX: {r} | WU: {wu}\n⚖️ Diferencia: {dif}")

@bot.message_handler(commands=['status'])
def cmd_status(message):
    bot.reply_to(message, "✅ Fortaleza v8.2 Online\nBotón Menú: Activo")

@bot.message_handler(commands=['historial'])
def cmd_historial(message):
    if not sistema.historial_brechas:
        bot.reply_to(message, "✅ No hay brechas en el historial.")
    else:
        reporte = "\n".join(sistema.historial_brechas[-5:])
        bot.reply_to(message, f"📚 *ÚLTIMAS BRECHAS:*\n{reporte}")

# === LANZAMIENTO ===
if __name__ == "__main__":
    # 1. Limpiamos el menú y lo activamos
    configurar_menu_azul()
    
    # 2. Iniciamos hilos
    sistema = ArquitectoEterno()
    Thread(target=sistema.vigilancia, daemon=True).start()
    
    print("🤖 Bot activo. Revisa tu Telegram, debería aparecer el botón azul.")
    
    while True:
        try:
            bot.polling(none_stop=True, interval=3, timeout=30)
        except:
            time.sleep(15)
