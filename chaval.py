import requests

user = "d34ds0n4ldo_vardridgh4y"
pwd = "ERREELEMAMi1_"

url = "https://www.tiktok.com/api/v1/login/"
headers = {"User-Agent": "Mozilla/5.0 (Linux; Android 10; K)"}
payload = {"username": user, "password": pwd}

try:
    print("Conectando...")
    res = requests.post(url, data=payload, headers=headers)
    if 'sessionid' in res.cookies:
        print("\n¡LOGRADO!")
        print("ID:", res.cookies['sessionid'])
    else:
        print("\nTikTok pidió verificación (Captcha) o los datos son incorrectos.")
except Exception as e:
    print(f"Error: {e}")
