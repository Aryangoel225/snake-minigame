const gameBoard = document.getElementById("gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.getElementById("score");
const resetBtn = document.getElementById("resetBtn");
const gameWidth = gameBoard.gameWidth;
const gameHeight =  gameBoard.gameHeight;
const snakeColor = "lightgreen";
const foodColor = "red";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;

function getGameHeight(){
    return gameHeight; 
}

function getGameWidth(){
    return gameWidth; 
}


