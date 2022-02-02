/* 
1. First create the eventlistener for when the DOM content is loaded


*/

document.addEventListener("DOMContentLoaded", () => {
  createSquares();

  let word = "dairy";
  let guessedWordCount = 0;
  let availableSpace = 1;

  /* Third Function: Update an array of guessed words. This will serve as our memory */
  function getCurrentWordArr() {
    const numberOfGuessesWords = guesswords.length;
    return guesswords[numberOfGuessesWords - 1];
  }
  const guesswords = [[]];

  function updateGuessedWords(letter) {
    const currentWordArr = getCurrentWordArr();

    if (currentWordArr && currentWordArr.length < 5) {
      currentWordArr.push(letter);
      /* Here we assign the letter to the available space */
      const availableSpaceEl = document.getElementById(String(availableSpace));

      availableSpace = availableSpace + 1;
      availableSpaceEl.textContent = letter;
    }
  }
  function getTileColor(letter, index) {
    const isCorrectLetter = word.includes(letter);
    if (!isCorrectLetter) {
      return "rgb(58,58,60)";
    }

    const letterInThatPosition = word.charAt(index);
    const isCorrectPosition = letter === letterInThatPosition;
    if (isCorrectPosition) {
      return "rgb(83,141,78)";
    }
    return "rgb(181,159,59)";
  }
  /* Fifth Function: handleSubmitWord function to handle when "enter" is hit */
  function handleSubmitWord() {
    const currentWordArr = getCurrentWordArr();
    if (currentWordArr.length != 5) {
      window.alert("Word Must be 5 letters");
    }
    const currentWord = currentWordArr.join("");
    /* ##################################### THIS PORTION OF THE CODE HANDLES THE FLIP OF THE LETTERS*/
    const firstLetterId = guessedWordCount * 5 + 1;
    const interval = 200;
    currentWordArr.forEach((letter, index) => {
      setTimeout(() => {
        const tileColor = getTileColor(letter, index);
        const letterId = firstLetterId + index;
        const letterEl = document.getElementById(letterId);
        letterEl.classList.add("animate__flipInX");
        letterEl.style = `background-color:${tileColor};border-color: ${tileColor}`;
      }, interval * index);
    });

    /* FIRST DICUSS WINNING SCENARIOS */
    guessedWordCount += 1;
    if (currentWord == word) {
      window.alert("Congratulations!");
    }
    guesswords.push([]);
    if (guesswords.length > 6) {
      window.alert(`Sorry, you have no more guesses! The word is ${word}`);
    }
  }
  function handleDeleteLetter() {
    const currentWordArr = getCurrentWordArr();
    const removedLetter = currentWordArr.pop();

    guesswords[guesswords.length - 1] = currentWordArr;
    const lastLetterEl = document.getElementById(String(availableSpace - 1));
    lastLetterEl.textContent = " ";
    availableSpace = availableSpace - 1;
  }

  /* First make createSquare and the for loop*/
  function createSquares() {
    const gameBoard = document.getElementById("board");

    for (let index = 0; index < 30; index++) {
      let square = document.createElement("div");
      square.classList.add("square");
      /* This is for the animate.css packagfe you use */
      square.classList.add("animate__animated");
      square.setAttribute("id", index + 1);
      gameBoard.appendChild(square);
    }
  }

  /* Second Function: assign an onclick handler to each key */

  /*
  // One way to use event capturing. This is a better way to handle event listeners especialy when content is dynamically rendered
  const keyboard = document.querySelector("#keyboard-container");
  keyboard.onclick = (e) => {
    console.log(e.target.getAttribute("data-key"));
  }; */
  const keys = document.querySelectorAll(".keyboard-row button");
  console.log(keys);
  for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = ({ target }) => {
      const letter = target.getAttribute("data-key");

      if (letter == "enter") {
        handleSubmitWord();
        return;
      }
      if (letter == "del") {
        handleDeleteLetter();
        return;
      }

      updateGuessedWords(letter);
    };
  }
});
