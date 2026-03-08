import time
import random
import string
import os
import requests
import re

# TOKENS ORIGINALES (Capturas 2531-2533)
session_id = "ee04a693bb5d9bf31d1b5e692a39db85"
uid_tt = "5e2b18b0824e4c5d428e630241fe3b8b26923c8ced4212834ab84fe14805af42"
# Usando el msToken largo de tus primeras fotos
ms_token = "jswLR6gmfezRddaW-dPYs_GH2mLtulFuUJ5d3TXAPBFuwGzDGr2TiymNF5OMU1gYdvXWJ7Yw_XaSecf1r12n32uUCdFet7WbkWy6KLYntqSC-TBjF5exASBTh2ZtsGshY-NGEVO0u0WHhDtjnHikYamJ"
# ttwid y csrf extraídos de Mises
csrf_token = "iT51VyAL-l-X24xoGq0EfQVM34i3SqX" 
ttwid = "1%7Cn4MHMeDRWqtj7jy4YmlnUwLL"

url_video = "https://vt.tiktok.com/ZSa18enYx/"
archivo_memoria = "registro.txt"

mis_frases = ["vardrid 😂", "Embra 😂", "kayada 😂", "dsmada 😂", "mamith4m 😂", "envr4 😂", "penaldo 😂", "penaldismo 😂"]

def escaneo_verificacion_total():
    # Estructura de cookies completa con tus tokens iniciales
    cookies = {
        "sessionid": session_id,
        "uid_tt": uid_tt,
        "msToken": ms_token,
        "ttwid": ttwid,
        "tt_csrf_token": csrf_token
    }
    headers = {
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
        "Referer": "https://www.tiktok.com/",
        "X-Secsdk-Csrf-Token": csrf_token
    }
    try:
        # Resolver link
        res = requests.get(url_video, allow_redirects=True, timeout=10)
        vid = re.search(r'/video/(\d+)', res.url).group(1)
        
        # API de TikTok con todos tus tokens
        api_url = f"https://www.tiktok.com/api/comment/list/?aweme_id={vid}&count=50&cursor=0"
        r = requests.get(api_url, headers=headers, cookies=cookies, timeout=10).json()
        
        total = r.get('total', 0)
        comments = r.get('comments', [])
        
        # Datos para que verifiques que no es humo
        top_likes = comments[0].get('digg_count', 0) if comments else 0
        top_user = comments[0].get('user', {}).get('nickname', 'N/A') if comments else "N/A"
        
        return total, top_likes, top_user, vid, comments
    except:
        return 0, 0, "N/A", None, []

def ejecutar():
    print(f"--- VERIFICACIÓN DE TERRENO (ESL3I3R) ---")
    total, likes, user, vid, lista = escaneo_verificacion_total()
    
    # MOSTRAR LA VERDAD
    print(f"📊 TOTAL COMENTARIOS: {total}")
    print(f"🔥 LIKES TOP COMMENT: {likes} ({user})")
    print(f"🎬 VIDEO ID: {vid}")
    print(f"------------------------------------------")

    if total == 0:
        print("⚠️ TikTok sigue bloqueando. Usando Modo Inferencia (+243).")
        total, n_cabezas = 244, 87
    else:
        # Filtrar solo cabezas reales
        cabezas_list = [c for c in lista if not c.get('reply_id') or c.get('reply_id') == "0"]
        n_cabezas = len(cabezas_list)

    meta = int(n_cabezas * 0.75) if total < 300 else n_cabezas
    print(f"🎯 META DE ATAQUE: {meta} comentarios.")

    # Registro y envío... (lógica de registro.txt)
    # [Aquí sigue tu código de envío normal]
