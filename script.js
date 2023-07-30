// Write your JavaScript code here!


window.addEventListener("load", function() {

   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch() - a promise
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
   }).then(function () {
       let pickedPlanet = pickPlanet(listedPlanets);

       let displayText = {
        name: "Name: ",
        diameter: "Diameter: ",
        star: "Star: ",
        distance: "Distance from Earth: ",
        moons: "Number of Moons: "
    }
    let list = document.getElementById("faultyItems");
    console.log(list);
    list.style.visibility = "visible";

    for (const item in displayText) {
        if (item === 'image') {
            continue
        } else {
            displayText[`${item}`] = displayText[item] + String(pickedPlanet[item]);
        }
    }
       addDestinationInfo(
            document,
            displayText.name,
            displayText.diameter,
            displayText.star, 
            displayText.distance,
            displayText.moons, 
            pickedPlanet.image
       );
   })

    let button = document.getElementById("formSubmit");
    button.addEventListener("click", function(event){
        event.preventDefault();
        let inputs = document.querySelectorAll("input[type=text]");
        let faultyItems = document.getElementById("faultyItems");
        inputs.forEach(input => {
            inputs[`${input.name}`] = input.value;
        });
        let validResults = formSubmission(
            document,
            faultyItems,
            inputs['pilotName'],
            inputs['copilotName'],
            inputs['fuelLevel'],
            inputs['cargoMass']
        );

        if (validResults.valid != true) {
            validResults.alerts.forEach(message => alert(message));
        }
    })

});