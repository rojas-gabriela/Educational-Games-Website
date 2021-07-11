let state = {
    score: 0,
    wrongAnswers: 0
}

function generateNumber(max) {
    return Math.floor(Math.random() * (max + 1))
}

function updateProblem() {
    document.getElementById('option1').classList.remove("hover");
    document.getElementById('option2').classList.remove("hover");
    document.getElementById('option3').classList.remove("hover");
    document.getElementById('option4').classList.remove("hover");

    /* Generate equation */
    state.currentProblem = generateProblem()
    isProblemOk()
    document.getElementById("number1").innerHTML = `${state.currentProblem.numberOne}`
    document.getElementById("number2").innerHTML = `${state.currentProblem.numberTwo}`
    document.getElementById("operator").innerHTML = `${state.currentProblem.operator}`
    
    /* Generate answers */
    state.currentAnswer = generateAnswers()
    let allAnswers = [state.currentAnswer.correctAnswer, state.currentAnswer.wrongAnswer1, state.currentAnswer.wrongAnswer2, state.currentAnswer.wrongAnswer3]
    let switchAnswer = []

    for (let i = allAnswers.length; i--;) {  /* Randomize the answers and in which place will be*/
        switchAnswer.push(allAnswers.splice(Math.floor(Math.random() * (i + 1)), 1)[0])
    }

    document.getElementById("option1").innerHTML = switchAnswer[0]
    document.getElementById("option2").innerHTML = switchAnswer[1]
    document.getElementById("option3").innerHTML = switchAnswer[2]
    document.getElementById("option4").innerHTML = switchAnswer[3]
}

/* updateProblem will start running as soon as we start the game */
updateProblem()

function generateProblem() {
    return {
        numberOne: generateNumber(10),
        numberTwo: generateNumber(10),
        operator: ['+','-','x'][generateNumber(2)]
    }
}

function generateAnswers() {
    return {
        correctAnswer: findCorrectAnswer(),
        wrongAnswer1: generateNumber(10),
        wrongAnswer2: generateNumber(10),
        wrongAnswer3: generateNumber(10)
    }
}

function isProblemOk() {
    if (state.currentProblem.operator == '-'){
        while ((state.currentProblem.numberOne < state.currentProblem.numberTwo) ) {
            state.currentProblem = generateProblem();
        }
    }
}

function findCorrectAnswer() {
    let correctAnswer
    const p = state.currentProblem
    if (p.operator == "+") correctAnswer = p.numberOne + p.numberTwo
    if (p.operator == "-") correctAnswer = p.numberOne - p.numberTwo
    if (p.operator == "x") correctAnswer = p.numberOne * p.numberTwo
    return correctAnswer
}

function checkAnswer(option) {
    if (option.innerHTML == state.currentAnswer.correctAnswer){
        document.getElementById("correct").play()
        state.score++
        document.getElementById("score").innerHTML = `${state.score}`
        updateProblem()
    } else {
        document.getElementById("wrong").play()
        state.wrongAnswers++
        document.getElementById("lives").textContent = 3 - state.wrongAnswers
        updateProblem()
    }
    checkIfGameOver()
}

function checkIfGameOver() {
    if (state.wrongAnswers == 3){
        document.body.classList.add("overlay-is-open")
    }
}

document.querySelector(".reset-button").addEventListener("click", resetGame)

function resetGame() {
    document.body.classList.remove("overlay-is-open")
    updateProblem()
    state.score = 0
    state.wrongAnswers = 0
    document.getElementById("score").textContent = 0
    document.getElementById("lives").textContent = 3
}

document.getElementById("option1").addEventListener("click", function() {
    document.getElementById('option1').classList.add("hover");
    checkAnswer(document.getElementById("option1"))
})

document.getElementById("option2").addEventListener("click", function() {
    document.getElementById('option2').classList.add("hover");
    checkAnswer(document.getElementById("option2"))
})

document.getElementById("option3").addEventListener("click", function() {
    document.getElementById('option3').classList.add("hover");
    checkAnswer(document.getElementById("option3"))
})

document.getElementById("option4").addEventListener("click", function() {
    document.getElementById('option4').classList.add("hover");
    checkAnswer(document.getElementById("option4"))
})
