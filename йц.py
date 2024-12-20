const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const scoreElement = document.getElementById('score');
const ground = document.getElementById('ground');

let score = 0;
let isJumping = false;
let dinoPosition = 30; // Initial bottom position of Dino
let cactusPosition = -50; // Initial position of cactus

// Game Loop
function gameLoop() {
    updateScore();
    moveCactus();
    checkCollision();
}

// Update score
function updateScore() {
    score += 1;
    scoreElement.textContent = `Score: ${score}`;
}

// Move Cactus
function moveCactus() {
    cactusPosition += 5; // Move the cactus to the left
    if (cactusPosition > window.innerWidth) {
        cactusPosition = -50; // Reset the cactus position
    }
    cactus.style.right = `${cactusPosition}px`;
}

// Jump Mechanism
document.addEventListener('keydown', () => {
    if (!isJumping) {
        jump();
    }
});

function jump() {
    isJumping = true;
    let jumpHeight = 0;
    const jumpInterval = setInterval(() => {
        if (jumpHeight < 100) {
            jumpHeight += 10;
            dino.style.bottom = `${dinoPosition + jumpHeight}px`;
        } else {
            clearInterval(jumpInterval);
            const fallInterval = setInterval(() => {
                if (jumpHeight > 0) {
                    jumpHeight -= 10;
                    dino.style.bottom = `${dinoPosition + jumpHeight}px`;
                } else {
                    clearInterval(fallInterval);
                    isJumping = false;
                }
            }, 20);
        }
    }, 20);
}

// Collision Detection
function checkCollision() {
    const dinoRect = dino.getBoundingClientRect();
    const cactusRect = cactus.getBoundingClientRect();

    if (
        dinoRect.left < cactusRect.right &&
        dinoRect.right > cactusRect.left &&
        dinoRect.bottom > cactusRect.top
    ) {
        gameOver();
    }
}

// Game Over
function gameOver() {
    alert(`Game Over! Final Score: ${score}`);
    resetGame();
}

// Reset Game
function resetGame() {
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    cactusPosition = -50;
    dino.style.bottom = '30px'; // Reset dino position to original
}

// Run game loop every 100ms
setInterval(gameLoop, 100);
