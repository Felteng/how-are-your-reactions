document.addEventListener("DOMContentLoaded", startGame())


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
    } else if (gameMode === "grid") {

        setTimeout(gridGame, startTime * 1000);

    }
};

function reactionGame() {

    const startBox = document.getElementById("game-box");
    startBox.style.backgroundColor = "green";
    let sec = 0;

    /**
     * Timer to count the time it takes the user to click once
     * the game has begun
     */
    let timer = setInterval(function () {
        sec++
    }, 0);

    /**
     * Wait for user to react and click the game-box
     * to end the timer and display the time it took
     */
    startBox.addEventListener("click", stopGame)

    function stopGame() {

        console.log(`Your time was: ${sec.toFixed(3)*4}`);
        clearInterval(timer);
        document.getElementById("notify-user").style.display = "block";
        document.getElementById("notify-user").innerHTML = `Your time was: ${sec.toFixed(3) * 4}ms` // Multiply by 4 here to account for the standard 4ms interval delay in browsers
        startBox.removeEventListener("click", stopGame) // Remove eventListener to avoid the game function lingering and restarting multiple games every click.
        startGame()

    }
}

function gridGame() {

    const startBox = document.getElementById("game-box");
    startBox.style.backgroundColor = "inherit";

    tileChange()

}

function tileChange() {

    let tileIndex = Math.floor(Math.random() * 16);
    let gameTile = document.getElementsByClassName("grid-game")[0].getElementsByTagName("th")[tileIndex];
    gameTile.setAttribute("id", "game-tile");
    tileClick();
    
}

function accuracyTracker() {

}

function tileClick() {
    let count = 0

    let timer = setInterval(function() {
        for (let i = 0; i < 10; i++) {
        count++;

            if (count === 400) {
                clearInterval(timer)
                document.getElementById("game-tile").removeEventListener("click", clear)
                document.getElementById("game-tile").removeAttribute("id")
                tileChange()

            }
        }   
    },10)



        
        document.getElementById("game-tile").addEventListener("click", clear)

        function clear() {

            clearInterval(timer)
            document.getElementById("game-tile").removeEventListener("click", clear)
            document.getElementById("game-tile").removeAttribute("id")
            tileChange()

        }  
}