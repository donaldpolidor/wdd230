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

    // Checking JSON loading
    fetch("data/members.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur : Unable to load data");
            }
            return response.json();
        })
        .then(data => {
            console.log("Data loaded :", data);

            if (data.members.length === 0) {
                businessList.innerHTML = "<p>No companies found.</p>";
                return;
            }

            data.members.forEach(member => {
                const section = document.createElement("section");
                section.classList.add("business-card");
                section.innerHTML = `
                    <img src="images/${member.image}" alt="${member.name}" loading="lazy">
                    <h3>${member.name}</h3>
                    <p><strong>📍 Address :</strong> ${member.address}</p>
                    <p><strong>📞 Phone :</strong> ${member.phone}</p>
                    <a href="${member.website}" target="_blank">🌐 Visit our website</a>
                    <p>${member.description}</p>
                    <p class="membership ${member.membership_level.toLowerCase()}">${member.membership_level} Member</p>
                `;
                businessList.appendChild(section);
            });
        })
        .catch(error => {
            console.error("Loading error :", error);
            businessList.innerHTML = "<p>⚠️ Impossible to make companies pay.</p>";
        });

    // Grid and list mode management
    const gridButton = document.querySelector("#grid");
    const listButton = document.querySelector("#list");

    gridButton.addEventListener("click", () => {
        businessList.classList.add("grid");
        businessList.classList.remove("list");
    });

    listButton.addEventListener("click", () => {
        businessList.classList.add("list");
        businessList.classList.remove("grid");
    });
});



