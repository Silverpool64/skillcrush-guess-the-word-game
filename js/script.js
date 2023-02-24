const guessedList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const playerInput = document.querySelector(".letter");
const theWord = document.querySelector(".word-in-progress");
const guessesRemainingElement = document.querySelector(".remaining");
const guessesRemainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const retryButton = document.querySelector(".play-again");
const formLabel = document.querySelector("form label");

const defaultGuesses = 8;
let remainingGuesses = defaultGuesses;
let word = "magnolia";
let guessedLetters = [];

async function getWord() {
	const request = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  	const data = await request.text();
  	const wordArray = data.split("\n");

  	const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();

    placeholderWord(word);
}

getWord();

function placeholderWord(word) {
	const placeholderLetters = [];
  	for (const letter of word) {
    	console.log(letter);
    	placeholderLetters.push("●");
  	}
  	theWord.innerText = placeholderLetters.join("");
}

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
		countGuesses(letter);
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
	const wordUpper = word.toUpperCase();
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

function countGuesses(guess) {
	const wordUpper = word.toUpperCase();
	if (wordUpper.includes(guess)) {
		message.innerText = `Good guess! The word has the letter ${guess}.`;
	} else {
		message.innerText = `Sorry, the word has no ${guess}.`;
		remainingGuesses -= 1;
	}

	if (remainingGuesses === 0) {
    	message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
    	startOver();
  	} else if (remainingGuesses === 1) {
   		guessesRemainingSpan.innerText = `${remainingGuesses} guess`;
  	} else {
   		guessesRemainingSpan.innerText = `${remainingGuesses} guesses`;
  	}
}

function hasWon() {
	if (word.toUpperCase() === theWord.innerText) {
		message.classList.add("win");
    	message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;

    	startOver();
	}
}

function startOver() {
	guessButton.classList.add("hide");
	guessesRemainingElement.classList.add("hide");
	guessedList.classList.add("hide");
	formLabel.classList.add("hide");
	playerInput.classList.add("hide");
	retryButton.classList.remove("hide");
}

retryButton.addEventListener("click", function () {
  	message.classList.remove("win");
  	guessedLetters = [];
  	remainingGuesses = defaultGuesses;
  	guessesRemainingSpan.innerText = `${remainingGuesses} guesses`;
  	guessedList.innerHTML = "";
  	message.innerText = "";

	getWord();

  	guessButton.classList.remove("hide");
  	guessesRemainingElement.classList.remove("hide");
  	guessedList.classList.remove("hide");
  	formLabel.classList.remove("hide");
  	playerInput.classList.remove("hide");
  	retryButton.classList.add("hide");
});