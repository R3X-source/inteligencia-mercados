import requests
import time

# --- CONFIGURACIÓN DE OBRA ---
TOKEN = 'MTQ2ODAxNzI3NjY2MTAwNjU5Mw.GBv0l2.PvW930XIyeBrr-gKUZ5cA4JghgkIo-97aS8k3A'
GUILD_ID = '1468017909308850342'
DELAY = 0.1  # Tu espera de 0.1s
EXCLUIDOS = ['ID_AMIGO_1', 'ID_AMIGO_2'] # Pon las IDs como texto
# -----------------------------

headers = {'Authorization': TOKEN}

def obtener_miembros():
    # Obtenemos la lista de miembros (hasta 1000)
    url = f"https://discord.com/api/v9/guilds/{GUILD_ID}/members?limit=1000"
    r = requests.get(url, headers=headers)
    return r.json()

def expulsar(user_id, username):
    url = f"https://discord.com/api/v9/guilds/{GUILD_ID}/members/{user_id}"
    r = requests.delete(url, headers=headers)
    if r.status_code == 204:
        print(f"🔨 Expulsado: {username}")
    elif r.status_code == 429:
        print("⚠️ Rate limit! Esperando...")
        time.sleep(5)
    else:
        print(f"❌ No se pudo con {username}: {r.status_code}")

def iniciar():
    print("🏗️ Iniciando demolición por peticiones directas...")
    miembros = obtener_miembros()
    
    # Nota: Este script simple saca a todos excepto los excluidos
    # porque por peticiones directas es difícil comparar roles rápido
    for m in miembros:
        u_id = m['user']['id']
        u_name = m['user']['username']
        
        if u_id not in EXCLUIDOS:
            expulsar(u_id, u_name)
            time.sleep(DELAY)

if __name__ == "__main__":
    iniciar()
