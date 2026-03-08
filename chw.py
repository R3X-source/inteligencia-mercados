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
TIEMPO_MIN = 60
TIEMPO_MAX = 120
USUARIOS_A_SPAMEAR = ["margoul_xz"]
# ==========================================

cl = Client()

def ejecutar():
    # 1. Limpieza total antes de empezar
    if os.path.exists("session.json"): os.remove("session.json")
    
    print("🚀 Intentando login simplificado...")
    try:
        # No usamos set_device antes del login para que use el por defecto de la librería
        cl.login(USUARIO, PASSWORD)
        print("✅ ¡LOGUEADO! El muro ha caído.")
    except Exception as e:
        print(f"❌ Sigue el bloqueo: {e}")
        print("💡 CONSEJO: Apaga la VPN y usa el WiFi normal pero REINICIA TU ROUTER.")
        return

    for target in USUARIOS_A_SPAMEAR:
        try:
            # Número arriba
            texto = f"{random.randint(100000, 999999)}\n{MI_MENSAJE}"
            uid = cl.user_id_from_username(target)
            cl.direct_send(texto, [uid])
            print(f"🚀 Enviado a {target}:\n{texto}")
            
            espera = random.randint(TIEMPO_MIN, TIEMPO_MAX)
            print(f"⏳ Esperando {espera} segundos...")
            time.sleep(espera)
        except Exception as e:
            print(f"⚠️ Error: {e}")

if __name__ == "__main__":
    ejecutar()
