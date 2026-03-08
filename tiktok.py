import time
import random
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# --- DATOS DE COMBATE ---
URL_VIDEO = "https://vt.tiktok.com/ZS5oHsvEK/"
USUARIO = "kisard213@outlook.com"
CLAVE = "ERREELEMAMi1_"
# Tus frases de batalla
FRASES = ["vardrid", "Embra", "kayada", "dsmada", "mamith4m", "envr4", "penaldo", "penaldismo"]

options = Options()
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
# Nota: Si el bot falla al loguear, quita la siguiente línea para ver qué pasa
options.add_argument("--headless") 

def iniciar_ataque():
    driver = webdriver.Chrome(options=options)
    wait = WebDriverWait(driver, 25)
    
    try:
        print(f"🔑 Entrando como Esleier ({USUARIO})...")
        driver.get("https://www.tiktok.com/login/phone-or-email/email")
        
        # Proceso de Login
        user_field = wait.until(EC.presence_of_element_located((By.NAME, "username")))
        user_field.send_keys(USUARIO)
        
        pass_field = driver.find_element(By.XPATH, "//input[@type='password']")
        pass_field.send_keys(CLAVE)
        
        login_btn = driver.find_element(By.XPATH, "//button[@type='submit']")
        login_btn.click()
        
        print("⏳ Esperando validación de cuenta... (15 seg)")
        time.sleep(15) 

        print(f"🎯 Apuntando al video objetivo...")
        driver.get(URL_VIDEO)
        time.sleep(8)

        # Bucle de Spam con tus frases
        for i, frase in enumerate(FRASES):
            # Variación mínima con emoji de risa como acordamos
            mensaje = f"{frase} 😂"
            
            try:
                # Buscar la caja de comentarios
                print(f"💬 Intentando publicar: '{mensaje}'")
                caja = wait.until(EC.element_to_be_clickable((By.XPATH, "//div[contains(@class, 'notranslate public-DraftEditor-content')]")))
                caja.click()
                caja.send_keys(mensaje)
                time.sleep(1)
                caja.send_keys(Keys.ENTER)
                print(f"✅ [{i+1}/{len(FRASES)}] Publicado con éxito.")
            except:
                print(f"⚠️ No se pudo publicar el comentario {i+1}. TikTok podría estar bloqueando.")

            # --- TU NUEVO TIEMPO DE SEGURIDAD ---
            espera = random.randint(15, 20)
            print(f"⏳ Pausa de seguridad: {espera} segundos...")
            time.sleep(espera)

    except Exception as e:
        print(f"❌ Error crítico: {e}")
    finally:
        driver.quit()
        print("🏁 Misión terminada. Revisa el video para ver los resultados.")

if __name__ == "__main__":
    iniciar_ataque()
