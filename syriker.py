import requests
import time
import random

TOKEN = 'MTQ1Njc5NzEwMzEzMjExNTE2OA.GsCeTn.phYwLtDp1doxDWHh6VsKb3749PJKr8GziGs5Sg'
OBJETIVOS = ['1458509527233069191', '1438662990021922869', '1455775511836889089']
TEXTO = "OBEY OR BE PREÑATED BY WARSZLA"

headers = {'Authorization': TOKEN, 'Content-Type': 'application/json'}
contador = 0

def ejecutar_accion(id_obj):
    # 1. Simular que el bot está escribiendo (esto calma los filtros de Discord)
    requests.post(f"https://discord.com/api/v9/channels/{id_obj}/typing", headers=headers)
    time.sleep(random.randint(3, 7)) # Espera aleatoria humana

    # 2. Intentar crear el grupo
    url = "https://discord.com/api/v9/users/@me/channels"
    r = requests.post(url, headers=headers, json={"recipients": [id_obj]})
    
    if r.status_code in [200, 201]:
        channel_id = r.json()['id']
        # 3. Poner nombre al grupo
        requests.patch(f"https://discord.com/api/v9/channels/{channel_id}", 
                       headers=headers, json={"name": f"{TEXTO} #{random.randint(100, 999)}"})
        # 4. Enviar mensaje
        requests.post(f"https://discord.com/api/v9/channels/{channel_id}/messages", 
                      headers=headers, json={"content": TEXTO})
        return True
    return False

print("🔥 MODO INFILTRACIÓN ACTIVO...")

while True:
    random.shuffle(OBJETIVOS) # Cambiamos el orden para no ser predecibles
    for id_obj in OBJETIVOS:
        if ejecutar_accion(id_obj):
            contador += 1
            print(f"✅ GRUPO #{contador} CREADO con {id_obj}")
            # ESPERA LARGA entre grupos para que no nos bloqueen tras el primero
            espera = random.randint(90, 120)
            print(f"⏳ Espera de seguridad: {espera}s...")
            time.sleep(espera)
        else:
            print(f"❌ Discord rechazó la creación con {id_obj} (Posible bloqueo temporal)")
            time.sleep(10)
