import requests
import time
import random

# ================= CONFIGURACIÓN =================
TOKEN = 'MTQ1Njc5NzEwMzEzMjExNTE2OA.GsCeTn.phYwLtDp1doxDWHh6VsKb3749PJKr8GziGs5Sg'
ID_IMPORTANTE = '1438662990021922869'
ID_RELLENO = '1455775511836889089'
TEXTO = "OBEY OR BE PREÑATED BY WARSZLA"

headers = {
    'Authorization': TOKEN,
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

contador = 0

def ejecutar_ataque():
    global contador
    # URL con bypass de caché
    url_crear = f"https://discord.com/api/v9/users/@me/channels?v={random.randint(1, 9999)}"
    
    try:
        # 1. Simular que escribimos a la ID importante para "calentar" el canal
        requests.post(f"https://discord.com/api/v9/channels/{ID_IMPORTANTE}/typing", headers=headers)
        time.sleep(random.randint(4, 7))

        # 2. EL TRUCO: Creamos el grupo con la ID IMPORTANTE + RELLENO
        print(f"📡 Intentando crear grupo con {ID_IMPORTANTE} y relleno...")
        payload = {"recipients": [ID_IMPORTANTE, ID_RELLENO]}
        r = requests.post(url_crear, headers=headers, json=payload)
        
        if r.status_code in [200, 201]:
            channel_id = r.json()['id']
            
            # 3. Personalizar el grupo
            nombre_grupo = f"{TEXTO} #{random.randint(1000, 9999)}"
            requests.patch(f"https://discord.com/api/v9/channels/{channel_id}", 
                           headers=headers, json={"name": nombre_grupo})
            
            # 4. Enviar el mensaje de ataque
            requests.post(f"https://discord.com/api/v9/channels/{channel_id}/messages", 
                          headers=headers, json={"content": TEXTO})
            
            contador += 1
            print(f"🔥 [BRUTAL] Grupo #{contador} creado con éxito.")
            return True
        
        elif r.status_code == 400:
            print(f"❌ [ERROR 400] Discord sigue bloqueando la creación. (ID Marcada)")
            return False
        elif r.status_code == 429:
            print(f"⚠️ [RATE LIMIT] Discord nos dice que vayamos más despacio.")
            return False
        else:
            print(f"❌ Error inesperado: {r.status_code} - {r.text}")
            return False
            
    except Exception as e:
        print(f"⚠️ Error de conexión: {e}")
        return False

print(f"🚀 INICIANDO ATAQUE COMBINADO")
print(f"🎯 OBJETIVO: {ID_IMPORTANTE}")
print(f"🛡️ RELLENO: {ID_RELLENO}")

   while True:
    if ejecutar_ataque():
        # Bajado a 1 minuto (60 segundos) como pediste
        espera = 60 
        print(f"📈 Total: {contador}. ¡A toda máquina! Esperando {espera}s...")
        time.sleep(espera)
    else:
        # Si falla, mantenemos un margen para que no te baneen la cuenta
        print("⏳ Fallo detectado. Esperando 120 segundos para reintentar...")
        time.sleep(120)
