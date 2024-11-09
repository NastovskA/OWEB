window.addEventListener("load", start, false);

function start() {
    var words = ["pizza", "happy", "jokes", "joker", "black", "clock", "click", "toxic", "squit", "remix"];
    var currentWord = ""; 
    var displayWord = ""; 
    var usedLetters = []; 
    var remainingAttempts = 5; 
    var gameStarted = false;

    var startScreen = document.getElementById("startScreen");
    var gameScreen = document.getElementById("gameScreen");
    var startButton = document.getElementById("startButton");
    var guessButton = document.getElementById("guessButton");
    var letterInput = document.getElementById("letterInput");
    var wordDisplay = document.getElementById("wordDisplay");
    var usedLettersDisplay = document.getElementById("usedLetters");
    var attemptCount = document.getElementById("attemptCount");
    var winPopup = document.getElementById("winPopup");
    var losePopup = document.getElementById("losePopup");
    var correctWordSpan = document.getElementById("correctWord");
    var playAgainButtons = document.querySelectorAll(".playAgain");
    var closeButtons = document.querySelectorAll(".close");

    startButton.addEventListener("click", startGame); 
    guessButton.addEventListener("click", makeGuess); 
    letterInput.addEventListener("keyup", handleEnterKey);

    playAgainButtons.forEach(button => {
        button.addEventListener("click", handlePlayAgain);
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", handleClose);
    });

    function startGame() {
        startScreen.style.display = "none";
        gameScreen.style.display = "block";
        currentWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
        usedLetters = [];
        remainingAttempts = 5;
        gameStarted = true;

        // Show 2 random letters at start
        var indices = [];
        while (indices.length < 2) {
            var randomIndex = Math.floor(Math.random() * currentWord.length);
            if (!indices.includes(randomIndex)) {
                indices.push(randomIndex);
                usedLetters.push(currentWord[randomIndex]);
            }
        }
        
        updateDisplay();
        letterInput.value = "";
        letterInput.focus();
    }

    function updateDisplay() {
        displayWord = "";
        for (var i = 0; i < currentWord.length; i++) {
            if (usedLetters.includes(currentWord[i])) {
                displayWord += currentWord[i];
            } else {
                displayWord += "_";
            }
        }
        wordDisplay.textContent = displayWord;
        usedLettersDisplay.textContent = "Used letters: " + usedLetters.join(", ");
        attemptCount.textContent = remainingAttempts;
    }

    function makeGuess() {
        if (!gameStarted) return;

        var guess = letterInput.value.toUpperCase();
        letterInput.value = "";

        if (guess.length !== 1 || !/[A-Z]/.test(guess)) {
            alert("Please enter a single letter!");
            return;
        }

        if (usedLetters.includes(guess)) {
            alert("You already used this letter!");
            return;
        }

        usedLetters.push(guess);

        if (!currentWord.includes(guess)) {
            remainingAttempts--;
            if (remainingAttempts === 0) {
                correctWordSpan.textContent = currentWord;
                losePopup.style.display = "block";
                gameStarted = false;
                return;
            }
        }

        updateDisplay();

        if (!displayWord.includes("_")) {
            winPopup.style.display = "block";
            gameStarted = false;
        }

        letterInput.focus();
    }

    function handleEnterKey(event) {
        if (event.key === "Enter") {
            makeGuess();
        }
    }

    function handlePlayAgain() {
        winPopup.style.display = "none";
        losePopup.style.display = "none";
        startGame();
    }

    function handleClose() {
        window.close();
    }
}
