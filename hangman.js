
// dependency for inquirer npm package
var inquirer = require("inquirer");
var rightAlign = require('right-align');
var center = require('center-align');
const chalk = require('chalk');

const log = console.log;


// var hangman_words = ["simple", "complex"];
var hangman_words = ["mississippi", "dallas", "canada", "mexico"];
var gameWord = "";
var wordDisplay = [];
var guessedLettersArr = [];
// var wins = 0;
// var losses = 0;
var gameCount = 0;
var gamePlay = true;

log(chalk.blue(center("CENTER", 100)) + rightAlign("RIGHT"));




function Word(word) {
    this.word = word[Math.floor(Math.random() * word.length)];
    this.wordDisplay = function() {
        wordDisplay = [];
        for (var i = 0; i < this.word.length; i ++) {
            wordDisplay.push("_");
        }
        log(wordDisplay.join(" "));

        return wordDisplay.join(" ");

    };
} // FUNCTION Word




function Letter(let) {
    this.letter = let;
} // FUNCTION Letter

Letter.prototype.guessedLetters = function() {
    if (guessedLettersArr.includes(this.letter) === true) {
        log("----Letter Already Guessed----Try Again----");      
        return false;
    }else {
        guessedLettersArr.push(this.letter);
        log("Guessed Letters >>>> " + guessedLettersArr.join(" ") + " <<<<");
        return true;
    }
}; // PROTOTYPE guessedLetters

Letter.prototype.letterMatch = function() {
    for (var i = 0; i < gameWord.length; i++) {
        if (gameWord[i] === this.letter) {
            wordDisplay[i] = this.letter;
        }
    }
    log("wordDisplay: " + wordDisplay.join(" "));
    return wordDisplay;
} //PROTOTYPE letterMatch

Letter.prototype.gameCheck = function(roundNumber) {
    if (wordDisplay.includes("_") === false) {
        return false;
    }else {
        return true;
    }
} // PROTOTYPE gameCheck


function setupGame() {

    inquirer.prompt([
        {
            type: "confirm",
            name: "confirm",
            message: "Welcome to the Hangman Game.  \nPress " + chalk.green("Enter") + " to play"
        }
    ]).then(function(prmpt) {
        if (prmpt.confirm === true) {
            startGame();
        }
    })
}



//======================================================++++++++++++========
function startGame() {
    // creates a new word for the game
    var newWord = new Word(hangman_words);
    gameWord = newWord.word;
    log("gameWord: " + gameWord);

    var wordDisplay = newWord.wordDisplay();

    function playGame(roundNumber) {
    


        roundNumber++;
        log("Round: " + roundNumber);
        inquirer.prompt([       
            {
                name: "guess",
                message: "Guess a Letter!",
                validate: function(value) {
                    if (isNaN(value) == true && value.length < 2) {
                        return true;
                    }
                    log("\n----Invalid Entry--Guess Again----");
                    return false;
                }
            }
        ]).then(function(pmpt) {
            var newLetter = new Letter(pmpt.guess);
            var guess = pmpt.guess

            newLetter.guessedLetters();
            newLetter.letterMatch();
            


            if (newLetter.gameCheck() === true) {
                playGame(roundNumber);
            }else {
                inquirer.prompt([
                    {
                        type: "confirm",
                        name: "game",
                        message: "Would you like to play again?"
                    }
                ]).then(function(prmpt) {
                    log(prmpt.game);
                    if (prmpt.game === true) {
                        startGame();
                    }else {
                        log("You disapoint me");
                        return false;
                    }
                })
            }
        }) // THEN
    } // FUNCTION playGame
    playGame(0);
} //FUNCTION startGame


setupGame();
// startGame();
