import requests
from bs4 import BeautifulSoup
import time

class MonitorDivisas:
    def __init__(self):
        # Disfraz profesional para que la web crea que eres un usuario en Chrome
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; SM-G960U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36"
        }
        self.url = "https://www.rextie.com/"

    def obtener_precio(self):
        try:
            response = requests.get(self.url, headers=self.headers, timeout=10)
            # Usamos 'html.parser' porque es nativo y NO necesita lxml
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Buscamos los elementos de compra y venta
            # Rextie usa clases específicas para sus precios
            precios = soup.find_all('span', class_='price-value')
            
            if len(precios) >= 2:
                compra = precios[0].get_text().strip()
                venta = precios[1].get_text().strip()
                return f"🛒 Compra: {compra} | 💰 Venta: {venta}"
            else:
                return "⚠️ No se encontraron los precios. La web pudo cambiar su diseño."
                
        except Exception as e:
            return f"❌ Error de conexión: {e}"

    def iniciar(self):
        print("🏗️  SISTEMA DE ARQUITECTURA ACTIVO")
        print("📡 Monitoreando Rextie... (Presiona Ctrl+C para detener)")
        print("-" * 40)
        while True:
            resultado = self.obtener_precio()
            print(f"[{time.strftime('%H:%M:%S')}] {resultado}")
            time.sleep(30) # Escaneo cada 30 segundos

if __name__ == "__main__":
    bot = MonitorDivisas()
    bot.iniciar()
