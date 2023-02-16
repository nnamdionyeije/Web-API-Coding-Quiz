// selectors for the main section content
var startButton = document.querySelector(".start-button");
var mainPage = document.querySelector(".title");
var QuesPage = document.querySelector(".questions");
var initPage = document.querySelector(".initials");
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


function setQuestion() { //currentQ, buttonArray not sure if necessary to add those as inputs
    if (currentQ > questions.length) {
        QuesPage.setAttribute("class", "questions invisible");
        initPage.setAttribute("class", "initials visible");
        verdictTextInit.textContent = verdictValue;
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
            //As things are this leaves the application with a short gap between input and effects
            // A possible option is to delegate some of these responsibilities to the buttons
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
        }
    } else if (element.matches('button')) {
        var newData = element.textContent.trim();

        switch (newData[0]) {
            case "1":
                if (questions[currentQ-1].answer === button1.textContent) {
                            verdictValue = "Correct!"
                } else {
                    verdictValue = "Incorrect";
                    quizTime -= 10;
                }
                break;

            case "2":
                if (questions[currentQ-1].answer === button2.textContent) {
                    verdictValue = "Correct!"
                } else {
                    verdictValue = "Incorrect";
                    quizTime -= 10;
                }
                break;

            case "3":
                if (questions[currentQ-1].answer === button3.textContent) {
                    verdictValue = "Correct!"         
                } else {
                    verdictValue = "Incorrect";
                    quizTime -= 10;
                }
                break;

            case "4":
                if (questions[currentQ-1].answer === button4.textContent) {
                    verdictValue = "Correct!"             
                } else {
                    verdictValue = "Incorrect";
                    quizTime -= 10;
                }
                break;
        }
    }
    
    // console.log(element);
    // my current idea is to have

    // set the upper border on a DIV below the question box
    // then have the text in there
    currentQ++;
    setQuestion();
})

