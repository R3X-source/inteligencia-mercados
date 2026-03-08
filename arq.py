import requests
import re # Para buscar patrones de números
import time

class MonitorPro:
    def __init__(self):
        self.url = "https://www.rextie.com/"
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept-Language": "es-PE,es;q=0.9"
        }

    def extraer_precios(self):
        try:
            # Pedimos la página
            response = requests.get(self.url, headers=self.headers, timeout=15)
            html = response.text
            
            # TRUCO DE ARQUITECTO: 
            # En lugar de BeautifulSoup, usamos REGEX (Expresiones Regulares)
            # Buscamos números con formato 3.XXXX o 3.XXX
            patron = r'3\.\d{3,4}'
            hallazgos = re.findall(patron, html)
            
            # Limpiamos duplicados manteniendo el orden
            precios = []
            for p in hallazgos:
                if p not in precios:
                    precios.append(p)

            if len(precios) >= 2:
                # En Rextie, los primeros números suelen ser Compra y Venta
                return f"🛒 Compra: {precios[0]} | 💰 Venta: {precios[1]}"
            else:
                return "🔎 Buscando precios... (La web está en modo seguro)"
                
        except Exception as e:
            return f"❌ Error: {e}"

    def iniciar(self):
        print("🏗️  MODO ARQUITECTO: EXTRACCIÓN POR PATRONES")
        print("-" * 45)
        while True:
            res = self.extraer_precios()
            print(f"[{time.strftime('%H:%M:%S')}] {res}")
            time.sleep(15)

if __name__ == "__main__":
    MonitorPro().iniciar()
