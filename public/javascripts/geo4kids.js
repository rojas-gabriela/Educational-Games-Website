
let state = {
  score: 0,
  wrongAnswers: 0
}

function getRandomCountry(countriesArray) {
  let randNum = Math.floor(Math.random() * countriesArray.length);
  return countriesArray[randNum];
}

function updateCountryHeadline(currentCountry) {
  document.getElementById("country-name").innerHTML = currentCountry;
}