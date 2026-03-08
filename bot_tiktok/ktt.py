import time
import random
import string
import os
import requests
import re

# DATOS REALES DE TU CAPTURA
session_id = "ee04a693bb5d9bf31d1b5e692a39db85"
uid_tt = "5e2b18b0824e4c5d428e630241fe3b8b26923c8ced4212834ab84fe14805af42"
# Busca 'msToken' en tu lista de cookies de Mises y pégalo aquí
ms_token = "BT1qpI5sqsDTjcchQmXsvq2s6IU-NDG..." 

url_video = "https://vt.tiktok.com/ZSa18enYx/"
archivo_memoria = "registro.txt"

mis_frases = ["vardrid 😂", "Embra 😂", "kayada 😂", "dsmada 😂", "mamith4m 😂", "envr4 😂", "penaldo 😂", "penaldismo 😂"]

def obtener_datos_reales():
    # Headers Ultra-Reales de Mises
    headers = {
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
        "Cookie": f"sessionid={session_id}; uid_tt={uid_tt}; msToken={ms_token}",
        "Accept": "application/json, text/plain, */*",
        "X-Secsdk-Csrf-Token": "iT51VyAL-l-X24xoGq0EfQVM34i3SqX...", # De tu captura
        "Referer": "https://www.tiktok.com/"
    }
    
    try:
        # Extraer ID del video
        res_link = requests.get(url_video, allow_redirects=True, timeout=10)
        vid = re.search(r'/video/(\d+)', res_link.url).group(1)
        
        # URL de API que usa TikTok Web para cargar comentarios
        api_url = f"https://www.tiktok.com/api/comment/list/?aweme_id={vid}&count=20&cursor=0"
        
        print(f"📡 Conectando con Video ID: {vid}...")
        r = requests.get(api_url, headers=headers, timeout=10).json()
        
        total = r.get('total', 0)
        comentarios = r.get('comments', [])
        
        # FILTRO CABEZAS: Solo los que no son respuesta a nadie
        cabezas = [c for c in comentarios if not c.get('reply_id') or c.get('reply_id') == "0"]
        
        return total, cabezas, vid
    except Exception as e:
        return 0, [], None

def ejecutar_mision():
    print(f"--- RECONOCIMIENTO INTELIGENTE (ESL3I3R) ---")
    total, lista_cabezas, vid = obtener_datos_reales()
    
    if total == 0:
        print("❌ TikTok bloqueó el escaneo. Intenta refrescar TikTok en Mises y vuelve a copiar la sessionid.")
        return

    # Tus reglas de filtros inteligentes
    if total < 300:
        meta = int(len(lista_cabezas) * 0.75)
        modo = "AGRESIVO (75%)"
    else:
        meta = int(len(lista_cabezas) * 0.50)
        modo = "PROTEGIDO (50%)"

    print(f"📊 Total Real: {total} | Cabezas: {len(lista_cabezas)}")
    print(f"🛡️ Filtro: {modo} | Meta: {meta}")

    # Cargar memoria de registro.txt
    if not os.path.exists(archivo_memoria): open(archivo_memoria, 'w').close()
    with open(archivo_memoria, "r") as f: respondidos = f.read().splitlines()

    enviados = 0
    for c in lista_cabezas:
        if enviados >= meta: break
        cid = c.get('cid')
        
        if cid in respondidos: continue

        frase = random.choice(mis_frases)
        codigo = ''.join(random.choices(string.ascii_letters + string.digits, k=3))
        
        print(f"\n✅ [{enviados+1}/{meta}] Comentando en ID: {cid}")
        print(f"💬 {frase} {codigo}")

        with open(archivo_memoria, "a") as f: f.write(f"{cid}\n")
        enviados += 1
        
        espera = random.randint(15, 22)
        print(f"⏳ Seguridad: {espera}s...")
        time.sleep(espera)

if __name__ == "__main__":
    ejecutar_mision()
