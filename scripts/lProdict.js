// Beispielhafte Daten, die später durch eine Datenbankabfrage ersetzt werden
const prodictsData = {
    automatic: [
        {
            name: "Sleep Walker\nAutomatic",
            image: "/shop/Produkte/Automatic/SleepWalker/AutoSleepWalker.jpg",
            yield: "550g",
            taste: "Fruchtig, Erdig",
            bloomTime: "10 Wochen",
            prices: [
                { quantity: "3 Samen", price: 12.00 },
                { quantity: "5 Samen", price: 18.00 },
                { quantity: "7 Samen", price: 25.00 }
            ]
        },
        {
            name: "Black Death\nAutomatic",
            image: "/shop/Produkte/Automatic/SleepWalker/AutoSleepWalker.jpg",
            yield: "450g",
            taste: "Fruchtig, Nussig",
            bloomTime: "11 Wochen",
            prices: [
                { quantity: "3 Samen", price: 12.00 },
                { quantity: "5 Samen", price: 18.00 },
                { quantity: "7 Samen", price: 25.00 }
            ]
        }
    ],
    regular: [
        {
            name: "Sleep Walker\nRegular",
            image: "/shop/Produkte/Automatic/SleepWalker/AutoSleepWalker.jpg",
            yield: "750g",
            taste: "Fruchtig, Minze",
            bloomTime: "8 Wochen",
            prices: [
                { quantity: "3 Samen", price: 15.00 },
                { quantity: "5 Samen", price: 24.00 },
                { quantity: "7 Samen", price: 32.00 }
            ]
        },
        {
            name: "Black Death\nRegular",
            image: "/shop/Produkte/Automatic/SleepWalker/AutoSleepWalker.jpg",
            yield: "900g",
            taste: "Frucht, Nuss",
            bloomTime: "11 Wochen",
            prices: [
                { quantity: "3 Samen", price: 15.00 },
                { quantity: "5 Samen", price: 24.00 },
                { quantity: "7 Samen", price: 32.00 }
            ]
        }
    ]
};

// Funktion zum Erstellen von Produktanzeigen
function createProductCard(product) {
    const productCard = document.getElementsByClassName("content-container");
    productCard.classList.add('prodicts-item');

    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h2>${product.name}</h2>
        </div>
    `;

    const productInfo = productCard.querySelector(".product-info");

    // Produktdetails
    const details = [
        `<strong>Ertrag:</strong> ${product.yield}`,
        `<strong>Geschmack:</strong> ${product.taste}`,
        `<strong>Blütedauer:</strong> ${product.bloomTime}`
    ];

    // Details in die Produktinfo einfügen
    details.forEach((detail, index) => {
        if (index > 0) {
            const itemLine = document.createElement("hr");
            itemLine.style.border = "2px solid black";
            itemLine.style.width = "100%";
            productInfo.appendChild(itemLine);
        }

        const p = document.createElement("p");
        p.innerHTML = detail;
        p.style.marginBottom = "10px";
        productInfo.appendChild(p);
    });

    // Dropdown für die Preise
    const select = document.createElement("select");
    select.classList.add("price-select");
    select.style.fontSize = "16px";
    select.style.padding = "5px";
    select.style.marginBottom = "10px";
    
    product.prices.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option.price;
        opt.textContent = `${option.quantity} - ${option.price.toFixed(2)}€`;
        select.appendChild(opt);
    });

    const itemLine = document.createElement("hr");
    itemLine.style.border = "2px solid black";
    itemLine.style.width = "100%";
    productInfo.appendChild(itemLine);

    productInfo.appendChild(select);

    // Button hinzufügen
    const button = document.createElement("button");
    button.classList.add("add-to-cart-btn");
    button.textContent = "Zum Warenkorb hinzufügen";
    productInfo.appendChild(button);

    // Click Event für den Button hinzufügen
    button.addEventListener("click", () => {
        const selectedOption = select.options[select.selectedIndex];
        const quantity = parseInt(selectedOption.textContent.split(' - ')[0]);
        const preis = parseFloat(selectedOption.value);
        const anzahl = 1

        // Aufruf der addItemToCart Methode mit den erforderlichen Parametern
        addItemToCart(product.name, quantity, anzahl, preis);
    });

    return productCard;
}

// Funktion zum Hinzufügen von prodicts-Produkten in die jeweiligen Kategorien
function loadprodictss() {
    const automaticItemsContainer = document.getElementById('automatic-items');
    const regularItemsContainer = document.getElementById('regular-items');
    
    prodictsData.automatic.forEach(product => {
        const productCard = createProductCard(product);
        automaticItemsContainer.appendChild(productCard);
    });
    
    prodictsData.regular.forEach(product => {
        const productCard = createProductCard(product);
        regularItemsContainer.appendChild(productCard);
    });
}

// Aufrufen der Funktion, um die prodicts anzuzeigen
loadprodictss();