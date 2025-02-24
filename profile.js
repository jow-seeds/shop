// Elemente abrufen
const profileButton = document.getElementById("profileButton");
const profileModal = document.getElementById("profileModal");

// Dummy-Login-Status (ersetze das mit echter Logik)
let isLoggedIn = false;

// Öffnen des Modals
profileButton.addEventListener("click", () => {
  profileModal.innerHTML = ""; // Reset

  // Modal anzeigen
  profileModal.classList.remove("hidden");
  setTimeout(() => profileModal.classList.add("show"), 10);

  // Header
  const header = document.createElement("h2");
  header.textContent = "PROFIL";
  profileModal.appendChild(header);

  // Login-Prüfung
  if (!isLoggedIn) {
    const loginButton = document.createElement("button");
    loginButton.textContent = "LOGIN";
    loginButton.classList.add("profile-btn");

    const orText = document.createElement("p");
    orText.textContent = "OR";

    const registerButton = document.createElement("button");
    registerButton.textContent = "REGISTER";
    registerButton.classList.add("profile-btn");

    profileModal.append(loginButton, orText, registerButton);
  }
});

// Schließen des Modals bei Klick außerhalb
document.addEventListener("click", (event) => {
  if (!profileModal.contains(event.target) && event.target !== profileButton) {
    profileModal.classList.remove("show");
    setTimeout(() => profileModal.classList.add("hidden"), 300);
  }
});