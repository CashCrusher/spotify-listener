from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time
import threading

# === CONFIGURATION ===

# Mets ici l'URL de la musique Spotify que tu veux écouter
SPOTIFY_URL = "https://open.spotify.com/track/ID_DU_TITRE"

# Mets ici la liste de tes comptes Spotify (email + mot de passe)
COMPTES = [
  { "email": "compte1@example.com", "password": "motdepasse1" },
  { "email": "compte2@example.com", "password": "motdepasse2" },
  { "email": "compte3@example.com", "password": "motdepasse3" },
  { "email": "compte4@example.com", "password": "motdepasse4" },
  { "email": "compte5@example.com", "password": "motdepasse5" },
  { "email": "compte6@example.com", "password": "motdepasse6" },
  { "email": "compte7@example.com", "password": "motdepasse7" },
  { "email": "compte8@example.com", "password": "motdepasse8" },
  { "email": "compte9@example.com", "password": "motdepasse9" },
  { "email": "compte10@example.com", "password": "motdepasse10" },
  { "email": "compte11@example.com", "password": "motdepasse11" },
  { "email": "compte12@example.com", "password": "motdepasse12" },
  { "email": "compte13@example.com", "password": "motdepasse13" },
  { "email": "compte14@example.com", "password": "motdepasse14" },
  { "email": "compte15@example.com", "password": "motdepasse15" },
  { "email": "compte16@example.com", "password": "motdepasse16" },
  { "email": "compte17@example.com", "password": "motdepasse17" },
  { "email": "compte18@example.com", "password": "motdepasse18" },
  { "email": "compte19@example.com", "password": "motdepasse19" },
  { "email": "compte20@example.com", "password": "motdepasse20" }
]

# === FIN DE LA CONFIGURATION ===

def ecouter_compte(email, password):
    options = Options()
    options.add_argument("--headless")  # Supprime cette ligne si tu veux voir le navigateur
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")

    while True:
        driver = webdriver.Chrome(options=options)
        try:
            driver.get("https://accounts.spotify.com/fr/login")
            time.sleep(2)

            driver.find_element(By.ID, "login-username").send_keys(email)
            driver.find_element(By.ID, "login-password").send_keys(password)
            driver.find_element(By.ID, "login-button").click()

            time.sleep(5)
            driver.get(SPOTIFY_URL)
            time.sleep(5)

            play_button = driver.find_element(By.CLASS_NAME, "control-button--circled")
            play_button.click()
            print(f"[{email}] Lecture lancée.")

            time.sleep(120)  # écoute pendant 120 secondes

        except Exception as e:
            print(f"[{email}] Erreur : {e}")
        finally:
            driver.quit()

        time.sleep(10)  # pause avant de relancer

if __name__ == "__main__":
    threads = []
    for compte in COMPTES:
        t = threading.Thread(target=ecouter_compte, args=(compte['email'], compte['password']))
        threads.append(t)
        t.start()
        time.sleep(2)  # Décalage entre les lancements

    for t in threads:
        t.join()
