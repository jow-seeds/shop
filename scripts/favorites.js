const productsData = {
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

function CreateOverview() {
    const content = document.querySelector(".content");
    content.innerHTML = ""; // Bestehenden Inhalt leeren
    
    const container = document.createElement("div");
    container.style.display = "grid";
    container.style.gridTemplateColumns = "repeat(auto-fit, minmax(250px, 1fr))";
    container.style.width = "100%";
    container.style.justifyContent = "center";
    container.style.gap = "20px";

    Object.values(productsData).flat().forEach(product => {
        const productContainer = document.createElement("div");
        productContainer.style.border = "1px solid black";
        productContainer.style.padding = "10px";
        productContainer.style.borderRadius = "8px";
        productContainer.style.backgroundColor = "#f9f9f9";
        productContainer.style.textAlign = "center";

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;
        img.style.width = "100%";
        img.style.maxHeight = "200px";
        img.style.objectFit = "cover";
        img.style.borderRadius = "8px";

        const title = document.createElement("h3");
        title.textContent = product.name;

        const yieldText = document.createElement("p");
        yieldText.textContent = `Ertrag: ${product.yield}`;
        
        const tasteText = document.createElement("p");
        tasteText.textContent = `Geschmack: ${product.taste}`;
        
        const bloomTimeText = document.createElement("p");
        bloomTimeText.textContent = `Blütezeit: ${product.bloomTime}`;

        const priceList = document.createElement("ul");
        product.prices.forEach(price => {
            const li = document.createElement("li");
            li.textContent = `${price.quantity}: ${price.price.toFixed(2)}€`;
            priceList.appendChild(li);
        });

        productContainer.appendChild(img);
        productContainer.appendChild(title);
        productContainer.appendChild(yieldText);
        productContainer.appendChild(tasteText);
        productContainer.appendChild(bloomTimeText);
        productContainer.appendChild(priceList);
        
        container.appendChild(productContainer);
    });

    content.appendChild(container);
}

CreateOverview();