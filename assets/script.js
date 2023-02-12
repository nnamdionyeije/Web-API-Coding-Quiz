var startButton = document.querySelector(".start-button");
var mainPage = document.querySelector(".title");


startButton.addEventListener("click", function(event) {
    mainPage.setAttribute("class", "title invisible");

})

let questionTest = {
    position: 1,
    mainText: "String Values must be enclosed within ______ when being assigned to variables.",
    answer1: "commas",
    answer2: "curly brackets",
    answer3: "quotes",
    answer4: "parenthesis"
}

let questionSet = question[10];

let question = {
    position,
    mainText,
    answer1,
    answer2,
    answer3,
    answer4,
}
