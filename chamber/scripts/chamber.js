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
                welcomeMessage.textContent = `Your last visit was ${daysDiff} day.`;
            }
        } else {
            welcomeMessage.textContent = "Welcome to our website! Please don't hesitate to contact us if you have any questions.";
        }

        localStorage.setItem("lastVisit", now);
    });

    // Update year and last modification
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = "Last Updated: " + document.lastModified;
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("timestamp").value = new Date().toISOString();


//directory
document.addEventListener("DOMContentLoaded", () => {
    const businessList = document.querySelector("#business-list");
    const gridButton = document.querySelector("#grid");
    const listButton = document.querySelector("#list");

    // Load data from members.json
    fetch("data/members.json")
        .then(response => {
            if (!response.ok) throw new Error("Fichier JSON introuvable");
            return response.json();
        })
        .then(data => displayMembers(data.members))
        .catch(error => console.error("Erreur lors du chargement des entreprises :", error));

    function displayMembers(members) {
        businessList.innerHTML = ""; 

        members.forEach(member => {
            let card = document.createElement("section");
            card.classList.add("business-card");

            let img = document.createElement("img");
            img.src = `images/${member.image}`;
            img.alt = `Logo de ${member.name}`;
            img.loading = "lazy";

            let name = document.createElement("h3");
            name.textContent = member.name;

            let address = document.createElement("p");
            address.textContent = `📍 ${member.address}`;

            let phone = document.createElement("p");
            phone.textContent = `📞 ${member.phone}`;

            let website = document.createElement("a");
            website.href = member.website;
            website.textContent = "🔗 Visit Website";
            website.target = "_blank";

            let description = document.createElement("p");
            description.textContent = member.description;

            let membership = document.createElement("p");
            membership.textContent = `🏅 Membership Level: ${member.membership_level}`;

            card.appendChild(img);
            card.appendChild(name);
            card.appendChild(address);
            card.appendChild(phone);
            card.appendChild(website);
            card.appendChild(description);
            card.appendChild(membership);

            businessList.appendChild(card);
        });
    }

    // Toggle between Grid and List views
    gridButton.addEventListener("click", () => {
        businessList.classList.remove("list");
        businessList.classList.add("grid");
    });

    listButton.addEventListener("click", () => {
        businessList.classList.remove("grid");
        businessList.classList.add("list");
    });
});



