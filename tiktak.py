import requests
import time
import random

# --- TUS DATOS ---
USUARIO = "kisard213@outlook.com"
CLAVE = "ERREELEMAMi1_"
# El ID del video se saca de la URL (es el número largo)
VIDEO_ID = "7454271836531510534" 

FRASES = ["vardrid", "Embra", "kayada", "dsmada", "mamith4m", "envr4", "penaldo", "penaldismo"]

def iniciar_sesion():
    print(f"🔑 Intentando conectar con la cuenta de Esleier...")
    session = requests.Session()
    # Simulamos que somos un celular Android real
    session.headers.update({
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
    })
    
    # URL de login de TikTok
    login_url = "https://www.tiktok.com/passport/web/email/login/"
    data = {
        "email": USUARIO,
        "password": CLAVE,
    }
    
    response = session.post(login_url, data=data)
    
    # Si TikTok pide captcha, aquí es donde se complica sin navegador, 
    # pero intentaremos el envío directo.
    return session

def enviar_comentario(session, texto):
    url = f"https://www.tiktok.com/api/comment/publish/?aweme_id={VIDEO_ID}"
    payload = {
        "text": texto,
        "reply_id": "0"
    }
    
    res = session.post(url, data=payload)
    return res.status_code

def ejecutar():
    sesion = iniciar_sesion()
    print("🚀 Iniciando ráfaga de comentarios...")
    
    for i, frase in enumerate(FRASES):
        msg = f"{frase} 😂"
        status = enviar_comentario(sesion, msg)
        
        if status == 200:
            print(f"✅ [{i+1}/8] Publicado: {msg}")
        else:
            print(f"❌ Error {status}. Puede que TikTok pida verificación manual.")
            
        espera = random.randint(15, 20)
        print(f"⏳ Espera de seguridad: {espera}s...")
        time.sleep(espera)

if __name__ == "__main__":
    ejecutar()
