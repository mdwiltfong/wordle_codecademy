document.addEventListener("DOMContentLoaded", () => {
  createSquare();

  const guesswords = [[]];
  function getCurrentWord() {
    const numberOfGuessesWords = guesswords.length;
    return guesswords[numberOfGuessesWords - 1];
  }
  function handleSubmitWord() {
    const currentWordArr = getCurrentWord();
    if (currentWordArr.length != 5) {
      window.alert("Word Must be 5 letters");
    }
  }

  function createSquare() {
    const gameBoard = document.getElementById("board");
    for (let index = 0; index < 30; index++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.setAttribute("id", index + 1);
      gameBoard.appendChild(square);
    }
  }
  const keys = document.querySelectorAll(".keyboard-row button");
  console.log(keys);
  for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = ({ target }) => {
      const letter = target.getAttribute("data-key");
      console.log(target);
      if (letter == "enter") {
        handleSubmitWord();
        return;
      }
      if (letter == "del") {
        handleDeleteLetter();
        return;
      }
    };
  }
});
