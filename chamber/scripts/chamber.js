document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector("nav ul");
    const heroImage = document.querySelector("main img");

    hamburger.addEventListener("click", () => {
        menu.classList.toggle("show");

        if (menu.classList.contains("show")) {
            heroImage.style.marginTop = menu.offsetHeight + "px";
        } else {
            heroImage.style.marginTop = "1rem";
        }
    });

    // Dynamically update the year and last modified date
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = "Last Updated: " + document.lastModified;
});


/* CSS spécifique pour la mise en page Discovery */
    // Affichage du message de bienvenue basé sur la dernière visite
    document.addEventListener("DOMContentLoaded", () => {
        const welcomeMessage = document.getElementById("welcome-message");
        const lastVisit = localStorage.getItem("lastVisit");
        const now = new Date();

        if (lastVisit) {
            const lastVisitDate = new Date(lastVisit);
            const daysDiff = Math.floor((now - lastVisitDate) / (1000 * 60 * 60 * 24));

            if (daysDiff < 1) {
                welcomeMessage.textContent = "De retour si tôt ! ​​Génial !";
            } else if (daysDiff === 1) {
                welcomeMessage.textContent = "Votre dernière visite remonte à 1 jour.";
            } else {
                welcomeMessage.textContent = `Votre dernière visite remonte à ${daysDiff} jours.`;
            }
        } else {
            welcomeMessage.textContent = "Bienvenue ! N'hésitez pas à nous contacter si vous avez des questions.";
        }

        localStorage.setItem("lastVisit", now);
    });

    // Mise à jour de l'année et de la dernière modification
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = "Last Updated: " + document.lastModified;