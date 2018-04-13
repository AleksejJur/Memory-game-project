// Creaing const and let for game

 const cardsList = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
                    "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb",
                    "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];

const popup = document.getElementById("popup");
const popupWin = document.getElementById("popupWin");
const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds"); 
const timer = document.querySelector('.timer');
const movesElement = document.querySelector('.moves');
const startMoves = "0 Moves";
const restart = document.querySelector('.restart');
const allCards = document.querySelectorAll('.deck li');
const deck = document.querySelector('.deck');
const delayInMilliseconds = 2000; //2 seconds
const head = document.querySelector('header');
const scorePan = document.querySelector('.score-panel');

let movesCounter = 0; // how much moves we will have
let timerEnd; // End time
let totalSeconds = 0; // Timer tick start
let playerStars = 3; // Players life’s / rating
let openCardList = []; // Opened Card List
let matchedCardList = []; // Card list that matched
let stars = document.querySelector('.stars');
let winStar = document.querySelector('#winStars');
let allStars = document.querySelectorAll(".stars i");

// Call at page start

deck.style.display = 'none'; // Hiding deck at start
head.style.display = 'none'; // Hiding heading at start
scorePan.style.display = 'none'; // Hiding score panel at start

function game() {
    addRandomSymbolToCard(allCards);
        setTimeout(function() { // Starting timer after 2 sec
        setInterval(setTime, 1000);
    }, delayInMilliseconds);
}

// Game functions

function shuffle(array) { // Shuffle function from http://stackoverflow.com/a/2450976
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function addRandomSymbolToCard(array) {  // Add random symbol to our deck li child
    let shuffleCardList = shuffle(cardsList); // Each time we creating shuffled cardList
    for (i = 0; i < array.length; i++) {
        array[i].firstElementChild.className = shuffleCardList[i] + " closed";
    }

    movesElement.innerHTML = startMoves; // Displaying moves
}

function showSymbol(evt) { //Showing 
    if (openCardList.length != 2) { // check for not to open more than 2 cards
        evt.target.className = 'card open show';
            movesCounter += 1; // Counting moves
            movesElement.innerHTML = movesCounter + " Moves";
            addCardToOpenList(evt);
            if (movesCounter === 17) { // Cheking how much stars to show
                stars.lastElementChild.className = 'fa fa-star-o';
            } else if (movesCounter === 24) {
                stars.lastElementChild.previousElementSibling.className = 'fa fa-star-o';
            } else if(movesCounter === 33) {
                stars.firstElementChild.className = 'fa fa-star-o';
            }
    }
    
}

function addCardToOpenList(evt) { 
    openCardList.push(evt.target.firstElementChild); // Adding card to openCardList
    checkTwoCardsMatch(openCardList); // Cheking if cards from openCardListMatch
    checkTwoCardsNotMatch(openCardList); // If no match
    if (matchedCardList.length === 8) { // If all cards open 
        timerEnd = timer;
        document.getElementById('winTime').innerHTML = 'Your Time : ' + timerEnd.firstElementChild.textContent + ":" + timerEnd.lastElementChild.textContent;
        document.getElementById('winStars').innerHTML = 'Your Stars : ' + stars.innerHTML;
        document.getElementById('winMoves').innerHTML = 'Your Moves : ' + parseInt(movesElement.textContent);
        popupFinish();
    }
}

function clearCardOpenList(array) { // Clearing CardOpenList
    for (let i = 0; i < 2; i++) {
        array.shift();
    }
    return array;
}

function checkTwoCardsMatch(array) { // Checking if card 1 match card 2
    if (array.length === 2 && array[0].className === array[1].className) {
        array[0].parentNode.className = 'card match show';
        array[1].parentNode.className = 'card match show';
        matchedCardList.push(array[0]); // Matched cards are pushed into array
        clearCardOpenList(array);
    }
}

function checkTwoCardsNotMatch(array) { // Cheking if cards not match
    if (array.length === 2 && array[0].className !== array[1].className) {
        setTimeout(function () {
            array[0].parentNode.className = 'card close';
            array[1].parentNode.className = 'card close';
            clearCardOpenList(array);
        }, 800);
    }
}

// Timer function's

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

function resetGame() { //Reseting game
    for (let card of allCards) { //Closing all cards
            card.className = "card close";
            // card.isClicked = 0;
        }
    addRandomSymbolToCard(allCards); //Shuffling all cards
    document.getElementById("minutes").innerHTML = "00";
    document.getElementById("seconds").innerHTML = "00";
    totalSeconds = 0;
    movesCounter = 0;
    clearCardOpenList(openCardList);
    clearCardOpenList(matchedCardList);

    for (i = 0; i < allStars.length; i++) { //New JS syntax  TODO
            allStars[i].className = "fa fa-star";
        }
} 

window.onload = function () { // Call start PopUp on page load
    popup.classList.remove("hidden"); // Show the popup.
    setTimeout(()=>popup.classList.add("fade-in")); //Fade the popup in 
    document.getElementById("popup").onclick = function () { //Close the popup when it's clicked. 
    setTimeout(()=>popup.classList.add("hidden")); // Hide the popup.
    deck.style.display = ''; // Display deck
    head.style.display = ''; // Display header
    scorePan.style.display = ''; // Display score panel
    game(); // start all game
    };
};

function popupFinish() { // Call win PopUp
    scorePan.style.display = 'none'; // Hide score panel
    popupWin.classList.remove("hidden"); // Show the popup
    setTimeout(()=>popupWin.classList.add("fade-in")); //Fade the popup in 
    document.getElementById("popupWin").onclick = function () { //Close the popup when it's clicked
    setTimeout(()=>popupWin.classList.add("hidden")); // Hide the popup
    resetGame();
    deck.style.display = ''; // Display deck
    head.style.display = ''; // Display header
    scorePan.style.display = ''; // Display score panel
    };
};

//Game event listeners

deck.addEventListener('click', function (evt) {
    if (!(evt.target.className === 'deck')) { // cia tikrinu su boolean true/fallse if 2 cards opened cant click 3
        showSymbol(evt);
    }
})

popup.addEventListener('click', function () {
    for (let card of allCards) { //Opening all cards for 2 sec
            card.className = "card open show";
    };

    setTimeout(function() {
        for (let card of allCards) { //Closing all cards
                card.className = "card close";
        }
    }, delayInMilliseconds);
});

restart.addEventListener('click', function () { //reseting game
    resetGame();
})