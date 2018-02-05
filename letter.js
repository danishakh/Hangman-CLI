function Letter(letter) {
	this.letter = letter;
	this.displayed = false;
	this.displayLetter = () => {
		// If the letter is a space, display it and return the space
		if (this.letter === ' ') {
			this.displayed = true;
			return ' (space) ';
		}
		// If the letter is not guessed yet, do not display it, display/return _ for it
		if (this.displayed === false) {
			return ' _ ';
		}
		// Else display the letter
		else {
			return ' ' + this.letter + ' ';
		}
	}
}

module.exports = Letter;