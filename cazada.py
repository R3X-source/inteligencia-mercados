import requests

def cazador_de_ganancia():
    url = "https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search"
    
    # 1. ¿A cuánto podemos COMPRAR?
    res_compra = requests.post(url, json={"asset":"USDT","fiat":"PEN","page":1,"rows":1,"tradeType":"BUY"}).json()
    precio_compra = float(res_compra['data'][0]['adv']['price'])
    
    # 2. ¿A cuánto podemos VENDER?
    res_venta = requests.post(url, json={"asset":"USDT","fiat":"PEN","page":1,"rows":1,"tradeType":"SELL"}).json()
    precio_venta = float(res_venta['data'][0]['adv']['price'])
    
    ganancia_por_dolar = precio_venta - precio_compra
    
    print(f"🛒 Tú compras a: S/ {precio_compra}")
    print(f"💰 Tú vendes a:  S/ {precio_venta}")
    print(f"💵 Ganancia bruta: S/ {ganancia_por_dolar:.4f} por dólar")

cazador_de_ganancia()
