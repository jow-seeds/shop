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
    modalContent.innerHTML = ''; // Clear the modal content

    // Add header with a bold line below
    modalContent.appendChild(header);
    const headerLine = document.createElement("hr");
    headerLine.style.border = "2px solid black";
    modalContent.appendChild(headerLine);

    let zwischenPreis = 0;

    if (cartItems.length === 0) {
        let emptyMessage = document.createElement("p");
        emptyMessage.textContent = "Dein Warenkorb ist leer";
        modalContent.appendChild(emptyMessage);
    } else {
        cartItems.forEach(item => {
            let itemElement = document.createElement("div");
            itemElement.className = "cart-item";

            let nameSpan = document.createElement("span");
            nameSpan.textContent = `${item.name}`;

            let quantitySpan = document.createElement("span");
            quantitySpan.textContent = `Samen: ${item.quantity}`;

            let anzahlSpan = document.createElement("span");
            anzahlSpan.textContent = `Anzahl: ${item.anzahl}`;

            let preisSpan = document.createElement("span");
            preisSpan.textContent = `Preis: ${item.preis.toFixed(2)}€`;

            zwischenPreis += item.preis;

            itemElement.appendChild(nameSpan);
            itemElement.appendChild(quantitySpan);
            itemElement.appendChild(anzahlSpan);
            itemElement.appendChild(preisSpan);

            modalContent.appendChild(itemElement);

            // Add a thin line between cart items
            const itemLine = document.createElement("hr");
            itemLine.style.border = "1px solid #ccc";
            modalContent.appendChild(itemLine);
        });

        // Add a bold line above the total price
        const totalLine1 = document.createElement("hr");
        totalLine1.style.border = "2px solid black";
        modalContent.appendChild(totalLine1);

        let zwischenPreisElement = document.createElement("p");
        zwischenPreisElement.textContent = `Zwischenpreis: ${zwischenPreis.toFixed(2)}€`;
        modalContent.appendChild(zwischenPreisElement);

        let lieferkosten = 6.5;
        let lieferkostenElement = document.createElement("p");
        lieferkostenElement.textContent = `Lieferkosten: ${lieferkosten.toFixed(2)}€`;
        modalContent.appendChild(lieferkostenElement);

        // Correct calculation of gesamtPreis
        let gesamtPreis = (zwischenPreis + lieferkosten).toFixed(2);
        let gesamtPreisElement = document.createElement("p");
        gesamtPreisElement.textContent = `Gesamtpreis: ${gesamtPreis}€`;
        modalContent.appendChild(gesamtPreisElement);
        
        const totalLine2 = document.createElement("hr");
        totalLine2.style.border = "2px solid black";
        modalContent.appendChild(totalLine2);
    }
}

// CSS for consistent alignment using grid layout
const style = document.createElement('style');
style.textContent = `
    .cart-item {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr;
        gap: 10px;
        margin-bottom: 10px;
    }
`;
document.head.appendChild(style);

// Beispiel zum Hinzufügen eines Elements zum Warenkorb
function addItemToCart(name, quantity, anzahl, preis) {
    // Preis als Float speichern und formatieren
    let parsedPreis = parseFloat(preis);
    cartItems.push({ name, quantity, anzahl, preis: parsedPreis });
    updateCartDisplay();
}

// Beispielaufruf zum Hinzufügen eines Elements
addItemToCart("Auto Sleep Walker", 3, 1, 12.50);
addItemToCart("Sleep Walker Regular", 3, 1, 15.00);
addItemToCart("Lady´s Black Death", 3, 1, 15.00);