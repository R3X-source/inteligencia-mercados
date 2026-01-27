import telebot
import requests
import time
import json

# --- CARGAR CONFIGURACIÓN ---
def cargar_config():
    try:
        with open('config.json', 'r') as f:
            return json.load(f)
    except Exception as e:
        print(f"❌ Error: {e}")
        exit()

config = cargar_config()
TOKEN = config['TOKEN']
CHAT_ID = config['CHAT_ID']
WEB_APP_URL = config['WEB_APP_URL']
CAPITAL_INICIAL = config['CAPITAL']

bot = telebot.TeleBot(TOKEN)
ultimo_balance_notificado = None # Para saber qué fue lo último que te avisó

def obtener_datos():
    url = "https://api.exchangerate-api.com/v4/latest/USD"
    try:
        r = requests.get(url, timeout=15)
        datos = r.json()
        precio_actual = datos['rates']['PEN']
        precio_entrada = 3.3520
        balance = ((CAPITAL_INICIAL / precio_entrada) * precio_actual) - CAPITAL_INICIAL
        return round(precio_actual, 4), round(balance, 4)
    except:
        return None, None

def enviar_telegram_con_reintento(msg):
    while True:
        try:
            bot.send_message(CHAT_ID, msg)
            return True
        except:
            time.sleep(60)

def ejecutar_centinela():
    global ultimo_balance_notificado
    print("🏰 CENTINELA R3X: MODO NOTIFICACIÓN SELECTIVA ACTIVO")

    while True:
        precio, balance = obtener_datos()

        if precio is not None:
            fecha = time.strftime("%H:%M")
            
            # 1. Siempre sincronizar con Google Sheets (Silencioso)
            requests.get(WEB_APP_URL, params={'fecha': fecha, 'precio': precio, 'balance': balance}, timeout=15)

            # 2. Lógica de Notificación "Solo la primera vez"
            if ultimo_balance_notificado is None:
                # Primer inicio del sistema
                enviar_telegram_con_reintento(f"🛡️ Centinela R3X activo.\nBalance base: {balance} S/")
                ultimo_balance_notificado = balance
            
            elif balance < ultimo_balance_notificado:
                # Solo notifica si es MENOR al último que te avisó
                diff = round(ultimo_balance_notificado - balance, 2)
                msg = (f"📉 **BAJADA DETECTADA**\nBalance: {balance} S/ (-{diff})\n"
                       f"💡 Consejo: Administrador, mantén la calma y no gastes.")
                enviar_telegram_con_reintento(msg)
                ultimo_balance_notificado = balance # Actualiza la marca de agua

            elif balance > ultimo_balance_notificado:
                # Solo notifica si es MAYOR al último que te avisó
                diff = round(balance - ultimo_balance_notificado, 2)
                msg = (f"🚀 **SUBIDA DETECTADA**\nBalance: {balance} S/ (+{diff})\n💰 Mercado a favor.")
                enviar_telegram_con_reintento(msg)
                ultimo_balance_notificado = balance

            print(f"✅ Datos procesados a las {fecha}. Balance: {balance} S/. Esperando 10 min...")
            time.sleep(600)
        else:
            time.sleep(60)

if __name__ == "__main__":
    ejecutar_centinela()
