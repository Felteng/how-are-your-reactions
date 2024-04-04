document.addEventListener("DOMContentLoaded", startGame())


function startGame() {
let gameIsOn = false;

const startBox = document.getElementById("reaction-box");
startBox.addEventListener("click", function() {

    if (gameIsOn === false) {
        gameIsOn = true;
        document.getElementsByClassName("user-time")[0].style.display = "none";
        startBox.style.backgroundColor = "red";
        gameStartTimer();
    } else if (gameIsOn === true) {
        null
    }
});
}

function gameStartTimer() {

        const min = 1;
        const max = 5;
        let startTime = Math.floor(Math.random() * (max - min + 1) + min); //Generate a random start time between 1 - 5 seconds
        setTimeout(reactionGame, startTime * 1000);

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
       console.log(sec)
    } ,0);

    /**
    * Wait for user to react and click the reaction-box
    * to end the timer and display the time it took
    */
    startBox.addEventListener("click", stopGame)

    function stopGame() {

        console.log(`Your time was: ${sec.toFixed(3)*4}`);
        clearInterval(timer);        
        document.getElementsByClassName("user-time")[0].style.display = "block";
        document.getElementById("time-score").innerHTML = sec.toFixed(3) * 4; // Multiply by 4 here to account for the standard 4ms interval delay in browsers
        startBox.removeEventListener("click", stopGame)        
        startGame()

    }
}

function precisionGame() {

}

function accuracyTracker() {

}