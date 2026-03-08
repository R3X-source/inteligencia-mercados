import requests
import time

# TU LLAVE MAESTRA
cookies = {
    'authToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5N2I2ZDAwNTI0Mzc1NTc2MzU5MTVINClslmlmhdCI6MTc2OTY5NzEwNywiZXhwIjoyNzY5NzgZNTA3fQ.BkuB5Sg6xe2EY5oRooQfaVHzIsi8lOZrNJuTk-PbU-4'
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36',
    'Referer': 'https://viefaucet.com/dashboard'
}

def ejecutar_tarea(nombre, endpoint):
    try:
        url = f"https://viefaucet.com/api/v1/{endpoint}"
        r = requests.post(url, cookies=cookies, headers=headers)
        if r.status_code == 200:
            print(f"[✅] {nombre}: ¡Reclamo exitoso!")
        elif r.status_code == 429:
            print(f"[⏳] {nombre}: Demasiadas peticiones. Esperando...")
        else:
            print(f"[❌] {nombre}: Error {r.status_code}")
    except:
        print(f"[⚠️] {nombre}: Sin conexión... reintentando luego.")

def iniciar_maquinaria():
    print("\n" + "="*30)
    print(" 🏰  ARQUITECTO MULTI-BOT V1 ")
    print("="*30)
    
    # 1. Reclamo de Faucet (La principal)
    ejecutar_tarea("FAUCET", "faucet/claim")
    
    # 2. Reclamo de Bonus Diario
    ejecutar_tarea("DAILY BONUS", "daily-bonus/claim")
    
    # 3. Intento de auto-recolección
    ejecutar_tarea("AUTO-MINADO", "auto-faucet/claim")

if __name__ == "__main__":
    while True:
        iniciar_maquinaria()
        print("\n[🕒] Ciclo completado. Próximo ataque en 4 minutos...")
        time.sleep(250) # Espera técnica para evitar baneos
