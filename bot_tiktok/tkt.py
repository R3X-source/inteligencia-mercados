import time
import random
import string
import os
import requests
import re

# DATOS DE MISES BROWSER
session_id = "ee04a693bb5d9bf31d1b5e692a39db85"
uid_tt = "5e2b18b0824e4c5d428e630241fe3b8b26923c8ced4212834ab84fe14805af42"
url_video = "https://vt.tiktok.com/ZSa18enYx/"
archivo_memoria = "registro.txt"

mis_frases = ["vardrid 😂", "Embra 😂", "kayada 😂", "dsmada 😂", "mamith4m 😂", "envr4 😂", "penaldo 😂", "penaldismo 😂"]

def obtener_datos_reales():
    # Simulamos el navegador Mises para que TikTok responda
    headers = {
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
        "Cookie": f"sessionid={session_id}; uid_tt={uid_tt}; store-country-code=pe",
        "Accept": "application/json, text/plain, */*",
        "Referer": "https://www.tiktok.com/"
    }
    
    try:
        # 1. Obtener Video ID
        res_link = requests.get(url_video, allow_redirects=True, timeout=10)
        vid = re.search(r'/video/(\d+)', res_link.url).group(1)
        
        # 2. Consultar API (Usando la URL que TikTok usa en Mises)
        api_url = f"https://www.tiktok.com/api/comment/list/?aweme_id={vid}&count=50&cursor=0"
        r = requests.get(api_url, headers=headers, timeout=10).json()
        
        total = r.get('total', 0)
        # Filtro estricto: Solo comentarios cabeza (reply_id vacio o 0)
        cabezas = [c for c in r.get('comments', []) if not c.get('reply_id') or c.get('reply_id') == "0"]
        
        return total, cabezas, vid
    except Exception as e:
        print(f"⚠️ Error de red: {e}")
        return 0, [], None

def ejecutar_mision():
    print(f"--- RECONOCIMIENTO ACTIVO (ESL3I3R) ---")
    total, lista_cabezas, vid = obtener_datos_reales()
    
    if total == 0:
        print("❌ El bot sigue viendo 0 comentarios. Revisa si el video es privado.")
        return

    # Lógica de filtros inteligente
    meta = int(len(lista_cabezas) * 0.75) if total < 300 else len(lista_cabezas)
    print(f"📊 Video: {vid} | Total Real: {total}")
    print(f"🎯 Cabezas: {len(lista_cabezas)} | Meta: {meta}")

    # Cargar Memoria Anti-Apagado
    respondidos = []
    if os.path.exists(archivo_memoria):
        with open(archivo_memoria, "r") as f: respondidos = f.read().splitlines()

    enviados = 0
    for c in lista_cabezas:
        if enviados >= meta: break
        cid = c.get('cid')
        
        if cid in respondidos: continue

        frase = random.choice(mis_frases)
        codigo = ''.join(random.choices(string.ascii_letters + string.digits, k=3))
        
        print(f"\n✅ [{enviados+1}/{meta}] Comentando en: {cid}")
        print(f"💬 {frase} {codigo}")

        with open(archivo_memoria, "a") as f: f.write(f"{cid}\n")
        enviados += 1
        time.sleep(random.randint(15, 22))

if __name__ == "__main__":
    ejecutar_mision()
