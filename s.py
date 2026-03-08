import httpx
import time

# --- CONFIGURACIÓN ---
TOKEN = 'MTA5MzM2NjIzMDU2NTUyMzQ4Nw.GhfNpb.w87-e56_F91x1-rqXZAAOpVcegiPBW_CXFsezE'
OBJETIVOS = [
    '1394021604127936772', '1423439348430405722', '1429177016703516764',
    '1446586105553227807', '1459383813930094770', '1457863120759423213',
    '1447142638326120458'
]

MENCIONES = "<@1423439348430405722> <@1394021604127936772> <@1459383813930094770>"
TEXTO_ATAQUE = "OYE PUTEM NADA DE ESCAPAR AJJAJA. SEGURA DE ATACAR???? SE TE VIENE APLACADA RAPIDA POR SI LAS DUDAS 😂🖕🤣🤣"
LINKS = "https://media.discordapp.net/attachments/1454578263807758580/1462224499989807346/IMG_20251220_160052_335.jpg"

MENSAJE_FINAL = f"{MENCIONES}\n{TEXTO_ATAQUE}\n{LINKS}"

HEADERS = {
    "Authorization": TOKEN,
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
}

# --- LÓGICA DE MONITOREO ---
print("🚀 SISTEMA HTTPX INICIADO - MONITOREANDO...")

last_message_id = None

def responder(channel_id, message_id):
    url = f"https://discord.com/api/v9/channels/{channel_id}/messages"
    data = {
        "content": MENSAJE_FINAL,
        "message_reference": {"message_id": message_id}
    }
    with httpx.Client() as client:
        r = client.post(url, json=data, headers=HEADERS)
        if r.status_code == 200:
            print(f"✅ Respondido con éxito.")
        else:
            print(f"❌ Error al responder: {r.status_code}")

while True:
    try:
        # Aquí debes poner el ID de un canal específico para monitorear
        # O podemos dejar que el bot revise sus DMs/Canales recientes
        # Por ahora, este ejemplo requiere que sepas en qué canal están hablando:
        CHANNEL_ID = "ID_DEL_CANAL_AQUÍ" 
        
        if CHANNEL_ID == "ID_DEL_CANAL_AQUÍ":
            print("⚠️ ERROR: Debes poner el ID del canal en la variable CHANNEL_ID")
            break

        url = f"https://discord.com/api/v9/channels/{CHANNEL_ID}/messages?limit=1"
        with httpx.Client() as client:
            resp = client.get(url, headers=HEADERS)
            if resp.status_code == 200:
                msg = resp.json()[0]
                m_id = msg['id']
                author_id = msg['author']['id']

                if author_id in OBJETIVOS and m_id != last_message_id:
                    print(f"🎯 Objetivo detectado: {msg['author']['username']}")
                    responder(CHANNEL_ID, m_id)
                    last_message_id = m_id
            
        time.sleep(2) # Espera de 2 segundos para no saturar
    except Exception as e:
        print(f"⚠️ Error: {e}")
        time.sleep(5)
