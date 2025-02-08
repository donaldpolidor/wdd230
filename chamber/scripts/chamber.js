document.addEventListener("DOMContentLoaded", () => {
    // Menu Hamburger
    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector(".nav-menu");

    if (hamburger && menu) {
        hamburger.addEventListener("click", () => {
            menu.classList.toggle("show");
        });
    }

    // Update year and last modification
    const yearSpan = document.getElementById("year");
    const lastModifiedSpan = document.getElementById("lastModified");

    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = "Last Updated: " + document.lastModified;
    }

    // Welcome message management based on last visit
    const welcomeMessage = document.getElementById("welcome-message");
    if (welcomeMessage) {
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
                welcomeMessage.textContent = `Your last visit was ${daysDiff} days ago.`;
            }
        } else {
            welcomeMessage.textContent = "Welcome to our website! Please don't hesitate to contact us if you have any questions.";
        }

        localStorage.setItem("lastVisit", now);
    }

     // Company directory management
     const businessList = document.querySelector("#business-list");
     const gridButton = document.querySelector("#grid");
     const listButton = document.querySelector("#list");
 
     if (businessList && gridButton && listButton) {
         fetch("data/members.json")
             .then(response => {
                 if (!response.ok) throw new Error("Fichier JSON introuvable");
                 return response.json();
             })
             .then(data => displayMembers(data.members))
             .catch(error => console.error("Erreur lors du chargement des entreprises :", error));
 
         function displayMembers(members) {
             businessList.innerHTML = "";  // Clear the existing content
 
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
 
         // Toggle Grid/List
         gridButton.addEventListener("click", () => {
             businessList.classList.add("grid");
             businessList.classList.remove("list");
         });
 
         listButton.addEventListener("click", () => {
             businessList.classList.add("list");
             businessList.classList.remove("grid");
         });
     }
 });