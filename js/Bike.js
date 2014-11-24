/**
 * Bike Class
 * @constructor
 */
Bike = function(){
    this.x  = GRID_SIZE/2;
    this.y  = GRID_SIZE/2 + 1;
    this.dx = 1;
    this.dy = 0;
    this.color = '#c00';

    /**
     * Update player position.
     */
    this.update = function(){
        var new_x = player.x + player.dx;
        var new_y = player.y + player.dy;

        if(new_x * new_y < 0 || new_x > GRID_SIZE - 1 || new_y > GRID_SIZE - 1)
            return false;

        if(grid.get_cell(new_x,new_y) != EMPTY)
            return false;

        player.x = new_x;
        player.y = new_y;
        grid.set_cell(PLAYER, player.x, player.y);
        return true;
    };

    /**
     * Process a change in dir for this player
     * @param dir
     */
    this.change_dir = function(dir){
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
    };
};
