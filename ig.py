import time
import random
import os
from instagrapi import Client

# ==========================================
# CONFIGURACIÓN (TUS DATOS Y TIEMPO ARRIBA)
# ==========================================
USUARIO = '3nl3ksjajskajskss'
PASSWORD = 'ERREELEMAMI1'
MI_MENSAJE = "FRANKA PREÑADA POR DANIELA AND WARSZLA🤣🤣🤣🤣"

# --- AQUÍ ASIGNAS EL TIEMPO (SEGUNDOS) ---
TIEMPO_MIN = 5 
TIEMPO_MAX = 100

# --- OBJETIVOS ---
USUARIOS_A_SPAMEAR = ["@margoul_xz"] 
GRUPOS_A_SPAMEAR = [] 
# ==========================================

cl = Client()

def seguridad_dispositivo():
    """Simula un dispositivo distinto para la IP de WiFi"""
    modelos = ["SM-G991B", "Pixel 6", "M2101K6G", "RMX3363"]
    cl.set_device_settings({
        "app_version": "269.0.0.18.230",
        "android_version": random.randint(26, 31),
        "manufacturer": "Samsung",
        "model": random.choice(modelos),
    })

def login_con_reconexion():
    session_file = "session.json"
    try:
        if os.path.exists(session_file):
            cl.load_settings(session_file)
        cl.login(USUARIO, PASSWORD)
        cl.dump_settings(session_file)
        print("✅ Sesión activa.")
        return True
    except Exception as e:
        print(f"❌ Error: {e}. Reintentando...")
        time.sleep(15)
        return False

def generar_mensaje_con_numero_arriba(base):
    """Pone el número arriba de todo"""
    codigo = random.randint(100000, 999999)
    return f"{codigo}\n{base}"

def ejecutar():
    seguridad_dispositivo()
    if not login_con_reconexion(): return

    # Juntamos usuarios y grupos
    objetivos = [(u, "user") for u in USUARIOS_A_SPAMEAR] + [(g, "group") for g in GRUPOS_A_SPAMEAR]

    for target, tipo in objetivos:
        while True:
            try:
                texto_final = generar_mensaje_con_numero_arriba(MI_MENSAJE)
                
                if tipo == "user":
                    user_id = cl.user_id_from_username(target)
                    cl.direct_send(texto_final, [user_id])
                else:
                    threads = cl.direct_threads(15)
                    t_id = next((t.id for t in threads if target in str(t.thread_title)), None)
                    if t_id:
                        cl.direct_send(texto_final, thread_ids=[t_id])

                print(f"🚀 Enviado a {target}:\n{texto_final}")
                
                # Usa el tiempo que asignaste arriba
                espera = random.randint(TIEMPO_MIN, TIEMPO_MAX)
                print(f"⏳ Esperando {espera} segundos...")
                time.sleep(espera)
                break 

            except Exception as e:
                print(f"⚠️ Error. Reconectando... {e}")
                time.sleep(60)
                login_con_reconexion()

if __name__ == "__main__":
    ejecutar()
