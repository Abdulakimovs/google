const gameContainer = document.querySelector('.game-container');
const player = document.getElementById('player');
const scoreboard = document.getElementById('scoreboard');

let score = 0;

// Function to create zombies
function createZombie() {
    const zombie = document.createElement('div');
    zombie.classList.add('zombie');
    
    // Randomize starting position of zombie
    zombie.style.left = Math.random() * (gameContainer.offsetWidth - 50) + 'px';
    
    gameContainer.appendChild(zombie);
    
    // Collision detection between player and zombie
    let zombieInterval = setInterval(() => {
        if (isCollision(player, zombie)) {
            score += 1;
            scoreboard.textContent = 'Score: ' + score;
            gameContainer.removeChild(zombie);
            clearInterval(zombieInterval);
        }
    }, 10);
    
    // Remove zombie if it goes off-screen
    setTimeout(() => {
        gameContainer.removeChild(zombie);
        clearInterval(zombieInterval);
    }, 5000);
}

// Check for collision between player and zombie
function isCollision(player, zombie) {
    const playerRect = player.getBoundingClientRect();
    const zombieRect = zombie.getBoundingClientRect();
    
    return !(playerRect.right < zombieRect.left || 
             playerRect.left > zombieRect.right || 
             playerRect.bottom < zombieRect.top || 
             playerRect.top > zombieRect.bottom);
}

// Move player with mouse
gameContainer.addEventListener('mousemove', (e) => {
    const playerX = e.clientX - gameContainer.offsetLeft - player.offsetWidth / 2;
    player.style.left = Math.max(0, Math.min(gameContainer.offsetWidth - player.offsetWidth, playerX)) + 'px';
});

// Create zombies every 2 seconds
setInterval(createZombie, 2000);
