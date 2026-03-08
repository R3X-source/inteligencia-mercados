import requests
import re
import time
import os

class ArquitectoFinal:
    def __init__(self):
        self.headers = {"User-Agent": "Mozilla/5.0"}
        self.data = {"rextie": 0, "wu": 0, "ref": 0, "status": "Iniciando..."}

    def actualizar_web(self, r, wu, ref, dif):
        # Creamos una página web básica pero funcional
        color = "red" if dif > 0.05 else "green"
        html_content = f"""
        <html>
        <head><meta http-equiv="refresh" content="5"><title>DASHBOARD PRO</title></head>
        <body style="background:#121212; color:white; font-family:sans-serif; text-align:center;">
            <h1>🚀 MONITOR DE ARBITRAJE</h1>
            <div style="font-size:2em; border:2px solid {color}; padding:20px; display:inline-block;">
                DIFERENCIA: S/ {dif:.4f}<br>
                <small style="color:gray;">REX: {r} | WU: {wu} | REF: {ref}</small>
            </div>
            <p>Última actualización: {time.strftime('%H:%M:%S')}</p>
        </body>
        </html>
        """
        with open("index.html", "w") as f:
            f.write(html_content)

    def ejecutar(self):
        print("🏗️ ARQUITECTURA WEB ACTIVA | Abre index.html en tu navegador")
        while True:
            try:
                # Scraping
                r_html = requests.get("https://www.rextie.com/", headers=self.headers).text
                wu_html = requests.get("https://www.westernunion.com/pe/es/home.html", headers=self.headers).text
                ref = requests.get("https://api.exchangerate-api.com/v4/latest/USD").json()['rates']['PEN']
                
                r = [float(n) for n in re.findall(r'3\.\d{3,4}', r_html)][0]
                wu = [float(n) for n in re.findall(r'3\.\d{3,4}', wu_html)][0]
                dif = abs(r - wu)

                self.actualizar_web(r, wu, ref, dif)
                
                print(f"[{time.strftime('%H:%M:%S')}] R:{r} | W:{wu} | DIF:{dif:.4f} -> WEB ACTUALIZADA")
                if dif > 0.05: print("\a") # PITIDO

            except Exception as e:
                print(f"Esperando reconexión... {e}")
            
            time.sleep(15)

if __name__ == "__main__":
    ArquitectoFinal().ejecutar()
