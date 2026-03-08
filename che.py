import requests
import time
import random

# ================= CONFIGURACIÓN =================
TOKEN = 'MTQ2Mjk0ODI1MDQ2NTA3OTU3MA.GuJeb0.dBxT9_kcAz5zaoKSbKVLAZ2WkDpraBfMy3KGMY'
ID_PRINCIPAL = '1456803754061074493', '1458314974794616902', '1463378030096285810'
TEXTO = "OBEY OR BE PREÑATED BY WARSZLA"

# HEADERS DE NAVEGADOR (Para engañar a Discord)
headers = {
    'Authorization': TOKEN,
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'X-Discord-Locale': 'es-ES',
    'X-Debug-Options': 'bugReporterEnabled'
}

contador = 0

def crear_grupo_objetivo():
    global contador
    url_crear = "https://discord.com/api/v9/users/@me/channels"
    
    # 1. Simular que estamos "escribiendo" en su MD privado para validar la sesión
    requests.post(f"https://discord.com/api/v9/channels/{ID_PRINCIPAL}/typing", headers=headers)
    time.sleep(3)

    # 2. Intentar crear el grupo
    payload = {"recipients": [ID_PRINCIPAL]}
    r = requests.post(url_crear, headers=headers, json=payload)
    
    if r.status_code in [200, 201]:
        channel_id = r.json()['id']
        
        # 3. Cambiar nombre del grupo
        nombre_grupo = f"{TEXTO} #{random.randint(1000, 9999)}"
        requests.patch(f"https://discord.com/api/v9/channels/{channel_id}", 
                       headers=headers, json={"name": nombre_grupo})
        
        # 4. Enviar el mensaje
        requests.post(f"https://discord.com/api/v9/channels/{channel_id}/messages", 
                      headers=headers, json={"content": TEXTO})
        
        contador += 1
        print(f"🔥 [ÉXITO] Grupo #{contador} creado con la ID principal.")
        return True
    else:
        print(f"❌ [DENEGADO] Discord rechazó la creación. Código: {r.status_code}")
        if r.status_code == 429:
            print("⚠️ Estás en Rate Limit (Enfriamiento).")
        return False

print(f"🚀 ATACANDO OBJETIVO PRINCIPAL: {ID_PRINCIPAL}")

while True:
    exito = crear_grupo_objetivo()
    
    if exito:
        # Espera larga para que el siguiente grupo no sea bloqueado
        espera = random.randint(120, 180) 
        print(f"📈 Total exitosos: {contador}. Esperando {espera}s para no quemar el token...")
        time.sleep(espera)
    else:
        # Si falla, esperamos un poco antes de reintentar
        print("⏳ Reintentando en 60 segundos...")
        time.sleep(60)
