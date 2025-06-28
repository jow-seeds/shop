const form = document.getElementById("kontaktFormular");
const responseMessage = document.getElementById("responseMessage");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    try {
        const res = await fetch("https://formspree.io/f/manjakaz", {
            method: "POST",
            headers: { 'Accept': 'application/json' },
            body: formData,
        });

        if (res.ok) {
            form.reset();
            responseMessage.classList.remove("d-none");
            setTimeout(() => {
                responseMessage.classList.add("d-none");
            }, 5000);
        } else {
            alert("Es gab ein Problem beim Senden. Bitte versuche es später erneut.");
        }
    } catch (error) {
        alert("Fehler beim Senden des Formulars.");
    }
});