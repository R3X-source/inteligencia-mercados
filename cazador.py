import ccxt
import requests

# 1. Configurar Binance
exchange = ccxt.binance()

def obtener_precios():
    try:
        # 2. Precio Cripto (USDT/PEN)
        # Usamos un par estable para la referencia
        ticker = exchange.fetch_ticker('USDT/BRL') # A veces el par PEN directo es limitado en CCXT
        # Mejor usamos el precio global de USDT/USDT y lo comparamos con el cambio local
        
        # Para Perú, lo más exacto es usar el ticker de Bitcoin y sacar el ratio, 
        # pero vamos a probar con el par directo primero:
        mercado = exchange.fetch_ticker('USDT/PEN')
        precio_binance = mercado['last']
        
        # 3. Tu precio bancario (Referencia de tu script anterior)
        # Aquí pondremos el precio que tu bot ya sacaba (ejemplo 3.75)
        precio_banco = 3.74  # <--- Aquí puedes conectar tu función anterior
        
        brecha = precio_binance - precio_banco
        
        print(f"🏦 Dólar Banco: S/ {precio_banco}")
        print(f"🚀 Dólar Binance: S/ {precio_binance}")
        print(f"📊 Brecha (Ganancia potencial): S/ {brecha:.4f}")
        
        if brecha > 0.04:
            print("💰 ¡ALERTA DE DINERO! La brecha es alta. Hora de mover capital.")
            
    except Exception as e:
        print(f"Hubo un detalle: {e}")

obtener_precios()
