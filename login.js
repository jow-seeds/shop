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
    else {
        console.log(event.target);
    }
});

const clientID = "1f4f1c34-c7e7-418a-8c14-6fac2008b452";
const clientSecret = "sba_eab82b9ac6d46defa529c30c3e258c707724f0f9";
const supabase = window._supabase;

async function registerUser() {
    const email = registerMail.value;
    const password = registerPass.value;
    const confirm = confirmPass.value;

    if (!email || !password || !confirm) {
        alert("Bitte gebe Email und Passwort ein!");
        return;
    }

    if (password !== confirm) {
        alert("Passwörter stimmen nicht überein!");
        return;
    }

    // Benutzer bei Supabase registrieren
    const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password
    });

    if (error) {
        console.error("Registrierung fehlgeschlagen:", error.message);
        alert("Es ist ein Fehler aufgetreten.\nBitte wende dich an die Mitarbeiter von JoW Seeds!\n" + error.message);
    } else {
        console.log("Registrierung erfolgreich:", user);
        localStorage.setItem("isLoggedIn", "true");

        // Jetzt die UserData-Tabelle mit den Benutzerdaten füllen
        const { data, error: insertError } = await supabase
            .from('UserData')
            .insert([
                {
                    userID: user.id,
                    userMail: email,
                    userPass: password
                }
            ]);

        if (insertError) {
            console.error("Fehler beim Einfügen in die UserData-Tabelle:", insertError);
            alert("Es ist ein Fehler beim Speichern deiner Daten aufgetreten.");
        } else {
            console.log("Benutzerdaten erfolgreich gespeichert:", data);
            alert("Registrierung erfolgreich! Überprüfe deine E-Mails für die Bestätigung.");
        }
    }
}

async function loginUser() {
    const email = loginMail.value;
    const password = loginPass.value;

    if (!email || !password) {
        alert("Bitte gebe Email und Passwort ein!");
        return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        console.error("Login fehlgeschlagen:", error.message);
        alert("Es ist ein Fehler aufgetreten.\nBitte wende dich an die Mitarbeiter von JoW Seeds!\n" + error.message);
    } else {
        console.log("Login erfolgreich:", data);
        localStorage.setItem("isLoggedIn", "true");
        alert("Login erfolgreich!");
    }
}

async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        //console.log("Eingeloggter Benutzer:", user);
        return true;
    } else {
        //console.log("Kein Benutzer eingeloggt.");
        return false;
    }
}
// Funktion global verfügbar machen
window.checkUser = checkUser;

async function logoutUser() {
    await supabase.auth.signOut();
    localStorage.removeItem("isLoggedIn");
}

document.addEventListener("click", (event) => {
    if (loginButton.contains(event.target)) {
        loginUser();
    }
    else if (registerButton.contains(event.target)) {
        registerUser();
    }
});