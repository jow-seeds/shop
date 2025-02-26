/////////////////////////////////////////     Supabase Import    ///////////////////////////////////////////////////////
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://jfnkrqfijabzkirjbvqx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmbmtycWZpamFiemtpcmpidnF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1Nzc3MjEsImV4cCI6MjA1NjE1MzcyMX0.Gp9RRd8YrRcmOMaSBOVQl73YH-k4lYAhIMtWdUxRWKM'

window.supabase = createClient(supabaseUrl, supabaseAnonKey)

console.log('Supabase Instance: ', window.supabase)

///////////////////////////////////////////   Workaround   //////////////////////////////////////////////////
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

async function registerUser()
{
    let mailValue = registerMail.value;
    let passValue = registerPass.value;
    let confirmValue = confirmPass.value;

    console.info("Registrierung begonnen...");

    // 1️⃣ Prüfen, ob alle Felder ausgefüllt sind
    if (!mailValue || !passValue || !confirmValue) {
        console.warn("Bitte alle Felder ausfüllen!");
        alert("Bitte alle nötigen Felder ausfüllen!");
        return;
    }

    // 2️⃣ Prüfen, ob Passwörter übereinstimmen
    if (passValue !== confirmValue) {
        console.warn("Passwörter stimmen nicht überein!");
        alert("Passwörter stimmen nicht überein!");
        return;
    }

    // 3️⃣ Passwort muss Buchstaben & Zahlen enthalten (RegEx)
    if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(passValue)) {
        console.warn("Passwort muss mindestens 6 Zeichen haben, mit Buchstaben & Zahlen!");
        alert("Passwort muss mindestens 6 Zeichen haben, mit Buchstaben & Zahlen!");
        return;
    }

    try {
        // 4️⃣ Benutzer in Supabase registrieren
        const { user, error } = await window.supabase.auth.signUp({
            email: mailValue,
            password: passValue
        });

        if (error) {
            console.error("Registrierung fehlgeschlagen:", error.message);
        } else {
            console.log("Registrierung erfolgreich! Bestätigungs-E-Mail gesendet.", user);
        }
    } catch (err) {
        console.error("Fehler bei der Registrierung:", err);
    }
}