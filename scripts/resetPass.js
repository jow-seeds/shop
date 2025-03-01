import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
const supabaseUrl = 'https://jfnkrqfijabzkirjbvqx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmbmtycWZpamFiemtpcmpidnF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1Nzc3MjEsImV4cCI6MjA1NjE1MzcyMX0.Gp9RRd8YrRcmOMaSBOVQl73YH-k4lYAhIMtWdUxRWKM'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

let info = document.getElementById("info");
let recovery = document.getElementById("recovery");
let confirmRecovery = document.getElementById("confirmRecovery");

// Funktion, um URL-Parameter zu lesen
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// E-Mail-Wert aus der URL auslesen
let mail = getQueryParam("email");

// Überprüfe, ob der Parameter "email" in der URL vorhanden ist
if (mail) {
    info.textContent = "Gebe dein neues Passwort ein:";
    recovery.type = "password";
    recovery.placeholder = "Passwort";
} else {
    info.textContent = "Gebe deine Email-Adresse ein:";
    recovery.type = "email";
    recovery.placeholder = "Email";
}

async function resetPassword() {
    if (!mail) {
        let { data, error } = await supabase.auth.resetPasswordForEmail(recovery.value);

        if (error) {
            alert("Etwas ist schief gelaufen!\nBitte wende dich an einen Mitarbeiter:\n" + error);
        } else {
            info.textContent = "Du hast eine Email für den Reset bekommen.";
            recovery.style.display = "none";
            confirmRecovery.style.display = "none";
        }
    } else {
        const token = getQueryParam("token");  // Der OTP-Code aus der URL

        if (token) {
            // OTP verifizieren und Benutzer authentifizieren
            const { data: session, error: otpError } = await supabase.auth.verifyOtp({
                email: mail,
                token: token,
                type: 'recovery'
            });

            if (otpError) {
                alert("Fehler bei der OTP-Verifizierung:\n" + otpError.message);
                return;
            }

            // Falls OTP erfolgreich war, Passwort ändern
            const { data, error } = await supabase.auth.updateUser({
                password: recovery.value
            });

            if (error) {
                alert("Passwort konnte nicht aktualisiert werden:\n" + error.message);
            } else {
                info.textContent = "Du hast dein Passwort erfolgreich geändert.";
                recovery.style.display = "none";
                confirmRecovery.textContent = "Zurück zur Homepage";
                confirmRecovery.addEventListener("click", () => {
                    window.location.href = "/shop/home/";
                });
            }
        } else {
            alert("Fehlender Token! Bitte nutze den Link aus der Email.");
        }
    }
}

confirmRecovery.addEventListener("click", () => resetPassword());