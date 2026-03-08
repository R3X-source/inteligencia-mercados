import requests
import time
import random

# ================= CONFIGURACIÓN =================
# Pon aquí tus tokens. Puedes poner 2, 3 o los que tengas.
TOKENS = [
    'MTQ1Njc5NzEwMzEzMjExNTE2OA.GsCeTn.phYwLtDp1doxDWHh6VsKb3749PJKr8GziGs5Sg', # darklordezlaller
    'MTQ1NTA2MDQ3NTAxOTY2MTQzMw.Gt9WMx.BitxJuQdC2VJbtJ2CB3zvqJ03FxJ7OlZ73UCkQ' 
]

# El usuario que te da error (el rebelde) y Movistar
OBJETIVOS = ['1458509527233069191', '1438662990021922869', '1455775511836889089']

TEXTO = "OBEY OR BE PREÑATED BY WARSZLA"
# =================================================

contador_total = 0

def intentar_crear(token, id_objetivo):
    headers = {'Authorization': token, 'Content-Type': 'application/json'}
    url = "https://discord.com/api/v9/users/@me/channels"
    
    # 1. Intentamos crear el grupo
    r = requests.post(url, headers=headers, json={"recipients": [id_objetivo]})
    
    if r.status_code in [200, 201]:
        channel_id = r.json()['id']
        
        # 2. Renombrar grupo
        nombre = f"{TEXTO} #{random.randint(1000, 9999)}"
        requests.patch(f"https://discord.com/api/v9/channels/{channel_id}", 
                       headers=headers, json={"name": nombre})
        
        # 3. Mandar mensaje
        requests.post(f"https://discord.com/api/v9/channels/{channel_id}/messages", 
                      headers=headers, json={"content": TEXTO})
        return True
    return False

print("🚀 INICIANDO MULTI-TOKEN ATTACK...")

while True:
    for id_obj in OBJETIVOS:
        exito_id = False
        print(f"\n🎯 Objetivo: {id_obj}")
        
        for i, t in enumerate(TOKENS):
            print(f"  Trying con Token #{i+1}...")
            if intentar_crear(t, id_obj):
                contador_total += 1
                print(f"  🔥 ¡LOGRADO! (Token #{i+1})")
                exito_id = True
                break # Si ya funcionó con un token, no gastamos los otros
            else:
                print(f"  ❌ Token #{i+1} rechazado (400/403).")
        
        if not exito_id:
            print(f"  💀 Ningún token pudo con {id_obj}. Revisa amistad o privacidad.")
        
        time.sleep(3) # Pausa corta entre objetivos

    print(f"\n📈 TOTAL DE GRUPOS CREADOS: {contador_total}")
    print("⏳ Esperando 90 segundos para la siguiente ronda...")
    time.sleep(90)
