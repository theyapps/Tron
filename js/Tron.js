var CELL_SIZE = 10, GRID_SIZE =  50;
var ARROW_LEFT = 37, ARROW_UP = 38, ARROW_RIGHT = 39, ARROW_DOWN = 40;
var EMPTY = 0, PLAYER = 1;
var EMPTY_COLOR = "#000";

var canvas = document.getElementById('TronCanvas');
var ctx = canvas.getContext('2d');

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

    color: '#c00'
};

/**
 * Update Game Logic
 */
function update() {
    if (ARROW_LEFT in keysDown) { // L
        if(player.dx != 1) {
            player.dx = -1;
            player.dy = 0;
        }
    }
    if (ARROW_UP in keysDown) { // U
        if(player.dy != 1){
            player.dx = 0;
            player.dy = -1;
        }
    }
    if (ARROW_RIGHT in keysDown) { // R
        if(player.dx != -1){
            player.dx = 1;
            player.dy = 0;
        }
    }
    if (ARROW_DOWN in keysDown) { // D
        if(player.dy != -1){
            player.dx = 0;
            player.dy = 1;
        }
    }

    player.x += player.dx;
    player.y += player.dy;
    grid.set_cell(PLAYER, player.x, player.y);

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