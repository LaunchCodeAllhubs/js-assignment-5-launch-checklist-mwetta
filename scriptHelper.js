// Write your helper functions here!
//DO NOT edit index.html or styles.css to modify styles
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    const missionTarget = document.getElementById('missionTarget');
    let missionTargetHeader = document.createElement('h2');
    missionTargetHeader.textContent = "Mission Destination";
    missionTarget.appendChild(missionTargetHeader);
    let orderedList = document.createElement('ol');
    missionTarget.appendChild(orderedList);

    let planetInfo = [name, diameter, star, distance, moons];

    planetInfo.forEach(info => {
        let listItem = document.createElement('li');
        listItem.textContent = info;
        orderedList.appendChild(listItem);
    });
    
    let image = document.createElement('img');
    image.setAttribute('src', imageUrl);
    missionTarget.appendChild(image);
}

function validateInput(testInput) {
    console.log(testInput);
    if (testInput === "") {
        return "Empty"
    } else if (typeof testInput === "string") {
        let parsed = parseInt(testInput);
        if (isNaN(parsed)) {
            console.log(testInput);
            return "Not a Number"
        } else {
            console.log(testInput);
            return "Is a Number"
        }
    } else {
        console.log(testInput);
        return "undefined"
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let submissionValid = true;
    const alertsToDisplay = [];

    const validResponses = {
        pilotName: "Not a Number",
        copilotName: "Not a Number",
        fuelLevel: "Is a Number",
        cargoMass: "Is a Number"
    };

    const alertText = {
        pilotName: "Pilot name should be a string made up of letters, numbers, and symbols.",
        copilotName: "Copilot name should be a string made up of letters, numbers, and symbols.",
        fuelLevel: "Fuel level should be a number.",
        cargoMass: "Cargo mass should be a number."
    }

    let inputs = {
        pilotName: pilot,
        copilotName: copilot,
        fuelLevel: fuelLevel,
        cargoMass: cargoLevel
    }
    for (const response in validResponses) {
        let inputType = validateInput(inputs[response]);

        if (inputType != validResponses[`${response}`]){
            console.log(inputType);
            console.log(validResponses[`${response}`]);
            submissionValid = false;
            alertsToDisplay.push(`${alertText[response]} You entered ${inputs[response]}`);
        }
    }

    if (submissionValid) {
        updateDom();
    } 

    function updateDom() {
        let goForLaunch = true;

        let pilotStatus = document.getElementById("pilotStatus");
        pilotStatus.textContent = `Pilot ${pilot} is ready for launch`;
        let copilotStatus = document.getElementById("copilotStatus"); 
        copilotStatus.textContent = `Co-pilot ${copilot} is ready for launch`;
        let fuelStatus = document.getElementById("fuelStatus");
        let cargoStatus = document.getElementById("cargoStatus");

        let launchStatusHeader = document.getElementById("launchStatus");

        if (Number(fuelLevel) < 10000) {
            fuelStatus.textContent = "Fuel level too low for launch";
            launchStatusHeader.style.color = "red";
            goForLaunch = false;
        } else {
            fuelStatus.textContent = "Fuel level high enough for launch";
        }

        if (Number(cargoLevel) > 10000) {
            cargoStatus.textContent = "Cargo mass too heavy for launch";
            launchStatusHeader.style.color = "#C7254E";
            goForLaunch = false;
        } else {
            cargoStatus.textContent= "Cargo mass low enough for launch";
        }

        if (goForLaunch) {
            launchStatusHeader.textContent = "Shuttle is Ready for Launch";
            launchStatusHeader.style.color = "#419F6A";
        } else {
            launchStatusHeader.textContent = "Shuttle Not Ready for Launch";
        }

        let faultyItems = document.getElementById("faultyItems");
        faultyItems.style.visibility = "visible";

    }

    return {'valid': submissionValid, 'alerts': alertsToDisplay }
}


async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
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
