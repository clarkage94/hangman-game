var wordBank = ["ford", "chevrolet", "audi", "bmw", "toyota", "lexus", "subaru", "lamborghini", "ferrari", "aston martin", "nissan", "infiniti", "honda", "mazda", "porsche", "buick", "kia", "acura", "volvo", "gmc", "hyundai", "volkswagen", "lincoln", "cadillac", "mercedes-benz", "jeep"];
var	correctWord = [];
var	displayWord = [];
var	wrongLetters = [];

var hangman = {
	guessesLeft: 10,
	gamesWon: 0,


	pickWord : function() {
		var index = Math.floor( Math.random() * wordBank.length);
		correctWord = wordBank[index].split("");
	},

	drawBoard : function() {
		document.getElementById("wins").innerHTML = hangman.gamesWon;
		document.getElementById("guesses").innerHTML = hangman.guessesLeft;
		for(var i = 0; i < correctWord.length; i++) {
			if (correctWord[i] === " ") {
				displayWord[i] = " ";
			}
			else {
				displayWord[i] = "_";
			}
		}
		document.getElementById("board").innerHTML = displayWord.join("");
	},


	playGame : function() {
		document.addEventListener('keyup', function userInput(guess) {
			if(correctWord.includes(guess.key)) {
				for(var i = 0; i < correctWord.length; i++){
					if(guess.key === correctWord[i]) {
					 	displayWord[i] = guess.key; 
					}
				}
			}
			else if (wrongLetters.includes(guess.key)) {
			}
			else {
				wrongLetters.push(guess.key);
				document.getElementById("usedLetters").innerHTML = wrongLetters;
				hangman.guessesLeft --;
				document.getElementById("guesses").innerHTML = hangman.guessesLeft;
				document.getElementById ("hangmanPic").src = "./assets/images/carBrands"+hangman.guessesLeft+".jpg";
			}
			document.getElementById("board").innerHTML = displayWord.join("");
			document.getElementById("game-over").className = "hidden";

			if(correctWord.join("") == displayWord.join("")) {
				hangman.youWon();
				document.removeEventListener('keyup', userInput);
			}
			if(hangman.guessesLeft === 0) {
				document.removeEventListener('keyup', userInput);
				hangman.youLost();
			}
		})
	},

	youWon : function() {
		document.getElementById("game-over").className = "fade-out";
		document.getElementById("game-over").innerHTML = "Congratulations! You won! Press Enter key to play again.";
		hangman.gamesWon ++;
		document.getElementById("wins").innerHTML = hangman.gamesWon;
		document.addEventListener('keyup', function again(yes) {
			if(yes.keyCode == 13){
				document.removeEventListener('keyup', again);
				hangman.newGame();
			};
		})
	} ,

	youLost : function() {
		document.getElementById("game-over").className = "fade-out";
		document.getElementById("game-over").innerHTML = "Sorry, you ran out of guesses! Press Enter key to play again.";
		document.getElementById("board").innerHTML = correctWord.join("");
		document.addEventListener('keyup', function again(yes) {
			if(yes.keyCode == 13){
				document.removeEventListener('keyup', again);
				hangman.newGame();
			};
		})
	},

	reset : function() {
		wrongLetters = [];
		document.getElementById("usedLetters").innerHTML = "";
		document.getElementById("guesses").innerHTML = "";
		hangman.guessesLeft = 10;
		displayWord = [];
		document.getElementById("board").innerHTML = "";
		document.getElementById("hangmanPic").src = "./assets/images/carBrands.jpg";

	},

	newGame : function() {
		hangman.reset();
		hangman.pickWord();
		hangman.drawBoard();
		hangman.playGame();
	},
}

hangman.newGame();