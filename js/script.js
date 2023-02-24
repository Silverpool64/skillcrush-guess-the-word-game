const guessedList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const playerInput = document.querySelector(".letter");
const theWord = document.querySelector(".word-in-progress");
const guessesRemainingElement = document.querySelector(".remaining");
const guessesRemainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const retryButton = document.querySelector(".play-again");

const tempWord = "magnolia";
const guessedLetters = [];

function placeholderWord(word) {
	const placeholderLetters = [];
  	for (const letter of word) {
    	console.log(letter);
    	placeholderLetters.push("●");
  	}
  	theWord.innerText = placeholderLetters.join("");
}

placeholderWord(tempWord);

guessButton.addEventListener("click", function (e) {
  	e.preventDefault();
  	message.innerText = "";
  	const guess = playerInput.value;
  	const goodGuess = validateInput(guess);

  	if (goodGuess) {
  		makeGuess(guess);
  	}

  	playerInput.value = "";
});

function validateInput(input) {
	const acceptedLetter = /[a-zA-Z]/;
	if (input === 0) {
		message.innerText = "Please enter a letter.";
	} else if (input.length > 1) {
		message.innerText = "Please enter a single letter.";
	} else if (!input.match(acceptedLetter)) {
		message.innerText = "Please enter a letter from A to Z.";
	} else {
		return input;
	}
}

function makeGuess(letter) {
	letter = letter.toUpperCase()
	if (guessedLetters.includes(letter)) {
		message.innerText = "You already guessed that letter, silly. Try again.";
	} else {
		guessedLetters.push(letter);
		console.log(guessedLetters);
		updatePlayerGuesses();
		updateWord(guessedLetters);
	}
}

function updatePlayerGuesses() {
	guessedList.innerHTML = "";
	for (const letter of guessedLetters) {
    	const li = document.createElement("li");
    	li.innerText = letter;
    	guessedList.append(li);
  	}
}

function updateWord(guessedLetters) {
	const wordUpper = tempWord.toUpperCase();
	const wordArray = wordUpper.split("");
	const revealWord = [];
  	for (const letter of wordArray) {
    	if (guessedLetters.includes(letter)) {
      		revealWord.push(letter.toUpperCase());
    	} else {
      		revealWord.push("●");
    	}
    }

    theWord.innerText = revealWord.join("");
    hasWon();
}

function hasWon() {
	if (tempWord.toUpperCase() === theWord.innerText) {
		message.classList.add("win");
    	message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
	}
}