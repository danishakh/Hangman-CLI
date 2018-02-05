var Letter = require('./letter.js');
var colors = require('colors');

function Word(word) {

	this.word = word;
	this.lettersInWord = [];
	this.guessedLetters = [];
	this.wordFound = false;

	// function to get the letters in the word, create those letter objects and push them into an array
	this.getLettersInWord = () => {
		// Push each letter in the word into an 'this.lettersInWord' array as a LETTER object
		for (var i = 0; i < word.length; i++) {
			var newLetter = new Letter(word[i]);
			this.lettersInWord.push(newLetter);
		}
	}

	// function to check if a guess is in the word - ie: (lettersInWord array)
	this.checkLetterGuess = (guess) => {
		this.guessedLetters.push(guess);
		var matches = 0;

		for (var i = 0; i < this.lettersInWord.length; i++) {
			if (guess === this.lettersInWord[i].letter) {
				this.lettersInWord[i].displayed = true;
				matches++;
			}
		}

		return matches;
	}

	// function to display the current word in the console
	this.displayLettersInWord = () => {
		var lettersToDisplay = [];

		this.lettersInWord.forEach((letterObj) => {
	        lettersToDisplay.push(letterObj.displayLetter());
	    });

	    console.log(lettersToDisplay.join('').cyan);
	}

	// function to check if the word has been guessed correctly
	// will return true/false depending on if all letters in word are 'displayed' - ie: (letter.displayed = true)
	this.checkIfGuessed = function() {
		//console.log('Word Guessed? ' + this.lettersInWord.every(checkIfTrue));
		if (this.lettersInWord.every(checkIfTrue) === true) {
			this.wordFound = true;
			return true;
		}
		else {
			this.wordFound = false;
			return false;
		}
	}

}

function checkIfTrue(letterObj) {
	return letterObj.displayed;
}


// var myWord = new Word('bat');
// myWord.getLettersInWord();
// myWord.checkLetterGuess('a');
// //console.log(myWord.lettersInWord);
// myWord.displayLettersInWord();
// myWord.checkLetterGuess('t');
// myWord.checkLetterGuess('b');
// myWord.displayLettersInWord();
// myWord.checkLetterGuess('o');


module.exports = Word;
