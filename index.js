var superHeroArray = [1];
var cardTemplate = document.getElementById("card"); // Retrieve the card template element
var cardContainer = document.getElementById("card_container");
const publicKey = "cda06e7ddb02ba3a429283888d16cead";
const privateKey = "b4b46270da927637b701d623bcf6e9a6fe7bc535";
var limit = 20;
var offset = 0;
var totalElements = 0;
const debug = true;
function generateMD5Hash(value) {
  return CryptoJS.MD5(value).toString();
}

// Function to call the Marvel API
function callMarvelAPI() {
  const ts = new Date().getTime().toString();
  const hash = generateMD5Hash(ts + privateKey + publicKey);
  const apiUrl = `https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&ts=${ts}&hash=${hash}&limit=${limit}&offset=${offset}`;
  fetch(apiUrl)
    .then((response) => response.json())
      .then((data) => {
        console.log(data)
      // Process the API response data here
        cardContainer.innerHTML = "";
        var superHeroArray = data.data.results;
        totalElements = data.data.totals;
        for (let i = 0; i < superHeroArray.length; i++) {
          var card = cardTemplate.cloneNode(true); // Clone the card template
            card.id = "card_" + superHeroArray[i]; // Set a unique ID for each card
            var imgElement = card.querySelector(".movie-img img");
            imgElement.src = superHeroArray[i].thumbnail.path + "." + superHeroArray[i].thumbnail.extension;
            var imgElement = card.querySelector(".movie-info span");
            imgElement.innerHTML =
              superHeroArray[i].name;
          cardContainer.appendChild(card);
        }
    })
    .catch((error) => {
      // Handle any errors that occur during the API call
      console.error("Error:", error);
    });
}


//function to move next page 
function moveNextPage() {
  if (debug) {
    console.log("moveNextPage function Start");
  }
  if (offset < totalElements) {
    offset += limit;
    callMarvelAPI();
  
  }
}
  //function to move previous page
function movePreviousPage() {
  if (debug) {
    console.log("movePreviousPage function Start");
  }
  if (offset > 0) {
    offset -= limit;
    callMarvelAPI();
  }
}
  // Function to add click event listeners to the buttons
(function addButtonEventListeners() {
  var button = document.getElementById("next-page");
  button.addEventListener("click", moveNextPage);
  var button = document.getElementById("previous-page");
  button.addEventListener("click", movePreviousPage);
})();

//Check the browser is offline or online
(function checkIsBrowserOnline() {
  if (navigator.onLine) {
    // Call the function to fetch data from the Marvel API
    callMarvelAPI();
  } else {
    alert("You are Offline");
  }
})();