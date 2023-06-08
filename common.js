var superHeroId = "";
const publicKey = "cda06e7ddb02ba3a429283888d16cead";
const privateKey = "b4b46270da927637b701d623bcf6e9a6fe7bc535";
const debug = true;
function generateMD5Hash(value) {
  return CryptoJS.MD5(value).toString();
}
function goToMainPage() {
  window.location.href = "/Coding_ninjas_super_hero";
}


//Function to start the loading function
function showLoadingScreen() {
  try {

    if (debug) {
      console.log("showLoadingScreen Start");
    }
    document.getElementById("loading-screen").style.display = "block";
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
  } catch (error) {
    console.log(error);
  }
}
(function getProfileId() {
   var urlString = window.location.href;

   // Extract the id parameter using a regular expression
   var idMatch = urlString.match(/id=card_(\d+)/);
   var id = idMatch ? idMatch[1] : null;

   console.log(id);
    if (id) {
        superHeroId = id;
    }
})();


// Function to call the Marvel API
function getSuperHeroDetails() {
  try {

    favoriteHero = false;
     showLoadingScreen();
    const ts = new Date().getTime().toString();
    const hash = generateMD5Hash(ts + privateKey + publicKey);
    const apiUrl = `https://gateway.marvel.com:443/v1/public/characters/${superHeroId}?apikey=${publicKey}&ts=${ts}&hash=${hash}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (debug) {
          console.log(data);
        }
        document.getElementById("pro-image").src = data.data.results[0].thumbnail.path + "." + data.data.results[0].thumbnail.extension;
        document.getElementById("super-hero-name").innerText = data.data.results[0].name;
        document.getElementById("comics-no").innerText = data.data.results[0].comics.available;
        document.getElementById("series-no").innerText = data.data.results[0].series.available;
        document.getElementById("stories-no").innerText = data.data.results[0].stories.available;
        document.getElementById("events-no").innerText = data.data.results[0].events.available;
        document.getElementById("events-no").innerText = data.data.results[0].events.available;
        document.getElementById("description").innerText = data.data.results[0].description;
        hideLoadingScreen();
      })
      .catch((error) => {
        // Handle any errors that occur during the API call
        console.error("Error:", error);
      });
  } catch (error) {
    console.log(error);
  }
}
getSuperHeroDetails();
//Add favorite superhero function
function addFavorite() {
  try {
    if (debug) {
      console.log("addFavorite function Start");
    }
    // Retrieve existing array from localStorage
    const existingArrayJSON = localStorage.getItem("superHero");
    let existingArray = [];

    // Parse stored JSON into an array (if it exists)
    if (existingArrayJSON) {
      existingArray = JSON.parse(existingArrayJSON);
    }
    let nameElement = document.getElementById("super-hero-name");
    let imageUrl = document.getElementById("pro-image");
    // Create a new object
    superHeroId = Number(superHeroId);
    const newObject = { id: superHeroId, name: nameElement.innerHTML, path: imageUrl.src };

    // Add the new object to the array
    existingArray.push(newObject);
    console.log(existingArray);
    // Convert the updated array to JSON string
    const updatedArrayJSON = JSON.stringify(existingArray);

    // Store the updated JSON string in localStorage
    localStorage.setItem("superHero", updatedArrayJSON);
    updateButton();
  } catch (error) {
    console.log(error);
  }
}


//update Button Name and Functionality
function updateButton() {

  try {
    if (debug) {
      console.log("updateFunction function Start");
    }
    let favoriteSuperHero = [];
    let storageFavoriteSuperHero = window.localStorage.getItem("superHero");
    if (storageFavoriteSuperHero) {
      favoriteSuperHero = JSON.parse(storageFavoriteSuperHero);
    }
    let favoriteSuperHeroId = favoriteSuperHero.map(obj => obj.id);
    console.log(favoriteSuperHeroId);
    superHeroId = Number(superHeroId);
    // Loop through each card
      if (favoriteSuperHeroId.includes(superHeroId)) {
        document.getElementById("add-Favorite").style.display = "none";
        document.getElementById("remove-Favorite").style.display = "block";
          } else {
        document.getElementById("add-Favorite").style.display = "block";
        document.getElementById("remove-Favorite").style.display = "none";
          }
  } catch (error) {
    console.log(error);
  }
}


updateButton();
//Remove favorite SuperHero 
function removeFavorite(button) {
  try {
    if (debug) {
      console.log("removeFavorite function Start");
    }
    // Retrieve existing array from localStorage
    const existingArrayJSON = localStorage.getItem("superHero");
    let existingArray = [];

    // Parse stored JSON into an array (if it exists)
    if (existingArrayJSON) {
      existingArray = JSON.parse(existingArrayJSON);
    }

    // Add the new object to the array
    var filteredArray = existingArray.filter(function (obj) {
      return obj.id !== superHeroId;
    });

    // Convert the updated array to JSON string
    const updatedArrayJSON = JSON.stringify(filteredArray);

    // Store the updated JSON string in localStorage
    localStorage.setItem("superHero", updatedArrayJSON);
    updateButton();
  } catch (error) {
    console.log(error);
  }
}