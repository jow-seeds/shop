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


import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://libzowrmexhzjzksxcqb.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function registerUser() {
    const email = registerMail.value;
    const password = registerPass.value;
    const confirm = confirmPass.value;

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
        alert(error.message);
    } else {
        console.log("Registrierung erfolgreich:", user);
        localStorage.setItem("isLoggedIn", "true");
        alert("Registrierung erfolgreich! Überprüfe deine E-Mails für die Bestätigung.");
    }
}

async function loginUser() {
    const email = loginMail.value;
    const password = loginPass.value;

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        console.error("Login fehlgeschlagen:", error.message);
        alert(error.message);
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