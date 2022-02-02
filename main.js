document.addEventListener("DOMContentLoaded", () => {
  createSquares();

  const keys = document.querySelectorAll(".keyboard-row button");
  console.log(keys);
  for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = ({ target }) => {
      const letter = target.getAttribute("data-key");

      console.log(letter);
    };
  }

  /*
// One way to use event capturing. This is a better way to handle event listeners especialy when content is dynamically rendered
const keyboard = document.querySelector("#keyboard-container");
  keyboard.onclick = (e) => {
    console.log(e.target.getAttribute("data-key"));
  }; */

  function createSquares() {
    const gameBoard = document.getElementById("board");

    for (let index = 0; index < 30; index++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.setAttribute("id", index + 1);
      gameBoard.appendChild(square);
    }
  }
});
