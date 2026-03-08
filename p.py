import requests
import time
import random

# ================= CONFIGURACIÓN =================
TOKEN = 'MTQ1Njc5NzEwMzEzMjExNTE2OA.GsCeTn.phYwLtDp1doxDWHh6VsKb3749PJKr8GziGs5Sg'
ID_PRINCIPAL = '1456803754061074493'
TEXTO = "OBEY OR BE PREÑATED BY WARSZLA"

headers = {
    'Authorization': TOKEN,
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

contador = 0

def crear_grupo_objetivo():
    global contador
    # El truco del parámetro aleatorio ?v= para intentar que Discord no vea la misma petición
    url_crear = f"https://discord.com/api/v9/users/@me/channels?v={random.randint(1, 9999)}"
    
    try:
        # 1. "Escribiendo" para simular que eres humano
        requests.post(f"https://discord.com/api/v9/channels/{ID_PRINCIPAL}/typing", headers=headers)
        time.sleep(random.randint(5, 8)) 

        # 2. Intentar crear el grupo
        payload = {"recipients": [ID_PRINCIPAL]}
        r = requests.post(url_crear, headers=headers, json=payload)
        
        if r.status_code in [200, 201]:
            channel_id = r.json()['id']
            
            # Cambiar nombre
            nombre_grupo = f"{TEXTO} #{random.randint(1000, 9999)}"
            requests.patch(f"https://discord.com/api/v9/channels/{channel_id}", 
                           headers=headers, json={"name": nombre_grupo})
            
            # Enviar mensaje
            requests.post(f"https://discord.com/api/v9/channels/{channel_id}/messages", 
                          headers=headers, json={"content": TEXTO})
            
            contador += 1
            print(f"🔥 [ÉXITO] Grupo #{contador} creado con la ID principal.")
            return True
        
        elif r.status_code == 400:
            print(f"❌ [BLOQUEO 400] Discord dice que la petición es inválida (posible límite de grupos).")
            return False
        else:
            print(f"❌ Error: {r.status_code} - {r.text}")
            return False
            
    except Exception as e:
        print(f"⚠️ Error de conexión: {e}")
        return False

print(f"🚀 ATACANDO OBJETIVO PRINCIPAL: {ID_PRINCIPAL}")

while True:
    exito = crear_grupo_objetivo()
    
    if exito:
        # Espera de seguridad de 3 minutos tras un éxito
        espera = 180 
        print(f"📈 Total: {contador}. Esperando {espera}s para no quemar el token...")
        time.sleep(espera)
    else:
        # Si da Error 400, esperamos 5 minutos para que Discord se "olvide" del intento
        print("⏳ Bloqueo detectado. Esperando 300 segundos (5 min) para reintentar...")
        time.sleep(300)
