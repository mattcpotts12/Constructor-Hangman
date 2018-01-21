
// dependency for inquirer npm package
var inquirer = require("inquirer");


// var hangman_words = ["simple", "complex"];
var hangman_words = ["mississippi", "dallas", "canada", "mexico"];
var gameWord = "";
var wordDisplay = [];
var guessedLettersArr = [];
var wins = 0;
var losses = 0;
var gamePlay = true;



function Word(word) {
    this.word = word[Math.floor(Math.random() * word.length)];
    this.wordDisplay = function() {
        wordDisplay = [];
        for (var i = 0; i < this.word.length; i ++) {
            wordDisplay.push("_");
        }
        console.log(wordDisplay.join(" "));
        return wordDisplay.join(" ");
    };
} // FUNCTION Word




function Letter(let) {
    this.letter = let;
} // FUNCTION Letter

Letter.prototype.guessedLetters = function() {
    if (guessedLettersArr.includes(this.letter) === true) {
        console.log("----Letter Already Guessed----Try Again----");      
        return false;
    }else {
        guessedLettersArr.push(this.letter);
        console.log("Guessed Letters >>>> " + guessedLettersArr.join(" ") + " <<<<");
        return true;
    }
}; // PROTOTYPE guessedLetters

Letter.prototype.letterMatch = function() {
    for (var i = 0; i < gameWord.length; i++) {
        if (gameWord[i] === this.letter) {
            wordDisplay[i] = this.letter;
        }
    }
    console.log("wordDisplay: " + wordDisplay.join(" "));
    return wordDisplay;
} //PROTOTYPE letterMatch

Letter.prototype.gameCheck = function(roundNumber) {
    if (wordDisplay.includes("_") === false) {
        return false;
    }else {
        return true;
    }
} // PROTOTYPE gameCheck




//======================================================++++++++++++========
function startGame() {
    // creates a new word for the game
    var newWord = new Word(hangman_words);
    gameWord = newWord.word;
    console.log("gameWord: " + gameWord);

    var wordDisplay = newWord.wordDisplay();

    function playGame(roundNumber) {

        roundNumber++;
        console.log("Round: " + roundNumber);
        inquirer.prompt([
            // {
            //     type: "confirm",
            //     name: "confirm",
            //     message: "Welcome to the Hangman Game. \nWould you like to see the instructions?"
            // },         
            {
                name: "guess",
                message: "Guess a Letter!",
                validate: function(value) {
                    if (isNaN(value) == true && value.length < 2) {
                        return true;
                    }
                    console.log("\n----Invalid Entry--Guess Again----");
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
                console.log("GAME OVER");
            }
        }) // THEN
    } // FUNCTION playGame
    playGame(0);
} //FUNCTION startGame

startGame();
