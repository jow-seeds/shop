let header = document.getElementById("überschrift");
let cartButton = document.getElementById("cartButton");
let cart = document.getElementById("cartModal");
let closeButton = document.querySelector(".close");
let modalContent = document.querySelector(".modal-content");
let cartItems = []; // Liste der Warenkorb-Elemente

// Öffnen des Modals
cartButton.addEventListener("click", function() {
    updateCartDisplay();
    cart.classList.add("show"); // Modal anzeigen
});

// Schließen des Modals beim Klick auf den "X"-Button
closeButton.addEventListener("click", function() {
    cart.classList.remove("show"); // Modal verstecken
});

// Schließen des Modals, wenn man auf den Hintergrund klickt
window.addEventListener("click", function(event) {
    if (event.target === cart) {
        cart.classList.remove("show");
    }
});

// Funktion zum Aktualisieren der Anzeige des Warenkorbs
function updateCartDisplay() {
    modalContent.innerHTML = ''; // Inhalt des Modals leeren
    modalContent.appendChild(header);

    if (cartItems.length === 0) {
        let emptyMessage = document.createElement("p");
        emptyMessage.textContent = "Dein Warenkorb ist leer";
        modalContent.appendChild(emptyMessage);
    } else {
        cartItems.forEach(item => {
            let itemElement = document.createElement("div");
            itemElement.style.display = "flex";
            itemElement.style.justifyContent = "space-between";
            itemElement.style.marginBottom = "10px";

            let nameSpan = document.createElement("span");
            nameSpan.textContent = `Sorte: ${item.name}`;

            let quantitySpan = document.createElement("span");
            quantitySpan.textContent = `Samen: ${item.quantity}`;

            let anzahlSpan = document.createElement("span");
            anzahlSpan.textContent = `Anzahl: ${item.anzahl}`;

            let preisSpan = document.createElement("span");
            preisSpan.textContent = `Preis: ${item.preis}€`;

            itemElement.appendChild(nameSpan);
            itemElement.appendChild(quantitySpan);
            itemElement.appendChild(anzahlSpan);
            itemElement.appendChild(preisSpan);

            modalContent.appendChild(itemElement);
        });
    }
}

// Beispiel zum Hinzufügen eines Elements zum Warenkorb
function addItemToCart(name, quantity, anzahl, preis) {
    cartItems.push({ name, quantity , anzahl, preis});
    updateCartDisplay();
}

// Beispielaufruf zum Hinzufügen eines Elements
addItemToCart("Auto Sleep Walker", 3, 1, "12.50");