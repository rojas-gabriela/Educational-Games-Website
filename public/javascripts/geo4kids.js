import axios from 'axios';

let state = {
  score: 0,
  wrongAnswers: 0
}

async function getCountries() {
  try {
    const response = await axios.get(__dirname + 'src/routes/api');
    console.log(response)
  } catch (err) {
    console.log(err.message);
  }
}

getCountries();

function getRandomCountry(countriesArray) {
  let randNum = Math.floor(Math.random() * countriesArray.length);
  return countriesArray[randNum];
}

function updateCountryHeadline(currentCountry) {
  document.getElementById("country-name").innerHTML = currentCountry;
}