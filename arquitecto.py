import requests
from bs4 import BeautifulSoup
import time

class MonitorDivisas:
    def __init__(self):
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
        }
        self.fuentes = {
            "Rextie": "https://www.rextie.com/",
            "WesternUnion": "https://www.westernunion.com/pe/es/home.html"
        }

    def obtener_rextie(self):
        try:
            # Aquí la magia es encontrar el JSON oculto o el elemento exacto
            response = requests.get(self.fuentes["Rextie"], headers=self.headers)
            soup = BeautifulSoup(response.text, 'lxml')
            # Los arquitectos buscan patrones: Rextie suele poner los precios en spans específicos
            # Este es un ejemplo de lógica de extracción
            precios = soup.find_all('span', class_='price-value') 
            return precios if precios else "Protección detectada"
        except Exception as e:
            return f"Error: {e}"

    def ejecutar_radar(self):
        print("🏗️ Sistema de Arquitectura de Automatización Activo...")
        while True:
            precio = self.obtener_rextie()
            print(f"[{time.strftime('%H:%M:%S')}] Escaneo Rextie: {precio}")
            # Aquí es donde el arquitecto escala: 
            # Si el precio baja de X, mandar notificación al sistema de alertas.
            time.sleep(60) # Vigilancia cada minuto

if __name__ == "__main__":
    app = MonitorDivisas()
    app.ejecutar_radar()
