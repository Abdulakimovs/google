const gameContainer = document.querySelector('.game-container');
const player = document.getElementById('player');
const bot = document.getElementById('bot');
const scoreboard = document.getElementById('scoreboard');

let score = 0;
let playerPosition = { x: 0, y: 0 };
let botPosition = { x: 0, y: 0 };

// Move the player with arrow keys
document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft') {
        playerPosition.x -= 5;
    } else if (e.code === 'ArrowRight') {
        playerPosition.x += 5;
    } else if (e.code === 'ArrowUp') {
        playerPosition.y -= 5;
    } else if (e.code === 'ArrowDown') {
        playerPosition.y += 5;
    }

    // Keep player within game bounds
    playerPosition.x = Math.max(0, Math.min(gameContainer.offsetWidth - player.offsetWidth, playerPosition.x));
    playerPosition.y = Math.max(0, Math.min(gameContainer.offsetHeight - player.offsetHeight, playerPosition.y));

    player.style.left = playerPosition.x + 'px';
    player.style.top = playerPosition.y + 'px';
});

// Move the bot automatically
function moveBot() {
    const botSpeed = 1;
    
    // Move the bot vertically and horizontally towards the player
    if (botPosition.x < playerPosition.x) {
        botPosition.x += botSpeed;
    } else if (botPosition.x > playerPosition.x) {
        botPosition.x -= botSpeed;
    }
    
    if (botPosition.y < playerPosition.y) {
        botPosition.y += botSpeed;
    } else if (botPosition.y > playerPosition.y) {
        botPosition.y -= botSpeed;
    }

    bot.style.left = botPosition.x + 'px';
    bot.style.top = botPosition.y + 'px';

    // Check for collision with player
    if (isCollision(player, bot)) {
        score += 1;
        scoreboard.textContent = 'Score: ' + score;
        botPosition.x = Math.random() * (gameContainer.offsetWidth - bot.offsetWidth); // Randomize bot position
        botPosition.y = Math.random() * (gameContainer.offsetHeight - bot.offsetHeight);
    }
}

// Check for collision
function isCollision(player, bot) {
    const playerRect = player.getBoundingClientRect();
    const botRect = bot.getBoundingClientRect();

    return !(playerRect.right < botRect.left || 
             playerRect.left > botRect.right || 
             playerRect.bottom < botRect.top || 
             playerRect.top > botRect.bottom);
}

// Game loop
function gameLoop() {
    moveBot();
    requestAnimationFrame(gameLoop);
}

gameLoop();
