const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=4aa519a92bdd92d902c7362c3db67b96';

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    let desc = data.weather[0].description;

    weatherIcon.setAttribute('src', iconUrl);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;
}

apiFetch();

const baseURL = "https://github.com/donaldpolidor.github.io/wdd230/";
const linksURL = baseURL + "data/links.json";

async function getLinks() {
    const response = await fetch(linksURL);
    const data = await response.json();
    displayLinks(data.weeks);
}

function displayLinks(weeks) {
    const activityList = document.querySelector(".card ul");
    activityList.innerHTML = "";

    weeks.forEach(week => {
        let listItem = document.createElement("li");
        listItem.textContent = `${week.week}: `;

        week.links.forEach(link => {
            let a = document.createElement("a");
            a.href = baseURL + link.url;
            a.textContent = link.title;
            a.style.marginRight = "10px";
            listItem.appendChild(a);
        });

        activityList.appendChild(listItem);
    });
}

getLinks();
