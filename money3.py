import telebot
import requests
import time

# --- DATOS DE PODER (Directos aquí) ---
TOKEN = "8474716431:AAFQPaRROEmJtmsuVs6qldI29TsMYGYmf"
CHAT_ID = "8498920325"
WEB_APP_URL = "https://script.google.com/macros/s/AKfycbziFMzq3V_gQUbVksNZ3e4NyqJcQ8q8ibupxvB8RIy6lC2RXwDDeJPNGoQiBrb5eZ_f/exec"
CAPITAL_INICIAL = 100.0
PRECIO_ENTRADA = 3.3520 # El precio base de tus 100 soles

bot = telebot.TeleBot(TOKEN)
ultimo_balance = None

def obtener_datos():
    url = "https://api.exchangerate-api.com/v4/latest/USD"
    try:
        r = requests.get(url, timeout=10)
        precio_actual = r.json()['rates']['PEN']
        # Lógica: (100 / 3.3520) * Precio Actual - 100
        balance = ((CAPITAL_INICIAL / PRECIO_ENTRADA) * precio_actual) - CAPITAL_INICIAL
        return round(precio_actual, 4), round(balance, 4)
    except:
        return None, None

def ejecutar_centinela():
    global ultimo_balance
    print("🏰 CENTINELA TODO-EN-UNO INICIADO...")
    
    while True:
        try:
            precio, balance = obtener_datos()
            if precio is not None:
                fecha = time.strftime("%H:%M")

                # 1. Sincronizar con Google Sheets
                params = {'fecha': fecha, 'precio': precio, 'balance': balance}
                requests.get(WEB_APP_URL, params=params, timeout=10)
                print(f"✅ [{fecha}] Sincronizado: {balance} S/")

                # 2. Lógica de Mensajes e Inteligencia
                if ultimo_balance is not None:
                    if balance < ultimo_balance:
                        # SI BAJA: Notificación con consejo
                        msg = (f"⚠️ EL PRECIO ESTÁ BAJANDO\n"
                               f"📉 Balance: {balance} S/\n"
                               f"💡 CONSEJO: Mantén la calma. No es momento de gastar, "
                               f"espera a que el mercado recupere fuerza.")
                        bot.send_message(CHAT_ID, msg)
                    
                    elif balance > ultimo_balance:
                        # SI SUBE: Notificación de éxito
                        bot.send_message(CHAT_ID, f"🚀 ¡DINERO EN SUBIDA!\n📈 Balance: +{balance} S/")

                ultimo_balance = balance

        except Exception as e:
            print(f"⚠️ Reintentando conexión...")
        
        # Espera de 10 minutos
        time.sleep(600)

if __name__ == "__main__":
    ejecutar_centinela()

