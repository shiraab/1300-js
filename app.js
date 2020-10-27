var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=n2AD1dNIaXgxPMXL2R8Q-UCT0Nnvdr_EeNCsPfXLZwA";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
corsPromise().then(
  (request) =>
    (request.onload = request.onerror = function () {
      // TODO: ADD FUNCTION, ETC. FOR WHATEVER YOU WANT TO DO ONCE THE DATA IS RECEIVED
      const plantList = (JSON.parse(request.response)).data;
      plantList.map(plantToGallery)
      // for (const plant of plantList) {
      //   plantToGallery(plant)
      // }
    })
);

//// TODO: ADD WHATEVER FUN CONTENT YOU WANT ////

const plantToGallery = (plant) => {
  console.log(plant.year)
  let plantContainer = document.createElement("div")
  plantContainer.className = "plantrow"
  const innerStr = "<img class='plantimg' src="
    + plant.image_url + " alt=" + plant.common_name + "/>"
    + "<span class='plantDescription'>" + plant.scientific_name + "<br/>" + plant.common_name + "</span>";
  plantContainer.innerHTML = innerStr;
  document.getElementById("plantdiv").appendChild(plantContainer)
}

const filterPlants = () => {
  clearChildren(document.getElementById("plantdiv"));
  corsPromise().then(
    (request) => (
      request.onload = request.onerror = function () {
        const plantList = (JSON.parse(request.response)).data
        console.log(plantList.length)
        plantList.filter(plant => plant.year == 1753).map(plantToGallery)
        // console.log(plantList.length)
        // plantList.map(plantToGallery)
      }
    )
  )
}

const clearChildren = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}
