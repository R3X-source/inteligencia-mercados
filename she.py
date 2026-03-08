import time
import random
import os
import sys
from instagrapi import Client

# ==========================================
# CONFIGURACIÓN (TUS DATOS)
# ==========================================
USUARIO = '3nl3ksjajskajskss'
PASSWORD = 'ERREELEMAMI1'
MI_MENSAJE = "FRANKA PREÑADA POR DANIELA AND WARSZLA🤣🤣🤣🤣"

# Tiempos de espera (En WiFi/VPN mejor no bajar de 60)
TIEMPO_MIN = 60
TIEMPO_MAX = 120

# Objetivos
USUARIOS_A_SPAMEAR = ["margoul_xz"]
GRUPOS_A_SPAMEAR = [] 
# ==========================================

cl = Client()

def limpiar_rastro():
    """Borra archivos de sesión para que IG no vea el historial de la IP bloqueada"""
    archivos = ["session.json", "settings.json"]
    for f in archivos:
        if os.path.exists(f):
            os.remove(f)
    print("🧹 Rastro de IP anterior eliminado.")

def rotar_dispositivo():
    """Cambia la identidad del teléfono en cada intento"""
    modelos = [
        {"model": "SM-G991B", "manufacturer": "Samsung"},
        {"model": "Pixel 6 Pro", "manufacturer": "Google"},
        {"model": "OnePlus 10T", "manufacturer": "OnePlus"},
        {"model": "Xiaomi 12", "manufacturer": "Xiaomi"}
    ]
    dev = random.choice(modelos)
    cl.set_device({
        "app_version": "269.0.0.18.230",
        "android_version": random.randint(26, 31),
        "manufacturer": dev["manufacturer"],
        "model": dev["model"],
    })
    print(f"📱 Identidad asignada: {dev['model']}")

def login_con_salto_ip():
    """Sistema de login preparado para VPN"""
    while True:
        limpiar_rastro()
        rotar_dispositivo()
        
        try:
            print(f"\n🌐 Intentando conexión con IP actual...")
            # Espera humana antes de loguear
            time.sleep(random.randint(5, 10))
            
            cl.login(USUARIO, PASSWORD)
            cl.dump_settings("session.json")
            print("✅ ¡LOGUEADO! La IP es válida.")
            return True
            
        except Exception as e:
            error = str(e).lower()
            if "blacklist" in error or "proxy" in error:
                print("\n❌ ERROR: Esta IP está en la BLACKLIST de Instagram.")
                print("🚨 ACCIÓN REQUERIDA:")
                print("1. Abre tu app de VPN.")
                print("2. Cambia a otro país o ciudad.")
                print("3. Presiona ENTER aquí cuando ya tengas la nueva IP.")
                input(">>> ESPERANDO CAMBIO DE VPN...")
            elif "checkpoint" in error:
                print("⚠️ Checkpoint: Instagram te pide verificar tu identidad (Email/SMS).")
                sys.exit()
            else:
                print(f"❌ Error desconocido: {e}")
                print("Reintentando en 30 segundos...")
                time.sleep(30)

def generar_mensaje(base):
    """Pone el número arriba de todo (en el techo)"""
    num = random.randint(100000, 999999)
    return f"{num}\n{base}"

def ejecutar():
    print("--- INICIANDO SCRIPT BLINDADO ---")
    
    if not login_con_salto_ip():
        return

    # Unir objetivos
    targets = [(u, "user") for u in USUARIOS_A_SPAMEAR] + [(g, "group") for g in GRUPOS_A_SPAMEAR]

    for t, tipo in targets:
        while True:
            try:
                msg = generar_mensaje(MI_MENSAJE)
                
                if tipo == "user":
                    uid = cl.user_id_from_username(t)
                    cl.direct_send(msg, [uid])
                else:
                    threads = cl.direct_threads(15)
                    tid = next((x.id for x in threads if t in str(x.thread_title)), None)
                    if tid:
                        cl.direct_send(msg, thread_ids=[tid])

                print(f"🚀 ENVIADO A {t}:\n{msg}")
                
                wait = random.randint(TIEMPO_MIN, TIEMPO_MAX)
                print(f"⏳ Esperando {wait} segundos...")
                time.sleep(wait)
                break

            except Exception as e:
                print(f"⚠️ Fallo en el envío: {e}")
                print("Posible IP bloqueada durante el proceso. Reiniciando login...")
                if not login_con_salto_ip():
                    break

if __name__ == "__main__":
    ejecutar()
