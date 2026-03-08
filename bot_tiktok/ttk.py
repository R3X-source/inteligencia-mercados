import time
import random
import string
import os
import requests
import re

# CONFIGURACIÓN MAESTRA (Mises Browser)
session_id = "ee04a693bb5d9bf31d1b5e692a39db85" #
user_id = "5e2b18b0824e4c5d428e630241fe3b8b26923c8ced4212834ab84fe14805af42" #
url_video = "https://vt.tiktok.com/ZSa18enYx/" #
archivo_memoria = "registro.txt"

# TUS 8 FRASES DE COMBATE
mis_frases = ["vardrid 😂", "Embra 😂", "kayada 😂", "dsmada 😂", "mamith4m 😂", "envr4 😂", "penaldo 😂", "penaldismo 😂"]

def obtener_datos_api():
    """El bot entra al video y ATINA al conteo real sin inventar"""
    headers = {
        "Cookie": f"sessionid={session_id}; uid_tt={user_id}",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36"
    }
    try:
        # Extraer ID del video del link corto
        res_link = requests.get(url_video, allow_redirects=True)
        vid = re.search(r'/video/(\d+)', res_link.url).group(1)
        
        # Consultar la API de TikTok
        api_url = f"https://www.tiktok.com/api/comment/list/?aweme_id={vid}&count=50"
        data = requests.get(api_url, headers=headers).json()
        
        total_real = data.get('total', 0)
        # FILTRO INTELIGENTE: Solo cabezas (reply_id es 0 o vacío)
        cabezas = [c for c in data.get('comments', []) if not c.get('reply_id') or c.get('reply_id') == "0"]
        
        return total_real, cabezas, vid
    except Exception as e:
        print(f"❌ Error de conexión: {e}")
        return 0, [], None

def ejecutar_mision():
    print(f"--- INICIANDO RECONOCIMIENTO (ESL3I3R) ---")
    total, lista_cabezas, vid = obtener_datos_api()
    
    if not vid: return

    # FILTROS DE INTELIGENCIA SEGÚN VOLUMEN REAL
    if total < 300:
        meta = int(len(lista_cabezas) * 0.75)
        min_likes = 0
        modo = "AGRESIVO (75%)"
    elif 300 <= total <= 800:
        meta = len(lista_cabezas)
        min_likes = 10
        modo = "SELECTIVO (100% de Cabezas > 10 Likes)"
    else: # > 800
        meta = int(len(lista_cabezas) * 0.50)
        min_likes = 50
        modo = "MODERADO (50% de Cabezas con más Likes)"

    print(f"📊 Video ID: {vid} | Total Real: {total}")
    print(f"🛡️ Filtro Activo: {modo} | Meta: {meta} respuestas")

    # Cargar memoria para no repetir
    respondidos = []
    if os.path.exists(archivo_memoria):
        with open(archivo_memoria, "r") as f: respondidos = f.read().splitlines()
    print(f"🧠 Memoria: {len(respondidos)} comentarios ya ignorados.")

    enviados = 0
    for c in lista_cabezas:
        if enviados >= meta: break
        
        cid = c.get('cid')
        likes = c.get('digg_count', 0)

        # REGLA: No repetir y cumplir el mínimo de likes
        if cid in respondidos or likes < min_likes:
            continue

        frase = random.choice(mis_frases)
        codigo = ''.join(random.choices(string.ascii_letters + string.digits, k=3))
        
        print(f"\n✅ [{enviados+1}/{meta}] Atacando Cabeza: {cid} ({likes} likes)")
        print(f"💬 Mensaje: {frase} {codigo}")

        # Guardar en memoria inmediatamente
        with open(archivo_memoria, "a") as f: f.write(f"{cid}\n")
        enviados += 1

        # SEGURIDAD ANTI-BAN (15-22s)
        pausa = random.randint(15, 22)
        print(f"⏳ Espera de seguridad: {pausa}s...")
        time.sleep(pausa)

    print(f"\n--- TRABAJO FINALIZADO PARA ESL3I3R ---")

if __name__ == "__main__":
    ejecutar_mision()
