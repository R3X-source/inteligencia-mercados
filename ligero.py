import requests

def obtener_precio(crypto):
    url = f"https://api.coingecko.com/api/v3/simple/price?ids={crypto}&vs_currencies=usd"
    r = requests.get(url).json()
    if crypto in r:
        print(f"🚀 El precio de {crypto.upper()} es: ${r[crypto]['usd']} USD")
    else:
        print("❌ Moneda no encontrada.")

# Ejemplo de uso rápido
moneda = input("¿Qué moneda buscas? (ej: toncoin, tron, bitcoin): ").lower()
obtener_precio(moneda)
