document.addEventListener("DOMContentLoaded", function() {
    let gameIsOn = false;
    
    let startBox = document.getElementById("reaction-box");
    startBox.addEventListener("click", function() {

        if (gameIsOn === false) {
            gameStartTimer();
            gameIsOn = true;
        } else if (gameIsOn === true) {
            null
        }
    });
})

function gameStartTimer() {
        const min = 1;
        const max = 3;
        let startTime = Math.floor(Math.random() * (max - min + 1) + min); //Generate Random number between 1 - 3
        setTimeout(startGame, startTime * 1000);
};

function startGame() {
    console.log("started")
}

function reactionGame() {

}

function speedTimer() {

}

function precisionGame() {

}

function accuracyTracker() {

}