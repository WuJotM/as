const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

let ball, ballX, ballY, snake_move, head, move, moveturn;
let ball_size = 20;

let apple_size = 20;

let dx = 20, dy = 0;
gamerunning = true

snake_move = [
    {x: 100, y: 20},
    {x: 120, y: 20},
    {x: 140, y: 20},
]

function snake(snake_move) {
    ctx.fillStyle = "yellow";
    ctx.strokeStyle = 'blue';
    ctx.fillRect(snake_move.x, snake_move.y, 20, 20);
    ctx.strokeRect(snake_move.x, snake_move.y, 20, 20);
}

function background() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function snakedraw() {
    snake_move.forEach(snake);
}

function automaticmove() {

    const head = {x: snake_move[0].x - dx, y: snake_move[0].y - dy};
    snake_move.unshift(head);
    snake_move.pop()
}

function moveset() {

    window.addEventListener('keypress', e => {
        //console.log(e)
        if(e.keyCode == 119 && moveturn != "s") {
            moveturn = "w";
        }
        if(e.keyCode == 115 && moveturn != "w") {
            moveturn = "s";
        }
        if(e.keyCode == 100 && moveturn != "a") {
            moveturn = "d";
        }
        if(e.keyCode == 97 && moveturn != "d") {
            moveturn = "a";
        }
    })

    if (moveturn == "w") {
        dx = 0;
        dy = 20;
    }

    if (moveturn == "s") {
        dx = 0;
        dy = -20;
    }
    
    if (moveturn == "d") {
        dx = -20;
        dy = 0;
    }

    if (moveturn == "a") {
        dx = 20;
        dy = 0;
    }

    if (snake_move[0].y > canvas.height - 20) {
        gamerunning = false
    }

    if (snake_move[0].y < 0 ) {
        gamerunning = false
    }

    if (snake_move[0].x > canvas.width - 20) {
        gamerunning = false
    }

    if (snake_move[0].x < 0) {
        gamerunning = false
    }
}

function AppleMechanics() {
    ctx.fillStyle = "green";
    ctx.fillRect(apple_x, apple_y, apple_size, apple_size);

    if (apple_x == snake_move[0].x) {
        if (apple_y == snake_move[0].y) {
            snake_move.forEach(Generator);
            SnakeAddBody();
        }
    }
}
function Generator(snake_mov) {
    apple_x = (Math.floor(Math.random()*39+1)) * 20
    apple_y = (Math.floor(Math.random()*19+1)) * 20

    if (apple_x == snake_mov.x && apple_y == snake_mov.y) {
        console.log('przesuwam') 
        snake_move.forEach(Generator);
    }
}

function checkCollision() {
    snake_move.forEach(collision)
}
function collision(snake_mov) {
    const head = {x: snake_move[0].x - dx, y: snake_move[0].y - dy};

    if (head.x == snake_mov.x) {
        if (head.y == snake_mov.y) {
            gamerunning = false;
        }
    }
}

function SnakeAddBody() {
    const head = {x: snake_move[0].x - dx, y: snake_move[0].y - dy};


    snake_move.unshift(head);
}

function main() {
    setTimeout(function onTick() {
        if (gamerunning) {
            background()  
            automaticmove()
            AppleMechanics()
            snakedraw()
            moveset()
            checkCollision()
            main();}}, 100)
}
main()
snake_move.forEach(Generator)