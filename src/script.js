const wordE1 = document.getElementById("word");
const wrongLettersE1 = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = [
  "fascism",
  "patriarchy",
  "sexism",
  "racism",
  "omophobia",
  "gentrification",
  "poverty",
  "corruption",
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

const startBtn = document.getElementById("start-button");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const wrongSound = new Audio('./assets/evil-shreik-45560.mp3');
const bgMusic = document.getElementById("bg-music");
bgMusic.volume=0.5

function playMusic() {

  bgMusic.play();
}

//Show hidden word
//wordE1.innerHTML = sets the innerHTML property of an HTML element with the id wordE1. This is where the word will be displayed on the webpage.
//The backticks (`) denote a template literal, which allows for string interpolation and multiline strings.

//${selectedWord...} inserts the value of the selectedWord variable into the string.

//.split('') splits the selected word into an array of its individual letters.

//.map(letter => creates a new array of elements, where each element is a span HTML tag with a class of letter.

//${correctLetters.includes(letter) ? letter : ''} is the content of the span tag. If the correctLetters array contains the current letter, then the letter is displayed.
//Otherwise, an empty string is displayed, indicating that the letter has not yet been guessed.

//.join('') concatenates all of the span elements back into a single string.
function displayWord() {
  wordE1.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : ""}
        </span>
        `
      )
      .join("")}
    `;
  //const innerWord = wordE1.innerText.replace(/\n/g, ''); gets the text content of the wordE1 element and assigns it to the innerWord variable
  //The .replace(/\n/g, '') part is a regular expression that removes any newline characters (\n) from the text content.
  const innerWord = wordE1.innerText.replace(/\n/g, "");
  //  if(innerWord === selectedWord) compares the innerWord variable (the player's guess with newline characters removed) to the selectedWord variable (the actual word the player is trying to guess).
  if (innerWord === selectedWord) {
    finalMessage.innerText = "I think you were lucky!!";
    popup.style.display = "flex";
  }
}

// Update the wrong letters
function updateWrongLetterE1() {
  //Display wrong letters
  // ternary operator to check if the length of the wrongLetters array is greater than 0. If it is, the "Letters" heading is displayed, otherwise it is not.
  //The map method is used on the wrongLetters array to create an array of span elements, one for each wrong letter.
  //The resulting array of span elements is then concatenated into the HTML string using template literals.
  wrongLettersE1.innerHTML = `
    ${wrongLetters.length > 0 ? "<p >Letters</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;

  //Display parts
  //the function loops through an array of figure parts, which are the different parts of the hangman.
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  //Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Try a little bit harder. ";
    popup.style.display = "flex";
    
  }
  else {
    // Play wrong letter sound effect
    wrongSound.play();
}
}

//Show notification
function showNotification() {
  notification.classList.add("show");
  //the setTimeout() method to remove the "show" class from the notification element after a delay of 2000 milliseconds (2 seconds)
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

//Keydown letter press
window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    //whether the selectedWord variable (which is assumed to contain a word selected for the hangman game) includes the letter that was pressed.
    //If it does, the code checks whether the correctLetters array already includes the letter.
    //    If it does not, the letter is added to the correctLetters array using the push() method. The displayWord() function is then called,
    // which presumably updates the display of the hangman game to show the correctly guessed letters.
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        //If the letter is already in the correctLetters array, the showNotification() function is called
        showNotification();
      }
    } else {
      //If the selectedWord variable does not include the letter that was pressed, the code checks whether the wrongLetters array already includes the letter.
      //If it does not, the letter is added to the wrongLetters array using the push() method.
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        
        // The updateWrongLetterE1() function is then called, which presumably updates the display of the hangman game to show the wrongly guessed letters.
        updateWrongLetterE1();
      } else {
        //If the letter is already in the wrongLetters array, the showNotification() function is called
        showNotification();
      }
      
    }
  }
});

//Restart game and play again
playAgainBtn.addEventListener("click", () => {
  //Empty arrays
  //the splice() method on the correctLetters and wrongLetters arrays with a starting index of 0, effectively emptying both arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);
  //generates a new random word from an array called words and assigns it to the selectedWord variable.
  selectedWord = words[Math.floor(Math.random() * words.length)];
  //update the display of the hangman game with the new randomly selected word.

  displayWord();
  //update the display of the wrongly guessed letters.
  updateWrongLetterE1();
  //hides the pop-up window that was displayed when the user completed a game.
  popup.style.display = "none";
});

displayWord();

// Add click event listener to start button
//startBtn.addEventListener('click', () => {
//   startBtn.style.display = 'none';
//});
startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  gameScreen.style.display = "block";
});



