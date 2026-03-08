import requests
import time

# TU LLAVE MAESTRA (Asegúrate que sea la última que sacaste)
cookies = {
    'authToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5N2I2ZDAwNTI0Mzc1NTc2MzU5MTVINClslmlmhdCI6MTc2OTY5NzEwNywiZXhwIjoyNzY5NzgZNTA3fQ.BkuB5Sg6xe2EY5oRooQfaVHzIsi8lOZrNJuTk-PbU-4'
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36',
    'Accept': 'application/json'
}

def minar():
    print("\n" + "="*30)
    print(" 🏰  ARQUITECTO BOT RECALIBRADO ")
    print("="*30)
    
    # Intentamos la ruta directa de la Faucet
    url = "https://viefaucet.com/api/v1/faucet/claim"
    
    try:
        r = requests.post(url, cookies=cookies, headers=headers)
        
        if r.status_code == 200:
            print("[✅] RECLAMO: ¡Éxito! Monedas sumadas.")
        elif r.status_code == 404:
            # Si sigue dando 404, probamos la ruta alternativa sin 'api/v1'
            url_alt = "https://viefaucet.com/faucet/claim"
            r_alt = requests.post(url_alt, cookies=cookies, headers=headers)
            print(f"[*] Probando ruta alterna... Status: {r_alt.status_code}")
        elif r.status_code == 401:
            print("[❌] ERROR: El Token expiró. Necesitas sacar uno nuevo de Mises.")
        else:
            print(f"[!] Status: {r.status_code} - El sitio está pidiendo Captcha manual.")
            
    except Exception as e:
        print(f"[⚠️] Error de conexión: {e}")

if __name__ == "__main__":
    while True:
        minar()
        print("\n[🕒] Esperando 4 minutos para el siguiente bloque...")
        time.sleep(250)
