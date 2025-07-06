async function loadSorten() {
    try {
        const response = await fetch('https://jow-api.onrender.com/api/sorten')
        if (!response.ok) throw new Error('Netzwerkfehler beim Laden der Sorten');

        const data = await response.json();

        const container = document.getElementById('product-grid');
        container.innerHTML = ''; // Alte Karten entfernen

        data.forEach(sorte => {
            const isAuto = sorte.Name.toLowerCase().includes('auto');
            const label = isAuto ? 'Samen bis Ernte' : 'Blütezeit';

            const cardHTML = `
                <div class="col">
                    <div class="card h-100"
                        data-type="${isAuto ? 'automatic' : 'regular'}"
                        data-gen="${sorte.Gen.toLowerCase()}"
                        data-thc="${getThcRange(sorte.THC)}">
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
                            <a href=${`https://jow-seeds.github.io/shop/produkte/${sorte.Name.replace(/\s+/g, '')}/${sorte.Name.toLowerCase().replace(/\s+/g, '_')}.html`} class="btn btn-primary w-100 mt-2">Details</a>
                        </div>
                    </div>
                </div>
                `;

            container.insertAdjacentHTML('beforeend', cardHTML);
        });

    } catch (err) {
        console.error('Fehler beim Laden der Sorten:', err);
    }
}

function getThcRange(thc) {
  if (thc < 15) return "0-15";
  if (thc < 20) return "15-20";
  if (thc < 25) return "20-25";
  return "25+";
}

// Aufruf nach DOM geladen
document.addEventListener('DOMContentLoaded', loadSorten);