// API URL
const API_URL = 'https://swapi.dev/api/planets/'

// Selects planets dropdown box
const swPlanets = document.getElementById('planets-dropdown');

// Array to be filled with planets
let planetsArray = [];

// Gets planets from API, creates an option in the dropdown for each planet name and fills in the array 
fetch(API_URL)
    .then(result => result.json())
    .then((planets) => {
        for (let i = 0; i < planets.results.length; i++) {
            planetsArray.push(planets.results[i]);
            const option = document.createElement('option');
            option.value = i;
            option.name = planets.results.name;
            option.innerText = planets.results[i].name;
            swPlanets.append(option);
        }
        fetch(planets.next).then(res => res.json()).then((morePlanets) => {
            for (let i = 0; i < morePlanets.results.length; i++) {
                planetsArray.push(planets.results[i]);
                const option = document.createElement('option');
                option.value = i + 10;
                option.name = morePlanets.results.name;
                option.innerText = morePlanets.results[i].name;
                swPlanets.append(option);
            }
        })
        .catch(console.error);
    })
.catch(console.error);

// Displays the appropriate image according to the selected planet
function getImg(index) {
    const imgDiv = document.getElementById('planet-img');
    const planetImg = document.createElement('img');
    planetImg.src = 
    icon.setAttribute('src', './assets/icons8-summer.gif');
    icon.setAttribute('alt', 'sun');
}

// Fetches information about the selected planet
// function getInfo(planet) {

// }

