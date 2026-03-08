import telebot
import requests
import time

# --- TUS DATOS REALES (EL BÚNKER LOCAL) ---
TOKEN = "8474716431:AAFQPaRR0EmJtmsuVs6qldI29TsMYGYmf-M"
CHAT_ID = "8498920325"
WEB_APP_URL = "https://docs.google.com/spreadsheets/d/1t_VfP2n9O3o1_G2L_J3T9jXzXU1FkR8w0W7b3m9X2k4/edit?usp=sharing"
CAPITAL_INICIAL = 100  # Tu capital base para el cálculo

bot = telebot.TeleBot(TOKEN)
ultimo_balance_notificado = None

def obtener_datos():
    url = "https://api.exchangerate-api.com/v4/latest/USD"
    try:
        r = requests.get(url, timeout=15)
        datos = r.json()
        precio_actual = datos['rates']['PEN']
        
        # Lógica de cálculo según tu estrategia
        precio_entrada = 3.3520
        balance = ((CAPITAL_INICIAL / precio_entrada) * precio_actual) - CAPITAL_INICIAL
        return round(precio_actual, 4), round(balance, 4)
    except:
        return None, None

def enviar_telegram_con_reintento(msg):
    """Reconexión automática si no hay internet"""
    while True:
        try:
            bot.send_message(CHAT_ID, msg)
            return True
        except:
            print("⏳ Buscando señal para avisar a Telegram...")
            time.sleep(60)

def ejecutar_centinela():
    global ultimo_balance_notificado
    print("🏰 CENTINELA R3X INICIANDO CONEXIÓN...")
    
    # Notificación de arranque
    enviar_telegram_con_reintento("🛡️ Centinela R3X vinculado y operando.")

    while True:
        precio, balance = obtener_datos()

        if precio is not None:
            fecha = time.strftime("%H:%M")
            
            # Sincronización silenciosa con Google Sheets
            try:
                requests.get(WEB_APP_URL, params={'fecha': fecha, 'precio': precio, 'balance': balance}, timeout=15)
            except:
                pass

            # Lógica de alertas inteligentes (solo ante cambios)
            if ultimo_balance_notificado is None:
                ultimo_balance_notificado = balance
            
            elif balance < ultimo_balance_notificado:
                diff = round(ultimo_balance_notificado - balance, 2)
                msg = f"📉 **BAJADA DETECTADA**\nBalance: {balance} S/ (-{diff})\n💡 Mantén la calma, Administrador."
                enviar_telegram_con_reintento(msg)
                ultimo_balance_notificado = balance

            elif balance > ultimo_balance_notificado:
                diff = round(balance - ultimo_balance_notificado, 2)
                msg = f"🚀 **SUBIDA DETECTADA**\nBalance: {balance} S/ (+{diff})\n💰 Mercado a favor."
                enviar_telegram_con_reintento(msg)
                ultimo_balance_notificado = balance

            print(f"✅ [{fecha}] Precio: {precio} | Balance: {balance} S/")
            time.sleep(600) # Chequeo cada 10 minutos
        else:
            print("🔄 Sin internet. Reintentando en 1 minuto...")
            time.sleep(60)

if __name__ == "__main__":
    ejecutar_centinela()
