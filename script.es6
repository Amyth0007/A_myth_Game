let inputDir = { x: 0, y: 0 };
let foodSound = new Audio("notify/Enemies ahead.mp3");
let gameoverSound = new Audio("notify/Tono SpiderMan.mp3");
let moveSound = new Audio("notify/Naruto jutsu.mp3");
const musicSound = new Audio("BG/Naruto Theme Rockmix.mp3");
let Score = document.getElementById("Score")
// let board = document.getElementById('board');
let speed = 5;
let lastpaintitme = 0;
let snakeArr = [
    { x: 16, y: 5 },
]
food = { x: 9, y: 8 };
musicSound.play();

//Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastpaintitme) / 1000 < 1 / speed) {
        return;
    }
    lastpaintitme = ctime;
    gameEngine();
}

function iscolloide(sarr) {
    //if you bump into yourself
    for (let index = 1; index < snakeArr.length; index++) {
        if (sarr[index].x === sarr[0].x && sarr[index].y === sarr[0].y) {
            return true;
        }
    }
    if (sarr[0].x >= 18 || sarr[0].x <= 0 || sarr[0].y >= 18 || sarr[0].y <= 0) {

        return true;
    }

}

function gameEngine() {
    // part 1 : Upadating the snake arra and food
    if (iscolloide(snakeArr)) {
        gameoverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Gameover , press any key to play agian! ");
        snakeArr = [{ x: 13, y: 15 }];
        // musicSound.play();
        Score = 0;

    }
    // if you have eaten the food increment the score
    if (snakeArr[0].y == food.y && snakeArr[0].x == food.x) {
        foodSound.play();
        Score += 1;
        if (Score > highscoreval) {
            highscoreval = Score;
            localStorage.setItem("Highscore", JSON.stringify(highscoreval));
            Highscore.innerHTML = "Highscore: " + highscoreval;
        }
        Scorebox.innerHTML = "Score: " + Score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }


    // moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };

    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;



    // part 2 Display the snake and food
    //display the food
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    //display the head

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}





let highscore = localStorage.getItem("highscore");
if (highscore === null) {
    highscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval))
}
else {
    highscoreval = JSON.parse(highscore);
    Highscore.innerHTML = "Highscore: " + highscoreval;
}










// main Logic starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }
    musicSound.play();
    moveSound.play();
    switch (e.key) {
        case 'ArrowUp':
            console.log("Arroeup");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case 'ArrowDown':
            console.log("Arroedown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case 'ArrowLeft':
            console.log("Arroeleft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case 'ArrowRight':
            console.log("Arroeright");
            inputDir.x = 1;
            inputDir.y = 0;
            break;


        default:
            break;
    }
})