let loginModal = document.getElementById("loginOrRegister");

// Schließen des Modals bei Klick außerhalb
document.addEventListener("click", (event) => {
    if (!event.target.closest(loginModal)) {
        loginModal.classList.remove("show");
        setTimeout(() => loginModal.classList.add("hidden"), 300);
    }
    else {
        console.log(event.target);
    }
});