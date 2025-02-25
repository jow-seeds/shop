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


const supabase = window.supabase.createClient(
    'https://libzowrmexhzjzksxcqb.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpYnpvd3JtZXhoemp6a3N4Y3FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0OTQ1MzcsImV4cCI6MjA1NjA3MDUzN30.h9YRK6SE7erqH98w9u6oLn7qyWNBVxZr3cM-vRi21oc'
);

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
        alert("Registrierung erfolgreich! Überprüfe deine E-Mails für die Bestätigung.");
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