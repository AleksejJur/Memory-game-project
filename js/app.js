// List of my cards
 const cardsList = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
        "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb",
        "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];


let movesCounter = 0; // how much moves we will have
let timerEnd; // End time !! not using now
let totalSeconds = 0; // Timer tick start
let playerStars = 3; // Players life’s / rating
let openCardList = []; // Opened Card List
let matchedCardList = []; // Card list that matched
let stars = document.querySelector('.stars');
let winStar = document.querySelector('#winStars');
let allStars = document.querySelectorAll(".stars i");

// CREATING CONST FOR GAME
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

// Call at page start

deck.style.display = 'none';
head.style.display = 'none';
scorePan.style.display = 'none';

function game() {
    addRandomSymbolToCard(allCards);
        setTimeout(function() {
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

function addRandomSymbolToCard(array) {  //Add random symbol to our deck li child
    let shuffleCardList = shuffle(cardsList); // Each time we creating shuffled cardList
    for (i = 0; i < array.length; i++) { //New JS syntax  TODO
        array[i].firstElementChild.className = shuffleCardList[i] + " closed";
    }

    movesElement.innerHTML = startMoves;
}

function showSymbol(evt) { //Showing symbol
    evt.target.className = 'card open show';
    movesCounter += 1;
    movesElement.innerHTML = movesCounter + " Moves";
    addCardToOpenList(evt);
    if (movesCounter === 17) {
        stars.lastElementChild.className = 'fa fa-star-o';
    } else if (movesCounter === 24) {
        stars.lastElementChild.previousElementSibling.className = 'fa fa-star-o';
    } else if(movesCounter === 32) {
        stars.firstElementChild.className = 'fa fa-star-o';
    }
}

function addCardToOpenList(evt) {
    openCardList.push(evt.target.firstElementChild);
    checkTwoCardsMatch(openCardList);
    checkTwoCardsNotMatch(openCardList);
    if (matchedCardList.length === 8) {
        //stop timer
        //win-game-popup
        timerEnd = timer;
        document.getElementById('winTime').innerHTML = 'Your Time : ' + timerEnd.firstElementChild.textContent + ":" + timerEnd.lastElementChild.textContent;
    

    // if (movesCounter >= 17) {
    //     winStar.lastElementChild.className = 'fa fa-star-o';
    // } else if (movesCounter >= 24) {
    //     winStar.lastElementChild.previousElementSibling.className = 'fa fa-star-o';
    // } else if(movesCounter >= 32) {
    //     winStar.firstElementChild.className = 'fa fa-star-o';
    // }
        // document.getElementById('winStars').innerHTML = 'Your Stars : ' + stars.firstElementChild + stars.lastElementChild.previousElementSibling + stars.lastElementChild;
        document.getElementById('winMoves').innerHTML = 'Your Moves : ' + parseInt(movesElement.textContent);
        popupFinish();
    }
}

function clearCardOpenList(array) {
    for (let i = 0; i < 2; i++) {
        array.shift();
    }
    return array;
}

function checkTwoCardsMatch(array) {
    if (array.length === 2 && array[0].className === array[1].className) {
        array[0].parentNode.className = 'card match show';
        array[1].parentNode.className = 'card match show';
        matchedCardList.push(array[0]);
        clearCardOpenList(array);
    }
}

function checkTwoCardsNotMatch(array) {
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

// Timer function end

// function resetGame() { //Reseting game
//     for (let card of allCards) { //Closing all cards
//             card.className = "card close";
//             // card.isClicked = 0;
//         }
//     addRandomSymbolToCard(allCards); //Shuffling all cards
//     document.getElementById("minutes").innerHTML = "00";
//     document.getElementById("seconds").innerHTML = "00";
//     totalSeconds = 0;
//     movesCounter = 0;

//     for (i = 0; i < allStars.length; i++) { //New JS syntax  TODO
//             allStars[i].className = "fa fa-star";
//         }
// }

//Game event listeners

deck.addEventListener('click', function (evt) {
    if (!(evt.target.className === 'deck')) {
        showSymbol(evt);
    }
})

// restart.addEventListener('click', function () { //reseting game
//         resetGame();
// })

popup.addEventListener('click', function () {
    for (let card of allCards) { //Opening all cards
            card.className = "card open show";
    }

    setTimeout(function() {
        for (let card of allCards) { //Closing all cards
                card.className = "card close";
        }
    }, delayInMilliseconds);
})

window.onload = function () {
    popup.classList.remove("hidden"); // Show the popup.
    
    setTimeout(()=>popup.classList.add("fade-in")); //Fade the popup in 
    document.getElementById("popup").onclick = function () { //Close the popup when it's clicked. 
    setTimeout(()=>popup.classList.add("hidden")); // Hide the popup.
    deck.style.display = '';
    head.style.display = '';
    scorePan.style.display = '';
    game(); // start all game
    };
};

function popupFinish() {
    scorePan.style.display = 'none';
    checkStars();
    popupWin.classList.remove("hidden"); // Show the popup.
    setTimeout(()=>popupWin.classList.add("fade-in")); //Fade the popup in 
    document.getElementById("popup").onclick = function () { //Close the popup when it's clicked. 
    setTimeout(()=>popupWin.classList.add("hidden")); // Hide the popup.
    };
}

function checkStars() {
    if (movesCounter >= 17) {
        winStar.lastElementChild.className = 'fa fa-star-o';
    } else if (movesCounter >= 24) {
        winStar.lastElementChild.previousElementSibling.className = 'fa fa-star-o';
    } else if(movesCounter >= 32) {
        winStar.firstElementChild.className = 'fa fa-star-o';
    }
}