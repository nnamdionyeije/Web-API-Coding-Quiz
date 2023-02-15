var startButton = document.querySelector(".start-button");
var mainPage = document.querySelector(".title");
var QuesPage = document.querySelector(".questions");
// var buttonAction = document.querySelector(".buttons");
var buttonAction = $('.all-buttons');



// selectors for the question text
var questionTitle = document.querySelector("#QuesTitle");
var button1 = document.querySelector("#buttonOne");
var button2 = document.querySelector("#buttonTwo");
var button3 = document.querySelector("#buttonThree");
var button4 = document.querySelector("#buttonFour");

var buttonArray = [button1, button2, button3, button4]


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
        return;
    }
    
    questionTitle.textContent = questions[currentQ - 1].title;
    
    for (i = 0; i < buttonArray.length; i++) {
        buttonArray[i].textContent = questions[currentQ -1].choices[i];
    }
}

startButton.addEventListener("click", function(event) {
    mainPage.setAttribute("class", "title invisible");
    QuesPage.setAttribute("class", "questions visible");
    setQuestion();
})

//currently I have buttonAction set to the container for the buttons
//ideally it would be set to the buttons directly
//I was able to accomplish this using jQuery
buttonAction.on("click", function(event) {
    event.preventDefault();

    var element = event.target;

    if (element.matches('span')) {
        if (questions[currentQ-1].answer === element.textContent) {
            console.log("correct answer")
            // use this as a first step to check for correct answers
        }
    } else if (element.matches('button')) {
        var newData = element.textContent.trim();

        switch (newData[0]) {
            case "1":
                if (questions[currentQ-1].answer === button1.textContent) {
                    console.log("Button Correct Answer")
                    // use this as a first step to check for correct answers
                }
                break;

            case "2":
                if (questions[currentQ-1].answer === button2.textContent) {
                    console.log("Button Correct Answer")
                }
                break;

            case "3":
                if (questions[currentQ-1].answer === button3.textContent) {
                    console.log("Button Correct Answer")
                }
                break;

            case "4":
                if (questions[currentQ-1].answer === button4.textContent) {
                    console.log("Button Correct Answer")
                }
                break;
        }
    }
    
    // console.log(element);
    // my current idea is to have
    currentQ++;
    setQuestion();
    
})

