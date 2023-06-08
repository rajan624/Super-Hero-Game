var superHeroArray = [1];
var cardTemplate = document.getElementById("card"); // Retrieve the card template element
var cardContainer = document.getElementById("card_container");
const publicKey = "cda06e7ddb02ba3a429283888d16cead";
const privateKey = "b4b46270da927637b701d623bcf6e9a6fe7bc535";
var limit = 20;
var offset = 0;
var totalElements = 0;
const debug = true;
var favoriteHero = false;
function generateMD5Hash(value) {
  return CryptoJS.MD5(value).toString();
}
// Function to show the loading screen
function showLoadingScreen() {
  try {

    if (debug) {
      console.log("showLoadingScreen Start");
    }
    document.getElementById("loading-screen").style.display = "block";
    document.getElementById("pagination").style.display = "none";
  } catch (error) {
    console.log(error);
  }
}

// Function to hide the loading screen
function hideLoadingScreen() {
  try {

    if (debug) {
      console.log("hideLoadingScreen Start");
      console.log(document.getElementById("loading-screen"));
    }
    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("pagination").style.display = "flex";
  } catch (error) {
    console.log(error);
  }
}
// Function to call the Marvel API
function callMarvelAPI() {
  try {
    let searchInput = document.getElementById("searchInput").value;
    if (searchInput && searchInput !== "") {
      searchInput = "&nameStartsWith="+searchInput;
    } else {
      searchInput = "";
    }
    favoriteHero = false;
    showLoadingScreen();
    const ts = new Date().getTime().toString();
    const hash = generateMD5Hash(ts + privateKey + publicKey);
    const apiUrl = `https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&ts=${ts}&hash=${hash}&limit=${limit}&offset=${offset}${searchInput}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (debug) {
          console.log(data);
        }
        hideLoadingScreen();
        // Process the API response data here
        cardContainer.innerHTML = "";
        var superHeroArray = data.data.results;
        totalElements = data.data.total;
        for (let i = 0; i < superHeroArray.length; i++) {
          var card = cardTemplate.cloneNode(true); // Clone the card template
          card.id = "card_" + superHeroArray[i].id; // Set a unique ID for each card
          var imgElement = card.querySelector(".card-img img");
          imgElement.src = superHeroArray[i].thumbnail.path + "." + superHeroArray[i].thumbnail.extension;
          var imgElement = card.querySelector(".card-info span");
          imgElement.innerHTML =
            superHeroArray[i].name;
          cardContainer.appendChild(card);
        }
        document.getElementById("current-page").innerText = `${data.data.offset + 1
          } - ${data.data.offset + data.data.count} of ${totalElements} `;
        if (offset === 0) {
          let previousButton = document.getElementById("previous-button");
          previousButton.classList.add("disabled");
        } else {
          let previousButton =
            document.getElementById("previous-button");
          previousButton.classList.remove("disabled");
        }
        if (data.data.offset + data.data.count >= totalElements) {
          let nextButton = document.getElementById("next-button");
          nextButton.classList.add("disabled");
        } else {
          let nextButton = document.getElementById("next-button");
          nextButton.classList.remove("disabled");
        }
        updateCardButton();
         document.getElementById("pagination").style.display = "flex";
      })
      .catch((error) => {
        // Handle any errors that occur during the API call
        console.error("Error:", error);
      });
  } catch (error) {
    console.log(error);
  }
}


//function to move next page 
function moveNextPage() {
  try {

    if (debug) {
      console.log("moveNextPage function Start");
      console.log("offset", offset);
      console.log("totalElements", totalElements);
    }
    if (offset < totalElements) {
      offset += limit;
      callMarvelAPI();
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });

    }
  } catch (error) {
    console.log(error);
  }
}
//function to move previous page
function movePreviousPage() {
  try {
    if (debug) {
      console.log("movePreviousPage function Start");
      console.log("offset", offset);
      console.log("totalElements", totalElements);
    }
    if (offset > 0) {
      offset -= limit;
      callMarvelAPI();
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });

    }
  } catch (error) {
    console.log(error);
  }
}
// Function to add click event listeners to the buttons
(function addButtonEventListeners() {
  try {

    var button = document.getElementById("next-page");
    button.addEventListener("click", moveNextPage);
    var button = document.getElementById("previous-page");
    button.addEventListener("click", movePreviousPage);
    const searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", clearInput);

  } catch (error) {
    console.log(error);
  }
})();
function clearInput() {
  console.log(
  "sasasfsa"
)
}

//Add favorite superhero function
function addFavorite(button) {
  try {
    var event = window.event || arguments.callee.caller.arguments[0];
    event.stopPropagation(); // Stop event propagation
  } catch (error) {
    console.log(error);
  }
  try {
    let card = button.parentNode.parentNode; // Traverse up two levels to reach the card element
    let cardId = card.id;
    cardId = parseInt(cardId.split("_")[1]);
    let cardName = card.querySelector(".card-name").innerHTML;
    let imageUrl = card.querySelector(".card-img img").src;
    if (debug) {
      console.log("addFavorite function Start");
      console.log("Card ID:", cardId);
      console.log("Card Name:", cardName);
    }
    // Retrieve existing array from localStorage
    const existingArrayJSON = localStorage.getItem("superHero");
    let existingArray = [];

    // Parse stored JSON into an array (if it exists)
    if (existingArrayJSON) {
      existingArray = JSON.parse(existingArrayJSON);
    }

    // Create a new object
    const newObject = { id: cardId, name: cardName ,path:imageUrl };

    // Add the new object to the array
    existingArray.push(newObject);
    console.log(existingArray);
    // Convert the updated array to JSON string
    const updatedArrayJSON = JSON.stringify(existingArray);

    // Store the updated JSON string in localStorage
    localStorage.setItem("superHero", updatedArrayJSON);
    updateCardButton();
  } catch (error) {
    console.log(error);
  }
}


//update Button Name and Functionality
function updateCardButton() {

  try {
    let cards = document.getElementsByClassName("card");
    let favoriteSuperHero = [];
    let storageFavoriteSuperHero = window.localStorage.getItem("superHero");
    if (storageFavoriteSuperHero) {
      favoriteSuperHero = JSON.parse(storageFavoriteSuperHero);
    }
    let favoriteSuperHeroId = favoriteSuperHero.map(obj => obj.id);
    console.log(favoriteSuperHeroId);
    // Loop through each card
    for (var i = 0; i < cards.length; i++) {
      try {
        let card = cards[i];
        let cardId = parseInt(card.id.split("_")[1]);
        let favoriteButton = card.querySelectorAll("button");
        favoriteButton.forEach(function (button) {
          if (favoriteSuperHeroId.includes(cardId)) {
            if (button.id === "removeFavorite") {
              button.style.display = "inline-block";
            } else {
              button.style.display = "none"
            }
          } else {
            if (button.id === "removeFavorite") {
              button.style.display = "none";
            } else {
              button.style.display = "inline-block";
            }
          }
        })
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

//Remove favorite SuperHero 
function removeFavorite(button) {
  try {
    var event = window.event || arguments.callee.caller.arguments[0];
    event.stopPropagation(); // Stop event propagation
  } catch (error) {
    console.log(error);
  }
  try {
    let card = button.parentNode.parentNode; // Traverse up two levels to reach the card element
    let cardId = card.id;
    cardId = parseInt(cardId.split("_")[1]);
    let cardName = card.querySelector(".card-name").innerHTML;
    let imageUrl = card.querySelector(".card-img img").src;
    if (debug) {
      console.log("removeFavorite function Start");
      console.log("Card ID:", cardId);
    }
    // Retrieve existing array from localStorage
    const existingArrayJSON = localStorage.getItem("superHero");
    let existingArray = [];

    // Parse stored JSON into an array (if it exists)
    if (existingArrayJSON) {
      existingArray = JSON.parse(existingArrayJSON);
    }

    // Create a new object
    const newObject = { id: cardId, name: cardName , path:imageUrl };

    // Add the new object to the array
    var filteredArray = existingArray.filter(function (obj) {
      return obj.id !== cardId;
    });

    // Convert the updated array to JSON string
    const updatedArrayJSON = JSON.stringify(filteredArray);

    // Store the updated JSON string in localStorage
    localStorage.setItem("superHero", updatedArrayJSON);
    updateCardButton();
    if (favoriteHero) {
      showFavoriteSuperHero();
    }
  } catch (error) {
    console.log(error);
  }
}


//get Detail of specific super hero
function cardDetails(card) {
  try {
    if (debug) {
      console.log("cardDetails function start");
    }
    console.log(card.id);
    var url = "superHeroProfile.html?id=" + encodeURIComponent(card.id);

    // Navigate to the profile.html page with the ID parameter
    window.location.href = url;
  } catch (error) {
    console.log(error);
  }
}
//Check the browser is offline or online
(function checkIsBrowserOnline() {
  if (navigator.onLine) {
    // Call the function to fetch data from the Marvel API
    callMarvelAPI();
  } else {
    alert("You are Offline");
  }
})();



function showFavoriteSuperHero() {
  try {
    favoriteHero = true;
    if (debug) {
      console.log("showFavoriteSuperHero function start");
    }
    // Fetch the data from localStorage
    const existingArrayJSON = localStorage.getItem("superHero");
    let existingArray = [];

    // Parse stored JSON into an array (if it exists)
    if (existingArrayJSON) {
      existingArray = JSON.parse(existingArrayJSON);
    }
    // Display the favorites
    if (existingArray.length >= 0) {
      cardContainer.innerHTML = "";
      // Loop through the array of favorites
        for (let i = 0; i < existingArray.length; i++) {
          var card = cardTemplate.cloneNode(true); // Clone the card template
          card.id = "card_" + existingArray[i].id; // Set a unique ID for each card
          var imgElement = card.querySelector(".card-img img");
          imgElement.src =
            existingArray[i].path;
          var imgElement = card.querySelector(".card-info span");
          imgElement.innerHTML = existingArray[i].name;
          cardContainer.appendChild(card);
      }
      document.getElementById("pagination").style.display = "none";
      updateCardButton();
    }
  } catch (error) {
    console.log(error);
  }
}


function searchByName(event) {
  event.preventDefault();
  // Call your API using the search input
  callMarvelAPI();
}


//function to start from starting
function gotoStartPage() {
  limit = 20;
  offset = 0;
  callMarvelAPI()
}