let state = {
  score: 0,
  wrongAnswers: 0
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const fetchCountries = async () => {
  try {
    const response = await fetch("/api");
    const result = await response.json();
    state.currentCountry = getRandomCountry(result.countries);
    updateProblem();
  } catch (err) {
    console.log(err);
  }
};

function getRandomCountry(countriesArray) {
  let randNum = Math.floor(Math.random() * countriesArray.length);
  return countriesArray[randNum];
}

function updateProblem() {
  document.getElementById("country-name").innerHTML = state.currentCountry.name;
}


function checkGuess(userAnswer) {
  if (cleanCharacters(userAnswer) === cleanCharacters(state.currentCountry.capital)) {
    document.getElementById("correct").play()
    state.score++
    document.getElementById("score").innerHTML = `${state.score}`
    console.log("win")
    wait()
  } else {
    document.getElementById("wrong").play()
    state.wrongAnswers++
    //document.getElementById("lives").textContent = 3 - state.wrongAnswers;
    checkIfGameOver()
    console.log("ups")
    wait()
  }
}

const wait = async () => {
  await delay(1000);
}

document.getElementById("submit-button").addEventListener("click", function(e){
  checkGuess(document.getElementById("capital-guess").value);
});


function checkIfGameOver() {
  if (state.wrongAnswers == 3){
      document.body.classList.add("overlay-is-open")
  }
}

function cleanCharacters(string) {
  return String(string).toLowerCase().replace(new RegExp("[àáâãäå]", 'g'), "a").replace(new RegExp("æ", 'g'), "ae").replace(new RegExp("ç", 'g'), "c").replace(new RegExp("[èéêë]", 'g'), "e").replace(new RegExp("[ìíîï]", 'g'), "i").replace(new RegExp("ñ", 'g'), "n").replace(new RegExp("[òóôõö]", 'g'), "o").replace(new RegExp("œ", 'g'), "oe").replace(new RegExp("[ùúûü]", 'g'), "u").replace(new RegExp("[ýÿ]", 'g'), "y").replace(/,/g, "").replace(/-/g, "");
}

fetchCountries();