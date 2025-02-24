// Beispielhafte Daten, die später durch eine Datenbankabfrage ersetzt werden
const bestsellerData = {
    automatic: [
        {
            name: "Auto Sleep Walker",
            image: "/shop/Produkte/Automatic/SleepWalker/AutoSleepWalker.jpg",
            yield: "550g",
            taste: "Fruchtig, Erdig",
            bloomTime: "10 Wochen",
            price: 12.50
        },
        {
            name: "Auto Lady´s Black Death",
            image: "/shop/Produkte/Automatic/SleepWalker/AutoSleepWalker.jpg",
            yield: "450g",
            taste: "Fruchtig, Nussig",
            bloomTime: "11 Wochen",
            price: 12.50
        }
    ],
    regular: [
        {
            name: "Sleep Walker Reg.",
            image: "/shop/Produkte/Automatic/SleepWalker/AutoSleepWalker.jpg",
            yield: "750g",
            taste: "Fruchtig, Minze",
            bloomTime: "8 Wochen",
            price: 15.00
        },
        {
            name: "Lady´s Black Death Reg.",
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
            <p><strong>Ertrag:</strong> ${product.yield}</p>
            <p><strong>Geschmack:</strong> ${product.taste}</p>
            <p><strong>Blütedauer:</strong> ${product.bloomTime}</p>
            <p><strong>Preis:</strong> ${product.price.toFixed(2)}€</p>
            <button class="add-to-cart-btn">Zum Warenkorb hinzufügen</button>
        </div>
    `;
    
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