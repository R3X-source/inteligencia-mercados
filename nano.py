import requests

def consulta():
    print("\n--- 📊 TERMUX CRYPTO MONITOR ---")
    # Usamos un diccionario para que el usuario escriba fácil y la API entienda
    nombres = {"ton": "the-open-network", "tron": "tron", "btc": "bitcoin", "eth": "ethereum"}
    
    entrada = input("Moneda (ton, tron, btc): ").lower()
    coin = nombres.get(entrada, entrada) # Si no está en el mapa, usa lo que el usuario puso
    
    try:
        cant = float(input("¿Cuántas tienes?: "))
        url = f"https://api.coingecko.com/api/v3/simple/price?ids={coin}&vs_currencies=usd"
        res = requests.get(url).json()
        
        if coin in res:
            precio = res[coin]['usd']
            total = precio * cant
            print(f"\n✅ Precio {entrada.upper()}: ${precio} USD")
            print(f"💰 Valor de tu saldo: ${round(total, 2)} USD")
        else:
            print(f"\n❌ Error: '{entrada}' no reconocido por la API.")
    except:
        print("\n❌ Error: Pon un número válido en la cantidad.")
    print("--------------------------------\n")

consulta()
