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
                planetsArray.push(morePlanets.results[i]);
                const option = document.createElement('option');
                option.value = i + 10;
                option.name = morePlanets.results.name;
                option.innerText = morePlanets.results[i].name;
                swPlanets.append(option);
            }
            console.log(planetsArray)
        })
        .catch(console.error);
    })
.catch(console.error);

// Selects the planet image display
const imgDisplay = document.getElementById('planet-img');
// Creates a variable for the selected planet
let currentPlanet;
// What occurs when a planet is selected from the dropdown
swPlanets.addEventListener('change', (event) => {
    imgDisplay.innerHTML = '';
    getImg(planetsArray[event.target.value].name)
    // for (let i = 0; i < planetsArray.length; i++) {
    //     if (event.target.value == i) {
    //         currentPlanet = planetsArray[i];
    //         getImg(currentPlanet.name);
    //     }
    // }
    console.log(planetsArray)
    
})

// Displays the appropriate image according to the selected planet
function getImg(planetName) {
    for (const planet of planetsArray) {
        if (planet.name == planetName) {
            const imgDiv = document.getElementById('planet-img');
            const planetImg = document.createElement('img');
            planetImg.src = `./images/${planetName}.webp`;
            planetImg.alt = `Image of ${planetName}`;
            imgDiv.append(planetImg);
        }
    }
}

// Fetches information about the selected planet
// function getInfo(planet) {

// }

