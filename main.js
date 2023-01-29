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
        })
        .catch(console.error);
    })
.catch(console.error);

// Selects the planet image display
// const imgDisplay = document.getElementById('planet-img');

// What occurs when a planet is selected from the dropdown
swPlanets.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    getImgs(selectedValue);
    getInfo(selectedValue);
})

// Displays the appropriate image according to the selected planet
function getImgs(targetValue) {
    const planetName = planetsArray[targetValue].name;
    const imgDiv = document.getElementById('planet-img');
    const planetImg = document.createElement('img');
    // Clears image display and appends image of selected planet
    imgDiv.innerHTML = '';
    planetImg.src = `./images/${planetName}.webp`;
    planetImg.alt = `Image of ${planetName}`;
    planetImg.classList.add('img');
    imgDiv.append(planetImg);

    const surfaceDiv = document.getElementById('surface-img');
    surfaceDiv.innerHTML = '';
    const surfaceImage = document.createElement('img');
    surfaceImage.src = `./images/${planetName}Surface.webp`
    if (surfaceImage.width > 0) {
        surfaceImage.classList.add('surface-img');
        surfaceDiv.append(surfaceImage);
    }
}

// Displays information about the selected planet
function getInfo(targetValue) {
    const currentPlanet = planetsArray[targetValue];
    const planetName = document.getElementById('planet-name');
    const planetInfo = document.getElementById('planet-info');

    planetName.innerHTML = '';
    planetInfo.innerHTML = '';

    planetName.innerHTML = `<strong>${currentPlanet.name}</strong>`;

    const climate = document.createElement('li');
    climate.innerText = `Climate: ${currentPlanet.climate[0].toUpperCase() + currentPlanet.climate.substr(1)}`;
    planetInfo.append(climate);

    const terrain = document.createElement('li');
    terrain.innerText = `Terrain: ${currentPlanet.terrain[0].toUpperCase() + currentPlanet.terrain.substr(1)}`;
    planetInfo.append(terrain);

    const surfaceWater = document.createElement('li');
    if (currentPlanet.surface_water == 'unknown') {
        surfaceWater.innerText = `Percentage of water on the planet's surface: ${currentPlanet.surface_water}`;
    } else {
        surfaceWater.innerText = `Percentage of water on the planet's surface: ${currentPlanet.surface_water}%`;
    }
    planetInfo.append(surfaceWater);

    const gravity = document.createElement('li');
    gravity.innerHTML = `Gravity: ${currentPlanet.gravity} <em>g<em/>`;
    planetInfo.append(gravity);

    const population = document.createElement('li');
    population.innerText = `Population: ${currentPlanet.population}`;
    planetInfo.append(population);
}
