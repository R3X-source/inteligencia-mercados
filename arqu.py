import requests
import re
import time
import os
import csv

# Configuración de Colores ANSI (Sin librerías, puro estilo)
class Color:
    VERDE = '\033[92m'
    AMARILLO = '\033[93m'
    ROJO = '\033[91m'
    CYAN = '\033[96m'
    RESET = '\033[0m'
    BOLD = '\033[1m'

class ArquitectoSupremo:
    def __init__(self):
        self.log_file = "operaciones_exitosas.csv"
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
        self.fuentes = {
            "Rextie": "https://www.rextie.com/",
            "WesternUnion": "https://www.westernunion.com/pe/es/home.html",
            "Referencial": "https://api.exchangerate-api.com/v4/latest/USD"
        }
        self.preparar_csv()

    def preparar_csv(self):
        if not os.path.exists(self.log_file):
            with open(self.log_file, 'w', newline='') as f:
                writer = csv.writer(f)
                writer.writerow(["Fecha", "Fuente_A", "Precio_A", "Fuente_B", "Precio_B", "Diferencia"])

    def obtener_dato(self, nombre, url):
        try:
            res = requests.get(url, headers=self.headers, timeout=12)
            if "api" in url:
                return res.json()['rates']['PEN']
            # Extractor por patrones de precisión
            precios = [float(n) for n in re.findall(r'3\.\d{3,4}', res.text)]
            return precios[0] if precios else None
        except:
            return None

    def registrar_oportunidad(self, f1, p1, f2, p2, dif):
        with open(self.log_file, 'a', newline='') as f:
            writer = csv.writer(f)
            writer.writerow([time.strftime('%Y-%m-%d %H:%M:%S'), f1, p1, f2, p2, round(dif, 4)])

    def banner(self):
        os.system('clear')
        print(f"{Color.CYAN}{Color.BOLD}="*50)
        print(f"   SISTEMA DE ARQUITECTURA FINANCIERA v4.0")
        print(f"          ESTADO: VIGILANCIA ACTIVA")
        print(f"="*50 + f"{Color.RESET}")

    def ejecutar(self):
        self.banner()
        while True:
            r = self.obtener_dato("Rextie", self.fuentes["Rextie"])
            wu = self.obtener_dato("WU", self.fuentes["WesternUnion"])
            ref = self.obtener_dato("Ref", self.fuentes["Referencial"])

            print(f"\n{Color.BOLD}📅 {time.strftime('%H:%M:%S')}{Color.RESET}")
            
            # Mostrar Precios
            if r: print(f"🏢 Rextie:       {Color.VERDE}S/ {r}{Color.RESET}")
            if wu: print(f"🌍 W. Union:     {Color.VERDE}S/ {wu}{Color.RESET}")
            if ref: print(f"📊 Interbancario: {Color.AMARILLO}S/ {ref}{Color.RESET}")

            # Lógica de Análisis de Brechas
            if r and wu:
                dif = abs(r - wu)
                if dif > 0.05:
                    print(f"\n{Color.ROJO}{Color.BOLD}⚡ ¡BRECHA DETECTADA! S/ {dif:.4f}{Color.RESET}")
                    print(f"{Color.ROJO}>>> Sugerencia: Comprar en {'WU' if wu < r else 'Rextie'} y vender en {'Rextie' if r > wu else 'WU'}{Color.RESET}")
                    print("\a") # PITIDO DE SISTEMA
                    self.registrar_oportunidad("Rextie", r, "WU", wu, dif)
                elif dif > 0.02:
                    print(f"\n{Color.AMARILLO}⚠️  Margen pequeño detectado (S/ {dif:.4f}){Color.RESET}")
                else:
                    print(f"\n{Color.VERDE}✅ Mercado estable. Sin arbitraje.{Color.RESET}")

            print(f"\n{Color.CYAN}--- Esperando siguiente ciclo (30s) ---{Color.RESET}")
            time.sleep(30)

if __name__ == "__main__":
    try:
        ArquitectoSupremo().ejecutar()
    except KeyboardInterrupt:
        print(f"\n{Color.AMARILLO}Saliendo de la fortaleza... Logs guardados.{Color.RESET}")
