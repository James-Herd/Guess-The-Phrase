let phrase = "";
let copyOfPhrase = "";
let guesses = 0;
let guessedLetters = [];
let alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

function timer() {
  let seconds = 60;
  let timerButton = document.getElementById("timer");

  for (i = 0; i < 60; i++) {
    setTimeout(() => {
      seconds = seconds -= 1;
      timerButton.innerText = seconds;
    }, 1000);
  }
}

function guessedLetter(letter, element) {
  timer();
  incrementGuesses();
  blurGuessedLetters(element);

  revealCorrectlyGuessedLetters(letter);

  gameWonMessage(letter);
}

function revealCorrectlyGuessedLetters(letter) {
  if (phrase.includes(letter)) {
    let targetClass = "phrase-letter";

    let elementsWithClass = document.querySelectorAll("." + targetClass);

    elementsWithClass.forEach(function (element) {
      // Check if the inner text of the element matches the target letter
      if (element.innerText.trim() === letter) {
        // If matched, do something with the element
        element.classList.remove("blur-letter");
      }
    });
  }
}

function gameWonMessage(letter) {
  //remove letter from phrase until none left, win!!!
  if (copyOfPhrase.indexOf(" " !== -1)) {
    copyOfPhrase = copyOfPhrase.replaceAll(" ", "");
  }

  copyOfPhrase = copyOfPhrase.replaceAll(letter, "");

  // if (result.length === 0) {
  //   alert("Winner!!");
  // }

  if (copyOfPhrase.length === 0) {
    let x = document.getElementById("winnerMessagePanel");
    setTimeout(() => {
      x.classList.remove("displayNone");
      setTimeout(() => {
        x.classList.add("displayNone");
      }, 2000);
    }, 100);
  }
}

function blurGuessedLetters(element) {
  element.classList.add("blur-letter");
}

function generateNewPhrase() {
  clearCurrentPhrase();
  clearGuessesCounter();
  phrase = getRandomPhrase();
  copyOfPhrase = phrase;
  generateMarkupForNewPhrase(phrase);
  resetBlurredAlphabetLetters();
}

function resetBlurredAlphabetLetters() {
  let elements = document.querySelectorAll(".alphabet-letter");
  elements.forEach((element) => {
    element.classList.remove("blur-letter");
  });
}

function clearCurrentPhrase() {
  let container = document.getElementById("phrase-panel");
  container.textContent = "";
}

function getRandomPhrase() {
  const randomIndex = Math.floor(Math.random() * PHRASES.length);
  return PHRASES[randomIndex].toUpperCase();
}

function splitPhrase(newPhrase) {
  var words = newPhrase.split(" ");
  var lines = [];
  var currentLine = "";

  words.forEach(function (word) {
    if ((currentLine + word).length <= 14) {
      currentLine += (currentLine === "" ? "" : " ") + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  });

  // Add the last line
  lines.push(currentLine);

  return lines;
}

// iterate over each letter in new phrase
function generateMarkupForNewPhrase(newPhrase) {
  let container = document.getElementById("phrase-panel");
  let lines = splitPhrase(newPhrase);
  let globalCounter = 0;

  lines.forEach((line) => {
    for (let i = globalCounter; i < line.length + globalCounter; i++) {
      let div = document.createElement("div");
      div.classList.add("phrase-letter");
      div.classList.add("blur-letter");

      if (line[i - globalCounter] === " ") {
        div.classList.add("hidden");
      }

      let paragraph = document.createElement("p");
      paragraph.textContent = line[i - globalCounter];

      div.appendChild(paragraph);
      container.appendChild(div);
    }

    globalCounter += line.length;

    let divRow = document.createElement("div");
    divRow.classList.add("row");
    container.appendChild(divRow);
  });
}

function incrementGuesses() {
  guesses += 1;

  let guessesContainer = document.getElementById("guesses");
  guessesContainer.innerHTML = "Guesses " + guesses;
}

function clearGuessesCounter() {
  guesses = 0;

  let guessesContainer = document.getElementById("guesses");
  guessesContainer.innerHTML = "Guesses";
}

const PHRASES = [
  "TODAY WAS A GOOD DAY",
  "THERE IS NO I IN TEAM",
  "WHISPERING WINDS CARRY SECRETS OF THE NIGHT",
  "ECHOES OF LAUGHTER DANCE IN THE MOONLIGHT",
  "SERENITY FOUND IN A CUP OF TEA",
  "TIMES EMBRACE A FLEETING MOMENT IN ETERNITY",
  "STARS SPRINKLE THE NIGHT SKY LIKE CELESTIAL CONFETTI",
  "PETALS OF HOPE BLOOM AMIDST CHAOS",
  "LAUGHTER IS THE MUSIC OF THE SOUL",
  "SHADOWS WHISPER TALES OF FORGOTTEN DREAMS",
  "THE UNIVERSE UNFOLDS ITS MYSTERIES WITH EACH BREATH",
  "FOOTPRINTS IN THE SAND TRACES OF A WANDERING SOUL",
  "MEET ME AT THE ALTER",
  "MY LOVE ALWAYS AND FOREVER",
  "NEVER GIVE UP ON YOUR DREAMS",
  "BE THE CHANGE YOU WANT TO SEE",
  "LIVE LIFE TO THE FULLEST",
  "DREAM BIG WORK HARD",
  "STAY POSITIVE AND KEEP SMILING",
  "BELIEVE IN YOURSELF ALWAYS",
  "MAKE EVERY MOMENT COUNT",
  "LEARN FROM YESTERDAY LIVE FOR TODAY",
  "CHASE YOUR PASSION",
  "STRIVE FOR GREATNESS EVERY DAY",
];

window.onload(generateNewPhrase());
