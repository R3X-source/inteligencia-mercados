import requests
import threading
import time

# La placa de la obra
DIRECCION = "TRxj935u2HGAtRgPgT6Wz5BahvGUq8FqpU"

def martillar_grifo(nombre, url):
    print(f"🔨 [OBRERO {nombre}] Iniciando ataque de reclamo...")
    while True:
        try:
            # Intentamos forzar la transacción
            r = requests.get(url + DIRECCION, timeout=5)
            if r.status_code == 200:
                print(f"💰 [EXITO] Sector {nombre} entregó material.")
            else:
                # Si falla, no paramos, solo esperamos 2 segundos y volvemos a golpear
                time.sleep(2)
        except:
            time.sleep(5)

# Puntos de extracción masiva
objetivos = [
    ("T1", "https://api.faucetearner.org/api/v1/check/trx?address="),
    ("T2", "https://tronfaucet.com/api/claim?wallet="),
    ("T3", "https://faucet.cryptoslo.com/tron?address=")
]

print("🚨 [PROTOCOLO URGENTE] Forzando entrada en múltiples sectores...")

for id_obra, link in objetivos:
    t = threading.Thread(target=martillar_grifo, args=(id_obra, link))
    t.setDaemon(True) # Para que no se quede trabado al cerrar
    t.start()

# Mantener el proceso vivo
try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("\n🛑 Obra detenida.")
