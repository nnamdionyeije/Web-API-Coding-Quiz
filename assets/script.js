var startButton = document.querySelector(".start-button");
var mainPage = document.querySelector(".title");


startButton.addEventListener("click", function(event) {
    mainPage.setAttribute("class", "title invisible");

})