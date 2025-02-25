let loginModal = document.getElementById("loginOrRegister");
const profileButton = document.getElementById("profileButton");
const profileModal = document.getElementById("profileModal");

// Schließen des Modals bei Klick außerhalb
document.addEventListener("click", (event) => {
    if (!loginModal.contains(event.target) && event.target !== profileButton && event.target !== profileModal) {
      loginModal.classList.remove("show");
      setTimeout(() => loginModal.classList.add("hidden"), 300);
    }
});