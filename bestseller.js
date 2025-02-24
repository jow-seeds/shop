// Beispielhafte Daten, die später durch eine Datenbankabfrage ersetzt werden
const bestsellerData = {
    automatic: [
        {
            name: "Sleep Walker\nAutomatic",
            image: "/shop/Produkte/Automatic/SleepWalker/AutoSleepWalker.jpg",
            yield: "550g",
            taste: "Fruchtig, Erdig",
            bloomTime: "10 Wochen",
            price: 12.50
        },
        {
            name: "Black Death\nAutomatic",
            image: "/shop/Produkte/Automatic/SleepWalker/AutoSleepWalker.jpg",
            yield: "450g",
            taste: "Fruchtig, Nussig",
            bloomTime: "11 Wochen",
            price: 12.50
        }
    ],
    regular: [
        {
            name: "Sleep Walker\nRegular",
            image: "/shop/Produkte/Automatic/SleepWalker/AutoSleepWalker.jpg",
            yield: "750g",
            taste: "Fruchtig, Minze",
            bloomTime: "8 Wochen",
            price: 15.00
        },
        {
            name: "Black Death\nRegular",
            image: "/shop/Produkte/Automatic/SleepWalker/AutoSleepWalker.jpg",
            yield: "900g",
            taste: "Frucht, Nuss",
            bloomTime: "11 Wochen",
            price: 15.00
        }
    ]
};

// Funktion zum Erstellen von Produktanzeigen
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('bestseller-item');

    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h2>${product.name}</h2>
        </div>
    `;

    const productInfo = productCard.querySelector(".product-info");

    // Array mit den Texten für die Absätze
    const details = [
        `<strong>Ertrag:</strong> ${product.yield}`,
        `<strong>Geschmack:</strong> ${product.taste}`,
        `<strong>Blütedauer:</strong> ${product.bloomTime}`,
        `<strong>Preis:</strong> ${product.price.toFixed(2)}€`
    ];

    // Absätze mit Trennlinie einfügen
    details.forEach((detail, index) => {
        if (index > 0) {
            const itemLine = document.createElement("hr");
            itemLine.style.border = "1px solid #ccc";
            productInfo.appendChild(itemLine);
        }

        const p = document.createElement("p");
        p.innerHTML = detail;
        productInfo.appendChild(p);
    });

    // Button hinzufügen
    const button = document.createElement("button");
    button.classList.add("add-to-cart-btn");
    button.textContent = "Zum Warenkorb hinzufügen";
    productInfo.appendChild(button);

    return productCard;
}

// Funktion zum Hinzufügen von Bestseller-Produkten in die jeweiligen Kategorien
function loadBestsellers() {
    const automaticItemsContainer = document.getElementById('automatic-items');
    const regularItemsContainer = document.getElementById('regular-items');
    
    bestsellerData.automatic.forEach(product => {
        const productCard = createProductCard(product);
        automaticItemsContainer.appendChild(productCard);
    });
    
    bestsellerData.regular.forEach(product => {
        const productCard = createProductCard(product);
        regularItemsContainer.appendChild(productCard);
    });
}

// Aufrufen der Funktion, um die Bestseller anzuzeigen
loadBestsellers();