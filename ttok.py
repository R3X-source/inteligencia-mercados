import requests
import time
import random
import string

# --- CONFIGURACIÓN ---
USUARIO = "kisard213@outlook.com"
CLAVE = "ERREELEMAMi1_"
VIDEO_ID = "7454271836531510534"

PLANES_BASE = ["vardrid", "Embra", "kayada", "dsmada", "mamith4m", "envr4", "penaldo", "penaldismo"]

def mutar_texto(texto):
    """Varía el texto para evitar el radar de spam"""
    random_str = ''.join(random.choices(string.ascii_letters, k=3))
    decoracion = random.choice(["😂", "💀", "..", "!!!"])
    return f"{texto} {decoracion} {random_str}"

def obtener_comentarios_raiz(session):
    """Detecta cuántos comentarios principales hay en el video"""
    print("🔍 Escaneando comentarios principales...")
    url = f"https://www.tiktok.com/api/comment/list/?aweme_id={VIDEO_ID}&count=100"
    try:
        res = session.get(url)
        data = res.json()
        comentarios = data.get('comments', [])
        # Solo comentarios que no son respuesta de nadie
        principales = [c['cid'] for c in comentarios if c.get('reply_id') == "0" or c.get('reply_id') == ""]
        return principales
    except:
        return []

def ejecutar():
    session = requests.Session()
    session.headers.update({"User-Agent": "Mozilla/5.0 (Linux; Android 11)"})
    
    # El script detecta cuántos objetivos reales hay
    objetivos = obtener_comentarios_raiz(session)
    total = len(objetivos)
    
    if total == 0:
        print("⚠️ No encontré comentarios principales. Abortando misión.")
        return

    print(f"🎯 Se detectaron {total} hilos principales. Iniciando ráfaga precisa...")

    for i, target_id in enumerate(objetivos, 1):
        frase = random.choice(PLANES_BASE)
        mensaje = mutar_texto(frase)
        
        payload = {
            "text": mensaje,
            "reply_id": target_id,
            "aweme_id": VIDEO_ID
        }

        try:
            url = "https://www.tiktok.com/api/comment/publish/"
            res = session.post(url, data=payload)
            
            if res.status_code == 200:
                print(f"✅ [{i}/{total}] Respondido comentario top: {mensaje}")
            elif res.status_code == 429:
                print("🚨 TikTok se puso alerta. Esperando 5 min...")
                time.sleep(300)
            else:
                print(f"❌ Error {res.status_code}")

        except Exception as e:
            print(f"🔥 Error: {e}")

        # Tiempo de seguridad humano entre 20 y 35 segundos
        espera = random.randint(20, 35)
        if i < total: # No esperar en el último
            print(f"⏳ Pausa táctica: {espera}s...")
            time.sleep(espera)

    print(f"🏁 Misión cumplida. Se cubrieron los {total} comentarios principales.")

if __name__ == "__main__":
    ejecutar()

