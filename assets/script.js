// selectors for the main section content
var startButton = document.querySelector(".start-button");
var mainPage = document.querySelector(".title");
var QuesPage = document.querySelector(".questions");
var initPage = document.querySelector(".initials");
var scoresPage = document.querySelector(".high-scores");
var buttonAction = document.querySelector(".buttons");
var header = document.querySelector(".head-top");

//View High Scores link
var viewScores = document.querySelector(".score-link");

// selectors and related for the question text
var questionTitle = document.querySelector("#QuesTitle");
var button1 = document.querySelector("#buttonOne");
var button2 = document.querySelector("#buttonTwo");
var button3 = document.querySelector("#buttonThree");
var button4 = document.querySelector("#buttonFour");
var buttonArray = [button1, button2, button3, button4];

// selectors for the correct/incorrect text
var verdictSection = document.querySelector(".verdict-box");
var verdictTextSpan = document.querySelector(".verdictText");
var verdictTextInit = document.querySelector(".verdictTextInitials");
var verdictValue = "";

// time
var timeSpan = document.querySelector(".time-span");
var quizTime;
var timer;
// timeSpan.textContent = quizTime;

//final score
var scoreSpan = document.querySelector(".final-score");
var initialsForm = document.querySelector("#initials-form");
var initialsInput = document.querySelector(".initials-input");

//High Scores Page
var scoresOrderedList = document.querySelector("#scores-list");
var backButton = document.querySelector(".go-back");
var clearButton = document.querySelector(".clear-button");


var currentQ = 1;

var questions = [
    {
        position: 1,
        title: "String Values must be enclosed within ______ when being assigned to variables.",
        choices: ['commas', 'curly brackets', 'quotes', 'parenthesis'],
        answer: 'quotes',
    },
    {
        position: 2,
        title: "Inside which HTML element do we link the JavaScript file?",
        choices: ['<javascript>', '<js>', '<script>', '<scripting>'],
        answer: '<script>',

    },
    {
        position: 3,
        title: "The condition in an if/else statement is enclosed with _________.",
        choices: ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
        answer: 'parenthesis',
    },
    {
        position: 4,
        title: "Arrays in JavaScript can be used to store _________.",
        choices: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
        answer: 'all of the above',
    },
    {
        position: 5,
        title: "A very useful tool used durng development and debugging for printing content to the debugger is:",
        choices: ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
        answer: 'console.log',
    },
    {
        position: 6,
        title: "Commonly used data types do NOT include?",
        choices: ['strings', 'booleans', 'alerts', 'numbers'],
        answer: 'alerts',
    }
]

viewScores.addEventListener("click", function(event) {
    showHighScores();
    clearInterval(timer);
})


// possibly have an endgame function to be called in multiple places

function setQuestion() { 
    if (currentQ > questions.length) {
        QuesPage.setAttribute("class", "questions invisible");
        initPage.setAttribute("class", "initials visible");
        verdictTextInit.textContent = verdictValue;
        scoreSpan.textContent = quizTime;
        clearInterval(timer);
        return;
    }
    
    questionTitle.textContent = questions[currentQ - 1].title;
    
    for (i = 0; i < buttonArray.length; i++) {
        buttonArray[i].textContent = questions[currentQ -1].choices[i];
    }

    verdictTextSpan.textContent = verdictValue;

    if (currentQ > 1) {
        verdictSection.setAttribute("class", "verdict-box visible")
    }
}

function setTime() {
    timer = setInterval(function() {
        quizTime--;
        timeSpan.textContent = quizTime;
        if (quizTime <= 0) {
            QuesPage.setAttribute("class", "questions invisible");
            initPage.setAttribute("class", "initials visible");
            verdictTextInit.textContent = "Ran out of time!";
            timeSpan.textContent = "0";
            scoreSpan.textContent = "0";
            clearInterval(timer);
        }
        
    }, 1000)
}

startButton.addEventListener("click", function(event) {
    mainPage.setAttribute("class", "title invisible");
    QuesPage.setAttribute("class", "questions visible");
    quizTime = 75;
    setTime();
    setQuestion();
})

//currently I have buttonAction set to the container for the buttons
//ideally it would be set to the buttons directly
//I was able to accomplish this using jQuery
buttonAction.addEventListener("click", function(event) {
    event.preventDefault();

    var element = event.target;

    if (element.matches('span')) {
        if (questions[currentQ-1].answer === element.textContent) {
            verdictValue = "Correct!"
        } else {
            verdictValue = "Incorrect";
            quizTime -= 10; // look into how to make this function immediately subtract
            if (quizTime <= 0) {
                QuesPage.setAttribute("class", "questions invisible");
                initPage.setAttribute("class", "initials visible");
                verdictTextInit.textContent = "Incorrect / Ran out of time!";
                timeSpan.textContent = "0";
                scoreSpan.textContent = "0";
                clearInterval(timer);
                return;
            }
            timeSpan.textContent = quizTime;
        }
    } else if (element.matches('button')) {
        var newData = element.textContent.trim();
        var slicedData = newData.slice(3);
        if (questions[currentQ-1].answer === slicedData) {
            verdictValue = "Correct!"
        } else {
            verdictValue = "Incorrect";
            quizTime -= 10; // look into how to make this function immediately subtract
            if (quizTime <= 0) {
                QuesPage.setAttribute("class", "questions invisible");
                initPage.setAttribute("class", "initials visible");
                verdictTextInit.textContent = "Incorrect / Ran out of time!";
                timeSpan.textContent = "0";
                scoreSpan.textContent = "0";
                clearInterval(timer);
                return;
            }
            timeSpan.textContent = quizTime;
        }
    }
    currentQ++;
    setQuestion();
})

function showHighScores() {
    mainPage.setAttribute("class", "title invisible");
    QuesPage.setAttribute("class", "questions invisible");
    initPage.setAttribute("class", "initials invisible");

    // I could have the above line be called in the original function, then call showHighScores()
    scoresPage.setAttribute("class", "high-scores visible")
    header.setAttribute("class", "head-top invisible");

    var storedScores = JSON.parse(localStorage.getItem("highScores"));
    
    while(scoresOrderedList.firstChild) {
        scoresOrderedList.removeChild(scoresOrderedList.firstChild);
    }
    
    if (storedScores == null) {
        var li = document.createElement("li");
        li.textContent = "There are no high scores yet."
        li.setAttribute("data-index", i);
        scoresOrderedList.appendChild(li);
        return;
    }

    for (var i = 0; i < storedScores.length; i++) {
        var singularScore = storedScores[i];
        var li = document.createElement("li");
        //look into why I can't access JSON parsed objects by their original names
        li.textContent = (i + 1) + ". " + singularScore[0] + " - " + singularScore[1];
        li.setAttribute("data-index", i);
        scoresOrderedList.appendChild(li);
    }
}


initialsForm.addEventListener("submit", function(event) {
    event.preventDefault();
    if (initialsInput.value == "") {
        return;
    }
    var scoresArray = [];
    var individualScore = [
        initialText = initialsInput.value,
        score = scoreSpan.textContent,
    ]
    var holder = JSON.parse(localStorage.getItem("highScores"));
    if (holder === null) {
        scoresArray.push(individualScore);
        
    } else {
        scoresArray = holder;
        scoresArray.push(individualScore);
    }
    localStorage.setItem("highScores", JSON.stringify(scoresArray));
    initialsInput.value = "";
    showHighScores();
})

backButton.addEventListener("click", function(event) {
    scoresPage.setAttribute("class", "high-scores invisible");
    mainPage.setAttribute("class", "title visible");
    header.setAttribute("class", "head-top visible")
    currentQ = 1;
    quizTime = 75;
    timeSpan.textContent = 75;
    verdictSection.setAttribute("class", "verdict-box invisible")

})

clearButton.addEventListener("click", function(event) {    
    if (scoresOrderedList.length == 0) {
        return;
    }
    
    while(scoresOrderedList.firstChild) {
        scoresOrderedList.removeChild(scoresOrderedList.firstChild);
    }
    storedScores = null;
    localStorage.removeItem("highScores");
    showHighScores();
    
})

