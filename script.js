// Write your JavaScript code here!


window.addEventListener("load", function() {

   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch() - a promise
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
   }).then(function () {
       let pickedPlanet = pickPlanet(listedPlanets);
       addDestinationInfo(pickedPlanet);
   })

    let button = document.getElementById("formSubmit");
    button.addEventListener("click", function(event){
        event.preventDefault();
        let inputs = document.querySelectorAll("input[type=text]");
        inputs.forEach(input => {
            inputs[`${input.name}`] = input.value;
        });

        let validResults = formSubmission(
            this.document,
            inputs,
            inputs['pilotName'],
            inputs['copilotName'],
            inputs['fuelLevel'],
            inputs['cargoMass']
        );

        if (!validResults.valid) {
            validResults.alerts.forEach(message => alert(message));
        }
    })

});