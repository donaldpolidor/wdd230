const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  displayProphets(data.prophets);
}

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    // Creating elements
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let birthdate = document.createElement('p');
    let birthplace = document.createElement('p');
    let death = document.createElement('p');
    let portrait = document.createElement('img');

    // Content filling
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;
    birthdate.textContent = `birthdate : ${prophet.birthdate}`;
    birthplace.textContent = `birthplace : ${prophet.birthplace}`;
    death.textContent = prophet.death ? `death : ${prophet.death}` : 'death : still alive';

    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    // Adding elements to the map
    card.appendChild(fullName);
    card.appendChild(birthdate);
    card.appendChild(birthplace);
    card.appendChild(death);
    card.appendChild(portrait);

    // Add card to main container
    cards.appendChild(card);
  });
};

getProphetData();
