import requests
import time

# --- CONFIGURACIÓN DE OBRA ---
TOKEN = 'MTQ2ODAxNzI3NjY2MTAwNjU5Mw.GBv0l2.PvW930XIyeBrr-gKUZ5cA4JghgkIo-97aS8k3A'
GUILD_ID = '1468017909308850342'
DELAY = 0.1 
EXCLUIDOS = ['TU_ID_AQUI', 'ID_OTRO']
# -----------------------------

headers = {
    'Authorization': TOKEN,
    'Content-Type': 'application/json'
}

def obtener_miembros():
    url = f"https://discord.com/api/v9/guilds/{GUILD_ID}/members?limit=1000"
    r = requests.get(url, headers=headers)
    
    if r.status_code != 200:
        print(f"❌ Error de API ({r.status_code}): {r.text}")
        return None
    return r.json()

def expulsar(user_id, username):
    url = f"https://discord.com/api/v9/guilds/{GUILD_ID}/members/{user_id}"
    r = requests.delete(url, headers=headers)
    if r.status_code == 204:
        print(f"🔨 Expulsado: {username}")
    elif r.status_code == 429:
        print("⚠️ Rate limit! Esperando 5 segundos...")
        time.sleep(5)
    else:
        print(f"❌ No se pudo con {username}. Status: {r.status_code}")

def iniciar():
    print("🏗️ Iniciando inspección de obra...")
    miembros = obtener_miembros()
    
    if miembros is None:
        print("🛑 No se pudo obtener la lista de miembros. Revisa el Token o la ID del Server.")
        return

    # Si la respuesta es un diccionario con un error, lo mostramos
    if isinstance(miembros, dict) and 'message' in miembros:
        print(f"❌ Discord dice: {miembros['message']}")
        return

    print(f"👥 Miembros encontrados: {len(miembros)}")
    
    for m in miembros:
        try:
            u_id = m['user']['id']
            u_name = m['user']['username']
            
            if u_id not in EXCLUIDOS:
                expulsar(u_id, u_name)
                time.sleep(DELAY)
            else:
                print(f"🛡️ Protegido: {u_name}")
        except Exception as e:
            print(f"⚠️ Error procesando miembro: {e}")

if __name__ == "__main__":
    iniciar()
