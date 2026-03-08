import requests
import re
import time

class AgregadorMaestro:
    def __init__(self):
        self.fuentes = {
            "Rextie": "https://www.rextie.com/",
            "WesternUnion": "https://www.westernunion.com/pe/es/home.html"
        }
        self.headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

    def buscar_precio(self, url):
        try:
            html = requests.get(url, headers=self.headers, timeout=10).text
            # Buscamos patrones de precio (3.XXXX)
            hallazgos = [float(n) for n in re.findall(r'3\.\d{3,4}', html)]
            return hallazgos[0] if hallazgos else None
        except:
            return None

    def ejecutar(self):
        print("\033[95m🏗️  AGREGADOR DE MERCADO (MODO PURO)\033[0m")
        print("-" * 45)
        
        while True:
            p_rextie = self.buscar_precio(self.fuentes["Rextie"])
            # Nota: Western Union a veces requiere un scraping más fino, pero probamos el patrón
            p_wu = self.buscar_precio(self.fuentes["WesternUnion"])
            
            print(f"[{time.strftime('%H:%M:%S')}]")
            if p_rextie: print(f"🔹 Rextie: S/ {p_rextie}")
            if p_wu: print(f"🔸 W. Union: S/ {p_wu}")
            
            # Lógica de Arbitraje
            if p_rextie and p_wu:
                dif = abs(p_rextie - p_wu)
                if dif > 0.02:
                    # ALERTAS SIN API: Pitido y Color Rojo en terminal
                    print(f"\033[91m🚨 OPORTUNIDAD: Dif de S/ {dif:.4f} detectada!\033[0m")
                    print("\a") # PITIDO DE SISTEMA
                else:
                    print("✅ Mercado equilibrado.")
            
            time.sleep(20)

if __name__ == "__main__":
    AgregadorMaestro().ejecutar()
