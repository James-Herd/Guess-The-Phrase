let phrase = "";
let copyOfPhrase = "";
let guesses = 0;
let startTime = 0;
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
let timerInterval;
let timerDisplay = document.getElementById("timerDisplay");

function timer() {
  startTime = 0;
  timerDisplay.textContent = "Time: " + startTime;
  clearInterval(timerInterval);

  timerInterval = setInterval(function () {
    if (copyOfPhrase.length === 0) {
      clearInterval(timerInterval); // Stop the timer
      return;
    }
    startTime++;
    timerDisplay.textContent = "Time: " + startTime;
  }, 1000);
}

function displayUniqueLettersCount(copyOfPhrase) {
  let element = document.getElementById("unique-letters");
  let uniqueLetters = new Set();

  for (let i = 0; i < copyOfPhrase.length; i++) {
    uniqueLetters.add(copyOfPhrase[i]);
  }

  element.innerText = "Unique Letters: " + uniqueLetters.size;
}

function guessedLetter(letter, element) {
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
      }, 1800);
    }, 50);
  }
}

function blurGuessedLetters(element) {
  element.classList.add("blur-letter");
}

function generateNewPhrase() {
  timer();
  clearCurrentPhrase();
  clearGuessesCounter();
  phrase = getRandomPhrase();
  copyOfPhrase = phrase;
  displayUniqueLettersCount(copyOfPhrase);
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
  "UNRAVEL THE MYSTERIES OF LIFE",
  "DREAM BEYOND THE HORIZON",
  "SWIM IN THE OCEAN OF CREATIVITY",
  "LEAP INTO THE UNKNOWN",
  "WHIRLWINDS OF WONDER",
  "WHISPERS OF THE ETHEREAL",
  "ECHOES OF EUPHORIA",
  "RIDE THE RAINBOWS OF IMAGINATION",
  "DANCE WITH THE SHADOWS",
  "FLY WITH THE PHOENIX",
  "EMBRACE THE WONDROUS JOURNEY",
  "SPARKLE LIKE STARDUST",
  "EXPLORE THE REALM OF POSSIBILITY",
  "UNLEASH YOUR INNER LIGHT",
  "BE THE ARCHITECT OF YOUR DESTINY",
  "EMBRACE THE QUIRKINESS",
  "DANCE IN THE RAIN",
  "SEEK ADVENTURE DAILY",
  "SPARKLE LIKE A FIREFLY",
  "CHASE WHIMSICAL DREAMS",
  "SAVOR THE QUIET MOMENTS",
  "LET YOUR IMAGINATION SOAR",
  "EXPLORE THE UNKNOWN PATHS",
  "BEFRIEND THE MOONLIGHT",
  "WHISPER TO THE STARS",
  "WANDER WITH PURPOSE",
  "PAINT WITH WORDS",
  "FOLLOW THE WHISPERS OF THE WIND",
  "DIVE INTO THE UNIVERSE OF POSSIBILITIES",
  "EMBRACE THE MAGIC WITHIN",
  "NEVER UNDERESTIMATE THE POWER OF A STRONG RESILIENT SPIRIT",
  "IN ORDER TO SUCCEED WE MUST FIRST BELIEVE THAT WE CAN",
  "THE FUTURE BELONGS TO THOSE WHO BELIEVE IN THE BEAUTY OF THEIR DREAMS",
  "SUCCESS IS NOT FINAL FAILURE IS NOT FATAL IT IS THE COURAGE TO CONTINUE THAT COUNTS",
  "BE THE CHANGE THAT YOU WISH TO SEE IN THE WORLD",
  "LIFE IS NOT ABOUT WAITING FOR THE STORM TO PASS ITS ABOUT LEARNING TO DANCE IN THE RAIN",
  "THE ONLY LIMIT TO OUR REALIZATION OF TOMORROW WILL BE OUR DOUBTS OF TODAY",
  "DONT BE PUSHED AROUND BY THE FEARS IN YOUR MIND BE LED BY THE DREAMS IN YOUR HEART",
  "SUCCESS IS THE SUM OF SMALL EFFORTS REPEATED DAY IN AND DAY OUT",
  "EVERYTHING YOUVE EVER WANTED IS ON THE OTHER SIDE OF FEAR",
  "THE ONLY WAY TO DO GREAT WORK IS TO LOVE WHAT YOU DO",
  "SUCCESS IS NOT FINAL FAILURE IS NOT FATAL IT IS THE COURAGE TO CONTINUE THAT COUNTS",
  "EVERY STRIKE BRINGS ME CLOSER TO THE NEXT HOME RUN",
  "THE FUTURE BELONGS TO THOSE WHO BELIEVE IN THE BEAUTY OF THEIR DREAMS",
  "THE BEST WAY TO PREDICT THE FUTURE IS TO CREATE IT",
  "THE ONLY LIMIT TO OUR REALIZATION OF TOMORROW WILL BE OUR DOUBTS OF TODAY",
  "THE BIGGEST RISK IS NOT TAKING ANY RISK",
  "HARD TIMES MAY HAVE HELD YOU DOWN BUT THEY WILL NOT LAST FOREVER WHEN ALL IS SAID AND DONE YOU WILL BE INCREASINGLY GRATEFUL FOR EVERY MOMENT OF YOUR LIFE",
  "WHEN ONE DOOR OF HAPPINESS CLOSES ANOTHER OPENS BUT OFTEN WE LOOK SO LONG AT THE CLOSED DOOR THAT WE DO NOT SEE THE ONE THAT HAS BEEN OPENED FOR US",
  "EVERYTHING YOU CAN IMAGINE IS REAL",
  "BELIEVE YOU CAN AND YOURE HALFWAY THERE",
  "DONT LET YESTERDAY TAKE UP TOO MUCH OF TODAY",
  "THE ONLY IMPOSSIBLE JOURNEY IS THE ONE YOU NEVER BEGIN",
  "YOU ARE NEVER TOO OLD TO SET ANOTHER GOAL OR TO DREAM A NEW DREAM",
  "IN THE MIDST OF DIFFICULTY LIES OPPORTUNITY",
  "HAPPINESS IS NOT BY CHANCE BUT BY CHOICE",
  "THE WAY GETS BETTER WHEN YOU WALK IT",
  "EVERY DAY MAY NOT BE GOOD BUT THERES SOMETHING GOOD IN EVERY DAY",
  "DONT COUNT THE DAYS MAKE THE DAYS COUNT",
  "THE FUTURE STARTS TODAY NOT TOMORROW",
  "THERE IS NO LIMIT TO WHAT WE CAN ACCOMPLISH WHEN WE DONT CARE WHO GETS THE CREDIT",
  "THE ONLY TIME YOU SHOULD EVER LOOK BACK IS TO SEE HOW FAR YOUVE COME",
  "DREAMS DONT WORK UNLESS YOU DO",
  "YOU MUST BE THE CHANGE YOU WISH TO SEE IN THE WORLD",
  "THE SECRET OF GETTING AHEAD IS GETTING STARTED",
  "THE BEST WAY TO PREDICT YOUR FUTURE IS TO CREATE IT",
  "YOU ARE NEVER TOO OLD TO SET ANOTHER GOAL OR TO DREAM A NEW DREAM",
  "IT ALWAYS SEEMS IMPOSSIBLE UNTIL ITS DONE",
  "THE HARDER YOU WORK FOR SOMETHING THE GREATER YOULL FEEL WHEN YOU ACHIEVE IT",
  "YOU ARE CAPABLE OF MORE THAN YOU KNOW",
];

window.onload = function () {
  generateNewPhrase();
};
