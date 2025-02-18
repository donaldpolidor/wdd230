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


     const apiKey = "4aa519a92bdd92d902c7362c3db67b96";
const city = "Port-au-Prince";
const country = "HT";
const units = "metric";
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=${units}&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=${units}&appid=${apiKey}`;

async function getWeather() {
    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();
        
        document.getElementById("current-temp").textContent = `${Math.round(data.main.temp)}°C`;
        document.getElementById("weather-desc").textContent = data.weather[0].description;

        const icon = document.getElementById("weather-icon");
        icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        icon.alt = data.weather[0].description;

    } catch (error) {
        console.error("Erreur lors du chargement des données météo :", error);
    }
}

async function getForecast() {
    try {
        const response = await fetch(forecastUrl);
        const data = await response.json();
        
        const forecastContainer = document.getElementById("forecast");
        forecastContainer.innerHTML = ""; 

        let dailyForecasts = {};
        
        // OpenWeatherMap provides forecasts every 3 hours, filtered to retrieve 1 per day
        data.list.forEach(forecast => {
            let date = forecast.dt_txt.split(" ")[0];
            if (!dailyForecasts[date]) {
                dailyForecasts[date] = forecast;
            }
        });

        // 3-day limit
        let count = 0;
        for (let date in dailyForecasts) {
            if (count >= 3) break;
            let forecast = dailyForecasts[date];

            let forecastElement = document.createElement("div");
            forecastElement.classList.add("forecast-day");
            forecastElement.innerHTML = `
                <p><strong>${new Date(date).toLocaleDateString()}</strong></p>
                <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="${forecast.weather[0].description}">
                <p>${Math.round(forecast.main.temp)}°C</p>
                <p>${forecast.weather[0].description}</p>
            `;

            forecastContainer.appendChild(forecastElement);
            count++;
        }

    } catch (error) {
        console.error("Erreur lors du chargement des prévisions :", error);
    }
}

// Execute functions after loading the DOM
document.addEventListener("DOMContentLoaded", () => {
    getWeather();
    getForecast();
});

/*spotlight*/
document.addEventListener("DOMContentLoaded", () => {
    fetch("data/members.json")
        .then(response => response.json())
        .then(data => {
            const members = data.members;
            const eligibleMembers = members.filter(member => 
                member.membership_level === "Gold" || member.membership_level === "Silver"
            );

            displaySpotlight(eligibleMembers);
        })
        .catch(error => console.error("Error fetching member data:", error));
});

function displaySpotlight(members) {
    const spotlightContainer = document.getElementById("spotlight-container");
    spotlightContainer.innerHTML = "";

    // Mix the eligible members and select 2 or 3.
    const shuffledMembers = members.sort(() => 0.5 - Math.random());
    const selectedMembers = shuffledMembers.slice(0, Math.floor(Math.random() * 2) + 2); // 2 or 3 members

    selectedMembers.forEach(member => {
        const spotlightDiv = document.createElement("div");
        spotlightDiv.classList.add("spotlight");

        spotlightDiv.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" width="100">
            <h3>${member.name}</h3>
            <p>${member.description}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;

        spotlightContainer.appendChild(spotlightDiv);
    });
}


// Function to check the day and display the banner accordingly
window.onload = function () {
    const banner = document.getElementById('welcome-banner');
    const closeButton = document.getElementById('close-banner');
    const currentDay = new Date().getDay(); // Get current day (0 is Sunday, 6 is Saturday)

    // Show banner only on Monday (1), Tuesday (2), or Wednesday (3)
    if (currentDay >= 1 && currentDay <= 3) {
        banner.style.display = 'block';
    }

    // Close the banner when the user clicks the close button
    closeButton.onclick = function () {
        banner.style.display = 'none';
    };
};





