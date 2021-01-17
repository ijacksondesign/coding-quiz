var quizContentEl = document.querySelector("#quiz-content");

var startQuizEl = document.querySelector("#start-quiz");

var timerEl = document.querySelector(".timer");

var timeLeft = 75;

var highScore = 0;

var currentScore = 0;

var currentQuestion = 0;

var questionsArray = [
    {
        question: "Commonly used data types DO NOT include:", 
        choices: ["A: Alerts", "B: Strings", "C: Booleans", "D: Numbers"],
        answer: "A: Alerts"
    },
    {
        question: "The condition in an if/else state is enclosed with __________.", 
        choices: ["A: Curly Brackets", "B: Parenthesis", "C: Square Brackets", "D: Quotes"],
        answer: "B: Parenthesis"
    },
    {
        question: "Arrays in JavaScript can be used to store __________.", 
        choices: ["A: Booleans", "B: Numbers and Strings", "C: Other Arrays", "D: All of the above"],
        answer: "D: All of the above"
    },
    {
        question: "String values must be enclosed within __________ when being assigned to variables.",
        choices: ["A: Quotes", "B: Commas", "C: Parenthesis", "D: Curly Brackets"],
        answer: "A: Quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["A: Terminal/Bash", "B: Console.log", "C: JavaScript", "For Loops"],
        answer: "B: Console.log"
    }    
];


// timmer function
var countdown = function() {
    var timeInterval = setInterval(function() {
        if (timeLeft > 1) {
            timerEl.textContent = "Timer: " + timeLeft + " seconds";
            timeLeft--;
        }
        else if (timeLeft === 0) {
            timerEl.textContent = "Timer: " + timeLeft + " seconds";
            timeLeft--;
          }
        else {
            timerEl.textContent = "";
            clearInterval(timeInterval);
            alert("Oops you ran out of time. Game over!");
        }
    }, 1000);
};

// function to start quiz
var quizStartHandler = function() {
    var quizInstructions = document.querySelector("#quiz-instructions");
    quizInstructions.remove();

    countdown();
    // function to cycle questions
    quizDisplayQuestions();
};

var quizDisplayQuestions = function() {
    // creates a div to display quiz question and answers
    var quizQuestionDiv = document.createElement("div");
    quizQuestionDiv.className = "quiz-question-wrapper";
    quizQuestionDiv.innerHTML = "<h2 class='quiz-question'>" + questionsArray[currentQuestion].question + "</h2>";
    quizContentEl.appendChild(quizQuestionDiv);

    var multiChoice = quizDisplayChoices(currentQuestion);

    quizQuestionDiv.appendChild(multiChoice);

    currentQuestion++;
};

var quizDisplayChoices = function(currentQuestion) {
    // creates a div to display multiple choice
    var quizChoicesDiv = document.createElement("div");
    quizChoicesDiv.className = "quiz-choices-wrapper";

    for(var i = 0; i < 4; i++) {
        var quizAnswerEl = document.createElement("button");
        quizAnswerEl.className = "quiz-answers";
        quizAnswerEl.textContent = questionsArray[currentQuestion].choices[i];
        
        if (quizAnswerEl.textContent === questionsArray[currentQuestion].answer) {
            quizAnswerEl.value = true;
        }
        else {
            quizAnswerEl.value = false;
        }

        quizChoicesDiv.appendChild(quizAnswerEl);
    }
    
    return quizChoicesDiv;
};


var validateAnswer = function() {
    // grabs the answer that user selects
    var userAnswer = document.querySelector(".quiz-answers").value;
    console.log(userAnswer);

    if (userAnswer === "right-answer") {
        console.log("correct!");
    }
    else {
        console.log("wrong!");
    }
};

startQuizEl.addEventListener("click", quizStartHandler);

// quizContentEl.addEventListener("click", validateAnswer);