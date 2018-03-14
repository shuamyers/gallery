'use strict'


var gNum = getRandomIntInclusive(1, 40);
console.log(gNum);


function guessClicked() {
    var userGuess = +prompt('Enter you guess here');
    var elGuess = document.querySelector('.user-guess');
    var htmlStrTooHigh = '<h1>You guessed ' + userGuess + ': Too high Try agin </h1>';
    var htmlStrTooLow = '<h1>You guessed ' + userGuess + ': Too low Try agin </h1>';
    var htmlStrWin = '<h1>You guessed coract the num was: ' + userGuess + '</h1>';

    if (userGuess === gNum) elGuess.innerHTML = htmlStrWin;
    else if (userGuess > gNum) elGuess.innerHTML = htmlStrTooHigh;
    else if (userGuess < gNum) elGuess.innerHTML = htmlStrTooLow;
}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}