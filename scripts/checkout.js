document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionID = urlParams.get('session_id');

    if (!sessionID) {
        console.error("Fehler beim Abrufen der Bestellung: SessionID wurde nicht gefunden.")
        const errorBox = document.getElementById('error-message');
        if (errorBox) errorBox.classList.remove('d-none');

        document.getElementById('kunde-vorname').textContent = 'Unbekannt';
        document.getElementById('kunde-nachname').textContent = 'Unbekannt';
        document.getElementById('kunde-strasse').textContent = 'Unbekannt';
        document.getElementById('kunde-plz').textContent = 'Unbekannt';
        document.getElementById('kunde-ort').textContent = 'Unbekannt';
        document.getElementById('kunde-email').textContent = 'Unbekannt';

        const tbody = document.getElementById('warenkorb-body');
        if (tbody) {
            tbody.innerHTML = '';
            const row = document.createElement('tr');
            row.innerHTML = `
                <td colspan="5" class="text-center text-muted">Warenkorb Unbekannt</td>
            `;
            tbody.appendChild(row);
        }

        document.getElementById('zwischensumme').textContent = 'Unbekannt';
        document.getElementById('gesamtpreis').textContent = 'Unbekannt';
        return;
    }

    try {
        const res = await fetch(`https://jow-api.onrender.com/api/get-order?session_id=${sessionID}`);
        const data = await res.json();
        const kunde = data.kunde || {};
        const warenkorb = data.warenkorb || [];

        // Kundendaten anzeigen
        document.getElementById('kunde-vorname').textContent = kunde.vorname || 'Unbekannt';
        document.getElementById('kunde-nachname').textContent = kunde.nachname || 'Unbekannt';
        document.getElementById('kunde-strasse').textContent = kunde.strasse || 'Unbekannt';
        document.getElementById('kunde-plz').textContent = kunde.plz || 'Unbekannt';
        document.getElementById('kunde-ort').textContent = kunde.ort || 'Unbekannt';
        document.getElementById('kunde-email').textContent = kunde.email || 'Unbekannt';

        // Warenkorb eintragen
        const tbody = document.getElementById('warenkorb-body');
        tbody.innerHTML = ''; // Leeren, falls schon befüllt

        let zwischensumme = 0;

        warenkorb.forEach(item => {
            const name = item.name || '-';
            const option = item.option || '-';
            const menge = item.menge || 1;
            const einzelpreis = parseFloat(item.preis || 0);
            const gesamt = einzelpreis * menge;

            zwischensumme += gesamt;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${name}</td>
                <td>${option}</td>
                <td>${menge}</td>
                <td>${einzelpreis.toFixed(2)} €</td>
                <td>${gesamt.toFixed(2)} €</td>
            `;
            tbody.appendChild(row);
        });

        const versand = 6.50;
        const gesamtpreis = zwischensumme + versand;

        document.getElementById('zwischensumme').textContent = `${zwischensumme.toFixed(2)} €`;
        document.getElementById('gesamtpreis').textContent = `${gesamtpreis.toFixed(2)} €`;

    } catch (err) {
        console.error("Fehler beim Abrufen der Bestellung:", err);
        const errorBox = document.getElementById('error-message');
        if (errorBox) errorBox.classList.remove('d-none');

        document.getElementById('kunde-vorname').textContent = 'Unbekannt';
        document.getElementById('kunde-nachname').textContent = 'Unbekannt';
        document.getElementById('kunde-strasse').textContent = 'Unbekannt';
        document.getElementById('kunde-plz').textContent = 'Unbekannt';
        document.getElementById('kunde-ort').textContent = 'Unbekannt';
        document.getElementById('kunde-email').textContent = 'Unbekannt';

        const tbody = document.getElementById('warenkorb-body');
        if (tbody) {
            tbody.innerHTML = '';
            const row = document.createElement('tr');
            row.innerHTML = `
                <td colspan="5" class="text-center text-muted">Warenkorb Unbekannt</td>
            `;
            tbody.appendChild(row);
        }

        document.getElementById('zwischensumme').textContent = 'Unbekannt';
        document.getElementById('gesamtpreis').textContent = 'Unbekannt';
    }
});