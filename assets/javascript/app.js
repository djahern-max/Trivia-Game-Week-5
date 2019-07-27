// Initial values

let counter = 5;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;

// Display the question and the choices to the browser

function nextQuestion() {

    const isQuestionOver = (quizQuestions.length - 1) === currentQuestion;
    if (isQuestionOver) {
        console.log('Game is over');
        displayResult();
    } else {
        currentQuestion++;
        loadQuestion();

    }

}

function timeUp() {
    clearInterval(timer);

    lost++;

    preloadImage('lost');
    setTimeout(nextQuestion, 3 * 1000);
   
}

function countDown() {
    counter--;

    $('#time').html('Timer:     ' + counter);

    if (counter === 0) {
        timeUp();
    }
}

function loadQuestion() {
    counter = 5;
    timer = setInterval(countDown, 1000);

    const question = quizQuestions[currentQuestion].question; //
    const choices = quizQuestions[currentQuestion].choices; //

    // $('#game').html('<h4>' + question + '</h4>');

    $('#time').html('Timer:     ' + counter);
    $('#game').html(`
    <h4>${question}</h4>
    ${loadChoices(choices)}
    ${loadRemainingQuestion()}
    `);

}

function loadChoices(choices) {

    let result = '';

    for (let i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;

    }
    return result;
}

// Either correct/wrong choice, go to the next question

$(document).on('click', '.choice', function () {
    clearInterval(timer);
    const selectedAnswer = $(this).attr('data-answer');
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (correctAnswer === selectedAnswer) {
        score++;
        console.log("wins");
        preloadImage('win');
        // nextQuestion();
        setTimeout(nextQuestion, 3 * 1000);

    } else {
        lost++;
        console.log("lost");
        preloadImage('lost');
        // nextQuestion();
        setTimeout(nextQuestion, 3 * 1000);

    }

})

function displayResult() {
    const result = `
    <p>You get ${score} question(s) right</p>
    <p>You missed ${lost} question(s)</p>
    <p>Total questions ${quizQuestions.length}</p>
    <button class="btn btn-primary" id="reset">Reset Game</button>
    `;

    $('#game').html(result);

}

$(document).on('click', "#reset", function () {
    counter = 5;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;

    loadQuestion();

});

function loadRemainingQuestion() {
    const remainingQuestion = quizQuestions.length - (currentQuestion + 1);
    const totalQuestion = quizQuestions.length;

    return `Remaining Question: ${remainingQuestion}/${totalQuestion}`;
   
}


function randomImage(images) {
    const random = Math.floor(Math.random() * images.length);
    const randomImage =  images[random];
    return randomImage;

}

// Display a funny giphy for correct and wron answers

function preloadImage(status) {
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;


if (status === 'win') {
    $('#game').html(`
        <p class="preload-images">Congratulations, you picked the correct answer</p>
        <p class="preload-images">The correct answer is <b>${correctAnswer}</b></p>
        <img> src="${randomImage(funImages)}"/>
    `);
} else {
    $('#game').html(`
    <p class="preload-images">The correct answer was <b>${correctAnswer}</b></p>
    <p class="preload-images">Oh man that was bad!</p>
    <img> src="${randomImage(sadImages)}"/>
    `);

}   
}

loadQuestion();