

let state = {
  score: 0,
  wrongAnswers: 0
}

const fetchCountries  = async () => {
  const response = await fetch('/api');
  return response.json();
}

const jsonFile = fetchCountries()
console.log(jsonFile.)


function getRandomCountry(countriesArray) {
  let randNum = Math.floor(Math.random() * countriesArray.length);
  return countriesArray[randNum];
}

function updateCountryHeadline(currentCountry) {
  document.getElementById("country-name").innerHTML = currentCountry;
}