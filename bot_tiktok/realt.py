import time
import random
import string
import os
import requests
import re

# DATOS MAESTROS (Capturas 2531, 2539, 2541)
session_id = "ee04a693bb5d9bf31d1b5e692a39db85"
uid_tt = "5e2b18b0824e4c5d428e630241fe3b8b26923c8ced4212834ab84fe14805af42"
# msToken largo de tu captura inicial
ms_token = "jswLR6gmfezRddaW-dPYs_GH2mLtulFuUJ5d3TXAPBFuwGzDGr2TiymNF5OMU1gYdvXWJ7Yw_XaSecf1r12n32uUCdFet7WbkWy6KLYntqSC-TBjF5exASBTh2ZtsGshY-NGEVO0u0WHhDtjnHikYamJ"
csrf = "iT51VyAL-l-X24xoGq0EfQVM34i3SqX" 

url_video = "https://vt.tiktok.com/ZSa18enYx/"
archivo_memoria = "registro.txt"
mis_frases = ["vardrid 😂", "Embra 😂", "kayada 😂", "dsmada 😂", "mamith4m 😂", "envr4 😂", "penaldo 😂", "penaldismo 😂"]

def escaneo_real():
    headers = {
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
        "Cookie": f"sessionid={session_id}; uid_tt={uid_tt}; msToken={ms_token}; tt_csrf_token={csrf}",
        "X-Secsdk-Csrf-Token": csrf,
        "Accept": "application/json, text/plain, */*"
    }
    try:
        # 1. Obtener ID del video
        res = requests.get(url_video, allow_redirects=True, timeout=10)
        vid = re.search(r'/video/(\d+)', res.url).group(1)
        
        # 2. Consultar API Real
        api_url = f"https://www.tiktok.com/api/comment/list/?aweme_id={vid}&count=50&cursor=0"
        r = requests.get(api_url, headers=headers, timeout=10).json()
        
        total = r.get('total', 0)
        comments = r.get('comments', [])
        
        # Datos del comentario más popular para verificar
        top_l = comments[0].get('digg_count', 0) if comments else 0
        top_u = comments[0].get('user', {}).get('nickname', 'N/A') if comments else "N/A"
        
        return total, top_l, top_u, vid, comments
    except:
        return 0, 0, "N/A", None, []

def ejecutar():
    print(f"--- VERIFICACIÓN DE TERRENO (ESL3I3R) ---")
    total, likes, user, vid, lista = escaneo_real()
    
    # AQUÍ VERIFICAS SI FUNCIONA O ES HUMO
    print(f"📊 TOTAL COMENTARIOS: {total}")
    print(f"🔥 LIKES TOP COMMENT: {likes} ({user})")
    print(f"🎬 VIDEO ID: {vid}")
    print(f"------------------------------------------")

    if total == 0:
        print("❌ TikTok sigue bloqueando. Los tokens de Mises han caducado.")
        return

    # Si hay éxito, el bot "atina" solo
    cabezas = [c for c in lista if not c.get('reply_id') or c.get('reply_id') == "0"]
    meta = int(len(cabezas) * 0.75) if total < 300 else len(cabezas)
    
    print(f"🎯 META REAL: {meta} cabezas principales.")

    # Registro en memoria
    if not os.path.exists(archivo_memoria): open(archivo_memoria, 'w').close()
    with open(archivo_memoria, "r") as f: respondidos = f.read().splitlines()

    enviados = 0
    for c in cabezas:
        if enviados >= meta: break
        cid = c.get('cid')
        if cid in respondidos: continue

        frase = random.choice(mis_frases)
        codigo = ''.join(random.choices(string.ascii_letters + string.digits, k=3))
        
        print(f"\n✅ [{enviados+1}/{meta}] Impacto en CID: {cid}")
        print(f"💬 {frase} {codigo}")

        with open(archivo_memoria, "a") as f: f.write(f"{cid}\n")
        enviados += 1
        time.sleep(random.randint(15, 22))

if __name__ == "__main__":
    ejecutar()
