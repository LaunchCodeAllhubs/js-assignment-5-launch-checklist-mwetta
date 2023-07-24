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
       // use pickPlanet 
       // pass that info to addDestinationInfo()
       //reloat page
   })
   
});