document.addEventListener("DOMContentLoaded", function () {
    // 1. Hole alle Buttons mit einer bestimmten Klasse
    const buttons = document.querySelectorAll(".automatics, .regular");

    // 2. Prüfe, ob ein Button geklickt wurde
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            // 3. & 4. Weiterleitung je nach Klassennamen
            if (this.classList.contains("automatics")) {
                window.location.href = "/shop/seeds/view/?automatics";
            } else if (this.classList.contains("regular")) {
                window.location.href = "/shop/seeds/view/?regular";
            }
        });
    });
});