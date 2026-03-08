import requests

def obtener_precio_p2p():
    # El motor de búsqueda de Binance P2P
    url = "https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search"
    
    # Lo que le pedimos: Comprar USDT con Soles (PEN)
    payload = {
        "asset": "USDT",
        "fiat": "PEN",
        "merchantCheck": True,
        "page": 1,
        "payTypes": [],
        "publisherType": None,
        "rows": 5,
        "tradeType": "BUY"
    }

    try:
        response = requests.post(url, json=payload)
        data = response.json()
        
        # Tomamos el primer anuncio (el más barato/mejor precio)
        primer_anuncio = data['data'][0]['adv']['price']
        precio_p2p = float(primer_anuncio)
        
        # Aquí comparamos con tu precio de referencia (ejemplo 3.75)
        precio_banco = 3.76  # <--- Cambia esto por lo que saque tu otro bot
        brecha = precio_p2p - precio_banco
        
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        print(f"💰 P2P Binance Perú: S/ {precio_p2p}")
        print(f"🏦 Dólar Bancario:  S/ {precio_banco}")
        print(f"📊 Diferencia:      S/ {brecha:.4f}")
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        
        if brecha > 0.03:
            print("🚀 ¡OPORTUNIDAD DETECTADA! Hay carne en el asado.")
        else:
            print("😴 Mercado estable. Sigue vigilando.")

    except Exception as e:
        print(f"Error al conectar con el P2P: {e}")

obtener_precio_p2p()
