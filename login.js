let loginModal = document.getElementById("loginOrRegister");
let loginMail = document.getElementById("loginEmail").value;
let loginPass = document.getElementById("loginPassword").value;
let loginButton = document.getElementById("loginBtn");
let registerMail = document.getElementById("registerEmail").value;
let registerPass = document.getElementById("registerPassword").value;
let confirmPass = document.getElementById("confirmPassword").value;
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
        loginUser();
    }
    else if (registerButton.contains(event.target)) {
        registerUser();
    }
});



async function loginUser()
{
    let msg = `jow-website:login:${loginMail}:${loginPass}`;

    let validate = checkInputs("login");

    if (validate)
    {
        try {
            let response = await fetch(requestURL, {
                method: "POST",
                body: msg // Direkt die Rohdaten senden
            });
    
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
            console.error("Fehler beim Login:", error);
            alert("Es ist ein Fehler aufgetreten:", error);
            localStorage.setItem("isLoggedIn", "false");
        }
    }
}


let requestURL = "https://c0cf-2a00-1f-bc80-8301-c51c-4e04-d5a9-a4b4.ngrok-free.app";

async function registerUser()
{
    let validate = await checkInputs("register");
    let msg = `jow-website:register:${registerMail}:${registerPass}`;

    if (validate)
    {
        try {
            let response = await fetch(requestURL, {
                method: "POST",
                body: msg // Direkt die Rohdaten senden
            });

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
            console.error("Fehler beim Registrieren:", error);
            alert("Es ist ein Fehler aufgetreten: " + error);
            localStorage.setItem("isLoggedIn", "false");
        }
    }
}

async function checkInputs(action) {
    if (action == "login") 
    {
        // Überprüfe Login-Daten
        if (loginMail && loginPass) 
        {
            return true;
        } 
        else 
        {
            alert("Fülle bitte erst die LogIn-Daten aus!");
            return false;
        }
    } 
    else if (action == "register") 
    {
        // Überprüfe Register-Daten
        if (registerMail.value && registerPass && confirmPass) 
        {
            if (registerPass == confirmPass) 
            {
                return true;
            } 
            else 
            {
                alert("Die Passwörter stimmen nicht überein!");
                return false;
            }
        }
        else 
        {
            alert("Gebe zuerst alle erforderlichen Daten an!");
            return false;
        }
    }
}