document.addEventListener("DOMContentLoaded", () => {
  createSquares();
  const guesswords = [[]];
  let word = "dairy";
  let guessedWordCount = 0;
  let availableSpace = 1;
  const keys = document.querySelectorAll(".keyboard-row button");
  console.log(keys);

  /*
// One way to use event capturing. This is a better way to handle event listeners especialy when content is dynamically rendered
const keyboard = document.querySelector("#keyboard-container");
  keyboard.onclick = (e) => {
    console.log(e.target.getAttribute("data-key"));
  }; */

  function getCurrentWordArr() {
    const numberOfGuessesWords = guesswords.length;
    return guesswords[numberOfGuessesWords - 1];
  }

  function updateGuessedWords(letter) {
    const currentWordArr = getCurrentWordArr();

    if (currentWordArr && currentWordArr.length < 5) {
      currentWordArr.push(letter);

      const availableSpaceEl = document.getElementById(String(availableSpace));

      availableSpace = availableSpace + 1;
      availableSpaceEl.textContent = letter;
    }
  }

  function handleSubmitWord() {
    const currentWordArr = getCurrentWordArr();
    if (currentWordArr.length != 5) {
      window.alert("Word Must be 5 letters");
    }
    const currentWord = currentWordArr.join("");
    const firstLetterId = guessedWordCount * 5 + 1;
    const interval = 200;
    currentWordArr.forEach((letter, index) => {
      setTimeout(() => {
        const tileColor = "rgb(58,58,58)";
        const letterId = firstLetterId + index;
        const letterEl = document.getElementById(letterId);
        letterEl.classList.add("animate__flipInX");
        letterEl.style = `background-color:${tileColor};border-color: ${tileColor}`;
      }, interval * index);
    });
    if (currentWord == word) {
      window.alert("Congratulations!");
    }
    guesswords.push([]);
    if (guesswords.length > 6) {
      window.alert(`Sorry, you have no more guesses! The word is ${word}`);
    }
  }

  function createSquares() {
    const gameBoard = document.getElementById("board");

    for (let index = 0; index < 30; index++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.classList.add("animate__animated");
      square.setAttribute("id", index + 1);
      gameBoard.appendChild(square);
    }
  }

  for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = ({ target }) => {
      const letter = target.getAttribute("data-key");
      if (letter == "enter") {
        handleSubmitWord();
        return;
      }

      updateGuessedWords(letter);
    };
  }
});
