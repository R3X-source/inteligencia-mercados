import requests
import time
import random
import string

# --- CONFIGURACIÓN DE ACCESO ---
USUARIO = "kisard213@outlook.com"
CLAVE = "ERREELEMAMi1_"
VIDEO_ID = "7454271836531510534"

# Tus planes base (el script los multiplicará y variará solo)
PLANES_BASE = ["vardrid", "Embra", "kayada", "dsmada", "mamith4m", "envr4", "penaldo", "penaldismo"]

def mutar_texto(texto):
    """Hace que cada comentario sea único para evadir el baneo"""
    random_str = ''.join(random.choices(string.ascii_letters + string.digits, k=3))
    decoracion = random.choice(["😂", "💀", "..", "!!!", "—"])
    return f"{texto} {decoracion} {random_str}"

def obtener_objetivos(session):
    """Busca los comentarios con más likes y respuestas en el video"""
    print("🔍 Analizando comentarios más populares del video...")
    url = f"https://www.tiktok.com/api/comment/list/?aweme_id={VIDEO_ID}&count=50"
    try:
        res = session.get(url)
        comentarios = res.json().get('comments', [])
        # Ordenar: Más likes y más respuestas primero
        comentarios.sort(key=lambda x: (x.get('digg_count', 0) + x.get('reply_comment_total', 0)), reverse=True)
        return [c['cid'] for c in comentarios]
    except:
        return ["0"] # Si falla, comenta al video directamente

def ejecutar():
    session = requests.Session()
    session.headers.update({"User-Agent": "Mozilla/5.0 (Linux; Android 11)"})
    
    # El script determina aquí que la meta son 243
    META = 243
    print(f"🚀 OBJETIVO: {META} comentarios. Iniciando infiltración...")

    objetivos = obtener_objetivos(session)
    
    for i in range(1, META + 1):
        # Selecciona un plan y lo muta
        frase = random.choice(PLANES_BASE)
        mensaje = mutar_texto(frase)
        
        # Decide a qué comentario top responder (va rotando)
        target_id = objetivos[i % len(objetivos)] if objetivos else "0"
        
        payload = {
            "text": mensaje,
            "reply_id": target_id,
            "aweme_id": VIDEO_ID
        }

        try:
            url = "https://www.tiktok.com/api/comment/publish/"
            res = session.post(url, data=payload)
            
            if res.status_code == 200:
                print(f"✅ [{i}/{META}] Publicado en top: {mensaje}")
            elif res.status_code == 429:
                print("🚨 TikTok sospecha. Pausa larga de 5 min...")
                time.sleep(300)
            else:
                print(f"❌ Error {res.status_code}. Reintentando...")

        except Exception as e:
            print(f"🔥 Error: {e}")

        # Tiempo de seguridad humano
        espera = random.randint(15, 25)
        print(f"⏳ Esperando {espera}s para no ser detectado...")
        time.sleep(espera)

if __name__ == "__main__":
    ejecutar()
