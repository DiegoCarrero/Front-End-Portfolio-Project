// API URL
const API_URL = 'https://swapi.dev/api/planets/'

// Selects planets dropdown box
const swPlanets = document.getElementById('planets-dropdown');

// Populates the dropdown with planet names
fetch(API_URL)
    .then(result => result.json())
    .then((planets) => {
        console.log(planets);
        // Creates an option in the dropdown for each planet name
        for (let i = 0; i < planets.results.length; i++) {
            const option = document.createElement('option');
            option.value = i + 1;
            option.name = planets.results.name;
            option.innerText = planets.results[i].name;
            swPlanets.append(option);
        }
        fetch(planets.next).then(res => res.json()).then((morePlanets) => {
            for (let i = 0; i < morePlanets.results.length; i++) {
                const option = document.createElement('option');
                option.value = i + 11;
                option.name = morePlanets.results.name;
                option.innerText = morePlanets.results[i].name;
                swPlanets.append(option);
            }
        })
        .catch(console.error);
    })
.catch(console.error);


// Fetches information about the selected planet
// function getInfo(planetName) {

// }