let header = document.getElementById("cart-überschrift");
let cartButton = document.getElementById("cartButton");
let cart = document.getElementById("cartModal");
let closeButton = document.querySelector(".close");
let modalContent = document.querySelector(".modal-content");
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

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

function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Funktion zum Aktualisieren der Anzeige des Warenkorbs
function updateCartDisplay() {
    modalContent.innerHTML = ''; // Clear the modal content

    // Add header with a bold line below
    header.style.fontSize = "2em";
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
        cartItems.forEach((item, index) => {
            let itemElement = document.createElement("div");
            itemElement.className = "cart-item";

            let nameSpan = document.createElement("span");
            nameSpan.textContent = `${item.name}`;
            nameSpan.style.fontWeight = "bold"; // Make item name bold

            let quantitySpan = document.createElement("span");
            quantitySpan.textContent = `Samen: ${item.quantity}`;

            let anzahlSpan = document.createElement("span");
            anzahlSpan.textContent = `Anzahl: ${item.anzahl}`;

            let preisSpan = document.createElement("span");
            preisSpan.textContent = `Preis: ${item.preis.toFixed(2)}€`;

            zwischenPreis += item.preis;

            let löschenButton = document.createElement("button");
            löschenButton.innerHTML = "LÖSCHEN";
            löschenButton.style.color = "white";
            löschenButton.style.backgroundColor = "red";
            löschenButton.style.width = "100%";
            löschenButton.style.fontSize = "0.85em";

            // EventListener for "LÖSCHEN" button
            löschenButton.addEventListener("click", () => {
                cartItems.splice(index, 1);
                saveCartToLocalStorage();
                updateCartDisplay();
            });

            itemElement.appendChild(nameSpan);
            itemElement.appendChild(quantitySpan);
            itemElement.appendChild(anzahlSpan);
            itemElement.appendChild(preisSpan);
            itemElement.appendChild(löschenButton);

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
        zwischenPreisElement.innerHTML = `Zwischenpreis: ${zwischenPreis.toFixed(2)}€`;
        modalContent.appendChild(zwischenPreisElement);

        let lieferkosten = 6.5;
        let lieferkostenElement = document.createElement("p");
        lieferkostenElement.innerHTML = `Lieferkosten: ${lieferkosten.toFixed(2)}€`;
        modalContent.appendChild(lieferkostenElement);

        // Correct calculation of gesamtPreis
        let gesamtPreis = (zwischenPreis + lieferkosten).toFixed(2);
        let gesamtPreisElement = document.createElement("p");
        gesamtPreisElement.innerHTML = `<strong>Gesamtpreis: ${gesamtPreis}€</strong>`;
        gesamtPreisElement.style.fontSize = "1.5em";
        modalContent.appendChild(gesamtPreisElement);

        const totalLine2 = document.createElement("hr");
        totalLine2.style.border = "2px solid black";
        modalContent.appendChild(totalLine2);

        // Create the "ALLES LÖSCHEN" button
        let allesLoeschenButton = document.createElement("button");
        allesLoeschenButton.innerHTML = "<strong>ALLES LÖSCHEN</strong>";
        allesLoeschenButton.style.color = "white";
        allesLoeschenButton.style.backgroundColor = "red";
        allesLoeschenButton.style.marginRight = "10px"; 

        // EventListener for "ALLES LÖSCHEN" button
        allesLoeschenButton.addEventListener("click", () => {
            cartItems = [];
            saveCartToLocalStorage();
            updateCartDisplay();
        });

        // Create the "KASSE" button
        let kasseButton = document.createElement("button");
        kasseButton.innerHTML = "<strong>KASSE</strong>";
        kasseButton.style.color = "white";
        kasseButton.style.backgroundColor = "green";

        let buttonContainer = document.createElement("div");
        buttonContainer.style.display = "flex";
        buttonContainer.style.justifyContent = "center"; // Zentriert die Buttons horizontal
        buttonContainer.style.gap = "30%"; // Fügt Abstand zwischen den Buttons hinzu

        buttonContainer.appendChild(allesLoeschenButton);
        buttonContainer.appendChild(kasseButton);
        modalContent.appendChild(buttonContainer);
    }
    
    updateCartButton();
}

// Initial call to display the cart
updateCartDisplay();

// CSS for consistent alignment using grid layout
const style = document.createElement('style');
style.textContent = `
    .cart-item {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
        gap: 10px;
        margin-bottom: 10px;
    }
    .modal-content {
        max-height: 50vh; /* Maximum height of the modal */
        overflow-y: auto; /* Enable vertical scrolling if needed */
    }
`;
document.head.appendChild(style);

// Funktion zum Aktualisieren des Cart Buttons
function updateCartButton() {
    const itemCount = cartItems.length;

    // Wenn der Warenkorb nicht leer ist
    if (itemCount > 0) {
        // Prüfen, ob das Badge bereits existiert
        let badge = cartButton.querySelector(".cart-badge");

        if (!badge) {
            // Erstelle das Badge-Element, falls es noch nicht existiert
            badge = document.createElement("span");
            badge.classList.add("cart-badge");
            cartButton.appendChild(badge);
        }

        // Setze die Anzahl der Items als Text im Badge
        badge.textContent = itemCount;
    } else {
        // Badge entfernen, wenn der Warenkorb leer ist
        let badge = cartButton.querySelector(".cart-badge");
        if (badge) {
            badge.remove();
        }
    }
}

// zum Hinzufügen eines Elements zum Warenkorb
function addItemToCart(name, quantity, anzahl, preis) {
    // Preis als Float speichern und formatieren
    let parsedPreis = parseFloat(preis);
    cartItems.push({ name, quantity, anzahl, preis: parsedPreis });
    updateCartDisplay();
}