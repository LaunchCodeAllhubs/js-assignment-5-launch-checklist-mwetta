// Write your helper functions here!
//DO NOT edit index.html or styles.css to modify styles
require('isomorphic-fetch');

function addDestinationInfo(planetInfo) {
    const missionTarget = document.getElementById('missionTarget');
    let orderedList = document.createElement('ol');
    missionTarget.appendChild(orderedList);

    let displayText = {
        name: "Name: ",
        diameter: "Diameter: ",
        star: "Star: ",
        distance: "Distance from Earth: ",
        moons: "Number of Moons: "
    }

    for (const item in planetInfo) {
        console.log(item);
        if (item === 'image') {
            continue
        } else {
            let listItem = document.createElement('li');
            listItem.textContent = displayText[item] + String(planetInfo[item]);
            orderedList.appendChild(listItem);
        }
    }

    let image = document.createElement('img');
    image.setAttribute('src', planetInfo['image']);
    missionTarget.appendChild(image);

   // Here is the HTML formatting for our mission target div.
   /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
   */
}

function validateInput(testInput) {
    //TODO: Adding alerts to validate input
        // should take in a string as a param and return "empty", "not a number", "is a number" as appropriate
        // will complete form submission function
   
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
   // takes in values for DOM elements?? 
}


//TODO: Fetch planetary data
    // will use myFetch, pickPlanet, and addDestinationInfo()
    // addDestination will not return anything
    // pickPlanet takes in a list of planets, uses Math.random() to return one planet from the list with a randomly selected index
    // myFetch needs the URL and to return response.json()
async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json()
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    return planets[Math.floor(Math.random() * 6)]
}

//TODO: Updating shuttle requirments
// if something isn't ready for lunch, update div #faultyItems
// use template literalys, update li elements pilotStatus and copilotStatus to include names
// if fuel level <10,000 liters, 
    // faultyItems = visible, 
    // update fuel status "there is not enough fuel for the journey"
    // h2 #launchStatus should change to "Shuttle not ready for launch", 
    // h2 color:red;
// cargo mass > 10,000 kilograms, 
    // faultyItems = visible,
    // cargo status "too much mass for shuttle to take off"
    // h2 #launchStatus "Shuttle not ready for launch",
    // h2 color: #C7254E
// if ready,
    // h2 #launchStatus "Shuttle is ready for launch",
    // h2 color: #419F6A

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
