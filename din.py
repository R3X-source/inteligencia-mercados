import requests
import time
from datetime import datetime

# --- CONFIGURACIÓN DE OPERACIÓN ---
CAPITAL_EN_CLOSET = 100.00  # Lo que tienes físico hoy
PRECIO_ENTRADA = 3.3520     # El precio al que "compraste"
OBJETIVO_DIARIO = 1.00      # Meta: ganar 1 sol
ALERTA_RIESGO = -0.50       # Máximo que permites perder

def gestionar_boveda(balance):
    with open("boveda_real.txt", "a") as f:
        fecha = datetime.now().strftime('%d/%m/%Y %H:%M')
        f.write(f"[{fecha}] Balance: {balance:.4f} S/ | Total sugerido: {CAPITAL_EN_CLOSET + balance:.2f} S/\n")

def ejecutar_sistema():
    url = "https://api.exchangerate-api.com/v4/latest/USD"
    
    try:
        r = requests.get(url)
        precio_actual = r.json()['rates']['PEN']
        
        # Lógica de mercado
        valor_actual = (CAPITAL_EN_CLOSET / PRECIO_ENTRADA) * precio_actual
        balance = valor_actual - CAPITAL_EN_CLOSET
        
        print("\n" + "🏦 " + "="*40 + " 🏦")
        print(f" LOGÍSTICA DE BÓVEDA - {datetime.now().strftime('%H:%M:%S')}")
        print(f" Precio Sol: {precio_actual:.4f}")
        print(f" Balance en tiempo real: {balance:.4f} S/")
        print("-" * 44)

        # Decisiones del Administrador
        if balance >= OBJETIVO_DIARIO:
            print("💎 ¡META LOGRADA! Ve al closet y asegura la ganancia.")
            gestionar_boveda(balance)
            return False
        
        elif balance <= ALERTA_RIESGO:
            print("🚨 RIESGO CRÍTICO. Protege lo que queda en la bóveda.")
            gestionar_boveda(balance)
            return False
            
        else:
            print(f"📈 ESTADO: {'Ganando' if balance > 0 else 'Perdiendo'} centavos.")
            print(f"💵 Acción sugerida: {'No tocar' if balance > 0 else 'Vigilar reserva'}")

    except Exception as e:
        print(f"Error: {e}")
    return True

if __name__ == "__main__":
    print("Iniciando Sistema de Gestión de Activos...")
    while True:
        if not ejecutar_sistema():
            break
        time.sleep(60) # Valida cada minuto para no saturar
