import telebot
import requests
import time

# --- CONFIGURACIÓN BLINDADA ---
TOKEN = "8474716431:AAFQPaRR0EmJtmsuVs6qldI29TsMYGYmf-M"
CHAT_ID = "8498920325"
# Tu nueva llave del Excel
WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyGHr5HTh4fsUN7YCQhQUXr5gCNd4gjHK5VaA0oB7q12pvCPIKA7fdOowcmmwt6TFcD/exec"
CAPITAL_INICIAL = 100

bot = telebot.TeleBot(TOKEN)
ultimo_balance_notificado = None

def obtener_datos():
    url = "https://api.exchangerate-api.com/v4/latest/USD"
    try:
        r = requests.get(url, timeout=20)
        datos = r.json()
        precio_actual = datos['rates']['PEN']
        precio_entrada = 3.3520
        balance = ((CAPITAL_INICIAL / precio_entrada) * precio_actual) - CAPITAL_INICIAL
        return round(precio_actual, 4), round(balance, 4)
    except:
        return None, None

def enviar_a_excel_con_insistencia(fecha, precio, balance):
    """Insiste hasta que el Excel reciba los datos"""
    while True:
        try:
            params = {'fecha': fecha, 'precio': precio, 'balance': balance}
            res = requests.get(WEB_APP_URL, params=params, timeout=20)
            if res.status_code == 200:
                print(f"✅ Excel Actualizado: {balance} S/")
                return True
        except:
            print("⏳ Fallo conexión con Excel. Reintentando en 30s...")
            time.sleep(30)

def enviar_telegram_con_insistencia(msg):
    """Insiste hasta que Telegram reciba el mensaje"""
    while True:
        try:
            bot.send_message(CHAT_ID, msg)
            return True
        except:
            print("📡 Telegram sin señal. Reintentando en 30s...")
            time.sleep(30)

def ejecutar_centinela():
    global ultimo_balance_notificado
    print("🏰 CENTINELA R3X INICIADO - MODO PERSISTENTE")
    
    # Mensaje de arranque para confirmar que el TOKEN y CHAT_ID están bien
    enviar_telegram_con_insistencia("🛡️ Centinela R3X: Sistema de Vigilancia Activo.")

    while True:
        precio, balance = obtener_datos()

        if precio is not None:
            fecha = time.strftime("%H:%M")
            
            # 1. Sincronización Obligatoria con Excel
            enviar_a_excel_con_insistencia(fecha, precio, balance)

            # 2. Alertas Inteligentes (Solo si cambia el balance)
            if ultimo_balance_notificado is None:
                ultimo_balance_notificado = balance
            
            elif balance < ultimo_balance_notificado:
                diff = round(ultimo_balance_notificado - balance, 2)
                msg = f"📉 **BAJADA DETECTADA**\nBalance: {balance} S/ (-{diff})\n💡 No gastes, Administrador."
                enviar_telegram_con_insistencia(msg)
                ultimo_balance_notificado = balance

            elif balance > ultimo_balance_notificado:
                diff = round(balance - ultimo_balance_notificado, 2)
                msg = f"🚀 **SUBIDA DETECTADA**\nBalance: {balance} S/ (+{diff})\n💰 ¡Ganancia en curso!"
                enviar_telegram_con_insistencia(msg)
                ultimo_balance_notificado = balance

            print(f"💤 Ciclo completado a las {fecha}. Esperando 10 min...")
            time.sleep(600)
        else:
            print("🔄 Error de red general. Buscando señal en 60s...")
            time.sleep(60)

if __name__ == "__main__":
    ejecutar_centinela()
