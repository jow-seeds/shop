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
        loginUser();
    }
    else if (registerButton.contains(event.target)) {
        registerUser();
    }
});


let requestURL = "https://c0cf-2a00-1f-bc80-8301-c51c-4e04-d5a9-a4b4.ngrok-free.app";

async function loginUser()
{
    let msg = `jow-website:login:${loginMail}:${loginPass}`;

    let formData = new URLSearchParams();
    formData.append("message", msg);

    let validate = checkInputs("login");

    if (validate)
    {
        try {
            let response = await fetch(requestURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: formData.toString()
            });
    
            if (response.ok) {
                console.log("Login erfolgreich:");
            } else {
                console.error("Login fehlgeschlagen:");
            }
        } catch (error) {
            console.error("Fehler beim Login:", error);
        }
    }
}

async function registerUser()
{
    let validate = checkInputs("register");

    let msg = `jow-website:register:${loginMail}:${loginPass}`;

    let formData = new URLSearchParams();
    formData.append("message", msg);

    if (validate)
    {
        try {
            let response = await fetch(requestURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: formData.toString()
            });
    
            if (response.ok) {
                console.log("Login erfolgreich:");
            } else {
                console.error("Login fehlgeschlagen:");
            }
        } catch (error) {
            console.error("Fehler beim Login:", error);
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
        if (registerMail && registerPass && confirmPass) 
        {
            if (registerPass === confirmPass) 
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