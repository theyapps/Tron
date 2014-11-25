/**
 * Grid Class
 * @param size
 */
var Grid = function(size){
    this.width = size;
    this.height = size;
    this._grid = [];

    /**
     * Initialize Grid
     */
    this.init = function(def_val){
        this._grid = [];
        for(var x = 0; x < this.width; x++){
            this._grid.push([]);
            for(var y = 0; y < this.height; y++){
                this._grid[x].push(def_val);
            }
        }
    };

    /**
     * Set grid coordinate [x,y] to v
     * @param v
     * @param x
     * @param y
     */
    this.set_cell = function(v,x,y){
        this._grid[x][y] = v;
    };

    /**
     * Get value from cell [x,y]
     * @param x
     * @param y
     * @returns {*}
     */
    this.get_cell = function(x,y){
        return this._grid[x][y];
    };
};