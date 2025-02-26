import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Supabase-Client initialisieren
const supabaseUrl = 'https://jfnkrqfijabzkirjbvqx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmbmtycWZpamFiemtpcmpidnF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1Nzc3MjEsImV4cCI6MjA1NjE1MzcyMX0.Gp9RRd8YrRcmOMaSBOVQl73YH-k4lYAhIMtWdUxRWKM'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// HTML-Elemente abrufen
const resultTitle = document.getElementById('result')
const resultInfo = document.getElementById('result-info')
const resultAnweisung = document.getElementById('result-anweisung')
const homePageButton = document.getElementById('homePageButton')

// ✅ Token & Typ aus der URL extrahieren
const urlParams = new URLSearchParams(window.location.search)
const token = urlParams.get('token')
const type = urlParams.get('type') // "signup" oder "recovery"
const mail = urlParams.get('mail')

async function checkURL() {
    // 🌍 Falls kein Token gefunden wird, Fehlermeldung anzeigen
    if (!token || !type || !mail) {
        console.error("Ungültiger Link!");
        await setResult('Fehler: Ungültiger Link!', 'Bitte überprüfe deine E-Mail oder fordere einen neuen Link an.', 'Kehr zur Startseite zurück und versuche es erneut.');
    } else {
        console.info("Token, Type und Mail gefunden.");
        await verifyEmail(token, type, mail);
    }
}

// ✅ Funktion zur Verifizierung
async function verifyEmail(token, type, mail) {
    const { error } = await supabase.auth.verifyOtp({
        token: token,
        email: mail,
        type: type
    })

    if (error) {
        await setResult('Verifizierung fehlgeschlagen!', error.message, 'Bitte versuche es später erneut.')
    } else {
        await setResult('Bestätigung erfolgreich!', 'Du kannst dich nun einloggen.', 'Nutze den Button, um zur HomePage zurückzukehren.')
        homePageButton.classList.remove('hidden');
    }
}

// ✅ Funktion zum Aktualisieren der Anzeige
async function setResult(title, info, anweisung) {
    resultTitle.innerText = title
    resultInfo.innerText = info
    resultAnweisung.innerText = anweisung
}

window.addEventListener('load', async function () {
    await checkURL();  // Rufe checkURL auf, nachdem die Seite vollständig geladen ist
});