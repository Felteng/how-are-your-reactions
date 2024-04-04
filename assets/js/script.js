document.addEventListener("DOMContentLoaded", function() {
    let gameIsOn = false;

    const startBox = document.getElementById("reaction-box");
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
        const max = 5;
        let startTime = Math.floor(Math.random() * (max - min + 1) + min); //Generate a random start time between 1 - 5 seconds
        setTimeout(startGame, startTime * 1000);
};

function startGame() {
    const startBox = document.getElementById("reaction-box");
    startBox.style.backgroundColor = "green";
    speedTimer() 
}

function reactionGame() {

}

function speedTimer() {
    let sec = 0;

    let timer = setInterval(function() {
        sec += 1;
        console.log(sec.toFixed(3)*4);
    } ,0);

    document.getElementById("reaction-box").addEventListener("click", function() {
        console.log(`Your time was: ${sec.toFixed(3)*4}`) // Multiply by 4 here to account for the standard 4ms interval delay in browsers
        clearInterval(timer);
    })
}

function precisionGame() {

}

function accuracyTracker() {

}