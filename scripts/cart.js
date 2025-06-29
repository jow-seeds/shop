// Warenkorb laden (inkl. Migration von altem Array-Format)
const cart = loadCartFromLocalStorage();

const cartAmount = document.getElementById("cartAmount");

function loadCartFromLocalStorage() {
    const raw = localStorage.getItem("Warenkorb");
    if (!raw) return [];

    try {
        const parsed = JSON.parse(raw);

        // Prüfen ob es strukturiert gespeichert ist (also als Objekt mit Keys wie 'Sleep Walker')
        if (!Array.isArray(parsed)) {
            // Zurückwandeln in ein array für cart[]
            const items = [];
            for (const [name, eintraege] of Object.entries(parsed)) {
                for (const eintrag of eintraege) {
                    const menge = parseInt(eintrag.Menge);
                    const preis = parseFloat(eintrag.Einzelpreis.replace("€", "").replace(",", "."));
                    const option = eintrag.Option;

                    items.push({ name, option, menge, preis });
                }
            }
            return items;
        }

        // Falls altes Array-Format [name, option, menge, preis]
        return parsed.map(item => {
            if (Array.isArray(item)) {
                const [name, option, menge, preis] = item;
                return { name, option, menge: Number(menge), preis: Number(preis) };
            }
            return {
                ...item,
                menge: Number(item.menge),
                preis: Number(item.preis)
            };
        });

    } catch (e) {
        console.error("Fehler beim Laden des Warenkorbs:", e);
        return [];
    }
}

function saveCartToLocalStorage() {
    const structuredCart = {};

    cart.forEach(item => {
        const { name, option, menge, preis } = item;
        const gesamtpreis = +(menge * preis).toFixed(2);

        if (!structuredCart[name]) {
            structuredCart[name] = [];
        }

        structuredCart[name].push({
            Option: option,
            Menge: `${menge}x`,
            Einzelpreis: `${preis.toFixed(2)}€`,
            Gesamtpreis: `${gesamtpreis.toFixed(2)}€`
        });
    });

    localStorage.setItem("Warenkorb", JSON.stringify(structuredCart));
}

function changeAmount() {
    const totalItems = cart.reduce((sum, item) => sum + item.menge, 0);
    cartAmount.innerHTML = totalItems;
}

function addToCart(name, option, menge, preis) {
    // Prüfe, ob das Produkt mit derselben Option bereits existiert
    const existing = cart.find(item => item.name === name && item.option === option);

    if (existing) {
        existing.menge += menge;
    } else {
        cart.push({ name, option, menge, preis });
    }

    changeAmount();
    saveCartToLocalStorage();
    console.info(cart);
}

// Button-Handler
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("addToCartBtn")) {
        const cardBody = event.target.closest(".card-body");
        const name = cardBody.querySelector(".card-title")?.textContent.trim() || "Unbekannt";
        const optionSelect = cardBody.querySelector("select");
        const selectedOption = optionSelect.options[optionSelect.selectedIndex].text;

        const optionMatch = selectedOption.match(/(\d+)\s+Samen/);
        const preisMatch = selectedOption.match(/(\d+,\d{2})€/);

        const option = optionMatch ? optionMatch[0] : "Unbekannt";
        const preis = preisMatch ? parseFloat(preisMatch[1].replace(",", ".")) : 0.0;

        const menge = 1;

        addToCart(name, option, menge, preis);
    }
});

const mengeSelect = document.getElementById('dropdown-menge');
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("addToCartBtn2")) {
        const name = document.getElementById("sortenName")?.textContent.trim() || "Unbekannt";
        const optionSelect = document.getElementById("dropdown-samenmenge");
        const selectedOption = optionSelect.options[optionSelect.selectedIndex].text;

        const optionMatch = selectedOption.match(/(\d+)\s+Samen/);
        const preisMatch = selectedOption.match(/(\d+,\d{2})€/);

        const option = optionMatch ? optionMatch[0] : "Unbekannt";
        const preis = preisMatch ? parseFloat(preisMatch[1].replace(",", ".")) : 0.0;

        const menge = parseInt(mengeSelect.value, 10);

        addToCart(name, option, menge, preis);
    }
});

if (mengeSelect != null) {
    for (let i = 1; i <= 10; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        mengeSelect.appendChild(option);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    changeAmount();
});

function renderCart() {
    const cartItemsContainer = document.getElementById("cartItems");
    const cartTotalElement = document.getElementById("cartTotal");

    cartItemsContainer.innerHTML = "";
    let gesamtpreis = 0;

    const cartData = localStorage.getItem("Warenkorb");
    if (!cartData) {
        cartItemsContainer.innerHTML = "<p>Der Warenkorb ist leer.</p>";
        cartTotalElement.textContent = "0.00 €";
        return;
    }

    const cart = JSON.parse(cartData);

    for (const name in cart) {
        cart[name].forEach((item, index) => {
            const { Option, Menge, Einzelpreis, Gesamtpreis } = item;
            const einzel = parseFloat(Gesamtpreis.replace("€", "").replace(",", "."));
            gesamtpreis += einzel;

            const itemId = `${name}__${Option}__${index}`; // Eindeutiger Key für Button

            const itemHTML = `
                <div class="mb-2" id="cartItem-${itemId}">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <strong>${name}</strong><br>
                            <small>${Option} | ${Menge} | ${Einzelpreis}</small>
                        </div>
                        <div class="text-end">
                            <strong>${Gesamtpreis}</strong><br>
                            <button class="btn btn-sm btn-outline-danger mt-1 remove-btn" data-name="${name}" data-option="${Option}">Entfernen</button>
                        </div>
                    </div>
                </div>
            `;
            cartItemsContainer.insertAdjacentHTML("beforeend", itemHTML);
        });
    }

    cartTotalElement.textContent = `${gesamtpreis.toFixed(2)} €`;

    // Entfernen-Buttons aktivieren
    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const name = btn.getAttribute("data-name");
            const option = btn.getAttribute("data-option");
            removeCartItem(name, option);
        });
    });
}

function removeCartItem(name, option) {
    const cartData = JSON.parse(localStorage.getItem("Warenkorb")) || {};

    if (cartData[name]) {
        cartData[name] = cartData[name].filter(item => item.Option !== option);

        if (cartData[name].length === 0) {
            delete cartData[name];
        }

        // 📌 Speicher aktualisieren
        localStorage.setItem("Warenkorb", JSON.stringify(cartData));

        // 📌 globales cart[] neu aufbauen
        cart.length = 0; // leere globales cart[]
        const newCart = loadCartFromLocalStorage();
        newCart.forEach(item => cart.push(item));

        // 📌 Anzeige aktualisieren
        renderCart();
        changeAmount();
    }
}

function updateInternalCart() {
    const stored = localStorage.getItem("Warenkorb");
    const parsed = stored ? JSON.parse(stored) : {};
    cart.length = 0; // leeren

    for (const name in parsed) {
        parsed[name].forEach(item => {
            const option = parseInt(item.Option);
            const menge = parseInt(item.Menge.replace("x", ""));
            const preis = parseFloat(item.Einzelpreis.replace("€", "").replace(",", "."));
            cart.push([name, option, menge, preis]);
        });
    }
}

const cartModal = document.getElementById("cartModal");
cartModal.addEventListener("show.bs.modal", renderCart);

document.getElementById("clearCartBtn").addEventListener("click", () => {
    localStorage.removeItem("Warenkorb");
    cart.length = 0;
    renderCart();
    changeAmount();
});