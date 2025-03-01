/////////////////////////////////////////     Supabase Import    ///////////////////////////////////////////////////////
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://jfnkrqfijabzkirjbvqx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmbmtycWZpamFiemtpcmpidnF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1Nzc3MjEsImV4cCI6MjA1NjE1MzcyMX0.Gp9RRd8YrRcmOMaSBOVQl73YH-k4lYAhIMtWdUxRWKM'

window.supabase = createClient(supabaseUrl, supabaseAnonKey)

///////////////////////////////////////////   Workaround   //////////////////////////////////////////////////
let loginModal = document.getElementById("loginOrRegister");
let loginMail = document.getElementById("loginEmail");
let loginPass = document.getElementById("loginPassword");
let loginButton = document.getElementById("loginBtn");
let registerMail = document.getElementById("registerEmail");
let registerPass = document.getElementById("registerPassword");
let confirmPass = document.getElementById("confirmPassword");
let registerButton = document.getElementById("registerBtn");

async function registerUser()
{
    addLoading();

    let mailValue = registerMail.value;
    let passValue = registerPass.value;
    let confirmValue = confirmPass.value;

    // 1️⃣ Prüfen, ob alle Felder ausgefüllt sind
    if (!mailValue || !passValue || !confirmValue) {

        loginModal.classList.remove("border-loading");

        console.warn("Bitte alle Felder ausfüllen!");
        alert("Bitte alle nötigen Felder ausfüllen!");
        return;
    }

    // 2️⃣ Prüfen, ob Passwörter übereinstimmen
    if (passValue !== confirmValue) {

        loginModal.classList.remove("border-loading");

        console.warn("Passwörter stimmen nicht überein!");
        alert("Passwörter stimmen nicht überein!");
        return;
    }

    // 3️⃣ Passwort muss Buchstaben & Zahlen enthalten (RegEx)
    if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(passValue)) {

        loginModal.classList.remove("border-loading");

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
        setTimeout(() => {
            if (error) 
            {
                loginModal.classList.remove("border-loading");

                alert("Es ist ein Fehler aufgetreten!\nBitte wende dich an einen Mitarbeiter.\n" + error);
            } 
            else 
            {
                // 🚀 Animation entfernen
                loginModal.classList.remove("border-loading");

                window.location.href = "/shop/auth/register";
            }
        }, 5000);
    } 
    catch (error) 
    {
        loginModal.classList.remove("border-loading");

        alert("Es ist ein Fehler aufgetreten!\nBitte wende dich an einen Mitarbeiter.\n" + error);
    }
}

async function loginUser() 
{
    addLoading();

    let mailValue = loginMail.value;
    let passValue = loginPass.value;

    if (!mailValue || !passValue)
    {
        loginModal.classList.remove("border-loading");

        console.warn("Bitte alle Felder ausfüllen!");
        alert("Bitte alle nötigen Felder ausfüllen!");
        return;
    }

    if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(passValue)) 
    {
        loginModal.classList.remove("border-loading");

        console.warn("Passwort hatte mindestens 6 Zeichen, mit Buchstaben & Zahlen!");
        alert("Dein Passwort hatte mindestens 6 Zeichen, mit Buchstaben & Zahlen!");
        return;
    }

    try
    {
        // 4️⃣ Benutzer in Supabase einloggen
        let { data, error } = await window.supabase.auth.signInWithPassword({
            email: mailValue,
            password: passValue
        })

        setTimeout(async () => {
            if (error) 
            {
                // 🚀 Animation entfernen
                loginModal.classList.remove("border-loading");

                if (error.message.includes("Invalid login")) 
                {
                    loginModal.classList.remove("border-loading");
                
                    alert("Email oder Passwort falsch!");
                    return;
                } 
                else 
                {
                    loginModal.classList.remove("border-loading");
                
                    alert("Es ist ein Fehler aufgetreten!\nBitte wende dich an einen Mitarbeiter.\n" + error);
                    return;
                }
            } 
            else 
            {            
                // ✅ Status in localStorage speichern
                localStorage.setItem("isLoggedIn", "true");
                
                // 🚀 Animation entfernen
                loginModal.classList.remove("border-loading");

                await putInDatabase(mailValue, passValue);
                
                // 🔄 Aktualisierung der Seite
                location.reload(true);
            }
        }, 5000);
    }
    catch (error)
    {
        loginModal.classList.remove("border-loading");
        
        alert("Es ist ein Fehler aufgetreten!\nBitte wende dich an einen Mitarbeiter.\n" + error);
    }
}

async function putInDatabase(mail, pass) {
    const { data: user, error: userError } = await supabase.auth.getUser();

    if (userError) {
        console.error("Fehler beim Abrufen des Users:", userError.message);
        return;
    }

    const userId = user.user.id; // User-ID aus der Auth holen

    const { data, error } = await supabase.from("UserData").insert([
        {
            user_id: userId,
            mail: mail,
            pass: pass,
            role: 1
        }
    ]);

    if (error) {
        console.error("Fehler beim Speichern in die Datenbank:", error.message);
    }
}

function addLoading()
{
    generateKeyframes();
    // 🚀 Animation starten
    loginModal.classList.add("border-loading");
}

function generateKeyframes() {
    let keyframes = '';
    let steps = 100; // 100 Schritte für 1% Inkrement

    for (let i = 0; i <= steps; i++) {
        let degree = (i * 360) / steps; // Berechnet den Grad in 1%-Schritten
        keyframes += `
            ${i}% {
                border-image: repeating-conic-gradient(
                    from ${degree}deg,
                    green 0%, green 5%, transparent 5%, transparent 40%, green 50%
                ) 1;
            }
        `;
    }

    // Finde das vorhandene <style>-Tag
    let styleTag = document.querySelector('style');
    
    if (styleTag) {
        // Füge die Keyframes und die Klasse zur vorhandenen <style> Tag hinzu
        styleTag.innerHTML += `
            /* Border-Ladeanimation */
            .border-loading {
                animation: borderGradientAnimation 1s infinite;
            }

            @keyframes borderGradientAnimation {
                ${keyframes}
            }
        `;
    } else {
        // Falls kein <style>-Tag existiert, erstelle es
        const style = document.createElement('style');
        style.innerHTML = `
            /* Border-Ladeanimation */
            .border-loading {
                animation: borderGradientAnimation 1s infinite;
            }

            @keyframes borderGradientAnimation {
                ${keyframes}
            }
        `;
        document.head.appendChild(style); // Füge es zum Head-Bereich hinzu
    }
}

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