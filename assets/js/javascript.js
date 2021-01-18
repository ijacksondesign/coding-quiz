var startQuizEl = document.querySelector("#start-quiz");
var quizContentEl = document.querySelector("#quiz-content");
var timerEl = document.querySelector(".timer");
var viewHighScoresEl = document.querySelector("#view-high-scores");

var timeLeft = 60;

var currentQuestion = 0;

var currentScore = 0;
var highScores = [];

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
        choices: ["A: Terminal/Bash", "B: Console.log", "C: JavaScript", "D: For Loops"],
        answer: "B: Console.log"
    }    
];


// timmer function
var countdown = function() {
    var timeInterval = setInterval(function() {
        if (timeLeft > 1 && currentQuestion < questionsArray.length) {
            timerEl.textContent = "Timer: " + timeLeft + " seconds";
            timeLeft--;
        }
        else if (timeLeft === 0) {
            timerEl.textContent = "Timer: " + timeLeft + " seconds";
            timeLeft--;
        }
        else if (timeLeft > 1 && currentQuestion === questionsArray.length) {
            clearInterval(timeInterval);
            createScoreForm();
        }
        else {
            timerEl.textContent = "";
            clearInterval(timeInterval);
            alert("Oops you ran out of time. Game over!");
            var sectionSelector = document.querySelector("section");
            sectionSelector.remove();
            createScoreForm();
        }
    }, 1000);
};

// function to start quiz
var quizStartHandler = function() {
    // selects quiz instructions and removes them once start button is pressed
    var quizInstructions = document.querySelector("#quiz-instructions");
    quizInstructions.remove();

    // start time countdown
    countdown();

    // calls function to display questions
    quizDisplayQuestions(currentQuestion);
};

// function display questions
var quizDisplayQuestions = function(currentQuestion) {
    if (currentQuestion < questionsArray.length) {
        var quizSectionEl = document.createElement("section");
        quizSectionEl.id = "quiz-questions"
        quizContentEl.appendChild(quizSectionEl);
        

        // creates a div to display quiz question and answers
        var quizQuestionDiv = document.createElement("div");
        quizQuestionDiv.className = "quiz-question-wrapper";
        quizQuestionDiv.innerHTML = "<h2 class='quiz-question'>" + questionsArray[currentQuestion].question + "</h2>";
        quizSectionEl.appendChild(quizQuestionDiv);

        var multiChoice = quizDisplayChoices(currentQuestion);

        quizQuestionDiv.appendChild(multiChoice);
    } 
    else {
        createScoreForm();
    }
};

// function to generate choices
var quizDisplayChoices = function() {
    // creates a div to display multiple choice
    var quizChoicesDiv = document.createElement("div");
    quizChoicesDiv.className = "quiz-choices-wrapper";

    for(var i = 0; i < 4; i++) {
        var quizAnswerEl = document.createElement("button");
        quizAnswerEl.className = "quiz-answers btn";
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

// function to validate user's answer
var validateAnswer = function(event) {
    // target buttons
    var targetEl = event.target;

    var updateQuestion = document.querySelector("#quiz-questions");

    // check value of button
    if (targetEl.value === "true") {
        alert("correct!");
        currentScore+=10;
    }
    // wrong answer was clicked
    else if (targetEl.value === "false") {
        alert("wrong!");
        timeLeft-=10;
    }
    // if button wasn't clicked don't run
    else {
        return;
    }

    // after checking, update question counter
    currentQuestion++;

    // selects the old question and removes
    updateQuestion.remove();

    // calls the next question
    quizDisplayQuestions(currentQuestion);
};

// function to create score input
var createScoreForm = function() {
    var scoreEl = document.createElement("section");
    scoreEl.className = "submit-score";
    scoreEl.innerHTML = "<h2 class='quiz-question'>Congratulations! <br /> You've finished the quiz.</h2> <br /> <p>Your final score is " + currentScore;
    quizContentEl.appendChild(scoreEl);

    var scoreFormEl = document.createElement("form");
    scoreFormEl.className = "score-form";
    scoreFormEl.innerHTML = "<label for='initials'>Enter Your Initials</label> <input type ='text' name='initials' placeholder='Enter Your Initials'></input>";
    scoreEl.appendChild(scoreFormEl);

    var submitFormEl = document.createElement("button");
    submitFormEl.className = "form-submit btn";
    submitFormEl.textContent = "Submit Score";
    scoreFormEl.appendChild(submitFormEl);

    submitFormEl.addEventListener("click", submitScore);
};

// function to submit and store score
var submitScore = function(event) {
    event.preventDefault();

    var userInitials = document.querySelector("input[name='initials']").value;

    var userDataObj = {
        name: userInitials,
        score: currentScore
    }

    highScores.push(userDataObj);
    console.log(highScores);
    saveScores();

    displayHighScores();
};

// save high score to local storage
var saveScores = function () {
    localStorage.setItem("scores", JSON.stringify(highScores));
};

// load high scores from local storage
var loadScores = function() {
    var savedScores = localStorage.getItem("scores");

    if (!savedScores) {
        return false;
    }

    savedScores = JSON.parse(savedScores);
    console.log(savedScores);
};

// display high scores
var displayHighScores = function() {
    // selects quiz instructions and removes them once start button is pressed
    var scoreEl = document.querySelector("section");
    scoreEl.remove();

    var highScoreEl = document.createElement("section");
    highScoreEl.className = "high-scores-display"
    highScoreEl.innerHTML = "<h2 class>High Scores";
    quizContentEl.appendChild(highScoreEl);

    var highScoreWrapper = document.createElement("div");
    highScoreWrapper.className = "high-score-wrapper";
    highScoreEl.appendChild(highScoreWrapper);

    for (var i = 0; i < highScores.length; i++) {
        var displayScoresEl = document.createElement("div");
        displayScoresEl.className = "display-high-scores";
        displayScoresEl.innerHTML = i+1 + ": " +  highScores[i].name + " - " + highScores[i].score;
        highScoreWrapper.appendChild(displayScoresEl);
    }

    var buttonWrapper = document.createElement("div");
    buttonWrapper.className = "button-wrapper";
    highScoreEl.appendChild(buttonWrapper);

    var goBackBtn = document.createElement("button");
    goBackBtn.className = "go-back-btn btn";
    goBackBtn.textContent = "Go Back";
    buttonWrapper.appendChild(goBackBtn);
    
    var clearScoresBtn = document.createElement("button");
    clearScoresBtn.className = "clear-score-btn btn";
    clearScoresBtn.textContent = "Clear High Scores";
    buttonWrapper.appendChild(clearScoresBtn);

    goBackBtn.addEventListener("click", resetQuiz);

    clearScoresBtn.addEventListener("click", clearScores);
};

var clearScores = function() {
    var displayedScores = document.querySelector(".display-high-scores");
    displayedScores.remove();
    localStorage.clear();
    highScores = [];
};

var resetQuiz = function() {
    var highScoreEl = document.querySelector(".high-scores-display");
    highScoreEl.remove();

    // recreates quiz instructions
    var quizInstructionsEl = document.createElement("section");
    quizInstructionsEl.className = "quiz-instructions"
    quizContentEl.appendChild(quizInstructionsEl);

    var quizInstructionsContent = document.createElement("div");
    quizInstructionsContent.className = "quiz-instructions-content";
    quizInstructionsEl.appendChild(quizInstructionsContent);
    
    var quizInstructionsHeader = document.createElement("h1");
    quizInstructionsHeader.textContent = "So You Think You Know JavaScript?";
    quizInstructionsContent.appendChild(quizInstructionsHeader);

    var quizInstructionsSubHeader = document.createElement("h2");
    quizInstructionsSubHeader.textContent = "JavaScript Coding Quiz Challenge";
    quizInstructionsContent.appendChild(quizInstructionsSubHeader);
    
    var quizInstructionsParagraph = document.createElement("p");
    quizInstructionsParagraph.innerHTML = "Try to answer the following code-related questions within the time limit. <br /> Keep in mind that incorrect answers will penalize your score/time by <strong>10 seconds</strong>!";
    quizInstructionsContent.appendChild(quizInstructionsParagraph);

    var quizStartBtn = document.createElement("button");
    quizStartBtn.className = "btn";
    quizStartBtn.id = "start-quiz";
    quizStartBtn.textContent = "Start Quiz";
    quizInstructionsContent.appendChild(quizStartBtn);

    startQuizEl = document.querySelector("#start-quiz");

    startQuizEl.addEventListener("click", quizStartHandler);
};

// view high scores
viewHighScoresEl.addEventListener("click", displayHighScores);

// starts quiz
startQuizEl.addEventListener("click", quizStartHandler);

// // validate answer
quizContentEl.addEventListener("click", validateAnswer);

loadScores();