/*
 * Create a list that holds all of your cards
 */

// Initializing array cardClass to store the values of the icon classes
var cardClass = ["fa fa-diamond", "fa fa-paper-plane-o",
    "fa fa-anchor", "fa fa-bolt",
    "fa fa-cube", "fa fa-leaf",
    "fa fa-bicycle", "fa fa-bomb"
];

cardClass = cardClass.concat(cardClass);

//openCards is where the value of the opened cards are stored
let openCards = [];

//mouseEvent stores the value of the first and second clicked element
let mouseEvent = [];

//moveCounter tracks how many moves the player have done
let moveCounter = 0;

//matchedCards tracks how many matches there are already
let matchedCards = 0;

//player starting star count
let starCount = 5;

//lockboard variable will lock the board to prevent clicking more than two
let lockboard = false;

//active is a bollean variable to keep track of the time
var active = false;

initializeDeck();

function initializeDeck() {
    active = false;
    moveCounter = 0;
    starCount = 5;
    matchedCards = 0;

    //assigning shuffled cardClass array into the same array
    cardClass = shuffle(cardClass);

    //selecting the deck class and assigning it to deck object
    var deck = document.querySelector(".deck");

    //assign card class to cards
    var cards = document.querySelectorAll(".card");

    //selecting all <i> elements in the "deck" div class and assigning it to icons NodeList
    var icons = deck.querySelectorAll("i");

    //assigning shuffled classes to i elements of the icons NodeList using a for loop
    for (var i = 0; i < 16; i++) {
        icons[i].className = cardClass[i];
        cards[i].className = "card";
    }

    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        var copy = [],
            n = array.length,
            i;

        // While there remain elements to shuffle…
        while (n) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * n--);

            // And move it to the new array.
            copy.push(array.splice(i, 1)[0]);
        }

        return copy;
    }
    resetTimer();
    setStars();
} //end initializeDeck

//Initiating event listener for the container class
var clickScreen = document.querySelector(".deck");
clickScreen.addEventListener('click', function (event) {
    if (lockboard) return;
    console.log(event);
    console.log(event.target.className);
    checkClass(event);
});

var clickRepeat = document.querySelector(".fa.fa-repeat");
clickRepeat.addEventListener('click', function () {
    //initializeDeck();
    location.reload();
});

//function checkClass accepts a mouse event argument and checks what class was clicked by the user.
function checkClass(clicked) {

    //assigning the name of the class to the classclicked string
    const classClicked = clicked.target.firstElementChild.className;

    //calls movesCount where it display the moveCounter to the HTML
    movesCount(moveCounter);
    //checks if the card that was clicked is a class of card
    if (clicked.target.className === "card") {
        //starts the timer
        if (!active) {
            active = true;
            startTimer();
        }

        //checking if class of card clicked is not the same as the initial card
        if (classClicked !== openCards[0]) {

            //calls showCard to flip card
            showCard(clicked, classClicked);

            //checking if there are already two opened cards
            if (openCards.length === 2) {

                //calling hideCards to hide the pair of cards
                hideCards();
            }
        } else if (classClicked === openCards[0]) {

            //calls cardMatch function to flip cards to match
            cardMatch(clicked);
        }
    }

    if (matchedCards === 8) {
        var time = document.getElementById("timer").innerHTML;
        gameFinish(time);
    }

} //end checkClass function

//flip cards that matched and let it stay flipped
function cardMatch(clicked) {
    //sets class of card to match
    clicked.target.className = "card match";
    mouseEvent[0].className = "card match";
    openCards = [];
    mouseEvent = [];
    matchedCards++;
} //end cardMatch function

//show cards that are clicked
function showCard(clicked, classClicked) {
    clicked.target.className = "card open show";
    openCards.push(classClicked);
    mouseEvent.push(clicked.target);
    console.log(clicked, classClicked);
} //end showCard function

//hide cards after clicking two dissimilar cards
function hideCards() {
    lockboard = true;
    setTimeout(function () {
        mouseEvent[0].className = "card";
        mouseEvent[1].className = "card";
        mouseEvent = [];
        openCards = [];
        lockboard = false;
        moveCounter++;
        //reduce star on move 10, 15, 20, 25
        if (moveCounter === 10 || moveCounter === 15 || moveCounter === 20 || moveCounter === 25) reduceStar();

    }, 1000);
} //end hideCards function

///counts the moves that the player has
function movesCount(moveCounter) {
    document.querySelector('.moves').innerHTML = moveCounter;
} //end movesCount

//reduce the stars the player has
function reduceStar() {
    let star = document.querySelectorAll(".fa.fa-star");
    star[star.length - 1].className = "fa fa-star-o";
    starCount--;
}

//player finished the game
function gameFinish(time) {
    setTimeout(function () {
        var gameReset = confirm("Congratulations!\nYou have made " + moveCounter + " moves" +
            "\nYour Score is: " + starCount + " stars, and your time is: " + time +
            "\nPress OK to play again!!!");
        if (gameReset) location.reload();
    }, 1000);
}
//startTimer is a function that
function startTimer() {
    if (active) {
        var timer = document.getElementById("timer").innerHTML;
        //split the time to two arrays
        var time = timer.split(":");
        var minutes = time[0];
        var seconds = time[1];

        if (seconds == 59) {
            minutes++
            seconds = "00";
            if (minutes < 10) minutes = "0" + minutes;
        } else {
            seconds++;
            if (seconds < 10) seconds = "0" + seconds;
        }

        //update HTML timer ID on
        document.getElementById("timer").innerHTML = minutes + ":" + seconds;
        setTimeout(startTimer, 1000);
    }
}

function resetTimer() {
    clearTimeout(startTimer);
    document.getElementById("timer").innerHTML = " 00:00";
}

function setStars() {
    var initialStar = document.querySelector(".stars");

    for (var i = 0; i < 5; i++) {
        var newStar = document.createElement("li");
        newStar.className = "fa fa-star";
        initialStar.appendChild(newStar);
    }
}