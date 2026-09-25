import { configs } from "../global.js";
import { Snake } from "./entities/snake.js";
import { Food } from "./entities/food.js";
import { Particles } from "./entities/particles.js"; // Reaproveitando seu código!

// Variáveis de Estado do Jogo
let canvas, ctx;
let snake, food;
let particlesArray = [];
let score = 0;
let gameState = "MENU"; // "MENU", "PLAYING", "GAMEOVER"

// Controle de tempo (Frame Limiter)
let lastTime = 0;
let timer = 0;
const interval = 1000 / configs.gameSpeed; 

window.onload = () => {
    _init();
};

function _init() {
    // 1. Configura o Canvas
    canvas = document.getElementById("game-canvas");
    ctx = canvas.getContext("2d");
    canvas.width = configs.canvasWidth;
    canvas.height = configs.canvasHeight;

    // 2. Instancia as Entidades
    snake = new Snake();
    food = new Food();

    // 3. Captura inputs do teclado
    document.addEventListener("keydown", handleInput);

    // 4. Configura os Botões da Interface
    document.getElementById("btn-start").onclick = startGame;
    document.getElementById("btn-restart").onclick = startGame;
    document.getElementById("btn-menu").onclick = showMenu;

    // 5. Inicia o Loop
    requestAnimationFrame(_gameLoop);
}

// Lida com as Telas
function startGame() {
    snake.reset();
    food.respawn(snake.body);
    score = 0;
    particlesArray = [];
    updateScoreUI();
    
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-over-screen").style.display = "none";
    document.getElementById("hud").style.display = "block";
    
    gameState = "PLAYING";
}

function showMenu() {
    document.getElementById("game-over-screen").style.display = "none";
    document.getElementById("start-screen").style.display = "block";
    document.getElementById("hud").style.display = "none";
    gameState = "MENU";
}

function gameOver() {
    gameState = "GAMEOVER";
    document.getElementById("hud").style.display = "none";
    document.getElementById("game-over-screen").style.display = "block";
    document.getElementById("final-score").innerText = score;
}

// Captura Teclado
function handleInput(e) {
    if (gameState !== "PLAYING") return;
    const s = configs.gridSize;
    switch (e.key) {
        case "ArrowUp":    snake.changeDirection(0, -s); break;
        case "ArrowDown":  snake.changeDirection(0, s); break;
        case "ArrowLeft":  snake.changeDirection(-s, 0); break;
        case "ArrowRight": snake.changeDirection(s, 0); break;
    }
}

function createExplosion(x, y) {
    for (let i = 0; i < 15; i++) {
        particlesArray.push(new Particles(x + configs.gridSize/2, y + configs.gridSize/2, 0, 2, "#e74c3c", 10));
    }
}

// O Ciclo do Jogo
function _update(deltaTime) {
    particlesArray.forEach((p, index) => {
        p.move();
        if (p.life_time <= 0) particlesArray.splice(index, 1);
    });

    if (gameState !== "PLAYING") return;

    // Acumula tempo. Só move a cobra quando o tempo passar do "interval"
    timer += deltaTime;
    if (timer < interval) return;
    timer = 0; // Reseta o timer

    snake.move();

    // Checa se comeu a comida
    const head = snake.body[0];
    const gridSize = configs.gridSize;
    if (
        head.x < food.x + gridSize &&
        head.x + gridSize > food.x &&
        head.y < food.y + gridSize &&
        head.y + gridSize > food.y
    ) {
        score += 10;
        updateScoreUI();
        snake.grow();
        createExplosion(food.x, food.y); // Efeito das partículas!
        food.respawn(snake.body);
    }

    // Checa se morreu
    if (snake.checkCollision()) {
        gameOver();
    }
}

function _draw() {
    // Limpa a tela a cada frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Fundo do jogo
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Se estiver no menu, não desenha o jogo
    if (gameState === "MENU") return;

    food.selfDraw(ctx);
    snake.selfDraw(ctx);
    particlesArray.forEach(p => p.selfDraw(ctx));
}

function updateScoreUI() {
    document.getElementById("score").innerText = score;
}

// O Motor do Canvas
function _gameLoop(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    _update(deltaTime);
    _draw();

    requestAnimationFrame(_gameLoop);
}