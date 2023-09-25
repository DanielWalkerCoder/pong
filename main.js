// Size of the game area (in px)
const GAME_AREA_WIDTH = 700;
const GAME_AREA_HEIGHT = 500;

// Size of the paddles (in px)
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 20;

// Size of the ball (in px)
const BALL_SIZE = 20;

// Get the computer paddle, player paddle, and ball elements
const computerPaddle = document.querySelector('.computer-paddle');
const playerPaddle = document.querySelector('.player-paddle')
const pongBall = document.querySelector('.ball')

// The y-velocity of the computer paddle
let computerPaddleYPosition = 0;
let computerPaddleYVelocity = 10;
let playerPaddleYPosition = 200;
let playerPaddleYVelocity = 10;

let pongBallYPosition = 0;
let pongBallYVelocity = 10;
let pongBallXPosition = 0;
let pongBallXVelocity = 10;

let isUpPressed = false;
let isDownPressed = false;
document.addEventListener('keydown', (e)=>{
    isUpPressed = e.key === 'ArrowUp'
    isDownPressed = e.key === 'ArrowDown'
})
document.addEventListener('keyup', ()=>{
    isUpPressed = false
    isDownPressed = false
})


let points = 0
document.querySelector('.score').innerHTML = `Score: ${points} points`


// Update the pong world
function update() {
    //Define positions
    computerPaddleYPosition = computerPaddleYPosition + computerPaddleYVelocity;
    computerPaddle.style.top = `${computerPaddleYPosition}px`;
    pongBallYPosition = pongBallYPosition + pongBallYVelocity;
    pongBall.style.top = `${pongBallYPosition}px`
    playerPaddle.style.top = `${playerPaddleYPosition}px`
    //Update the player paddle's position
    if(isUpPressed && playerPaddleYPosition >= playerPaddleYVelocity){
        playerPaddleYPosition = playerPaddleYPosition - playerPaddleYVelocity
    }
    if(isDownPressed && playerPaddleYPosition <= (400 - playerPaddleYVelocity)){
        playerPaddleYPosition = playerPaddleYPosition + playerPaddleYVelocity
    }
    //Update the ball's position
    if(pongBallYPosition === 480){
        pongBallYVelocity = -1 * pongBallYVelocity
    }
    if(pongBallYPosition === 0){
        pongBallYVelocity = Math.abs(pongBallYVelocity)
    }
    pongBallXPosition = pongBallXPosition + pongBallXVelocity;
    pongBall.style.left = `${pongBallXPosition}px`
    if(pongBallXPosition === 660 && pongBallYPosition <= (computerPaddleYPosition + 120) && pongBallYPosition >= (computerPaddleYPosition - 20)){
        pongBallXVelocity = -1 * pongBallXVelocity
    } else{
    if(pongBallXPosition === 660){
        pongBallXPosition = 340
        pongBallYPosition = 240
        points += 1
        document.querySelector('.score').innerHTML = `Score: ${points} points`
        pongBallXVelocity = -1 * pongBallXVelocity
    }
    }
    if(pongBallXPosition === 20 && pongBallYPosition < (playerPaddleYPosition + 120) && pongBallYPosition > (playerPaddleYPosition - 20)){
        pongBallXVelocity = Math.abs(pongBallXVelocity)
    } else{
    if(pongBallXPosition === 20 && pongBallXVelocity < 0){
        pongBallXPosition = 340
        pongBallYPosition = 240
        pongBallXVelocity = 0
        pongBallYVelocity = 0
        computerPaddleYVelocity = 0
    }
    }
    // Update the computer paddle's position
    if(computerPaddleYPosition === 400){
        computerPaddleYVelocity = -1 * computerPaddleYVelocity
    }
    if(computerPaddleYPosition === 0){
        computerPaddleYVelocity = Math.abs(computerPaddleYVelocity)
    }
    // if(pongBallYPosition <= 400){
    //     computerPaddleYPosition = pongBallYPosition
    // } else{
    //     computerPaddleYPosition = 400
    // }
}

// Call the update() function every 35ms
setInterval(update, 35);