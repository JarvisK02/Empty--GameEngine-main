class Automata {
    //Automata constructor
    constructor(game) {
        Object.assign(this, game); //Assign properties of the provided game engine to this automata

        //Speed of the automata
        this.tickCount = 0;
        this.ticks = 0;
        this.speed = parseInt(document.getElementById("speed"), 10); //Retrieve speed from HTML file

        //Create the random automata
        this.automata = [];
        this.height = 100;
        this.width = 200;
        for (let i = 0; i < this.width; i++) {
            this.automata.push([]); //Create 2D array
            for (let j = 0; j < this.height; j++) {
                this.automata[i][j] = Math.round(Math.random()); //Make current cell living or dead
            }
        }
    };
    
    //Count the living cells surrounding a given cell
    countAlive(col, row) {
        let count = 0;
        for (let i = col - 1; i < col + 2; i++) {
            for (let j = row - 1; j < row + 2; j++) {
                //First, check to make sure that the current cell is not being examined.
                //Then, if the adjacent cells are alive, increment the counter.
                /*if ((i || j) && this.automata[col + i] && this.automata[col + i][row + j]) {
                    count++;
                }*/
                count += (i != col && j != row) && this.automata[i] && this.automata[i][j];
            }
        }
        return count;
    };

    //Update the board
    update() {
        this.speed = parseInt(document.getElementById("speed").value, 10); //Update the speed of the game

        //Update the board after a given number of ticks
        if (this.tickCount++ >= this.speed && this.speed != 120) {
            //Update the tick information
            this.tickCount = 0;
            this.ticks++;
            document.getElementById('ticks').innerHTML = "Ticks: " + this.ticks;

            //Create the replacement automata
            let nextAutomata = [];
            for (let i = 0; i < this.width; i++) {
                nextAutomata.push([]); //Create 2D array
                for (let j = 0; j < this.height; j++) {
                    //If the current cell is alive, and there are two or three surrounding cells, the cell remains alive.
                    //If the current cell is dead, however, and there are three surrounding cells, the cell becomes alive.
                    //Otherwise, the current cell is dead.
                    if ((this.automata[i][j] && (this.countAlive(i, j) === 2 || this.countAlive(i, j) === 3)) ||
                        (!this.automata[i][j] && this.countAlive(i, j) === 3)) {
                        nextAutomata[i][j] = 1;
                    }
                }
            }

            this.automata = nextAutomata;
        }
    };

    //Draw the board (code taken from provided solution)
    draw(ctx) {
        let size = 8;
        let gap = 1;
        ctx.fillStyle = "Black";
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                let cell = this.automata[col][row];
                if (cell) {
                    ctx.fillRect(col * size + gap, row * size + gap, size - 2 * gap, size - 2 * gap);
                }
            }
        }
    };
};