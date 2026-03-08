import telebot
import requests
import time
import json

# --- CARGAR CONFIGURACIÓN ---
with open('config.json', 'r') as f:
    config = json.load(f)

TOKEN = config['TOKEN']
CHAT_ID = config['CHAT_ID']
WEB_APP_URL = config['WEB_APP_URL']
CAPITAL_INICIAL = config['CAPITAL']

bot = telebot.TeleBot(TOKEN)
ultimo_balance = None

def obtener_datos():
    # URL de tu captura 3010
    url = "https://api.exchangerate-api.com/v4/latest/USD"
    try:
        r = requests.get(url, timeout=10)
        datos = r.json()
        precio_actual = datos['rates']['PEN']
        
        # Lógica: (100 / 3.3520) * Precio Actual - 100
        precio_entrada = 3.3520
        balance = ((CAPITAL_INICIAL / precio_entrada) * precio_actual) - CAPITAL_INICIAL
        return round(precio_actual, 4), round(balance, 4)
    except Exception as e:
        print(f"❌ Error al obtener precios: {e}")
        return None, None

def enviar_a_web(fecha, precio, balance):
    # Función de tu captura 3008 para actualizar el Excel
    try:
        params = {
            'fecha': fecha,
            'precio': precio,
            'balance': balance
        }
        res = requests.get(WEB_APP_URL, params=params, timeout=10)
        if res.status_code == 200:
            print(f"🌐 Sincronizado con Google Sheets: {balance} S/")
            return True
    except Exception as e:
        print(f"❌ Error de sincronización: {e}")
        return False

def ejecutar_centinela():
    global ultimo_balance
    print("🏰 CENTINELA ESTRATÉGICO INICIADO (10 min)...")
    
    while True:
        try:
            precio, balance = obtener_datos()
            
            if precio is not None:
                fecha = time.strftime("%H:%M")

                # 1. Sincronizar con el Dashboard (Excel)
                enviar_a_web(fecha, precio, balance)

                # 2. Lógica de Notificaciones Inteligentes
                if ultimo_balance is not None:
                    # SI BAJA: Notificación con consejo
                    if balance < ultimo_balance:
                        msg = (f"⚠️ EL PRECIO ESTÁ BAJANDO\n"
                               f"📉 Balance: {balance} S/\n"
                               f"💡 CONSEJO: Mantén la calma, Administrador. No es momento de gastar, "
                               f"espera a que el mercado recupere fuerza.")
                        bot.send_message(CHAT_ID, msg)
                    
                    # SI SUBE: Notificación normal
                    elif balance > ultimo_balance:
                        bot.send_message(CHAT_ID, f"🚀 ¡DINERO EN SUBIDA!\n📈 Balance: +{balance} S/")

                ultimo_balance = balance

        except Exception as e:
            print(f"⚠️ Error general: {e}. Reintentando en 30s...")
            time.sleep(30)
            continue

        # 3. Espera de 10 minutos
        time.sleep(600)

if __name__ == "__main__":
    ejecutar_centinela()
