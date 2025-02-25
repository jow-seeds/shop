let loginModal = document.getElementById("loginOrRegister");
let loginMail = document.getElementById("loginEmail");
let loginPass = document.getElementById("loginPassword");
let loginButton = document.getElementById("loginBtn");
let registerMail = document.getElementById("registerEmail");
let registerPass = document.getElementById("registerPassword");
let confirmPass = document.getElementById("confirmPassword");
let registerButton = document.getElementById("registerBtn");

// Schließen des Modals bei Klick außerhalb
document.addEventListener("click", (event) => {
    if (!loginModal.contains(event.target)) {
        loginModal.classList.remove("show");
        setTimeout(() => loginModal.classList.add("hidden"), 300);
    }
});

document.addEventListener("click", (event) => {
    if (loginButton.contains(event.target)) {
        event.preventDefault();
        loginUser();
    }
    else if (registerButton.contains(event.target)) {
        event.preventDefault();
        registerUser();
    }
});

async function loginUser()
{
    let msg = `jow-website:login:${loginMail}:${loginPass}`;
    
    console.info("Mail: " + loginMail.value + " | Pass: " + loginPass.value);
    let validate = checkInputs("login");

    if (validate)
    {
        try {
            let response = await fetch(requestURL, {
                method: "POST",
                body: msg // Direkt die Rohdaten senden
            });
            
            console.log("Response: " + response);

            if (response.ok) {
                console.log("Login erfolgreich");
                alert("Login erfolgreich");
                localStorage.setItem("isLoggedIn", "true");
            } else {
                console.error("Login fehlgeschlagen");
                alert("Login fehlgeschlagen");
                localStorage.setItem("isLoggedIn", "false");
            }
        } catch (error) {
            console.error("Fehler beim Login:" + error);
            alert("Es ist ein Fehler aufgetreten:" + error);
            localStorage.setItem("isLoggedIn", "false");
        }
    }
}


let requestURL = "https://caf0-2a00-1f-bc80-8301-c51c-4e04-d5a9-a4b4.ngrok-free.app";

async function registerUser()
{
    let validate = await checkInputs("register");
    let msg = `jow-website:register:${registerMail.value}:${registerPass.value}`;
    console.info("Mail: " + registerMail.value + " | Pass: " + registerPass.value);

    if (validate)
    {
        try {
            let response = await fetch(requestURL, {
                method: "POST",
                body: msg // Direkt die Rohdaten senden
            });

            console.log("Response: " + response);

            if (response.ok) {
                console.log("Registrierung erfolgreich");
                alert("Registrierung erfolgreich");
                localStorage.setItem("isLoggedIn", "true");
            } else {
                console.error("Registrierung fehlgeschlagen");
                alert("Registrierung fehlgeschlagen");
                localStorage.setItem("isLoggedIn", "false");
            }
        } catch (error) {
            console.error("Fehler beim Registrieren:" + error);
            alert("Es ist ein Fehler aufgetreten: " + error);
            localStorage.setItem("isLoggedIn", "false");
        }
    }
}

async function checkInputs(action) {
    if (action == "login") {
        // Holen der Werte hier
        let loginMailValue = loginMail.value;
        let loginPassValue = loginPass.value;

        if (loginMailValue && loginPassValue) {
            return true;
        } else {
            alert("Fülle bitte erst die LogIn-Daten aus!");
            return false;
        }
    } 
    else if (action == "register") {
        // Holen der Werte hier
        let registerMailValue = registerMail.value;
        let registerPassValue = registerPass.value;
        let confirmPassValue = confirmPass.value;

        if (registerMailValue && registerPassValue && confirmPassValue) {
            if (registerPassValue === confirmPassValue) {
                return true;
            } else {
                alert("Die Passwörter stimmen nicht überein!");
                return false;
            }
        } else {
            alert("Gebe zuerst alle erforderlichen Daten an!");
            return false;
        }
    }
}