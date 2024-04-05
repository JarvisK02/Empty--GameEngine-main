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
        for (let a = 0; a < this.width; a++) {
            this.automata.push([]); //Create array inside the original array (form a 2D array)
            for (let b = 0; b < this.height; b++)
                this.automata[a][b] = Math.round(Math.random()); //Fill current index with a number between 0-1
        }
    };

    //Update the board
    update() {
        this.speed = parseInt(document.getElementById("speed").value, 10); //Retrieve speed from HTML file

        if (this.tickCount + 1 >= this.speed && this.speed != 120) {
            this.tickCount = 0;
            this.ticks++;
            document.getElementById('ticks').innerHTML = "Ticks: " + this.ticks;

            //Create the replacement automata
            let newAutomata = [];
            for (let c = 0; c < this.width; c++) {
                newAutomata.push([]);
                for (let d = 0; d < this.height; d++)
                    newAutomata[c][d] = 0;
            }

            for (let e = 0; e < this.width; e++)
                for (let f = 0; f < this.height; f++)
                    if ((this.automata[e][f] && (this.countAlive(e, f) === 2 || this.countAlive(e, f) === 3)) ||
                        (!this.automata[e][f] && this.countAlive(e, f) === 3))
                        newAutomata[e][f] = 1;

            this.automata = newAutomata;
        }
    };

    //Draw the board (code taken from provided solution)
    draw(ctx) {
        let size = 8; //Size of the squares
        let gap = 1; //Gap between the squares
        ctx.fillStyle = "Black"; //Color of the squares

        //Drawing the squares
        for (let col = 0; col < this.width; col++)
            for (let row = 0; row < this.height; row++) {
                let cell = this.automata[col][row]; //Current cell to fill in
                if (cell) //Check if the current cell should be filled in
                    ctx.fillRect(col * size + gap, row * size + gap, size - 2 * gap, size - 2 * gap); //Fill in the current cell
            }
    };

    countAlive(col, row) {
        let aliveCount = 0;
        for (let g = 0; g < 3; g++)
            for (let h = 0; h < 3; h++)
                count += this.automata[col + g][row + h];
        return aliveCount;
    };
};