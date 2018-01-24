
// dependency for npm packages
var inquirer = require("inquirer");
var rightAlign = require('right-align');
var center = require('center-align');
const chalk = require('chalk');

const log = console.log;


// var hangman_words = ["mississippi", "dallas", "canada", "mexico"];
var hangman_words = ["guardians of the galaxy", "wonder woman", "despicable me", "fast and furious", "pirates of the caribbean", "justice league", "planet of the apes", "beauty and the beast", "transformers", "blade runner", "harry potter", "lord of the rings"];
var gameWord = "";
var wordDisplay = [];
var guessedLettersArr = [];
// var wins = 0;
// var losses = 0;
var gameCount = 0;
var gamePlay = true;
var miss = 10;


log(chalk.bgBlue("\n" + chalk.underline("Welcome to the Constructor Hangman Game\n")));

function Word(word) {
    this.word = word[Math.floor(Math.random() * word.length)];
} // FUNCTION Word

Word.prototype.wordDisplay = function() {
    for (var i = 0; i < this.word.length; i++) {
        if (this.word[i] === " ") {
            wordDisplay[i] = " "
        }else {
            wordDisplay[i] = "_";
        }
    }
    log(wordDisplay.join(" "));
    // return wordDisplay.join("");  
}


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
            guessedLettersArr.push(this.letter);
            log(chalk.red("INCORRECT           ") + chalk.blue(miss) + " Incorrect Guesses Remaining" + "           Guessed Letters >>>> " + guessedLettersArr.join(" ") + " <<<<");
        }else {
            guessedLettersArr.push(this.letter);
            log(chalk.green("CORRECT!            ") + chalk.blue(miss) + " Incorrect Guesses Remaining" + "           Guessed Letters >>>> " + guessedLettersArr.join(" ") + " <<<<");
        }
        return true;
    }
};

Letter.prototype.letterMatch = function() {
    for (var i = 0; i < gameWord.length; i++) {
        if (gameWord[i] === this.letter) {
            wordDisplay[i] = this.letter;
        }
    }
    log("wordDisplay TEST: " + wordDisplay.join(" "));
    return wordDisplay.join(" ");
    // return true;
};



function setupGame() {
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What do you want to do?",
            choices: [
                "Play Game",
                "Instructions",
                "Exit"
            ]
        }
    ]).then(function(prmpt) {
        if (prmpt.action === "Play Game"){
            log("Try to complete the phrase below\n");
            startGame();
        }
        if (prmpt.action === "Instructions") {
            log(chalk.underline("\nInstructions"));
            log("You have 10 incorrect guess to complete the given phrase\n");
            setupGame();
        }
        if (prmpt.Exit === "Exit") {
            log("Goodbye");
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
        if (prmpt.game === true) {
            log('\n')
            startGame();
        }else {
            log("Goodbye");
        }
    })
}

function roundCheck() {
    if (wordDisplay.includes("_") === false) {
        return false; 
    }
}




function startGame(){
    guessedLettersArr = [];
    wordDisplay = [];

    var newWord = new Word(hangman_words);
    gameWord = newWord.word;
    // log("gameWord: " + gameWord);
    newWord.wordDisplay();
    var wordDisplay = newWord.wordDisplay();

    log("guessedLettersArr TEsT: " + guessedLettersArr);
    log("wordDisplay TESt 1: " + wordDisplay);
    log("gameWord TeST: " + gameWord);




    function playGame(roundNumber) {
        roundNumber++;
        // log("Round #:" + roundNumber);

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
            // log("GUESS " + guess);

            log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||\n");

            newLetter.letterGuessed();
            newLetter.letterMatch();
            

            log("\n");

            if (roundCheck() === false) {
                endGame();
            }else {
                playGame(roundNumber);
            }

        })
    }
    playGame(0);
}




setupGame();
