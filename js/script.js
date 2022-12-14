//game constrants and variable
let snakeVel = {x: 0, y: 0};
const foodSound = new Audio('food.mp3');
const gameoverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const themeSound = new Audio('theme.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x:12, y:14}
]
let food = {x:4, y:6};


//game function
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(main)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    //if collide with body
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }

    //if colide with walls
    if (snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0){
        return true;
    }
    
}


function gameEngine(){

    //first: updating snake array and food
    if(isCollide(snakeArr)){
        gameoverSound.play();
        // themeSound.pause();
        snakeVel = {x:0, y:0};
        alert("Game Over. Press OK to Play Again");
        snakeArr = [{x:12, y:14}];
        // themeSound.play();
        score = 0;
    }

    //if food is eaten, increment the score and regenerate the food

    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + snakeVel.x, y: snakeArr[0].y + snakeVel.y})
        let a = 1;
        let b = 17;
        food = {x: Math.round(a+(b-a)* Math.random()), y: Math.round(a+(b-a)* Math.random())}
    }


    //Moving Snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += snakeVel.x;
    snakeArr[0].y += snakeVel.y;


    //second: displaying snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('span');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head')
        }
        else{
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement);
    });

    //third: displaying food
        foodElement = document.createElement('span');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);

    }


//main logic


let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}
 

// window.requestAnimationFrame(main);
// window.addEventListener('keydown', e=>{
//     snakeVel= {x:0, y:1}
//     moveSound.play();
//     // themeSound.play();
//     switch (e.key) {
//         case "ArrowUp":
//             console.log("ArrowUp")
//             snakeVel.x = 0;
//             snakeVel.y = -1;
//             break;
    
//         case "ArrowDown":
//             console.log("ArrowDown")
//             snakeVel.x = 0;
//             snakeVel.y = 1;
//             break;
    
//         case "ArrowLeft":
//             console.log("ArrowLeft")
//             snakeVel.x = -1;
//             snakeVel.y = 0;
//             break;
    
//         case "ArrowRight":
//             console.log("ArrowRight")
//             snakeVel.x = 1;
//             snakeVel.y = 0;
//             break;
    
//         default:
//             break;
//     }
     
// });


//touch controls


// let touchstartX = 0;
// let touchstartY = 0;
// let touchendX = 0;
// let touchendY = 0;

// const gestureZone = document.getElementById('modalContent');

// document.addEventListener('touchstart', e => {
//   touchstartY = e.changedTouches[0].screenY
// })

// document.addEventListener('touchend', e => {
//   touchendY = e.changedTouches[0].screenY
// }) 

// document.addEventListener('touchstart', e => {
//   touchstartX = e.changedTouches[0].screenX
// })

// document.addEventListener('touchend', e => {
//   touchendX = e.changedTouches[0].screenX
//   checkDirection()
// }) 

// function checkDirection() {
//     if (touchendX < touchstartX) {
//         console.log('Swiped left');
//         snakeVel.x = -1;
//         snakeVel.y = 0;
//     }
    
//     if (touchendX > touchstartX) {
//         console.log('Swiped right');
//         snakeVel.x = 1;
//         snakeVel.y = 0;
//     }
    
//     if (touchendY < touchstartY) {
//         console.log('Swiped up');
//         snakeVel.x = 0;
//         snakeVel.y = -1;
//     }
    
//     if (touchendY > touchstartY) {
//        console.log('Swiped down');
//        snakeVel.x = 0;
//         snakeVel.y = 1;
//     }
    
// }


// Add event listeners for touch events on the left and right sides of the screen
leftSide.addEventListener('touchstart', () => {
  // Update the snake's direction if it's not moving in the opposite direction
  if (snakeVel.x !== 1) {
    snakeVel.x = -1;
    snakeVel.y = 0;
  }
});
rightSide.addEventListener('touchstart', () => {
  // Update the snake's direction if it's not moving in the opposite direction
  if (snakeVel.x !== -1) {
    snakeVel.x = 1;
    snakeVel.y = 0;
  }
});

// Add event listeners for keyboard events
document.addEventListener('keydown', (event) => {
  // Update the snake's direction based on the arrow keys that were pressed
  if (event.keyCode === 37 && snakeVel.x !== 1) {
    snakeVel.x = -1;
    snakeVel.y = 0;
  } else if (event.keyCode === 38 && snakeVel.y !== 1) {
    snakeVel.x = 0;
    snakeVel.y = -1;
  } else if (event.keyCode === 39 && snakeVel.x !== -1) {
    snakeVel.x = 1;
    snakeVel.y = 0;
  } else if (event.keyCode === 40 && snakeVel.y !== -1) {
    snakeVel.x = 0;
    snakeVel.y = 1;
  }
});





