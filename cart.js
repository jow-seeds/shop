let header = document.getElementById("cart-überschrift");
let cartButton = document.getElementById("cartButton");
let cart = document.getElementById("cartModal");
let closeButton = document.querySelector(".close");
let modalContent = document.querySelector(".modal-content");
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || []; // Warenkorb aus dem Storage laden

cartButton.addEventListener("click", function() {
    updateCartDisplay();
    cart.classList.add("show");
});

closeButton.addEventListener("click", function() {
    cart.classList.remove("show");
});

window.addEventListener("click", function(event) {
    if (event.target === cart) {
        cart.classList.remove("show");
    }
});

function saveCartToStorage() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function updateCartDisplay() {
    modalContent.innerHTML = '';
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
            nameSpan.style.fontWeight = "bold";

            let quantitySpan = document.createElement("span");
            quantitySpan.textContent = `Samen: ${item.quantity}`;

            let anzahlSpan = document.createElement("span");
            anzahlSpan.textContent = `Anzahl: ${item.anzahl}`;

            let preisSpan = document.createElement("span");
            preisSpan.textContent = `Preis: ${item.preis.toFixed(2)}€`;

            zwischenPreis += item.preis;

            let loeschenButton = document.createElement("button");
            loeschenButton.innerHTML = "LÖSCHEN";
            loeschenButton.style.color = "white";
            loeschenButton.style.backgroundColor = "red";
            loeschenButton.style.width = "100%";
            loeschenButton.style.fontSize = "0.85em";

            loeschenButton.addEventListener("click", () => {
                cartItems.splice(index, 1);
                saveCartToStorage();
                updateCartDisplay();
            });

            itemElement.appendChild(nameSpan);
            itemElement.appendChild(quantitySpan);
            itemElement.appendChild(anzahlSpan);
            itemElement.appendChild(preisSpan);
            itemElement.appendChild(loeschenButton);

            modalContent.appendChild(itemElement);
            
            const itemLine = document.createElement("hr");
            itemLine.style.border = "1px solid #ccc";
            modalContent.appendChild(itemLine);
        });

        const totalLine1 = document.createElement("hr");
        totalLine1.style.border = "2px solid black";
        modalContent.appendChild(totalLine1);

        let lieferkosten = 6.5;
        let gesamtPreis = (zwischenPreis + lieferkosten).toFixed(2);
        
        modalContent.innerHTML += `
            <p>Zwischenpreis: ${zwischenPreis.toFixed(2)}€</p>
            <p>Lieferkosten: ${lieferkosten.toFixed(2)}€</p>
            <p style="font-size:1.5em;"><strong>Gesamtpreis: ${gesamtPreis}€</strong></p>
        `;
        
        const totalLine2 = document.createElement("hr");
        totalLine2.style.border = "2px solid black";
        modalContent.appendChild(totalLine2);

        let buttonContainer = document.createElement("div");
        buttonContainer.style.display = "flex";
        buttonContainer.style.justifyContent = "center";
        buttonContainer.style.gap = "30%";

        let allesLoeschenButton = document.createElement("button");
        allesLoeschenButton.innerHTML = "<strong>ALLES LÖSCHEN</strong>";
        allesLoeschenButton.style.color = "white";
        allesLoeschenButton.style.backgroundColor = "red";
        allesLoeschenButton.addEventListener("click", () => {
            cartItems = [];
            saveCartToStorage();
            updateCartDisplay();
        });

        let kasseButton = document.createElement("button");
        kasseButton.innerHTML = "<strong>KASSE</strong>";
        kasseButton.style.color = "white";
        kasseButton.style.backgroundColor = "green";

        buttonContainer.appendChild(allesLoeschenButton);
        buttonContainer.appendChild(kasseButton);
        modalContent.appendChild(buttonContainer);
    }
    
    updateCartButton();
}

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
    let badge = cartButton.querySelector(".cart-badge");
    if (itemCount > 0) {
        if (!badge) {
            badge = document.createElement("span");
            badge.classList.add("cart-badge");
            cartButton.appendChild(badge);
        }
        badge.textContent = itemCount;
    } else if (badge) {
        badge.remove();
    }
}

// zum Hinzufügen eines Elements zum Warenkorb
function addItemToCart(name, quantity, anzahl, preis) {
    cartItems.push({ name, quantity, anzahl, preis: parseFloat(preis) });
    saveCartToStorage();
    updateCartDisplay();
}

// Warenkorb beim Laden der Seite wiederherstellen
window.addEventListener("load", updateCartDisplay);