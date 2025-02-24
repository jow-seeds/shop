// Elemente abrufen
const profileButton = document.getElementById("profileButton");
const profileModal = document.getElementById("profileModal");
let login = document.getElementById("loginOrRegister");

// Dummy-Login-Status (ersetze das mit echter Logik)
let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

// Öffnen des Modals
profileButton.addEventListener("click", (event) => {
  event.stopPropagation(); // Verhindert das Schließen direkt nach dem Öffnen
  profileModal.innerHTML = ""; // Reset

  // Modal anzeigen
  profileModal.classList.remove("hidden");
  setTimeout(() => profileModal.classList.add("show"), 10);

  // Header
  const header = document.createElement("h2");
  header.textContent = "PROFIL";
  header.style.textDecoration = "underline";
  header.style.fontSize = "2em";
  header.style.paddingTop = "20%";
  profileModal.appendChild(header);

  // Login-Prüfung
  if (!isLoggedIn) {
    const loginButton = document.createElement("button");
    loginButton.textContent = "LOGIN";
    loginButton.classList.add("profile-btn");

    loginButton.addEventListener("click", (event) => {
      login.classList.remove("hidden");
      setTimeout(() => login.classList.add("show"), 10);

      profileModal.classList.remove("show");
      setTimeout(() => profileModal.classList.add("hidden"), 300);
    });

    const orText = document.createElement("p");
    orText.textContent = "OR";

    const registerButton = document.createElement("button");
    registerButton.textContent = "REGISTER";
    registerButton.classList.add("profile-btn");

    registerButton.addEventListener("click", (event) => {
      login.classList.remove("hidden");
      setTimeout(() => login.classList.add("show"), 10);

      profileModal.classList.remove("show");
      setTimeout(() => profileModal.classList.add("hidden"), 300);
    });

    const buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.flexDirection = "column";
    buttonContainer.style.alignItems = "center";
    buttonContainer.style.marginTop = "50px";

    buttonContainer.appendChild(loginButton);
    buttonContainer.appendChild(orText);
    buttonContainer.appendChild(registerButton);

    profileModal.appendChild(buttonContainer);
  }
  else{
    alert("Du bist bereits eingeloggt!");
  }
});

// Klick auf das Modal selbst verhindert das Schließen
profileModal.addEventListener("click", (event) => {
  event.stopPropagation();
});

// Schließen des Modals bei Klick außerhalb
document.addEventListener("click", (event) => {
  if (!profileModal.contains(event.target) && event.target !== profileButton) {
    profileModal.classList.remove("show");
    setTimeout(() => profileModal.classList.add("hidden"), 300);
  }
});