async function loadSorten() {
    try {
        const response = await fetch('https://jow-api.onrender.com/api/sorten')
        if (!response.ok) throw new Error('Netzwerkfehler beim Laden der Sorten');

        const data = await response.json();

        const container = document.querySelector('.row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-3');
        container.innerHTML = ''; // Alte Karten entfernen

        data.forEach(sorte => {
            const isAuto = sorte.Name.toLowerCase().includes('auto');
            const label = isAuto ? 'Samen bis Ernte' : 'Blütezeit';

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
                    <button class="btn btn-primary w-100">Details</button>
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
document.addEventListener('DOMContentLoaded', loadSorten);