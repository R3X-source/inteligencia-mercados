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

TIEMPO_MIN = 90  # Más lento para que no te cierren la app
TIEMPO_MAX = 200
USUARIOS_A_SPAMEAR = ["margoul_xz"]
# ==========================================

cl = Client()

def ejecutar():
    # Eliminamos rastro de sesiones fallidas anteriores
    if os.path.exists("session.json"):
        os.remove("session.json")

    print("🛰️ Intentando 'colarse' usando la sesión activa de la app...")
    
    try:
        # 1. Ajustes de dispositivo para que parezca un celular real
        cl.set_device({
            "app_version": "269.0.0.18.230",
            "android_version": 29,
            "manufacturer": "Samsung",
            "model": "SM-G973F",
        })

        # 2. LOGIN CON DELAY LARGO
        # Esto es clave: Instagram ya sabe que estás conectado en la app.
        # Vamos a entrar muy despacio.
        print("⏳ Sincronizando con el servidor (espera 60 segundos)...")
        time.sleep(60) 

        cl.login(USUARIO, PASSWORD)
        print("✅ ¡ENTRAMOS! El script se acopló a tu sesión.")
        
    except Exception as e:
        if "blacklist" in str(e).lower():
            print("\n⚠️ EL SERVIDOR BLOQUEÓ EL ACCESO POR SCRIPT.")
            print("Como tienes la app abierta, mándale UN mensaje manual a tu objetivo.")
            print("Eso a veces 'desbloquea' la IP para el bot.")
        else:
            print(f"❌ Error: {e}")
        return

    for target in USUARIOS_A_SPAMEAR:
        try:
            # Tu código numérico arriba de todo
            codigo = random.randint(100000, 999999)
            texto_final = f"{codigo}\n{MI_MENSAJE}"
            
            user_id = cl.user_id_from_username(target)
            cl.direct_send(texto_final, [user_id])
            print(f"🚀 Enviado con éxito:\n{texto_final}")
            
            espera = random.randint(TIEMPO_MIN, TIEMPO_MAX)
            print(f"⏳ Pausa de seguridad: {espera} segundos...")
            time.sleep(espera)
            
        except Exception as e:
            print(f"⚠️ No se pudo enviar: {e}")
            time.sleep(120)

if __name__ == "__main__":
    ejecutar()
