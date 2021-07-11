/* Getting elements from HTML File */

let resetButton = document.querySelector(".play-again");

/* Cards */
let card = document.getElementsByClassName("card");
let cards = [...card]; // cards array holds all cards
let matchedCard = document.getElementsByClassName("match"); // variable for matched cards
let openedCards = []; // array for opened cards **var
let matchedCounter = 0;
const MAX_MATCHES = 8;

/* Deck */
const deck = document.getElementById("card-deck"); 

/* Moves system */
let moves = 0;
let counter = document.querySelector(".moves");

/* Audios */
const wrongAudio = document.getElementById("wrong");
const correctAudio = document.getElementById("correct");
const selecttAudio = document.getElementById("select-card");

/* Async / Await */
const delay = ms => new Promise(res => setTimeout(res, ms));

/* Gameplay */

/* Wait function */
function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
}

/* This function shuffles the cards */
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

/* Start the game when the page is loaded */
window.onload = function () {
    startGame();
}

/* New play */
function startGame(){
    openedCards = [];  // empty the openCards array
    cards = shuffle(cards); // shuffle all the cards
    for (let thiscard of cards) { // remove all exisiting classes from the cards
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        thiscard.classList.remove("show", "open", "match", "unmatched", "disabled");
    }
    
    moves = 0; // reset moves
    counter.innerHTML = moves;
}

/* Toggles open and show class to display cards */
var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

/* Handles when a card is open */
function cardOpen() {
    selecttAudio.play();
    openedCards.push(this); // adds the card to the OpenedCards array
    var len = openedCards.length;
    if(len === 2){  // checks if there is another card open
        moveCounter(); // uploads player's moves
        if(openedCards[0].type === openedCards[1].type){ // checks if the cards are a match or not
            matched();
        } else {
            unmatched();
        }
    }
};

/* Handles when the cards match */
const matched = async () => {
    await delay(300);
    openedCards[0].classList.add("match", "disabled"); // add the match class to the first card
    openedCards[1].classList.add("match", "disabled"); // add the match class to the second card
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = []; // reset the openedCards array
    correctAudio.play();
    matchedCounter++;
    endGame();
};

/* Handles when the cards don't match */
const unmatched = async () => {
    await delay(300);
    openedCards[0].classList.add("unmatched"); // add the unmatched class to the first card
    openedCards[1].classList.add("unmatched"); // add the unmatched class to the second card
    disable();
    wrongAudio.play(); 
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedCards = []; // reset the openedCards array
    },1100);
};

/* Disable the cards temporarily */
function disable(){
    Array.prototype.filter.call(cards, function(thisCard){
        thisCard.classList.add('disabled');
    });
}

/* Enable cards and disable matched cards */
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for (let thisCard of matchedCard){
            thisCard.classList.add("disabled");
        }
    });
}

/* Handles the player's moves */
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
}

/* Loop to add event listeners to each card */
for (let thisCard of cards) {
    card = thisCard;
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
}

/* Congratulations when all cards match, show overlay and moves */
function endGame(){
    console.log({
        length: matchedCounter,
        match: matchedCounter == MAX_MATCHES
    })
    if (matchedCounter === MAX_MATCHES){
        console.log()
        document.getElementById("finalMoves").innerHTML = moves;  // update final moves
        document.body.classList.add("overlay-is-open"); // show congratulations overlay
    };
}

resetButton.addEventListener("click", function(e){
    document.body.classList.remove("overlay-is-open");
    startGame();
});


