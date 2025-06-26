import requests
import time
import sys
from colorama import init, Fore, Style

init(autoreset=True)

INTERVAL = 300  # Sekunden (5 Minuten)

def print_boxed_bestseller(data):
    border_color = Fore.RED
    text_color = Fore.GREEN

    lines = [
        "###############################################",
        "#                                             #",
        "#                Bestseller                   #",
        "#                                             #",
        "###############################################"
    ]

    for line in lines:
        print(border_color + line)

    print(text_color + "\nBestseller Daten:\n")
    if isinstance(data, list):
        for item in data:
            print(text_color + f"- {item}")
    else:
        print(text_color + str(data))
    print()

def fetch_bestseller():
    url = "https://jow-api.onrender.com/api/bestseller"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        print_boxed_bestseller(data)
    except requests.RequestException as e:
        print(Fore.RED + f"Fehler beim Abrufen: {e}")

def countdown_timer(seconds):
    for remaining in range(seconds, 0, -1):
        mins, secs = divmod(remaining, 60)
        timer = f"{mins:02d}:{secs:02d}"
        # \r setzt den Cursor an den Zeilenanfang, so überschreibt man die Zeile
        print(Fore.YELLOW + f"Nächste Anfrage in: {timer} ", end="\r")
        sys.stdout.flush()
        time.sleep(1)
    print(" " * 30, end="\r")  # löscht die Timerzeile nach Ablauf

if __name__ == "__main__":
    while True:
        fetch_bestseller()
        countdown_timer(INTERVAL)