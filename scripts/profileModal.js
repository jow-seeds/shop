// Elemente abrufen
const profileButton = document.getElementById("profileButton");
const profileModal = document.getElementById("profileModal");
let login = document.getElementById("loginOrRegister");

// Öffnen des Modals
profileButton.addEventListener("click", (event) => {
  event.stopPropagation(); // Verhindert das Schließen direkt nach dem Öffnen
  profileModal.innerHTML = ""; // Reset
  showModal();
});

async function showModal() {
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

  let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Login-Prüfung
  if (!isLoggedIn) {
    const loginButton = document.createElement("button");
    loginButton.textContent = "LOGIN";
    loginButton.classList.add("profile-btn");

    loginButton.addEventListener("click", () => {
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
    const profilButton = document.createElement("button");
    profilButton.textContent = "KONTO";
    profilButton.classList.add("profile-btn");

    const historyButton = document.createElement("button");
    historyButton.textContent = "HISTORY";
    historyButton.classList.add("profile-btn");

    const favButton = document.createElement("button");
    favButton.textContent = "FAVORITES";
    favButton.classList.add("profile-btn");

    const supportButton = document.createElement("button");
    supportButton.textContent = "SUPPORT";
    supportButton.classList.add("profile-btn");

    const careerButton = document.createElement("button");
    careerButton.textContent = "CAREER";
    careerButton.classList.add("profile-btn");

    const logoutButton = document.createElement("button");
    logoutButton.textContent = "LOG OUT";
    logoutButton.style.marginTop = "80px";
    logoutButton.classList.add("profile-btn");

    logoutButton.addEventListener("click", async () =>
    {
      try
      {
        let { error } = await window.supabase.auth.signOut()

        if (error)
        {
          alert("LogOut vorgang fehlgeschlagen!\nBitte wende dich an einen Mitarbeiter.\n" + error);
        }
        else 
        {
          localStorage.setItem("isLoggedIn", "false");

          profileModal.classList.remove("show");
          setTimeout(() => profileModal.classList.add("hidden"), 10);
        }
      }
      catch (error)
      {
        alert("LogOut vorgang fehlgeschlagen!\nBitte wende dich an einen Mitarbeiter.\n" + error);
      }
    })

    const buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.flexDirection = "column";
    buttonContainer.style.alignItems = "center";
    buttonContainer.style.marginTop = "70px";

    const buttons = [
      profilButton,
      historyButton,
      favButton,
      supportButton,
      careerButton,
      logoutButton
    ];

    profileModal.appendChild(buttonContainer);

    buttons.forEach(button => {
      buttonContainer.appendChild(button);
    
      button.addEventListener("click", function() {
        buttonEvents(button.textContent.trim().toLowerCase());
      });
    });

    profileModal.appendChild(buttonContainer);
  }
}

function buttonEvents(target) {
  window.location.href = `/shop/profil/${target}/`;
}

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