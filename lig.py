import requests

def consulta():
    print("--- 📊 TERMUX CRYPTO MONITOR ---")
    coin = input("Moneda (toncoin, tron, bitcoin): ").lower()
    cant = float(input("¿Cuántas tienes?: "))
    
    url = f"https://api.coingecko.com/api/v3/simple/price?ids={coin}&vs_currencies=usd"
    res = requests.get(url).json()
    
    if coin in res:
        precio = res[coin]['usd']
        total = precio * cant
        print(f"\n✅ Precio: ${precio} USD")
        print(f"💰 Tu saldo: ${round(total, 2)} USD")
        print("--------------------------------")
    else:
        print("❌ Error: Moneda no encontrada.")

consulta()
