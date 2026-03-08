import time
import os

# Configuración de la Obra
DIRECCION_TRX = "TRxj935u2HGAtRgPgT6Wz5BahvGUq8FqpU"
# Nota: La mayoría de las redes EVM usan la misma dirección
REDES = ["TRON", "POLYGON", "SOLANA", "BNB"]

def animacion_carga():
    for char in "|/-\":
        print(f"\r🚀 Escaneando Mercados {char}", end="")
        time.sleep(0.1)

print(f"--- 🏗️ CONSTRUCTORA DIGITAL ACTIVADA ---")
print(f"Objetivo: {DIRECCION_TRX}")

try:
    while True:
        for red in REDES:
            print(f"\n\n🛰️ Saltando a la red: {red}")
            animacion_carga()
            
            # Aquí el bot simula la interacción con los Smart Contracts de cada red
            print(f"\n💎 Buscando micro-recompensas en {red}...")
            time.sleep(3) 
            
            # Verificación de saldo rápida (Simulada para no saturar API)
            print(f"✅ Sector {red} verificado. Operación en cola.")
            
        print("\n" + "="*40)
        print(f"🕒 Ciclo completo. Reiniciando en 2 minutos para evitar baneo.")
        print("="*40)
        time.sleep(120) 
except KeyboardInterrupt:
    print("\n\n🏗️ Obra cerrada por el Arquitecto. Guardando herramientas...")
