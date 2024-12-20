import pygame
import sys

# Initialize pygame
pygame.init()

# Screen dimensions
WIDTH, HEIGHT = 800, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Geometry Dash")

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
BLUE = (0, 0, 255)

# Clock and FPS
clock = pygame.time.Clock()
FPS = 60

# Player
player_size = 30
player_x = 50
player_y = HEIGHT - player_size - 10
player_speed = 8
gravity = 1
jump_strength = -15
player_velocity_y = 0
is_jumping = False

# Obstacles
obstacle_width = 20
obstacle_height = 50
obstacle_speed = 6
obstacles = []

# Fonts
font = pygame.font.SysFont(None, 36)

# Game state
score = 0
run_game = True

def draw_player(x, y):
    pygame.draw.rect(screen, BLUE, (x, y, player_size, player_size))

def draw_obstacles(obstacles):
    for obs in obstacles:
        pygame.draw.rect(screen, RED, obs)

def display_score(score):
    text = font.render(f"Score: {score}", True, BLACK)
    screen.blit(text, (10, 10))

def game_over():
    screen.fill(WHITE)
    text = font.render("Game Over! Press R to Restart", True, BLACK)
    screen.blit(text, (WIDTH // 2 - text.get_width() // 2, HEIGHT // 2 - text.get_height() // 2))
    pygame.display.flip()

# Main game loop
while run_game:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

    keys = pygame.key.get_pressed()
    if keys[pygame.K_SPACE] and not is_jumping:
        player_velocity_y = jump_strength
        is_jumping = True

    # Update player
    player_velocity_y += gravity
    player_y += player_velocity_y
    if player_y >= HEIGHT - player_size - 10:
        player_y = HEIGHT - player_size - 10
        is_jumping = False

    # Update obstacles
    for obs in obstacles:
        obs.x -= obstacle_speed
        if obs.x + obstacle_width < 0:
            obstacles.remove(obs)
            score += 1

    # Add new obstacles
    if len(obstacles) == 0 or obstacles[-1].x < WIDTH // 2:
        new_obstacle = pygame.Rect(WIDTH, HEIGHT - obstacle_height - 10, obstacle_width, obstacle_height)
        obstacles.append(new_obstacle)

    # Check collisions
    player_rect = pygame.Rect(player_x, player_y, player_size, player_size)
    for obs in obstacles:
        if player_rect.colliderect(obs):
            game_over()
            run_game = False
            break

    # Draw everything
    screen.fill(WHITE)
    draw_player(player_x, player_y)
    draw_obstacles(obstacles)
    display_score(score)

    pygame.display.flip()
    clock.tick(FPS)

    # Restart logic
    if not run_game:
        keys = pygame.key.get_pressed()
        if keys[pygame.K_r]:
            player_y = HEIGHT - player_size - 10
            obstacles.clear()
            score = 0
            run_game = True
