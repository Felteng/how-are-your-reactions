document.addEventListener("DOMContentLoaded", startGame())


function startGame() {
let gameIsOn = false;

const startBox = document.getElementById("reaction-box");
startBox.addEventListener("click", function() {

    if (gameIsOn === false) {
        gameIsOn = true;
        document.getElementById("notify-user").style.display = "none";
        startBox.style.backgroundColor = "red";
        gameStartTimer();
    } else if (gameIsOn === true) {
        null // Make it so multiple games cannot get started at the same time by clicking lots.
    }
});
}

function gameStartTimer() {

    const min = 1;
    const max = 5;
    let startTime = Math.floor(Math.random() * (max - min + 1) + min); // Generate a random start time between 1 - 5 seconds
    const startTimer = setTimeout(reactionGame, startTime * 1000);

    const startBox = document.getElementById("reaction-box");
    const userNotification = document.getElementById("notify-user");

    /**
     * End the game start timer early if the user
     * attempts to make preemptively click before
     * the game has started
     */
    startBox.addEventListener("click", tooSoon); // Check if user clicks during start timer

    setTimeout(function() {
        startBox.removeEventListener("click", tooSoon) // Remove listener at the same timer as the game start timer to prevent bugs
    }, startTime * 1000)

    function tooSoon() {

            clearTimeout(startTimer);
            userNotification.textContent = "Oops! Too soon.. Try again!";
            userNotification.style.display = "block";
            startBox.removeEventListener("click", tooSoon)
            startGame()
    }  
};

function reactionGame() {

    const startBox = document.getElementById("reaction-box");
    startBox.style.backgroundColor = "green";
    let sec = 0;

   /**
    * Timer to count the time it takes the user to click once
    * the game has begun
    */
    let timer = setInterval(function() {
       sec++
    } ,0);

    /**
    * Wait for user to react and click the reaction-box
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

function precisionGame() {

}

function accuracyTracker() {

}