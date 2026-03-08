import requests
import time
import random
import string

# --- CONFIGURACIÓN ---
USUARIO = "kisard213@outlook.com"
CLAVE = "ERREELEMAMi1_"
VIDEO_ID = "7454271836531510534"

def mutar_texto(texto):
    """Evita el baneo variando el texto con caracteres aleatorios"""
    letras = ''.join(random.choices(string.ascii_letters, k=3))
    modos = [f"{texto} {letras}", f"{texto}..", f"⚡ {texto}"]
    return random.choice(modos)

def obtener_comentarios_top(session):
    """Escanea el video y devuelve los IDs de los comentarios más populares"""
    print("🔍 Escaneando campo de batalla (buscando comentarios top)...")
    url = f"https://www.tiktok.com/api/comment/list/?aweme_id={VIDEO_ID}&count=50"
    
    try:
        res = session.get(url)
        data = res.json()
        comments = data.get('comments', [])
        
        # Ordenamos por la suma de Likes + Respuestas (lo más alto primero)
        comments.sort(key=lambda x: (x['digg_count'] + x['reply_comment_total']), reverse=True)
        return comments
    except:
        print("⚠️ No se pudo escanear el top. Usando modo general.")
        return []

def ejecutar_ataque():
    with open("planes.txt", "r") as f:
        planes = [line.strip() for line in f if line.strip()]
    
    session = requests.Session()
    session.headers.update({"User-Agent": "Mozilla/5.0 (Linux; Android 11)"})
    
    # Aquí es donde el bot decide dónde atacar
    targets = obtener_comentarios_top(session)
    
    print(f"🎯 Esleier listo. {len(targets)} hilos calientes detectados.")

    for i, plan_base in enumerate(planes, 1):
        # Si hay un comentario top disponible, le respondemos. Si no, comentamos normal.
        reply_to = targets[i % len(targets)]['cid'] if targets else "0"
        mensaje = mutar_texto(plan_base)
        
        url = f"https://www.tiktok.com/api/comment/publish/?aweme_id={VIDEO_ID}"
        data = {
            "text": mensaje,
            "reply_id": reply_to # Aquí se hace la magia de responder al top
        }
        
        try:
            res = session.post(url, data=data)
            
            if res.status_code == 200:
                tipo = "RESPUESTA" if reply_to != "0" else "GENERAL"
                print(f"✅ [{i}/{len(planes)}] [{tipo}] en el top: {mensaje}")
            elif res.status_code == 429:
                print("🚨 SOSPECHA DE SPAM. TikTok nos mira. Durmiendo 10 min...")
                time.sleep(600)
            else:
                print(f"❌ Error {res.status_code}. Saltando pausa...")

        except Exception as e:
            print(f"🔥 Error crítico: {e}")

        # Tiempo de espera humano (fundamental para no ser baneado)
        espera = random.randint(25, 50)
        print(f"💤 Camuflando actividad por {espera}s...")
        time.sleep(espera)

if __name__ == "__main__":
    ejecutar_ataque()
