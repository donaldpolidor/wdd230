document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector("nav ul");
    const heroImage = document.querySelector("main img");

    document.addEventListener("DOMContentLoaded", () => {
        const hamburger = document.querySelector(".hamburger");
        const menu = document.querySelector("nav ul");
    
        hamburger.addEventListener("click", () => {
            menu.classList.toggle("show");
        });
    
        // Dynamically update the year and last modified date
        document.getElementById("year").textContent = new Date().getFullYear();
        document.getElementById("lastModified").textContent =
            "Last Updated: " + document.lastModified;
    });
   
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


/* Specific CSS for Discovery layout */
    // Display welcome message based on last visit
    document.addEventListener("DOMContentLoaded", () => {
        const welcomeMessage = document.getElementById("welcome-message");
        const lastVisit = localStorage.getItem("lastVisit");
        const now = new Date();

        if (lastVisit) {
            const lastVisitDate = new Date(lastVisit);
            const daysDiff = Math.floor((now - lastVisitDate) / (1000 * 60 * 60 * 24));

            if (daysDiff < 1) {
                welcomeMessage.textContent = "Back so soon! Awesome!";
            } else if (daysDiff === 1) {
                welcomeMessage.textContent = "Your last visit was 1 day ago.";
            } else {
                welcomeMessage.textContent = `Your last visit was ${daysDiff} days.`;
            }
        } else {
            welcomeMessage.textContent = "Welcome to our website! Please don't hesitate to contact us if you have any questions.";
        }

        localStorage.setItem("lastVisit", now);
    });

    // Update year and last modification
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = "Last Updated: " + document.lastModified;