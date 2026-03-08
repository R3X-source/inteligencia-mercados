import requests
import time
import random

# ================= CONFIGURACIÓN =================
TOKEN = 'MTQ1Njc5NzEwMzEzMjExNTE2OA.GsCeTn.phYwLtDp1doxDWHh6VsKb3749PJKr8GziGs5Sg'
ID_IMPORTANTE = '1438662990021922869'
ID_RELLENO = '1455775511836889089'
TEXTO = "OBEY OR BE PREÑATED BY WARSZLA"

# Headers para parecer un navegador real
headers = {
    'Authorization': TOKEN,
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

contador = 0

def ejecutar_ataque():
    global contador
    # URL con bypass de caché para que Discord no detecte repetición
    url_crear = f"https://discord.com/api/v9/users/@me/channels?v={random.randint(1, 9999)}"
    
    try:
        # 1. Señal de "escribiendo" para simular humanidad
        requests.post(f"https://discord.com/api/v9/channels/{ID_IMPORTANTE}/typing", headers=headers)
        time.sleep(3)

        # 2. Creación del grupo con ID IMPORTANTE + RELLENO
        payload = {"recipients": [ID_IMPORTANTE, ID_RELLENO]}
        r = requests.post(url_crear, headers=headers, json=payload)
        
        if r.status_code in [200, 201]:
            channel_id = r.json()['id']
            
            # 3. Nombre aleatorio para el grupo
            nombre_grupo = f"{TEXTO} #{random.randint(1000, 9999)}"
            requests.patch(f"https://discord.com/api/v9/channels/{channel_id}", 
                           headers=headers, json={"name": nombre_grupo})
            
            # 4. Mensaje de ataque
            requests.post(f"https://discord.com/api/v9/channels/{channel_id}/messages", 
                          headers=headers, json={"content": TEXTO})
            
            contador += 1
            print(f"🔥 [GRUPO #{contador}] CREADO EXITOSAMENTE")
            return True
        
        elif r.status_code == 429:
            print("⚠️ Rate Limit (Límite de velocidad). Discord nos frena.")
            return False
        else:
            print(f"❌ Error {r.status_code}: Discord bloqueó este intento.")
            return False
            
    except Exception as e:
        print(f"⚠️ Error de conexión: {e}")
        return False

print("------------------------------------------")
print(f"🚀 ATAQUE INICIADO SOBRE: {ID_IMPORTANTE}")
print(f"📡 USANDO RELLENO: {ID_RELLENO}")
print("------------------------------------------")

while True:
    if ejecutar_ataque():
        # Pausa de 60 segundos tras éxito
        print(f"📈 Acumulado: {contador}. Esperando 60s para el siguiente...")
        time.sleep(60)
    else:
        # Pausa de 120 segundos si falla para limpiar el filtro
        print("⏳ Reintentando en 120 segundos...")
        time.sleep(120)
