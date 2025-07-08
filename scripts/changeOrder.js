document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionID = urlParams.get('session_id');
    const pathname = window.location.pathname;

    if (!sessionID) {
        console.warn('Keine session_id in der URL gefunden.');
        return;
    }

    let newStatus = null;

    if (pathname.endsWith('/erfolg.html')) {
        newStatus = 'payed';

        // 🧹 Warenkorb leeren
        localStorage.setItem('Warenkorb', JSON.stringify({}));
    } else if (pathname.endsWith('/abbruch.html')) {
        newStatus = 'canceled';
    }

    if (newStatus) {
        try {
            const resBestellnummer = await fetch(`https://jow-api.onrender.com/api/get-order?session_id=${sessionID}`);
            const data = await resBestellnummer.json();
            const bestellNummer = data.bestellNummer || "Unbekannt";
            document.getElementById('bestellNummer').textContent = bestellNummer;

            const res = await fetch('https://jow-api.onrender.com/api/change-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    session_id: sessionID,
                    status: newStatus
                })
            });

            const result = await res.json();
            console.log('Status-Update erfolgreich:', result);
        } catch (err) {
            console.error('Fehler beim Senden des Status-Updates:', err);
        }
    }
});