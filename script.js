// Created with the help of Chat GPT

// Initialize game state
let currentPlayer = 1; // 1 for Player 1, 2 for Player 2
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;
let player1Emoji = "";
let player2Emoji = "";

// DOM Elements
const startButton = document.getElementById("start-button");
const startScreen = document.getElementById("start-screen");
const emojiSelectionScreen1 = document.getElementById("emoji-selection-screen1");
const emojiSelectionScreen2 = document.getElementById("emoji-selection-screen2");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");
const statusMessage = document.getElementById("status-message");
const playAgainButton = document.getElementById("play-again-button");

const nextButton1 = document.getElementById("next-button-1");  // Next button for Player 1
const nextButton2 = document.getElementById("next-button-2");  // Next button for Player 2
const generateEmoji1Button = document.getElementById("generate-emoji1");
const generateEmoji2Button = document.getElementById("generate-emoji2");

const cells = document.querySelectorAll(".cell");
const endMessage = document.getElementById("end-message");

// Emojis to choose from
const emojis = ["😀", "😎", "😜", "😍", "🤔", "🤖", "👾", "👻", "💀"];

// Generate random emoji
function generateRandomEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)];
}

// Handle Player 1 emoji selection
function generatePlayer1Emoji() {
    player1Emoji = generateRandomEmoji();
    document.getElementById("player1-emoji").textContent = player1Emoji;
    nextButton1.style.display = "inline-block";  // Show the next button for Player 1
}

// Handle Player 2 emoji selection
function generatePlayer2Emoji() {
    let emoji = generateRandomEmoji();
    while (emoji === player1Emoji) {
        emoji = generateRandomEmoji(); // Ensure Player 2's emoji is different from Player 1's
    }
    player2Emoji = emoji;
    document.getElementById("player2-emoji").textContent = player2Emoji;
    nextButton2.style.display = "inline-block";  // Show the next button for Player 2
}

// Generate Player 1's emoji when clicked
generateEmoji1Button.addEventListener("click", generatePlayer1Emoji);

// Generate Player 2's emoji when clicked
generateEmoji2Button.addEventListener("click", generatePlayer2Emoji);

// After Player 1 chooses emoji, show Player 2's emoji selection screen
nextButton1.addEventListener("click", function() {
    emojiSelectionScreen1.style.display = "none";
    emojiSelectionScreen2.style.display = "block";
});

// After Player 2 chooses emoji, start the game
nextButton2.addEventListener("click", function() {
    initializeGame(); // Start the game after both players choose emojis
});

// Start the game and initialize the game board
function initializeGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = 1; // Player 1 starts the game
    gameOver = false;
    statusMessage.textContent = `Player 1's turn`;

    gameScreen.style.display = "block";
    emojiSelectionScreen2.style.display = "none";
    cells.forEach((cell, index) => {
        cell.textContent = "";
        cell.addEventListener("click", () => handleClick(index));
    });

    // Hide the start button when the game starts
    startScreen.style.display = "none"; // Hide the start screen and its start button
}

// Handle cell click during game
function handleClick(index) {
    if (gameBoard[index] === "" && !gameOver) {
        gameBoard[index] = currentPlayer;
        cells[index].textContent = currentPlayer === 1 ? player1Emoji : player2Emoji;
        if (checkWin()) {
            gameOver = true;
            endMessage.textContent = `Player ${currentPlayer} wins!`;
            showEndScreen();
        } else if (gameBoard.every(cell => cell !== "")) {
            gameOver = true;
            endMessage.textContent = "It's a tie!";
            showEndScreen();
        } else {
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            statusMessage.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

// Check if the current player wins
function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    return winPatterns.some(pattern => {
        return pattern.every(index => gameBoard[index] === currentPlayer);
    });
}

// Show the end screen with the result
function showEndScreen() {
    gameScreen.style.display = "none";
    endScreen.style.display = "block";
}

// Play again button to reset the game
playAgainButton.addEventListener("click", () => {
    endScreen.style.display = "none";
    startScreen.style.display = "block";
    initializeGame();

    // Show the start button again on the start screen
    startButton.style.display = "inline-block"; // Show start button on start screen
});

// Start button action
startButton.addEventListener("click", function() {
    startScreen.style.display = "none";
    emojiSelectionScreen1.style.display = "block";
    startButton.style.display = "none"; // Hide start button immediately after it is clicked
});
