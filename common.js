var superHeroId = "";
const publicKey = "cda06e7ddb02ba3a429283888d16cead";
const privateKey = "b4b46270da927637b701d623bcf6e9a6fe7bc535";
const debug = true;
function generateMD5Hash(value) {
  return CryptoJS.MD5(value).toString();
}
function goToMainPage() {
    window.location.href = "/";
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
    // showLoadingScreen();
    const ts = new Date().getTime().toString();
    const hash = generateMD5Hash(ts + privateKey + publicKey);
    const apiUrl = `https://gateway.marvel.com:443/v1/public/characters/${superHeroId}?apikey=${publicKey}&ts=${ts}&hash=${hash}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (debug) {
          console.log(data);
        }
    //     hideLoadingScreen();
    //     // Process the API response data here
    //     cardContainer.innerHTML = "";
    //     var superHeroArray = data.data.results;
    //     totalElements = data.data.total;
    //     for (let i = 0; i < superHeroArray.length; i++) {
    //       var card = cardTemplate.cloneNode(true); // Clone the card template
    //       card.id = "card_" + superHeroArray[i].id; // Set a unique ID for each card
    //       var imgElement = card.querySelector(".card-img img");
    //       imgElement.src = superHeroArray[i].thumbnail.path + "." + superHeroArray[i].thumbnail.extension;
    //       var imgElement = card.querySelector(".card-info span");
    //       imgElement.innerHTML =
    //         superHeroArray[i].name;
    //       cardContainer.appendChild(card);
    //     }
    //     document.getElementById("current-page").innerText = `${data.data.offset + 1
    //       } - ${data.data.offset + data.data.count} of ${totalElements} `;
    //     if (offset === 0) {
    //       let previousButton = document.getElementById("previous-button");
    //       previousButton.classList.add("disabled");
    //     } else {
    //       let previousButton =
    //         document.getElementById("previous-button");
    //       previousButton.classList.remove("disabled");
    //     }
    //     if (data.data.offset + data.data.count >= totalElements) {
    //       let nextButton = document.getElementById("next-button");
    //       nextButton.classList.add("disabled");
    //     } else {
    //       let nextButton = document.getElementById("next-button");
    //       nextButton.classList.remove("disabled");
    //     }
    //     updateCardButton();
    //      document.getElementById("pagination").style.display = "flex";
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