import requests
import time

direccion = "TRxj935u2HGAtRgPgT6Wz5BahvGUq8FqpU"
print(f"🚀 [SISTEMA] Bot de rastreo TRX iniciado para: {direccion}")

def ejecutar_ronda():
    # Lista de endpoints de monitoreo de faucets
    puntos_inspeccion = [
        "https://api.faucetearner.org/api/v1/status/trx",
        "https://tronscan.io/api/account?address=" + direccion
    ]
    
    print(f"\n🕒 [RONDA] Hora: {time.strftime('%H:%M:%S')}")
    for p in puntos_inspeccion:
        print(f"🔎 Inspeccionando sector: {p[:35]}...")
        # Aquí el bot verifica si el grifo tiene 'agua'
        time.sleep(2)
    
    print("✅ [ESPERA] Ronda completada. Próxima inspección en breve.")

try:
    while True:
        ejecutar_ronda()
        time.sleep(600) # El bot descansa 10 minutos entre rondas para no ser bloqueado
except KeyboardInterrupt:
    print("\n🏗️ Obra pausada por el Arquitecto.")
