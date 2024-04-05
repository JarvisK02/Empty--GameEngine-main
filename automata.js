class Automata {
    //Automata constructor
    constructor(game) {
        Object.assign(this, game); //Assign properties of the provided game engine to this automata
        
        //Size of the automata
        this.automata = []; //Initialize empty array
        this.height = 100; //Set height
        this.width = 200; //Set width

        //Speed of the automata
        this.tickCount = 0; //Set initial tick count
        this.ticks = 0; //Set initial ticks
        this.speed = parseInt(document.getElementById("speed"), 10); //Retrieve speed from HTML file

        //Create the random automata
        for (let i = 0; i < this.width; i++) {
            this.automata.push([]); //Create array inside the original array (form a 2D array)
            for (let j = 0; j < this.height; j++) {
                this.automata[i][j] = Math.round(Math.random()); //Fill current index with a number between 0-1
            }
        }
    };
    
    countAlive(col, row) {
        let count = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if ((i || j) && this.automata[col + i] && this.automata[col + i][row + j]) count++;
            }
        }
        return count;
    };

    //Update the board
    update() {
        this.speed = parseInt(document.getElementById("speed").value, 10);

        if (this.tickCount++ >= this.speed && this.speed != 120) {
            this.tickCount = 0;
            this.ticks++;
            document.getElementById('ticks').innerHTML = "Ticks: " + this.ticks;

            let nextAutomata = [];
            for (let i = 0; i < this.width; i++) {
                nextAutomata.push([]);
                for (let j = 0; j < this.height; j++) {
                    nextAutomata[i].push(0);
                }
            }

            for (let i = 0; i < this.width; i++) {
                for (let j = 0; j < this.height; j++) {
                    if (this.automata[i][j] && (this.countAlive(i, j) === 2 || this.countAlive(i, j) === 3)) nextAutomata[i][j] = 1;
                    if (!this.automata[i][j] && this.countAlive(i, j) === 3) nextAutomata[i][j] = 1;
                }
            }
            this.automata = nextAutomata;
        }
    };

    draw(ctx) {
        let size = 8;
        let gap = 1;
        ctx.fillStyle = "Black";
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                let cell = this.automata[col][row];
                if (cell) ctx.fillRect(col * size + gap, row * size + gap, size - 2 * gap, size - 2 * gap);
            }
        }
    };
};