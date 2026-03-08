import requests
import time
import random

# --- TUS DATOS DE MISES ---
auth_token = "8c56e53ddccb9c186527b8cd566e60c9971a2c38" #
ct0 = "b78c5fda6a4e76fcc30132d99aea0c630e24fa5846338cd7755fa60a70127b7e1f9e32f142c77c203d5ea1e2623f1b2683d016bd1c79378ab28d6404a9b0b61e79b8e56853fcbfef421e202d30f5159c" #
tweet_id = "2012278027779035520"

# --- TUS FRASES ---
frases = ["vardrid 😂", "mamadrid 😂", "penaldo 😂", "nalgadrid 😂"]

headers = {
    'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7p9W4LFqy61UXU95M9vUu63m7Q15sN2f3v7p9W4',
    'x-twitter-auth-type': 'OAuth2Session',
    'x-csrf-token': ct0,
    'cookie': f'auth_token={auth_token}; ct0={ct0}',
    'content-type': 'application/json',
}

def responder():
    url = "https://x.com/i/api/graphql/667f6Q9X_mP6_8S9S9S9S9/CreateTweet"
    
    payload = {
        "variables": {
            "tweet_text": random.choice(frases),
            "reply": {"in_reply_to_tweet_id": tweet_id},
            "dark_request": False,
            "semantic_annotation_ids": []
        },
        "queryId": "667f6Q9X_mP6_8S9S9S9S9"
    }

    try:
        r = requests.post(url, headers=headers, json=payload)
        if r.status_code == 200:
            print(f"Impacto enviado: {payload['variables']['tweet_text']}")
        else:
            print(f"Error: {r.status_code}")
    except Exception as e:
        print(f"Fallo de conexión: {e}")

# Ejecución automática
print("Bot de ESL3I3R iniciado...")
while True:
    responder()
    espera = random.randint(120, 300) # Espera entre 2 y 5 minutos para evitar ban
    print(f"Esperando {espera} segundos para el próximo impacto...")
    time.sleep(espera)
