import requests
import time

def verificar_grifo(red, url):
    print(f"🔎 [INSPECCIÓN] Rastreando grifo de {red}...")
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            print(f"✅ [ÉXITO] El grifo de {red} está activo. Listo para reclamar.")
        else:
            print(f"❌ [OBRA PARADA] El grifo de {red} no responde (Status: {response.status_code})")
    except Exception as e:
        print(f"⚠️ [ERROR] No se pudo conectar con la red {red}.")

# Aquí pondremos las URLs de los grifos que encontremos
faucets = {
    "Polygon": "https://polygon.technology/faucet", # Ejemplo oficial
    "Solana": "https://faucet.solana.com"
}

print("🚀 Iniciando Obrero Digital - Modo Rastreo...")
for red, url in faucets.items():
    verificar_grifo(red, url)
    time.sleep(2)

print("\n🏗️ Arquitecto, rastreo terminado. ¿Desea que proceda con el reclamo automático?")
