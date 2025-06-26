async function loadBestseller() {
    try {
        const response = await fetch('http://176.100.37.241:6401/api/bestseller')
        if (!response.ok) throw new Error('Netzwerkfehler beim Laden der Bestseller');

        const data = await response.json();

        const container = document.querySelector('.row.row-cols-1.row-cols-md-4.g-4.justify-content-center');
        container.innerHTML = ''; // Alte Karten entfernen

        data.forEach(sorte => {
            const isAuto = sorte.Name.toLowerCase().includes('auto');
            const label = isAuto ? 'Samen bis Ernte' : 'Blütezeit';

            // Preise Options HTML bauen
            const optionsHTML = sorte.Preise.map(preis =>
                `<option>${preis}</option>`
            ).join('');

            const cardHTML = `
                <div class="col">
                <div class="card h-100">
                    <img src="${sorte.Foto}" class="card-img-top" style="height: 300px; object-fit: cover;" alt="Produktbild">
                    <div class="card-body">
                    <h6 class="text-muted">${isAuto ? 'Automatic' : 'Regular'}</h6>
                    <h5 class="card-title">${sorte.Name}</h5>
                    <ul>
                        <li>Gen: ${sorte.Gen}</li>
                        <li>THC: ~${sorte.THC}%</li>
                        <li>Geruch: ${sorte.Terpene}</li>
                        <li>Ertrag Indoor: ${sorte.ErtragIndoor}</li>
                        <li>Ertrag Outdoor: ${sorte.ErtragOutdoor}</li>
                        <li>${label}: ${sorte.Blütezeit}</li>
                    </ul>
                    <select class="form-select mb-3" style="cursor: pointer;">
                        ${optionsHTML}
                    </select>
                    <button class="btn btn-primary w-100 addToCartBtn">In den Warenkorb</button>
                    </div>
                </div>
                </div>
            `;

            container.insertAdjacentHTML('beforeend', cardHTML);
        });

    } catch (err) {
        console.error('Fehler beim Laden der Bestseller:', err);
    }
}

// Aufruf nach DOM geladen
document.addEventListener('DOMContentLoaded', loadBestseller);