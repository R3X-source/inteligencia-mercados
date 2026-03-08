import requests
import time
import random

# ================= CONFIGURACIÓN =================
TOKEN = 'MTQ1Njc5NzEwMzEzMjExNTE2OA.GsCeTn.phYwLtDp1doxDWHh6VsKb3749PJKr8GziGs5Sg'
OBJETIVOS = ['1458509527233069191', '1438662990021922869', '1455775511836889089']
TEXTO = "OBEY OR BE PREÑATED BY WARSZLA"
# =================================================

headers = {'Authorization': TOKEN, 'Content-Type': 'application/json'}
contador = 0

def crear_grupo(id_objetivo):
    url = "https://discord.com/api/v9/users/@me/channels"
    # Intentamos crear el grupo
    payload = {"recipients": [id_objetivo]}
    
    r = requests.post(url, headers=headers, json=payload)
    
    if r.status_code == 200 or r.status_code == 201:
        channel_id = r.json()['id']
        # Cambiar nombre
        url_rename = f"https://discord.com/api/v9/channels/{channel_id}"
        nombre = f"{TEXTO} #{random.randint(1000, 9999)}"
        requests.patch(url_rename, headers=headers, json={"name": nombre})
        
        # Enviar mensaje
        url_msg = f"https://discord.com/api/v9/channels/{channel_id}/messages"
        requests.post(url_msg, headers=headers, json={"content": TEXTO})
        return True
    else:
        print(f"❌ Error en ID {id_objetivo}: {r.status_code} - {r.text}")
        return False

print("🚀 INICIANDO MODO PYTHON (DIRECTO API)...")

while True:
    print(f"\n📊 Ronda de ataque en curso...")
    for id_obj in OBJETIVOS:
        exito = crear_grupo(id_obj)
        if exito:
            contador += 1
            print(f"🔥 ÉXITO total acumulado: {contador}")
        time.sleep(5) # Delay entre cada ID para que Discord no sospeche
    
    print(f"⏳ Esperando 90 segundos para la siguiente ronda...")
    time.sleep(90)
