/**
 * Global variables
 */
let startBox = document.getElementById("game-box");
let userNotification = document.getElementById("notify-user");
let navBar = document.getElementsByClassName("nav-bar")[0];
let navToggler = document.getElementById("navbar-toggle");
let gridGameScore = document.getElementById("score");
let gridHighscoreDisplay = document.getElementById("highscore");

let gridHighscore = localStorage.getItem("gridHighscore");

let currentPage = window.location.pathname;

let navToggled = false;
let gridGameIsOn = false;

let reactionGameTimer = null;
let reactionStartTimer = null;
let reactionTime = null;
let tileTime = null;
let tileTimer = null;
let scoreGain = null;
let gridTile = null;

let gridScore = 0;







/**
 * Start nav-bar toggling and eventlistener for starting the game 
 * when document is loaded and initializePage is called
 */
function initializePage() {
    startGame();
    navToggler.addEventListener("click", toggleNavBar);

    if (currentPage.includes("index.html")) {
        gridHighscoreDisplay.innerHTML = gridHighscore; 

    }
    
}

/**
 *  Allow the user to toggle the navbar if their screen size needs it
 */
function toggleNavBar() {
    if (navToggled === false) {
        navBar.style.display = "block";
        navToggler.classList.remove("fa-bars");
        navToggler.classList.add("fa-x");
        navToggled = true;

    } else if (navToggled === true) {
        navBar.style.display = "none";
        navToggler.classList.remove("fa-x");
        navToggler.classList.add("fa-bars");
        navToggled = false;

    }

}

function startGame() {
    let gameIsOn = false;

    startBox.addEventListener("click", function () {
        if (gameIsOn === false) {
            gameIsOn = true;

            if (this.getAttribute("data-game-mode") === "reaction") {
                let gameMode = "reaction";
                gameStartTimer(gameMode);
                userNotification.style.display = "none";

            } else if (this.getAttribute("data-game-mode") === "grid") {
                let gameMode = "grid";
                gameStartTimer(gameMode);

            }

            startBox.style.backgroundColor = "red";

        }
    });
}

function gameStartTimer(gameMode) {
    const MIN = 1;
    const MAX = 5;
    let startTime = Math.floor(Math.random() * (MAX - MIN + 1) + MIN); // Generate a random start time between 1 - 5 seconds

    // Reaction game start execution

    if (gameMode === "reaction") {
        reactionStartTimer = setTimeout(reactionGame, startTime * 1000); // Countdown to call reactionGame function
        startBox.addEventListener("click", tooSoon); // Check if user clicks during start timer

        setTimeout(function () {
            startBox.removeEventListener("click", tooSoon); // Remove listener at the same time as the game starts to prevent bugs and loops

        }, startTime * 1000);


        // Grid game start execution    

    } else if (gameMode === "grid") {
        setTimeout(gridGame, startTime * 1000);

    }
}

/**
 * Called if the user clicks while the reaction game
 * is starting to let them know it was too soon
 * and that they should try again
 */
function tooSoon() {
    clearTimeout(reactionStartTimer);
    userNotification.textContent = "Oops! Too soon.. Try again!";
    userNotification.style.display = "block";
    startBox.removeEventListener("click", tooSoon);
    startGame();

}
// Reaction game specific JS

function reactionGame() {
    reactionTime = null;
    startBox.style.backgroundColor = "green";

    /**
     * Timer to count the time it takes the user to click once
     * the game has begun
     */
    reactionGameTimer = setInterval(function () {
        for (let i = 0; i < 9; i++) { // For loop of 9 iterations on 11ms interval gives decent accuracy until a fix for precise 1ms timer is implemented
            reactionTime++;
        }
    }, 11);

    startBox.addEventListener("click", stopReactionGame);

}

/**
 * Wait for user to react and click the game-box
 * to end the timer and display the time it took
 */
function stopReactionGame() {
    clearInterval(reactionGameTimer);
    reactionGameTimer = null;
    userNotification.innerHTML = `Your time was: ${reactionTime}ms <br> Click to start a new game`;
    userNotification.style.display = "block";
    startBox.removeEventListener("click", stopReactionGame); // Remove eventListener to avoid the game function lingering and restarting multiple games every click.
    startGame();

}

// Grid game specific JS



function gridGame() {
    gridGameIsOn = true;
    gridScore = 0;
    let gridDifficulty = document.getElementById("grid-difficulty").value;

    // Set tile frequency and point gain based on difficulty selection
    if (gridDifficulty === "easy") {
        tileTime = 1000;
        scoreGain = 10;

    } else if (gridDifficulty === "medium") {
        tileTime = 700;
        scoreGain = 15;

    } else if (gridDifficulty === "hard") {
        tileTime = 400;
        scoreGain = 20;

    }

    startBox.style.backgroundColor = "#b9b9b9";
    tileChange();
    gridGameTime();

}
/**
 * Selects a new random tile in the 4x4 grid to be 
 * higlighted in green. Unless gridGameTime timeout
 * calls for gameIsOn to be set to false where the
 * game will instead end next time the tile is clicked 
 */
function tileChange() {

    if (gridGameIsOn) {
        let tileIndex = Math.floor(Math.random() * 16);
        let gameTile = document.getElementsByClassName("grid-table")[0].getElementsByTagName("th")[tileIndex];
        gameTile.setAttribute("id", "game-tile");
        gridTile = document.getElementById("game-tile");
        waitForTileClick();

    } else {
        stopGridGame();

    }
}



function waitForTileClick() {
    let count = 0;

    /**
     * Time trial so that if the user does not 
     * click the tile within the given "count === x" 
     * the tile will change to a new one
     */
    tileTimer = setInterval(function () {
        for (let i = 0; i < 10; i++) {
            count++;

            if (count === tileTime) {
                gridScore -= 10;
                gridGameScore.innerHTML = gridScore;
                clearInterval(tileTimer);
                gridTile.removeEventListener("click", userClickTile);
                gridTile.removeAttribute("id");
                tileChange();

            }
        }
    }, 10);

    gridTile.addEventListener("click", userClickTile);

}

/**
 * Updates the users score and calls a new tileChange
 * if the user manages to click before the above
 * timer runs out
 */
function userClickTile() {
    gridScore += scoreGain;
    gridGameScore.innerHTML = gridScore;
    clearInterval(tileTimer);
    gridTile.removeEventListener("click", userClickTile);
    gridTile.removeAttribute("id");
    tileChange();

}

/**
 * Timer for how long the game will run until
 * gameIsOn is set to false so stopGame gets  
 * called in tileChange
 */
function gridGameTime() {
    setTimeout(() => {
        gridGameIsOn = false;

    }, 15000);
}

function stopGridGame() {
    if (gridScore > gridHighscore) { // Updates highscore if possible
        localStorage.setItem("gridHighscore", gridScore);
        let gridHighscore = localStorage.getItem("gridHighscore");
        gridHighscoreDisplay.innerHTML = gridHighscore;

    }

    startBox.style.backgroundColor = "green";

    setTimeout(() => { // 2 second timer until startGame is called so that the user doesn't misslick another game start.
        startGame();

    }, 2000);
}


document.addEventListener("DOMContentLoaded", initializePage);