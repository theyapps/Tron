// Sizes
var CELL_SIZE = 10, GRID_SIZE =  50;
// Keys
var ARROW_LEFT = 37, ARROW_UP = 38, ARROW_RIGHT = 39, ARROW_DOWN = 40;
// Directions
var DIR_LEFT = 0, DIR_UP = 1, DIR_RIGHT = 2, DIR_DOWN = 3;
// Grid States
var EMPTY = 0, PLAYER = 1;
// Colors
var EMPTY_COLOR = "#000";
// Game States
var RUNNING = 0, PAUSED = 1, WIN = 2, LOSE = 3;

var canvas = document.getElementById("TronCanvas");
var ctx = canvas.getContext("2d");
var game_state = RUNNING;

canvas.width = canvas.height = CELL_SIZE * GRID_SIZE;

// Register Key Listeners
var keysDown = {};
window.addEventListener("keydown", function(e) {
    keysDown[e.keyCode] = true;
});
window.addEventListener("keyup", function(e) {
    delete keysDown[e.keyCode];
});

var grid = new Grid(GRID_SIZE);
var player = new Bike(GRID_SIZE/2, GRID_SIZE/2 + 1, "#c00");

/**
 * Update Game Logic
 */
function update() {
    if (ARROW_LEFT in keysDown) { // L
        player.change_dir(DIR_LEFT);
    }
    if (ARROW_UP in keysDown) { // U
        player.change_dir(DIR_UP);
    }
    if (ARROW_RIGHT in keysDown) { // R
        player.change_dir(DIR_RIGHT);
    }
    if (ARROW_DOWN in keysDown) { // D
        player.change_dir(DIR_DOWN);
    }

    if(!player.update()){
        game_state = LOSE;
    }
}

/**
 * Render screen
 */
function render() {
    switch (game_state){
        case RUNNING:
            ctx.fillStyle = EMPTY_COLOR;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw the grid
            for(var x = 0; x < GRID_SIZE; x++) {
                for (var y = 0; y < GRID_SIZE; y++) {
                    switch (grid.get_cell(x, y)) {
                        case EMPTY:
                            ctx.fillStyle = EMPTY_COLOR;
                            break;
                        case player:
                            ctx.fillStyle = player.color;
                            break;
                    }
                    ctx.fillRect(x * CELL_SIZE,y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                }
            }
            /*
             ctx.fillStyle = "#fff";
             ctx.fillText(
             "player.x: " + player.x +
             " player.y: " + player.y,
             10, GRID_SIZE * CELL_SIZE - 10);
             */
            break;
        case WIN:
            ctx.fillStyle = "rgba(225,225,225,0.2)";
            ctx.fillRect(0,0,CELL_SIZE * GRID_SIZE, CELL_SIZE * GRID_SIZE);
            ctx.fillStyle = "#000";
            ctx.textAlign = "center";
            ctx.textBaseline="middle";
            ctx.fillText(
                "YOU WIN!!",
                (GRID_SIZE * CELL_SIZE)/2, (GRID_SIZE * CELL_SIZE)/2);
            break;
        case LOSE:
            ctx.fillStyle = "rgba(225,225,225,0.2)";
            ctx.fillRect(0,0,CELL_SIZE * GRID_SIZE, CELL_SIZE * GRID_SIZE);
            ctx.fillStyle = "#000";
            ctx.textAlign = "center";
            ctx.textBaseline="middle";
            ctx.font="30px Arial";
            ctx.fillText(
                "YOU LOSE!!",
                (GRID_SIZE * CELL_SIZE)/2, (GRID_SIZE * CELL_SIZE)/2);
            break;
        case PAUSED:
            ctx.fillStyle = "rgba(225,225,225,0.2)";
            ctx.fillRect(0,0,CELL_SIZE * GRID_SIZE, CELL_SIZE * GRID_SIZE);
            ctx.fillStyle = "#000";
            ctx.textAlign = "center";
            ctx.textBaseline="middle";
            ctx.font="30px Arial";
            ctx.fillText(
                "Paused",
                (GRID_SIZE * CELL_SIZE)/2, (GRID_SIZE * CELL_SIZE)/2);
            break;
            break;
        default:
            ctx.fillStyle = "#000";
            ctx.fillRect(0,0,CELL_SIZE * GRID_SIZE, CELL_SIZE * GRID_SIZE);
            ctx.fillStyle = "#fff";
            ctx.textAlign = "center";
            ctx.textBaseline="middle";
            ctx.font="30px Arial";
            ctx.fillText(
                "There has been an error.",
                (GRID_SIZE * CELL_SIZE)/2, (GRID_SIZE * CELL_SIZE)/2);
            break;
    }
}

/**
 * Initialize Game
 */
function init(){
    grid.init(EMPTY);
    grid.set_cell(PLAYER, player.x, player.y);
}

/**
 * Game Loop
 */
function loop(){
    update();
    render();
    time = Date.now();
}

init();
var time = Date.now();
setInterval(loop, 100);