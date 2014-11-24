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

var canvas = document.getElementById('TronCanvas');
var ctx = canvas.getContext('2d');
var game_state = LOSE;

canvas.width = canvas.height = CELL_SIZE * GRID_SIZE;

// Register Key Listeners
var keysDown = {};
window.addEventListener('keydown', function(e) {
    keysDown[e.keyCode] = true;
});
window.addEventListener('keyup', function(e) {
    delete keysDown[e.keyCode];
});

/**
 * Grid Structure
 * @type {{width: number, height: number, _grid: Array, init: Function, set_cell: Function, get_cell: Function}}
 */
var grid = {
    width : GRID_SIZE,
    height : GRID_SIZE,
    _grid : [],

    /**
     * Initialize Grid
     */
    init : function(){
        this._grid = [];
        for(var x = 0; x < GRID_SIZE; x++){
            this._grid.push([]);
            for(var y = 0; y < GRID_SIZE; y++){
                this._grid[x].push(EMPTY);
            }
        }
    },

    /**
     * Set grid coordinate [x,y] to v
     * @param v
     * @param x
     * @param y
     */
    set_cell:function(v,x,y){
        this._grid[x][y] = v;
    },

    /**
     * Get value from cell [x,y]
     * @param x
     * @param y
     * @returns {*}
     */
    get_cell:function(x,y){
        return this._grid[x][y];
    }
};

/**
 * Player Structure
 * @type {{x: number, y: number, dx: number, dy: number, color: string}}
 */
var player = {
    x  : GRID_SIZE/2,
    y  : GRID_SIZE/2,
    dx : 0,
    dy : 0,
    color: '#c00',
    /**
     * Update player position.
     */
    update:function(){
        player.x += player.dx;
        player.y += player.dy;
        grid.set_cell(PLAYER, player.x, player.y);
    },
    /**
     * Process a change in dir for this player
     * @param dir
     */
    change_dir:function(dir){
        switch(dir){
            case DIR_LEFT:
                if(player.dx != 1) {
                    player.dx = -1;
                    player.dy = 0;
                }
                break;
            case DIR_UP:
                if(player.dy != 1){
                    player.dx = 0;
                    player.dy = -1;
                }
                break;
            case DIR_RIGHT:
                if(player.dx != -1){
                    player.dx = 1;
                    player.dy = 0;
                }
                break;
            case DIR_DOWN:
                if(player.dy != -1){
                    player.dx = 0;
                    player.dy = 1;
                }
                break;
        }
    }

};

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

    /*if(player.y < 0){
        grid.init();
        player.x = GRID_SIZE/2;
        player.y = GRID_SIZE/2;
        player.dx = 0;
        player.dy = 0;
    }*/

}

/**
 * Render screen
 */
function render() {
    if(game_state === RUNNING){
        ctx.fillStyle = EMPTY_COLOR;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the grid
        for(var x = 0; x < GRID_SIZE; x++) {
            for (var y = 0; y < GRID_SIZE; y++) {
                switch (grid.get_cell(x, y)) {
                    case EMPTY:
                        ctx.fillStyle = EMPTY_COLOR;
                        break;
                    case PLAYER:
                        ctx.fillStyle = player.color;
                        break;
                }
                ctx.fillRect(x * CELL_SIZE,y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
        }
        ctx.fillStyle = "#fff";
        ctx.fillText(
            "player.x: " + player.x +
            " player.y: " + player.y,
            10, GRID_SIZE * CELL_SIZE - 10)
    }
    else if(game_state === WIN){
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.textBaseline="middle";
        ctx.fillText(
            "YOU WIN!!",
            (GRID_SIZE * CELL_SIZE)/2, (GRID_SIZE * CELL_SIZE)/2)
    }
    else if(game_state === LOSE){
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.textBaseline="middle";
        ctx.fillText(
            "YOU LOSE!!",
            (GRID_SIZE * CELL_SIZE)/2, (GRID_SIZE * CELL_SIZE)/2)
    }
    else{
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.textBaseline="middle";
        ctx.fillText(
            "There has been an error.",
            (GRID_SIZE * CELL_SIZE)/2, (GRID_SIZE * CELL_SIZE)/2)
    }

}

/**
 * Initialize Game
 */
function init(){
    grid.init();
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