import time
import random
import sys
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# --- DATOS DE COMBATE ---
URL_VIDEO = "https://vt.tiktok.com/ZS5oHsvEK/"
USUARIO = "kisard213@outlook.com"
CLAVE = "ERREELEMAMi1_"
FRASES = ["vardrid", "Embra", "kayada", "dsmada", "mamith4m", "envr4", "penaldo", "penaldismo"]

def iniciar_ataque():
    options = Options()
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--headless")  # Quita esto si necesitas ver el captcha

    # RUTA CRÍTICA PARA TERMUX
    ruta_driver = "/data/data/com.termux/files/usr/bin/chromedriver"
    service = Service(executable_path=ruta_driver)
    
    try:
        driver = webdriver.Chrome(service=service, options=options)
        wait = WebDriverWait(driver, 25)
        
        print(f"🔑 Entrando como Esleier...")
        driver.get("https://www.tiktok.com/login/phone-or-email/email")
        
        # Login
        user_field = wait.until(EC.presence_of_element_located((By.NAME, "username")))
        user_field.send_keys(USUARIO)
        driver.find_element(By.XPATH, "//input[@type='password']").send_keys(CLAVE)
        driver.find_element(By.XPATH, "//button[@type='submit']").click()
        
        print("⏳ Esperando validación (15 seg)...")
        time.sleep(15) 

        print(f"🎯 Apuntando al video...")
        driver.get(URL_VIDEO)
        time.sleep(8)

        # Bucle de Spam
        for i, frase in enumerate(FRASES):
            mensaje = f"{frase} 😂"
            try:
                # Localizar caja de comentarios
                caja = wait.until(EC.element_to_be_clickable((By.XPATH, "//div[contains(@class, 'notranslate public-DraftEditor-content')]")))
                caja.click()
                caja.send_keys(mensaje)
                time.sleep(1)
                caja.send_keys(Keys.ENTER)
                print(f"✅ [{i+1}/{len(FRASES)}] Publicado: {mensaje}")
            except:
                print(f"⚠️ Error en comentario {i+1}. Revisar cuenta.")

            # Tu tiempo de seguridad de 15-20 seg
            espera = random.randint(15, 20)
            print(f"⏳ Espera de seguridad: {espera}s...")
            time.sleep(espera)

    except Exception as e:
        print(f"❌ Error: {e}")
    finally:
        if 'driver' in locals():
            driver.quit()
        print("🏁 Fin de la misión.")

if __name__ == "__main__":
    iniciar_ataque()
