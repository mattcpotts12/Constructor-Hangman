
// dependency for npm packages
var inquirer = require("inquirer");
var rightAlign = require('right-align');
var center = require('center-align');
const chalk = require('chalk');

const log = console.log;


// var hangman_words = ["mississippi", "dallas", "canada", "mexico"];
var hangman_words = ["shit on a stick", "fucking ass whip", "kill me know", "son of a bitch"];
var gameWord = "";
var wordDisplay = [];
var guessedLettersArr = [];
// var wins = 0;
// var losses = 0;
var gameCount = 0;
var gamePlay = true;
var miss = 10;


function Word(word) {
    this.word = word[Math.floor(Math.random() * word.length)];
    this.wordDisplay = function() {
        for (var i = 0; i < this.word.length; i++) {
            if (this.word[i] === " ") {
                wordDisplay[i] = " "
            }else {
                wordDisplay[i] = "_";
            }
        }
        log("WORD BLANK SPLIT: " + wordDisplay.join(" "));
        return wordDisplay.join("");
    };
} // FUNCTION Word


function Letter(let) {
    this.letter = let;
} // FUNCTION Letter


Letter.prototype.letterGuessed = function() {
    if (guessedLettersArr.includes(this.letter) === true) {
        log("----Letter Already Guessed----Try Again----");      
        return false;
    }else {
        if (gameWord.includes(this.letter) === false) {
            miss--;
            log(chalk.red("INCORRECT"));
            log(chalk.blue(miss) + " Incorrect Guesses Remaining");  
        }else {
            log(chalk.green("CORRECT!"));
        }

        guessedLettersArr.push(this.letter);
        log("Guessed Letters >>>> " + guessedLettersArr.join(" ") + " <<<<");




        return true;
    }
};

Letter.prototype.letterMatch = function() {
    for (var i = 0; i < gameWord.length; i++) {
        if (gameWord[i] === this.letter) {
            wordDisplay[i] = this.letter;
        }
    }
    log("wordDisplay: " + wordDisplay.join(" "));
    return wordDisplay.join(" ");
};



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

function endGame() {
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
        }
    })
}

function roundCheck() {
    if (wordDisplay.includes("_") === false) {
        return false; 
    }else {
        return true;
    }
}




function startGame(){
    guessedLettersArr = [];
    wordDisplay = [];
    var newWord = new Word(hangman_words);
    gameWord = newWord.word;
    log("gameWord: " + gameWord);

    var wordDisplay = newWord.wordDisplay();

    function playGame(roundNumber) {
        roundNumber++;
        log("Round #:" + roundNumber);

        if (miss === 0) {
            log("GAME OVER");
            endGame();
            return;
        }
        

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
        ]).then(function(prmpt) {
            var guess = prmpt.guess;            
            var newLetter = new Letter(guess);
            log("GUESS " + guess);

            newLetter.letterGuessed();
            newLetter.letterMatch();



            if (roundCheck() === true) {
                playGame(roundNumber);
            }else {
                endGame();
                // inquirer.prompt([
                //     {
                //         type: "confirm",
                //         name: "game",
                //         message: "Would you like to play again?"
                //     }
                // ]).then(function(prmpt) {
                //     log(prmpt.game);
                //     if (prmpt.game === true) {
                //         startGame();
                //     }else {
                //         log("You disapoint me");
                //     }
                // })
            }

        })
    }
    playGame(0);
}




setupGame();
