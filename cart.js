let cartButton = document.getElementById("cartButton");
let cart = document.getElementById("cartModal");
let closeButton = document.querySelector(".close"); // Schließen-Button

// Öffnen des Modals
cartButton.addEventListener("click", function() {
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