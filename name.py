import requests
import time
import random

# CONFIGURACIÓN
TOKEN = "MTQ2MDQ5ODYxNzIxODM2NzYxMg.GSm7Zg.4opQtqCb7Bo2vvhqqGkrPJs6BZFogvV7SxzrNc"  # El token que usas en Aliucord
GUILD_ID = "1112616534532173944"

# Headers mejorados para evitar el 403
HEADERS = {
    "Authorization": TOKEN,
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Android 10; Mobile; rv:102.0) Gecko/102.0 Firefox/102.0",
    "X-Discord-Locale": "es-ES",
    "X-Debug-Options": "bugReporterEnabled"
}

def reestructuracion_nombres():
    # Obtener lista de miembros
    url = f"https://discord.com/api/v9/guilds/{GUILD_ID}/members?limit=1000"
    response = requests.get(url, headers=HEADERS)
    
    if response.status_code != 200:
        print(f"Error de conexión: {response.status_code}. Quizás el token expiró.")
        return

    miembros = response.json()
    contador = 0

    for m in miembros:
        user_id = m['user']['id']
        nick_actual = m.get('nick')

        # Solo reseteamos si tiene un apodo puesto
        if nick_actual is not None:
            patch_url = f"https://discord.com/api/v9/guilds/{GUILD_ID}/members/{user_id}"
            payload = {"nick": None}
            
            res = requests.patch(patch_url, headers=HEADERS, json=payload)
            
            if res.status_code in [200, 204]:
                print(f"✅ Reset: {m['user']['username']}")
                contador += 1
            else:
                print(f"❌ Error en {user_id}: {res.status_code}")

            # --- TUS REGLAS DE TIEMPO ---
            time.sleep(0.1) # Espera por cada miembro
            
            # Pausa aleatoria cada 10 segundos de proceso
            if contador % 1 == 0 and contador > 0:
                espera = random.uniform(8, 15) # Pausa más larga para seguridad
                print(f"⏳ Pausa de seguridad para evitar baneo: {espera:.2f}s")
                time.sleep(espera)

    print(f"--- Proceso terminado. Total reseteados: {contador} ---")

if __name__ == "__main__":
    reestructuracion_nombres()
