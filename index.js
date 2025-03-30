const gameBoard = document.getElementById("gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.getElementById("score");
const resetBtn = document.getElementById("resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackGround = "white";
const snakeBorder = "black";
const snakeColor = "lightgreen";
const foodColor = "red";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;

// intialize the snake 
let snake = [
    {x: unitSize * 4, y: 0},
    {x: unitSize * 3, y: 0},
    {x: unitSize * 2, y: 0},
    {x: unitSize, y: 0},
    {x: 0, y: 0}
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart() {
    running = true
    scoreText.textContent = score;
    createFood()
    drawFood()
    nextTick()
};

function nextTick() {
    if (running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick(); 
        }, 100);
    } else {
        displayGameOver();
    }
};

function clearBoard() {
   ctx.fillStyle = boardBackGround;
   ctx.fillRect(0, 0, gameWidth, gameHeight);
};

function createFood() {
    function randomFood(min, max) {
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum
    }
    do {
        foodX = randomFood(0, gameWidth - unitSize);
        foodY = randomFood(0, gameHeight - unitSize);
    } while (snake.some(part => part.x === foodX && part.y === foodY));
};

function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
};


function moveSnake(){
    const head = {x: snake[0].x + xVelocity, y: snake[0].y + yVelocity};
    snake.unshift(head); // adds a new head
    // if food is eaten
    if(head.x == foodX && head.y == foodY){
        score += 1;
        scoreText.textContent = score;
        createFood();
    } else{
        snake.pop(); // remove the last part of the snake 
    }
};


function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, unitSize, unitSize);
        ctx.strokeRect(part.x, part.y, unitSize, unitSize);
    });
};


function changeDirection(event){
    if (!running) return;

    const key = event.key; 
    const LEFT = "ArrowLeft";
    const UP = "ArrowUp";
    const RIGHT = "ArrowRight";
    const DOWN = "ArrowDown";

    const goingUp = yVelocity == -unitSize;
    const goingDown = yVelocity == unitSize;
    const goingRight = xVelocity == unitSize;
    const goingLeft = xVelocity == -unitSize;

    switch (true) {
        case (key === LEFT && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case (key === UP && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case (key === DOWN && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
        case (key === RIGHT && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        default:
            break;
    }
};

function checkGameOver(){
    const head = snake[0];
    if (head.x < 0 || head.x >= gameWidth || head.y < 0 || head.y >= gameHeight) {
        running = false;
        return;
    }
    for(let i = 1; i < snake.length; i++){
        if(head.x === snake[i].x && head.y === snake[i].y) {
            running = false;
            return;
        }
    }
}

function displayGameOver() {
    ctx.font = `${gameWidth / 10}px MV Boli`;
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", gameWidth /2, gameHeight/2);
    running = false;
};

function resetGame() {
    clearBoard();
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x: unitSize * 4, y: 0},
        {x: unitSize * 3, y: 0},
        {x: unitSize * 2, y: 0},
        {x: unitSize, y: 0},
        {x: 0, y: 0}
    ];
    gameStart();
};



