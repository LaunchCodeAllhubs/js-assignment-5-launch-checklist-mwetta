// Write your helper functions here!
//DO NOT edit index.html or styles.css to modify styles
require('isomorphic-fetch');

function addDestinationInfo(planetInfo) {
    const missionTarget = document.getElementById('missionTarget');
    let orderedList = document.createElement('ol');
    orderedList.setAttribute('id', 'orderedList');
    missionTarget.appendChild(orderedList);

    let displayText = {
        name: "Name: ",
        diameter: "Diameter: ",
        star: "Star: ",
        distance: "Distance from Earth: ",
        moons: "Number of Moons: "
    }

    for (const item in planetInfo) {
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
}

function validateInput(testInput) {
    if (testInput === "") {
        return "empty"
    } else if (typeof testInput === "string") {
        let parsed = parseInt(testInput);
        if (isNaN(parsed)) {
            return "is not a number"
        } else {
            return "is a number"
        }
    } else {
        return "undefined"
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let submissionValid = true;
    const alertsToDisplay = [];

    const validResponses = {
        pilotName: "is not a number",
        copilotName: "is not a number",
        fuelLevel: "is a number",
        cargoMass: "is a number"
    };

    const alertText = {
        pilotName: "Pilot name should be a string made up of letters, numbers, and symbols.",
        copilotName: "Copilot name should be a string made up of letters, numbers, and symbols.",
        fuelLevel: "Fuel level should be a number.",
        cargoMass: "Cargo mass should be a number."
    }

    for (const response in validResponses) {
        let inputType = validateInput(list[response]);

        if (inputType != validResponses[`${response}`]){
            submissionValid = false;
            alertsToDisplay.push(`${alertText[response]} You entered ${list[response]}`);
        }
    }

    if (submissionValid) {
        updateDom();
    } 

    function updateDom() {
        let goForLaunch = true;

        let pilotStatus = document.getElementById("pilotStatus");
        pilotStatus.textContent = `Pilot ${pilot} Ready`;
        let copilotStatus = document.getElementById("copilotStatus"); 
        copilotStatus.textContent = `Co-pilot ${copilot} Ready`;
        let fuelStatus = document.getElementById("fuelStatus");
        let cargoStatus = document.getElementById("cargoStatus");

        let launchStatusHeader = document.getElementById("launchStatus");

        if (Number(fuelLevel) < 10000) {
            fuelStatus.textContent = "There is not enough fuel for the journey";
            launchStatusHeader.style.color = "red";
            goForLaunch = false;
        } 

        if (Number(cargoLevel) > 10000) {
            cargoStatus.textContent = "Too much mass for the shuttle to take off";
            launchStatusHeader.style.color = "#C7254E";
            goForLaunch = false;
        }

        if (goForLaunch) {
            launchStatusHeader.textContent = "Shuttle is ready for launch.";
            launchStatusHeader.style.color = "#419F6A";
        } else {
            launchStatusHeader.textContent = "Shuttle is not ready for launch.";
        }

        let faultyItems = document.getElementById("faultyItems");
        faultyItems.style.visibility = "visible";
    }

    return {'valid': submissionValid, 'alerts': alertsToDisplay }
}


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



module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
