import requests
import re
import time
import json
import os

class ArquitectoMaestro:
    def __init__(self):
        self.url = "https://www.rextie.com/"
        self.archivo_datos = "historial_precios.json"
        self.headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
        self.ultimo_precio = {"compra": 0, "venta": 0}

    def guardar_log(self, compra, venta):
        datos = {
            "timestamp": time.strftime('%Y-%m-%d %H:%M:%S'),
            "compra": compra,
            "venta": venta,
            "spread": round(venta - compra, 4)
        }
        # Guardamos en JSON para que sea profesional
        logs = []
        if os.path.exists(self.archivo_datos):
            with open(self.archivo_datos, 'r') as f:
                logs = json.load(f)
        
        logs.append(datos)
        with open(self.archivo_datos, 'w') as f:
            json.dump(logs, f, indent=4)

    def alertar(self):
        # Hace que Termux suene (necesitas termux-api o usar el beep de sistema)
        print("\a") # Carácter de campana de sistema
        os.system("termux-vibrate -d 500") # Vibra si tienes termux-api

    def ejecutar(self):
        print(f"🏗️  SISTEMA PROFESIONAL INICIADO | LOG: {self.archivo_datos}")
        print("-" * 50)
        
        while True:
            try:
                html = requests.get(self.url, headers=self.headers, timeout=15).text
                hallazgos = [float(n) for n in re.findall(r'3\.\d{3,4}', html)]
                
                if len(hallazgos) >= 2:
                    c, v = hallazgos[0], hallazgos[1]
                    
                    if c != self.ultimo_precio["compra"] or v != self.ultimo_precio["venta"]:
                        spread = round(v - c, 4)
                        print(f"✅ CAMBIO DETECTADO: C: {c} | V: {v} | Spread: {spread}")
                        self.guardar_log(c, v)
                        self.ultimo_precio = {"compra": c, "venta": v}
                        
                        if spread > 0.05:
                            print("🚨 ¡ALERTA DE OPORTUNIDAD! Spread alto.")
                            self.alertar()
                    else:
                        print(f"[{time.strftime('%H:%M:%S')}] Sin cambios en el mercado...")
                
            except Exception as e:
                print(f"⏳ Error de red, reintentando en 30s... ({e})")
            
            time.sleep(30)

if __name__ == "__main__":
    ArquitectoMaestro().ejecutar()
