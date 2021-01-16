var quizContentEl = document.querySelector("#quiz-content");
var startQuizEl = document.querySelector("#start-quiz");

var highScore = 0;

var questionsArray = [
    {q: "Commonly used data types DO NOT include:", a: "A: Alerts", b: "B: Strings", c: "C: Booleans", d: "D: Numbers"},
    {q: "The condition in an if/else state is enclosed with __________.", a: "A: Curly Brackets", b: "B: Parenthesis", c: "C: Square Brackets", d: "D: Quotes"},
    {q: "Arrays in JavaScript can be used to store __________.", a: "A: Booleans", b: "B: Numbers and Strings", c: "C: Other Arrays", d: "D: All of the above"},
    {q: "String values must be enclosed within __________ when being assigned to variables.", a: "A: Quotes", b: "B: Commas", c: "C: Parenthesis", d: "D: Curly Brackets"},
    {q: "A very useful tool used during development and debugging for printing content to the debugger is:", a: "A: Terminal/Bash", b: "B: Console.log", c: "C: JavaScript", d: "For Loops"},
];


// function to start quiz
var quizStartHandler = function() {
    var quizInstructions = document.querySelector("#quiz-instructions");
    quizInstructions.remove();

    // function to cycle questions
    quizQuestions();
};

var quizQuestions = function() {
    // creates a div to display quiz question and answers
    var quizQuestionDiv = document.createElement("div");
    quizQuestionDiv.className = "quiz-question-wrapper";
    quizQuestionDiv.innerHTML = "<h2 class='quiz-question'>" + questionsArray[0].q + "</h2>";
    quizContentEl.appendChild(quizQuestionDiv);

    var quizAnswersDiv = document.createElement("div");
    quizAnswersDiv.className = "quiz-choices-wrapper";
    quizQuestionDiv.appendChild(quizAnswersDiv);

    var quizChoicesEl = document.createElement("ul");
    quizChoicesEl.className = "quiz-answers-wrapper";
    quizAnswersDiv.appendChild(quizChoicesEl);

    for (var i = 0; i < questionsArray.length-1; i++) {
        var quizMultiChoices = document.createElement("li");
        quizMultiChoices.className = "quiz-answers";
        quizMultiChoices.innerHTML = questionsArray[0].a;
        quizChoicesEl.appendChild(quizMultiChoices);
    }
};

startQuizEl.addEventListener("click", quizStartHandler);