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
            for (let j = 0; j < this.height; j++)
                this.automata[i][j] = Math.round(Math.random()); //Fill current index with a number between 0-1
        }
    };

    loadRandomAutomata() {
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                this.automata[col][row] = randomInt(2);
            }
        }
    };

    count(col, row) {
        let count = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if ((i || j) && this.automata[col + i] && this.automata[col + i][row + j]) count++;
            }
        }
        return count;
    };

    update() {
        this.speed = parseInt(document.getElementById("speed").value, 10);

        if (this.tickCount++ >= this.speed && this.speed != 120) {
            this.tickCount = 0;
            this.ticks++;
            document.getElementById('ticks').innerHTML = "Ticks: " + this.ticks;

            let next = [];
            for (let col = 0; col < this.width; col++) {
                next.push([]);
                for (let row = 0; row < this.height; row++) {
                    next[col].push(0);
                }
            }

            for (let col = 0; col < this.width; col++) {
                for (let row = 0; row < this.height; row++) {
                    if (this.automata[col][row] && (this.count(col, row) === 2 || this.count(col, row) === 3)) next[col][row] = 1;
                    if (!this.automata[col][row] && this.count(col, row) === 3) next[col][row] = 1;
                }
            }
            this.automata = next;
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