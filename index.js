var superHeroArray = [1, 2, 3, 4, 5];
var cardTemplate = document.getElementById("card"); // Retrieve the card template element
var cardContainer = document.getElementById("card_container");
for (let i = 0; i < superHeroArray.length; i++) {

  var card = cardTemplate.cloneNode(true); // Clone the card template
  card.id = "card_" + superHeroArray[i]; // Set a unique ID for each card

  cardContainer.appendChild(card);
}
const publicKey = "cda06e7ddb02ba3a429283888d16cead";
const privateKey = "b4b46270da927637b701d623bcf6e9a6fe7bc535";

// Function to generate the MD5 hash
function generateMD5Hash(value) {
  return CryptoJS.MD5(value).toString();
}

// Function to call the Marvel API
function callMarvelAPI() {
  const ts = new Date().getTime().toString();
  const hash = generateMD5Hash(ts + privateKey + publicKey);
  const apiUrl = `https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&ts=${ts}&hash=${hash}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Process the API response data here
      console.log(data);
    })
    .catch((error) => {
      // Handle any errors that occur during the API call
      console.error("Error:", error);
    });
}

// Call the function to fetch data from the Marvel API
callMarvelAPI();