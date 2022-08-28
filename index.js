const gameBoard = document.getElementById("game-board");
const context = gameBoard.getContext("2d");
const scoreText = document.getElementById("score");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "tan";
const snakeColor = "teal";
const snakeBorder = "black";
const colors = ["green", "red", "rgba(133,122,200)", "#f15025", "yellow", "cyan", "purple", "black", "#f12ff0"];
const unitSize = 25;
const pauseButton = document.getElementById("pauseBtn");
const playButton = document.getElementById("playBtn");
let paused = true;
let foodColor = "yellow";
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodY;
let foodX;
let score = 0;
let snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);
//pauseButton.addEventListener("click", pauseEvent);
//playButton.addEventListener("click", playEvent);

gameStart();

function gameStart(){
    running = true;
    paused = false;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75)
    }
    else{
        displayGameOver();
    }
};
function clearBoard(){
    context.fillStyle = boardBackground;
    context.fillRect(0, 0, gameWidth, gameHeight);
};
function createFood(){
    function randomFood(min, max){

        const randomNumber = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randomNumber;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);
    console.log(foodX);
};
function drawFood(){
    context.fillStyle = foodColor;
    context.fillRect(foodX, foodY, unitSize, unitSize);
};
function moveSnake(){
    const head = {x: snake[0].x + xVelocity, 
            y: snake[0].y + yVelocity}

    snake.unshift(head);
    //if food eaten
    //here, we assume eaten occures when head coordinates match food coordinates, x and y
    if (snake[0].x == foodX && snake[0].y == foodY) {
        score += 1;
        scoreText.textContent = score;
        createFood();
        changeFoodColor();
        console.log(foodColor);
    } else {
        snake.pop();
    }

};
function drawSnake(){
    context.fillStyle = snakeColor;
    context.strokeStyle = snakeBorder;
    snake.forEach((snakePart)=> {
        context.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        context.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};
function changeDirection(event){
    //eack key has a key number which will be gotten below and stored
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUP = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch (true) {
        case (keyPressed == LEFT && !goingRight):
                xVelocity = -unitSize;
                yVelocity = 0;
            break;
        case (keyPressed == UP && !goingDown):
                xVelocity = 0;
                yVelocity = -unitSize;
            break;
        case (keyPressed == RIGHT && !goingLeft):
                xVelocity = unitSize;
                yVelocity = 0;
            break;
        case (keyPressed == DOWN && !goingUP):
                xVelocity = 0;
                yVelocity = unitSize;
            break;
        default:
            break;
    }
};
function changeFoodColor(){
    let randNum = Math.floor(Math.random() * colors.length);

        foodColor = colors[randNum];
}
function checkGameOver(){
     switch(true){
        case(snake[0].x < 0):
            running = false;
            break; 
        case(snake[0].x >= gameWidth):
            running = false;
            break;
        case(snake[0].y < 0):
            running = false;
            break;
        case(snake[0].y >= gameHeight):
            running = false;
            break;
     }
     for (let i = 1; i < snake.length; i++) {
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y)
        running = false;
     }
};
function displayGameOver(){
    context.font ="50px fantasy";
    context.fillStyle = "tomato";
    context.textAlign = "center";
    context.fillText("GAME OVER", gameWidth / 2, gameHeight / 2);
    context.font ="50px fantasy";
    context.fillStyle = "purple";
    context.fillText(`Score: ${score}`, gameWidth / 2, gameHeight / 3);
    
};
function resetGame(){
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    running = true;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];
};


//this section contains the pause and play

// function pauseEvent(){
//     if(!paused && running){
//     paused = true;
//     score = score;
//     displayPaused();
// }
// }
// function displayPaused(){
//     context.font ="50px fantasy";
//     context.fillStyle = "tomato";
//     context.textAlign = "center";
//     context.fillText("GAME PAUSED", gameWidth / 2, gameHeight / 2);
// };
// function playEvent(){
//     if(paused){
//     paused = false;
//     running = true;
//     score = score;
//     gameStart();
//     }
// }

