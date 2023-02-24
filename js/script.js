const guessedList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const playerInput = document.querySelector(".letter");
const theWord = document.querySelector(".word-in-progress");
const guessesRemainingElement = document.querySelector(".remaining");
const guessesRemainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const retryButton = document.querySelector(".play-again");

const tempWord = "magnolia";

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
  	const guess = playerInput.value;
  	console.log(guess);
  	playerInput.value = "";
});