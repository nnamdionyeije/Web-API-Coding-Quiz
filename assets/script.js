// selectors for the main section content
var startButton = document.querySelector(".start-button");
var mainPage = document.querySelector(".title");
var QuesPage = document.querySelector(".questions");
var initPage = document.querySelector(".initials");
var scoresPage = document.querySelector(".high-scores");
var buttonAction = document.querySelector(".buttons");

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


// possibly have an endgame function to be called in multiple places

function setQuestion() { //currentQ, buttonArray not sure if necessary to add those as inputs
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
    // console.log(element);
    // my current idea is to have

    // set the upper border on a DIV below the question box
    // then have the text in there
    currentQ++;
    setQuestion();
})

function showHighScores() {
    initPage.setAttribute("class", "initials invisible");
    // I could have the above line be called in the original function, then call showHighScores()
    scoresPage.setAttribute("class", "high-scores visible")

    var storedScores = JSON.parse(localStorage.getItem("highScores"));
    console.log(storedScores[0]);
    
    if (storedScores === null) {
        return;
    }

    while(scoresOrderedList.firstChild) {
        scoresOrderedList.removeChild(scoresOrderedList.firstChild);
    }
    
    for (var i = 0; i < storedScores.length; i++) {
        var singularScore = storedScores[i];

        var li = document.createElement("li");
        //look into why I can't access JSON parsed objects by their original names
        //Change the ol to have numerical indexes
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
    // 2 types of object arrays to be made
    // one for the individual high score values, both the initials and the score itself
    // one to be an array of said high score values
    // take the existing array, copy it and add new values to it, then resave it
    // check to see if an array is in local storage, if not, just make a new one and save it
    // if there is, copy it over and add one score to it, then resave the new array over the original in local storage

})

backButton.addEventListener("click", function(event) {
    scoresPage.setAttribute("class", "high-scores invisible");
    mainPage.setAttribute("class", "title visible");
    currentQ = 1;
    quizTime = 75;
    timeSpan.textContent = 75;
    verdictSection.setAttribute("class", "verdict-box invisible")

})

clearButton.addEventListener("click", function(event) {    
    while(scoresOrderedList.firstChild) {
        scoresOrderedList.removeChild(scoresOrderedList.firstChild);
    }
    storedScores = null;
    localStorage.removeItem("highScores");
    
    showHighScores();
    
})

