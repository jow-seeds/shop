let loginModal = document.getElementById("loginOrRegister");

// Schließen des Modals bei Klick außerhalb
document.addEventListener("click", (event) => {
    if (!loginModal.contains(event.target)) {
      loginModal.classList.remove("show");
      setTimeout(() => loginModal.classList.add("hidden"), 300);
    }
  });