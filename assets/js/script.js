// Start nav-bar toggling and eventlistener for starting the game when document is loaded
document.addEventListener("DOMContentLoaded", startGame(), navigation())

// Allow the user to toggle the navbar if their screen size needs it
function navigation() {
    let navToggled = false

    let navBar = document.getElementsByClassName("nav-bar")[0]
    let navToggler = document.getElementById("navbar-toggle")

    navToggler.addEventListener("click", toggleNav)

    function toggleNav() {
        if (navToggled === false) {
            navBar.style.display = "block";
            navToggler.classList.remove("fa-bars")
            navToggler.classList.add("fa-x")
            navToggled = true;
        } else if (navToggled === true) {
            navBar.style.display = "none"
            navToggler.classList.remove("fa-x")
            navToggler.classList.add("fa-bars")
            navToggled = false
        }     
        
    }
        
}

function startGame() {
    let gameIsOn = false;

    const startBox = document.getElementById("game-box");
    startBox.addEventListener("click", function () {

        if (gameIsOn === false) {
            gameIsOn = true;
            if (this.getAttribute("game-mode") === "reaction") {

                const gameMode = "reaction";
                gameStartTimer(gameMode);
                document.getElementById("notify-user").style.display = "none";

            } else if (this.getAttribute("game-mode") === "grid") {

                const gameMode = "grid";
                gameStartTimer(gameMode)

            }

            startBox.style.backgroundColor = "red";

        } else {
            null // Make it so multiple games cannot get started at the same time by clicking a lot.
        }
    });
}

function gameStartTimer(gameMode) {

    const min = 1;
    const max = 5;
    let startTime = Math.floor(Math.random() * (max - min + 1) + min); // Generate a random start time between 1 - 5 seconds

    // Reaction game start execution
    
    if (gameMode === "reaction") { 

        const startTimer = setTimeout(reactionGame, startTime * 1000); // Countdown to call reactionGame function

        const startBox = document.getElementById("game-box");
        const userNotification = document.getElementById("notify-user");

        /**
         * End the game start timer early if the user
         * attempts to make preemptively click before
         * the game has started
         */
        startBox.addEventListener("click", tooSoon); // Check if user clicks during start timer

        setTimeout(function () {

            startBox.removeEventListener("click", tooSoon) // Remove listener at the same time as the game starts to prevent bugs and loops

        }, startTime * 1000)

        function tooSoon() {

            clearTimeout(startTimer);
            userNotification.textContent = "Oops! Too soon.. Try again!";
            userNotification.style.display = "block";
            startBox.removeEventListener("click", tooSoon)
            startGame()

        }

    // Grid game start execution    

    } else if (gameMode === "grid") { 

        setTimeout(gridGame, startTime * 1000);

    }
};

// Reaction game specific JS

function reactionGame() {

    const startBox = document.getElementById("game-box");
    startBox.style.backgroundColor = "green";
    let sec = 0;

    /**
     * Timer to count the time it takes the user to click once
     * the game has begun
     */
    let timer = setInterval(function () {
        for (let i = 0; i < 9; i++) {  // For loop of 9 iterations on 11ms interval gives decent accuracy until a fix for precise 1ms timer is implemented
           sec++ 
        }
    }, 11);

    /**
     * Wait for user to react and click the game-box
     * to end the timer and display the time it took
     */
    startBox.addEventListener("click", stopGame)

    function stopGame() {

        console.log(`Your time was: ${sec}`);
        clearInterval(timer);
        document.getElementById("notify-user").style.display = "block";
        document.getElementById("notify-user").innerHTML = `Your time was: ${sec}ms` 
        startBox.removeEventListener("click", stopGame) // Remove eventListener to avoid the game function lingering and restarting multiple games every click.
        startGame()

    }
}


// Grid game specific JS

var highScore = 0;


function gridGame() {
    let score = 0;
    let gameIsOn = true;
    const gridDifficulty = document.getElementById("grid-difficulty").value;
    const startBox = document.getElementById("game-box");
    const currentScore = document.getElementById("score");
    const highestScore = document.getElementById("highscore")

    // Set tile frequency and point gain based on difficulty selection
    if (gridDifficulty === "easy") {
        var tileTime = 800;
        var scoreGain = 10;
    } else if (gridDifficulty === "medium") {
        var tileTime = 600;
        var scoreGain = 15
    } else if (gridDifficulty === "hard") {
        var tileTime = 400;
        var scoreGain = 20;
    }

    startBox.style.backgroundColor = "#b9b9b9";
    console.log(gridDifficulty)
    tileChange()
    gridGameTime()



    function tileChange() {

        if (gameIsOn) {
        let tileIndex = Math.floor(Math.random() * 16);
        let gameTile = document.getElementsByClassName("grid-table")[0].getElementsByTagName("th")[tileIndex];
        gameTile.setAttribute("id", "game-tile");
        tileClick();
        } else {
            stopGame()
        }
    }



    function tileClick() {
        
        let count = 0;

        /**
         * Time trial function so that if the user does not 
         * click the tile within the given "count === x" 
         * the tile will change to a new one
         */
        let timer = setInterval(function() {
            for (let i = 0; i < 10; i++) {
            count++;

                if (count === tileTime) {
                    score -= 10 ;
                    currentScore.innerHTML = score;
                    clearInterval(timer)
                    document.getElementById("game-tile").removeEventListener("click", userClick)
                    document.getElementById("game-tile").removeAttribute("id")
                    tileChange()

                }
            }   
        },10)



            
        document.getElementById("game-tile").addEventListener("click", userClick)

        function userClick() {
            score += scoreGain;
            currentScore.innerHTML = score;
            clearInterval(timer);
            document.getElementById("game-tile").removeEventListener("click", userClick);
            document.getElementById("game-tile").removeAttribute("id");
            tileChange()

        }  
    }

    function gridGameTime() {
        setTimeout(() => {
            gameIsOn = false
            
        }, 10000);
    }

    function stopGame() {
       if (score > highScore) {
        highScore = score;
        highestScore.innerHTML = highScore
        } 

        startBox.style.backgroundColor = "green";
        setTimeout(() => {
            startGame()
        }, 2000);
    }
}