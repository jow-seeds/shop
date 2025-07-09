document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionID = urlParams.get('session_id');
    const pathname = window.location.pathname;

    if (!sessionID) {
        console.warn('Keine session_id in der URL gefunden.');
        return;
    }

    try {
        const res = await fetch(`https://jow-api.onrender.com/api/get-order?session_id=${sessionID}`);
        const data = await res.json();

        if (!data || !data.status) {
            throw new Error("Keine gültige Bestellung gefunden.");
        }

        const bestellNummer = data.bestellNummer || "Unbekannt";
        const status = data.status;
        const bestellfeld = document.getElementById('bestellNummer');

        if (bestellfeld) {
            bestellfeld.textContent = bestellNummer;
        }

        // Reagieren je nach Seite
        if (pathname.endsWith('/erfolg.html')) {
            if (status === 'payed') {
                localStorage.setItem('Warenkorb', JSON.stringify({}));
            } else {
                // ❌ Zahlung NICHT erfolgreich → zurück auf Abbruchseite (nur von erfolg.html aus!)
                window.location.href = `/shop/abbruch.html?session_id=${sessionID}`;
            }
        }

        // abbruch.html muss nichts weiter tun → keine Weiterleitung
    } catch (err) {
        console.error('Fehler beim Abrufen der Bestellung:', err);

        // Nur von erfolg.html aus redirecten
        if (pathname.endsWith('/erfolg.html')) {
            window.location.href = `/shop/abbruch.html?session_id=${sessionID}`;
        }
    }
});