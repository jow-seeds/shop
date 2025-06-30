
const versandKosten = 6.50;

function validateEmail(mail) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
    return emailRegex.test(mail);
}

document.addEventListener("DOMContentLoaded", () => {
    const warenkorbTbody = document.getElementById("warenkorb-body");
    const zwischensummeEl = document.getElementById("zwischensumme");
    const versandEl = document.getElementById("versand");
    const gesamtsummeEl = document.getElementById("gesamtsumme");
    const emailInput = document.getElementById('email');

    emailInput.addEventListener('blur', () => {
        if (!validateEmail(emailInput.value)) {
            emailInput.setCustomValidity('Bitte gib eine gültige E-Mail-Adresse ein.');
        } else {
            emailInput.setCustomValidity('');
        }
        emailInput.reportValidity();
    });

    const warenkorb = JSON.parse(localStorage.getItem("Warenkorb")) || {};
    if (Object.keys(warenkorb).length === 0) {
        warenkorbTbody.innerHTML = `<tr><td colspan="5" class="text-center">Der Warenkorb ist leer.</td></tr>`;
        zwischensummeEl.textContent = "0.00€";
        versandEl.textContent = "0.00€";
        gesamtsummeEl.textContent = "0.00€";
        return;
    }

    let zwischensumme = 0;

    for (const [produktName, varianten] of Object.entries(warenkorb)) {
        varianten.forEach((eintrag, eintragIndex) => {
            const preisZahl = parseFloat(eintrag.Gesamtpreis.replace("€", "").replace(",", "."));
            zwischensumme += preisZahl;

            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${produktName} (${eintrag.Option})</td>
                <td>
                <select class="form-select menge-dropdown" data-produkt="${produktName}" data-index="${eintragIndex}">
                    ${[...Array(10)].map((_, i) => {
                const mengeWert = `${i + 1}x`;
                return `<option value="${mengeWert}" ${mengeWert === eintrag.Menge ? "selected" : ""}>${mengeWert}</option>`;
            }).join("")}
                </select>
                </td>
                <td>${eintrag.Einzelpreis}</td>
                <td>${eintrag.Gesamtpreis}</td>
                <td>
                <button class="btn btn-sm btn-danger entfernen-btn" data-produkt="${produktName}" data-index="${eintragIndex}">🗑️</button>
                </td>
            `;

            warenkorbTbody.appendChild(tr);
        });
    }

    // Zwischensumme, Versand, Gesamtsumme berechnen
    zwischensummeEl.textContent = `${zwischensumme.toFixed(2)}€`;
    versandEl.textContent = `${versandKosten.toFixed(2)}€`;
    gesamtsummeEl.textContent = `${(zwischensumme + versandKosten).toFixed(2)}€`;

    // Event: Menge ändern
    document.querySelectorAll(".menge-dropdown").forEach(select => {
        select.addEventListener("change", e => {
            const produkt = e.target.dataset.produkt;
            const index = e.target.dataset.index;
            const neueMenge = e.target.value;

            const eintrag = warenkorb[produkt][index];
            const einzelpreis = parseFloat(eintrag.Einzelpreis.replace("€", "").replace(",", "."));
            const mengeZahl = parseInt(neueMenge);
            const neuerGesamtpreis = (einzelpreis * mengeZahl).toFixed(2) + "€";

            eintrag.Menge = neueMenge;
            eintrag.Gesamtpreis = neuerGesamtpreis;

            localStorage.setItem("Warenkorb", JSON.stringify(warenkorb));
            location.reload(); // reload ist simpel aber effektiv; alternativ: Werte dynamisch updaten
        });
    });

    // Event: Eintrag löschen
    document.querySelectorAll(".entfernen-btn").forEach(btn => {
        btn.addEventListener("click", e => {
            const produkt = e.target.dataset.produkt;
            const index = e.target.dataset.index;

            warenkorb[produkt].splice(index, 1);
            if (warenkorb[produkt].length === 0) {
                delete warenkorb[produkt];
            }

            localStorage.setItem("Warenkorb", JSON.stringify(warenkorb));
            location.reload();
        });
    });
});

const btnCheckout = document.getElementById('btnCheckout');
const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
const orderSummary = document.getElementById('orderSummary');
const checkoutFeedback = document.getElementById('checkoutFeedback');
const confirmOrder = document.getElementById('confirmOrder');
const form = document.getElementById('userDataForm');

// Aktivierung des Checkout-Buttons nur wenn Userdaten gültig sind (du kannst das triggern bei Inputvalidierung)
function toggleCheckoutButton(enabled) {
    btnCheckout.disabled = !enabled;
}

// Zusammenfassung aus localStorage und Userdaten zusammensetzen
function renderOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('Warenkorb')) || {};

    const name = document.getElementById('nachname').value.trim();
    const vorname = document.getElementById('vorname').value.trim();
    const strasse = document.getElementById('strasse').value.trim();
    const plz = document.getElementById('plz').value.trim();
    const ort = document.getElementById('ort').value.trim();
    const email = document.getElementById('email').value.trim();

    let html = '<h6>Warenkorb:</h6><table class="table"><thead><tr><th>Produkt</th><th>Option</th><th>Menge</th><th>Gesamtpreis</th></tr></thead><tbody>';
    let gesamtSumme = 0;

    for (const [produkt, items] of Object.entries(cart)) {
        items.forEach(item => {
            const preis = parseFloat(item.Gesamtpreis.replace('€', '').replace(',', '.')) || 0;
            gesamtSumme += preis;
            html += `<tr>
                <td>${produkt}</td>
                <td>${item.Option}</td>
                <td>${item.Menge}</td>
                <td>${item.Gesamtpreis}</td>
            </tr>`;
        });
    }
    html += `</tbody></table>`;

    // Versand anzeigen
    html += `<p><strong>Versandkosten:</strong> ${versandKosten.toFixed(2)}€</p>`;

    // Gesamtsumme inkl. Versand
    const gesamtMitVersand = gesamtSumme + versandKosten;
    html += `<p><strong>Gesamtsumme inkl. Versand: ${gesamtMitVersand.toFixed(2)}€</strong></p>`;

    const adresse = `${strasse}, ${plz} ${ort}`;

    html += `<h6>Kundendaten:</h6>
        <p><strong>Name:</strong> ${vorname} ${name}</p>
        <p><strong>Adresse:</strong> ${adresse}</p>
        <p><strong>Email:</strong> ${email}</p>`;

    orderSummary.innerHTML = html;
}

btnCheckout.addEventListener('click', () => {
    renderOrderSummary();
    checkoutFeedback.style.display = 'none';
    checkoutModal.show();
});

confirmOrder.addEventListener('click', async () => {
    checkoutFeedback.style.display = 'none';
    confirmOrder.disabled = true;
    confirmOrder.textContent = 'Bitte warten...';

    try {
        // Stripe-Checkout-Aufruf
        const response = await fetch('/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                // Produktdaten & Kundendaten an Backend schicken
                warenkorb: JSON.parse(localStorage.getItem('Warenkorb')),
                kunde: {
                    name: document.getElementById('nachname').value.trim(),
                    vorname: document.getElementById('vorname').value.trim(),
                    strasse: document.getElementById('strasse').value.trim(),
                    plz: document.getElementById('plz').value.trim(),
                    ort: document.getElementById('ort').value.trim(),
                    email: document.getElementById('email').value.trim(),
                }
            })
        });

        if (!response.ok) throw new Error('Stripe funktioniert im Moment nicht. Bitte wende dich an den Seitenbetreiber.');

        const { url } = await response.json();
        window.location.href = url;

    } catch (err) {
        checkoutFeedback.textContent = err.message;
        checkoutFeedback.style.display = 'block';
        confirmOrder.disabled = false;
        confirmOrder.textContent = 'Bestätigen';
    }
});

function validateUserDataForm() {
    const vorname = form.querySelector('#vorname').value.trim();
    const nachname = form.querySelector('#nachname').value.trim();
    const strasse = form.querySelector('#strasse').value.trim();
    const plz = form.querySelector('#plz').value.trim();
    const ort = form.querySelector('#ort').value.trim();
    const emailInput = form.querySelector('#email');
    const email = emailInput.value.trim();
    const agbChecked = form.querySelector('#agb').checked;

    // Prüfe, ob die E-Mail valide ist (native Validity API)
    const emailValid = validateEmail(email);

    const isValid =
        vorname !== '' &&
        nachname !== '' &&
        strasse !== '' &&
        plz !== '' &&
        ort !== '' &&
        email !== '' &&
        emailValid &&
        agbChecked;

    btnCheckout.disabled = !isValid;
}

// Events anhängen
form.addEventListener('input', validateUserDataForm);
form.querySelector('#agb').addEventListener('change', validateUserDataForm);

// Initial prüfen
validateUserDataForm();