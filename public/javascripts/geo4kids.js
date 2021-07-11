let state = {
  score: 0
}

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

function play(){
  fetchCountries();
}

play()

function checkGuess(userAnswer) {
  if (cleanCharacters(userAnswer) === cleanCharacters(state.currentCountry.capital)) {
    state.score++
    document.getElementById("score").innerHTML = `${state.score}`
    document.getElementById("correct").play()
    resetForm()
    play()
  } else {
    document.getElementById("wrong").play()
    GameOver()
  }
}

document.getElementById("submit-button").addEventListener("click", function(e){
  e.preventDefault();
  document.getElementById("submit-button").classList.add("hover");
  checkGuess(document.getElementById("capital-guess").value)
})

function GameOver() {
  document.getElementById("correct-answer").innerText = state.currentCountry.capital
  document.body.classList.add("overlay-is-open")
}

document.querySelector(".play-again").addEventListener("click", resetGame)

function resetGame() {
    document.body.classList.remove("overlay-is-open")
    state.score = 0
    document.getElementById("score").textContent = 0
    resetForm()
    play()
}

function resetForm(){
  document.getElementById("capital-guess").value = ''
  document.getElementById("submit-button").classList.remove("hover");
}

function cleanCharacters(string) {
  return String(string).toLowerCase().replace(new RegExp("[àáâãäå]", 'g'), "a").replace(new RegExp("æ", 'g'), "ae").replace(new RegExp("ç", 'g'), "c").replace(new RegExp("[èéêë]", 'g'), "e").replace(new RegExp("[ìíîï]", 'g'), "i").replace(new RegExp("ñ", 'g'), "n").replace(new RegExp("[òóôõö]", 'g'), "o").replace(new RegExp("œ", 'g'), "oe").replace(new RegExp("[ùúûü]", 'g'), "u").replace(new RegExp("[ýÿ]", 'g'), "y").replace(/,/g, "").replace(/-/g, "");
}

