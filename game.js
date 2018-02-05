var Word = require('./word.js');
var inquirer = require('inquirer');
var colors = require('colors');

var topics = {
	cities: ['amsterdam', 'boston', 'chicago', 'dubai', 'madrid', 'sydney', 'melbourne', 'toronto', 'paris', 'san francisco'],
	animals: ['deer', 'gorilla', 'horse', 'spider', 'penguin', 'eagle', 'leopard', 'elephant', 'octopus', 'gorilla'],
	techCompanies: ['intel', 'yelp', 'nvidia', 'facebook', 'yahoo', 'dell', 'pied piper', 'google', 'apple', 'samsung', 'sony']
}

function HangmanGame() {
	this.guessesRemaining = 10;
	this.guesses = [];
	this.currentWord = null;
	this.wins = 0;
	this.losses = 0;
	this.startGame = function() {
		if (this.guessesRemaining === 10) {
			console.log('******** NEW GAME! ********');
			inquirer.prompt([
			{
	          name: "topic",
	          type: "list",
	          message: "Please choose a topic:",
	          choices: ['Famous Cities', 'Animals', 'Tech Companies']    
			}
			]).then((result) => {
				if (result.topic === 'Famous Cities') {
					var selectedWord = topics.cities[Math.floor(Math.random()*topics.cities.length)];
					this.currentWord = new Word(selectedWord);
					//console.log(currentWord);
					this.currentWord.getLettersInWord();
					this.currentWord.displayLettersInWord();
					this.askToGuess();
				}
				else if (result.topic === 'Animals') {
					var selectedWord = topics.animals[Math.floor(Math.random()*topics.animals.length)];
					this.currentWord = new Word(selectedWord);
					//console.log(currentWord);
					this.currentWord.getLettersInWord();
					this.currentWord.displayLettersInWord();
					this.askToGuess();
				}
				else if (result.topic === 'Tech Companies') {
					var selectedWord = topics.techCompanies[Math.floor(Math.random()*topics.techCompanies.length)];
					this.currentWord = new Word(selectedWord);
					this.currentWord.getLettersInWord();
					this.currentWord.displayLettersInWord();
					this.askToGuess();
				}
			});
		}
		else {
			this.resetGame();
			this.startGame();
		}
		
	}
	this.resetGame = function() {
		this.guessesRemaining = 10;
		this.guesses = [];
	}
	this.askToGuess = function() {
		inquirer.prompt([
			{
				name: "letterGuess",
				type: "input",
				message: "Guess a letter:",
				validate: function(input) {
					if (input.length > 1 || input.length === 0) {
						return 'Please enter a single letter!'.red;
					}
					var objRegExp  = /^[a-z\u00C0-\u00ff]+$/;
  					if(objRegExp.test(input)) {
  						return true;
  					} 
  					else return 'Please enter a letter!'.red;
				}
			}
		]).then((result) => {
			var guessedLetter = result.letterGuess;
			
			// flag to check if letter is already guessed
			var guessedAlready = false;

			for (var i = 0; i < this.guesses.length; i++) {
				if(guessedLetter === this.guesses[i]) {
					guessedAlready = true;
				}
			}

			// if letter has not been guessed yet
			if (guessedAlready === false) {

				// add letter to guesses array
				this.guesses.push(guessedLetter);

				// check how many times this letter is in the word
				var matches = this.currentWord.checkLetterGuess(guessedLetter);

				// if letter is not in the word
				if (matches === 0) {

					console.log('Oops! Wrong Guess! \n'.red);
					this.guessesRemaining--;
					
					console.log('*******************');
					this.currentWord.displayLettersInWord();
					console.log('*******************\n');

					console.log('Letters Guessed: ' + this.guesses);
					console.log('Guesses Remaining: ' + this.guessesRemaining + '\n');

				}

				// letter in the word
				else {
					console.log('Correct!');

					// if all letters are guessed - notify user they won
					if (this.currentWord.checkIfGuessed() === true) {

						console.log('*******************');
						this.currentWord.displayLettersInWord();
						console.log('*******************\n');

						console.log('CONGRATULATIONS! You won this round!!!');
						this.wins++;

						console.log('Wins: ' + this.wins);
						console.log(colors.red('Losses: %s'), this.losses.toString());

						// ask user to play again
						inquirer.prompt([
							{
								name: "playAgain",
								type: "confirm",
								message: "Play another round?",
								default: false
							}
						]).then((result) => {
							if (result.playAgain) {
								this.resetGame();
								this.startGame();
							}	
						});
					}

					// display the letter, and continue game
					else {
						console.log('*******************');
						this.currentWord.displayLettersInWord();
						console.log('*******************\n');

						console.log('Letters Guessed: ' + this.guesses);
						console.log('Guesses Remaining: ' + this.guessesRemaining);
					}

				}

				// as long as user has guesses remaining and the word isn't guessed - keep asking user to guess
				if (this.guessesRemaining > 0 && this.currentWord.wordFound === false) {
					this.askToGuess();
				}

				// if the user is out of guesses
				else if (this.guessesRemaining === 0) {
					console.log('Looks like you are out of guesses!'.red);
					console.log('GAME OVER'.red);
					this.losses++;
					
					console.log('Wins: ' + this.wins);
					console.log(colors.red('Losses: %s'), this.losses.toString());
					
					// ask user to play again
					inquirer.prompt([
						{
							name: "playAgain",
							type: "confirm",
							message: "Play another round?",
							default: false
						}
					]).then((result) => {
						if (result.playAgain) {
							this.resetGame();
							this.startGame();
						}	
					});
				}

			}

			// letter already guessed
			else {
					console.log('Letter already guessed! Please guess a different letter!'.yellow);
					this.askToGuess();
			}
			

		});	
	}

}

var myGame = new HangmanGame();
myGame.startGame();







