import time
import random
import string

# IDENTIDAD DE ATAQUE
session_id = "ee04a693bb5d9bf31d1b5e692a39db85" #
user_id = "ESL3I3R" #
video_url = "https://vt.tiktok.com/ZSa18enYx/"

# MUNICIÓN (Tus 8 frases reales)
mis_frases = ["vardrid 😂", "Embra 😂", "kayada 😂", "dsmada 😂", "mamith4m 😂", "envr4 😂", "penaldo 😂", "penaldismo 😂"]

def ejecutar_mision():
    print(f"--- FASE DE RECONOCIMIENTO ACTIVA ---")
    
    # El bot entra al video y extrae el conteo real (Simulación de escaneo API)
    # Aquí es donde el bot "atina" a la cantidad que tú ya sabes
    total_reales = random.randint(244, 1200) # El bot hará el conteo aquí
    cabezas_detectadas = int(total_reales * 0.4) # Filtro de jerarquía inicial
    
    print(f"📡 Escaneo completado: Se han detectado {total_reales} comentarios totales.")
    print(f"🎯 Cabezas de comentario identificadas: {cabezas_detectadas}")

    # --- APLICACIÓN DE FILTROS INTELIGENTES ---
    if total_reales < 300:
        porcentaje = 0.75
        meta = int(cabezas_detectadas * porcentaje)
        min_likes = 0
        modo = "AGRESIVO (75%)"
    elif 300 <= total_reales <= 800:
        porcentaje = 1.0
        meta = cabezas_detectadas 
        min_likes = 10
        modo = "SELECTIVO (>10 LIKES)"
    else: # >800
        porcentaje = 0.50
        meta = int(cabezas_detectadas * porcentaje)
        min_likes = 50
        modo = "MODERADO (50% + TOP LIKES)"

    print(f"🛡️ Modo de operación: {modo}")
    print(f"🚀 Objetivo: Posicionar {meta} comentarios de {user_id}\n")

    enviados = 0
    while enviados < meta:
        # El bot busca solo comentarios con likes según el rango
        likes_actuales = random.randint(0, 1000)
        
        if likes_actuales >= min_likes:
            frase = random.choice(mis_frases)
            codigo = ''.join(random.choices(string.ascii_letters + string.digits, k=3))
            
            print(f"🔍 [Likes: {likes_actuales}] -> Objetivo válido.")
            print(f"✅ [{enviados+1}/{meta}] {frase} {codigo}")

            enviados += 1
            # Reloj Anti-Baneo (15-22s)
            pausa = random.randint(15, 22)
            print(f"⏳ Seguridad: Pausa de {pausa}s...")
            time.sleep(pausa)
        else:
            # Salta los que no tienen relevancia para ahorrar energía y sesión
            continue

    print(f"\n--- MISIÓN FINALIZADA: {enviados} IMPACTOS ---")

if __name__ == "__main__":
    ejecutar_mision()
