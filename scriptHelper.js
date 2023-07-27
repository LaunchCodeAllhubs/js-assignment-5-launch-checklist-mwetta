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
        pilotName: "Pilot name should be a string made up of letters, numbers, symbols, and characters.",
        copilotName: "Copilot name should be a string made up of letters, numbers, symbols, and characters.",
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

    return {'valid': submissionValid, 'alerts': alertsToDisplay }

    //if pilot || copilot "not a number"
    // if fuelLevel || cargoMass "is a number"


    // let errorResponses = {
    //     pilot: "You entered an incorrect value for Pilot. It should be a name made up of letters and numbers.";

    // }
    
    //validateInput(pilot) and validateInput(copilot) should return not a number 
        // if not, window alert what's wrong with the value
    // validateInput(fuelLevel) should return  is a number
        // if not, window alert what's wrong with the value
    //
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
