import requests
import time

cookies = {
    'authToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5N2I2ZDAwNTI0Mzc1NTc2MzU5MTVINClslmlmhdCI6MTc2OTY5NzEwNywiZXhwIjoyNzY5NzgZNTA3fQ.BkuB5Sg6xe2EY5oRooQfaVHzIsi8lOZrNJuTk-PbU-4'
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36',
    'Referer': 'https://viefaucet.com/faucet'
}

def claim_humano():
    print("\n" + "="*30)
    print(" 🏰  ARQUITECTO BOT V2.1 (SENSITIVE) ")
    print("="*30)
    
    session = requests.Session()
    session.cookies.update(cookies)
    
    try:
        # Paso 1: "Mirar" la faucet (GET)
        print("[*] Entrando a la faucet...")
        v = session.get("https://viefaucet.com/faucet", headers=headers)
        
        # Paso 2: Intentar el reclamo (POST)
        print("[*] Enviando solicitud de reclamo...")
        # Esta es la ruta que detectamos en tus capturas de red
        r = session.post("https://viefaucet.com/faucet/verify", headers=headers)
        
        if r.status_code == 200:
            print("[✅] ¡Reclamo enviado! Revisa tu balance en unos minutos.")
        else:
            print(f"[!] Status: {r.status_code}. El sistema detectó el bot.")
            print("[💡] CONSEJO: Entra a Mises, resuelve un captcha manual y vuelve aquí.")
            
    except Exception as e:
        print(f"[⚠️] Error: {e}")

if __name__ == "__main__":
    while True:
        claim_humano()
        print("\n[🕒] Esperando 4 minutos para no ser detectado...")
        time.sleep(250)
