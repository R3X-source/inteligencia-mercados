import time
import random
import os
from instagrapi import Client

# ==========================================
# CONFIGURACIÓN
# ==========================================
USUARIO = '3nl3ksjajskajskss'
PASSWORD = 'ERREELEMAMI1'
MI_MENSAJE = "FRANKA PREÑADA POR DANIELA AND WARSZLA🤣🤣🤣🤣"

TIEMPO_MIN = 60  # Subí esto para que no te quemen tan rápido
TIEMPO_MAX = 150

USUARIOS_A_SPAMEAR = ["margoul_xz"]
# ==========================================

cl = Client()

def rotar_identidad():
    """Genera un dispositivo nuevo y espera un tiempo aleatorio antes de entrar"""
    dispositivos = [
        {"model": "SM-A525F", "manufacturer": "Samsung"},
        {"model": "Pixel 7 Pro", "manufacturer": "Google"},
        {"model": "Redmi Note 11", "manufacturer": "Xiaomi"},
        {"model": "OnePlus 9", "manufacturer": "OnePlus"}
    ]
    dev = random.choice(dispositivos)
    cl.set_device({
        "app_version": "269.0.0.18.230",
        "android_version": random.randint(26, 31),
        "manufacturer": dev["manufacturer"],
        "model": dev["model"],
    })
    print(f"🎭 Usando identidad de: {dev['model']}")

def login_inteligente():
    """Intenta loguear con pausas para limpiar el rastro de la IP"""
    session_file = "session.json"
    
    # Si hay una sesión vieja que falló, la borramos para empezar limpio
    if os.path.exists(session_file):
        os.remove(session_file)
        print("🗑️ Sesión antigua borrada para limpiar rastro.")

    try:
        # Pausa de 'enfriamiento' antes de tocar el servidor
        espera_pre = random.randint(10, 20)
        print(f"⏳ Enfriando IP por {espera_pre} segundos...")
        time.sleep(espera_pre)

        cl.login(USUARIO, PASSWORD)
        cl.dump_settings(session_file)
        print("✅ ¡Entramos! El engaño funcionó.")
        return True
    except Exception as e:
        error_msg = str(e).lower()
        if "blacklist" in error_msg:
            print("❌ Seguimos en Blacklist. El WiFi está muy caliente.")
            print("💡 RECOMENDACIÓN: Apaga el WiFi 5 minutos y vuelve a intentar.")
        elif "checkpoint" in error_msg:
            print("⚠️ Instagram pide verificación (Checkpoint).")
        else:
            print(f"❌ Error inesperado: {e}")
        return False

def ejecutar():
    rotar_identidad()
    
    # Intentar login hasta que entre (con pausas largas)
    while not login_inteligente():
        print("⏳ Reintentando engaño en 2 minutos...")
        time.sleep(120) 

    for target in USUARIOS_A_SPAMEAR:
        try:
            # Número arriba como pediste
            texto = f"{random.randint(100000, 999999)}\n{MI_MENSAJE}"
            
            user_id = cl.user_id_from_username(target)
            cl.direct_send(texto, [user_id])
            print(f"🚀 Enviado a {target}")
            
            espera = random.randint(TIEMPO_MIN, TIEMPO_MAX)
            print(f"⏳ Esperando {espera} segundos...")
            time.sleep(espera)
        except Exception as e:
            print(f"⚠️ Fallo en envío: {e}")
            time.sleep(60)

if __name__ == "__main__":
    ejecutar()
