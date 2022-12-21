const STONE_SOUND = new Audio("assets/stone.mp3");
const SCISSOR_SOUND = new Audio("assets/scissor.mp3");
const PAPER_SOUND = new Audio("assets/paper.mp3");

class Game {
    constructor(number_of_players) {
        this.number_of_players = number_of_players;
        this.rows = 600;
        this.cols = 600;
        this.stones = [];
        this.papers = [];
        this.scissors = [];
        for (let i = 0; i < number_of_players; i++) {
            this.papers.push(
                new Player(Math.max(15, Math.floor(Math.random() * this.rows)), Math.floor(Math.random() * this.cols))
            );
        }
        for (let i = 0; i < number_of_players; i++) {
            this.scissors.push(
                new Player(Math.max(15, Math.floor(Math.random() * this.rows)), Math.floor(Math.random() * this.cols))
            );
        }
        for (let i = 0; i < number_of_players; i++) {
            this.stones.push(
                new Player(Math.max(15, Math.floor(Math.random() * this.rows)), Math.floor(Math.random() * this.cols))
            );
        }
    }
    setup = () => {
        this.papers.forEach((paper) => {
            paper.setup();
        });
        this.scissors.forEach((scissor) => {
            scissor.setup();
        });
        this.stones.forEach((stone) => {
            stone.setup();
        });
    };
    gameOverCheck = () => {
        let counts = [this.papers.length, this.scissors.length, this.stones.length];
        let winner = ["Paper", "Scissor", "Stone"];
        let zeroCount = 0;
        let nonZeroIndex = -1;
        counts.forEach((x, i) => {
            if (x === 0) zeroCount += 1;
            else nonZeroIndex = i;
        });
        return {
            over: zeroCount === 2,
            winner: zeroCount === 2 ? winner[nonZeroIndex] : null
        };
    }
    draw = () => {
        this.iteration();
        let {over, winner} = this.gameOverCheck();
        this.papers.forEach((paper) => {
            paper.draw(this.paper_image);
        });
        this.scissors.forEach((scissor) => {
            scissor.draw(this.scissor_image);
        });
        this.stones.forEach((stone) => {
            stone.draw(this.stone_image);
        });
        if (over) {
            text(`${winner} WON`, 250, 40);
        }
        text(`STONE: ${this.stones.length} | PAPER: ${this.papers.length} | SCISSOR: ${this.scissors.length}`, 190, 20);
    };
    preload = () => {
        this.stone_image = loadImage("assets/stone.png");
        this.scissor_image = loadImage("assets/scissor.png");
        this.paper_image = loadImage("assets/paper.png");
    };
    iteration = () => {
        this.papers.forEach((paper, index, array) => {
            let near_food =
                this.stones.length > 0
                    ? this.stones.reduce((prev, curr) => {
                          return dist(curr.getX(), curr.getY(), paper.getX(), paper.getY()) <
                              dist(prev.getX(), prev.getY(), paper.getX(), paper.getY())
                              ? curr
                              : prev;
                      })
                    : null;
            let near_foe =
                this.scissors.length > 0
                    ? this.scissors.reduce((prev, curr) => {
                          return dist(curr.getX(), curr.getY(), paper.getX(), paper.getY()) <
                              dist(prev.getX(), prev.getY(), paper.getX(), paper.getY())
                              ? curr
                              : prev;
                      })
                    : null;
            let { x, y } = paper.move(near_food, near_foe, PAPER_SPEED || 1.2);
            let existing_paper = array.find((p) => p !== paper && dist(p.getX(), p.getY(), x, y) < 20);
            if (
                !existing_paper ||
                // (near_food && dist(near_food.getX(), near_food.getY(), paper.getX(), paper.getY() < 5)) ||
                dist(existing_paper.getX(), existing_paper.getY(), x, y) >
                    dist(paper.getX(), paper.getY(), existing_paper.getX(), existing_paper.getY())
            ) {
                paper.setX(Math.max(15, Math.min(x, this.cols - 15)));
                paper.setY(Math.max(15, Math.min(y, this.rows - 15)));
            }
        });
        this.scissors.forEach((scissor, index, array) => {
            let near_food =
                this.papers.length > 0
                    ? this.papers.reduce((prev, curr) => {
                          return dist(curr.getX(), curr.getY(), scissor.getX(), scissor.getY()) <
                              dist(prev.getX(), prev.getY(), scissor.getX(), scissor.getY())
                              ? curr
                              : prev;
                      })
                    : null;
            let near_foe =
                this.stones.length > 0
                    ? this.stones.reduce((prev, curr) => {
                          return dist(curr.getX(), curr.getY(), scissor.getX(), scissor.getY()) <
                              dist(prev.getX(), prev.getY(), scissor.getX(), scissor.getY())
                              ? curr
                              : prev;
                      })
                    : null;
            let { x, y } = scissor.move(near_food, near_foe, SCISSOR_SPEED || 1.2);
            let existing_scissor = array.find((s) => s !== scissor && dist(s.getX(), s.getY(), x, y) < 20);
            if (
                !existing_scissor ||
                // (near_food && dist(near_food.getX(), near_food.getY(), scissor.getX(), scissor.getY() < 5)) ||
                dist(existing_scissor.getX(), existing_scissor.getY(), x, y) >
                    dist(scissor.getX(), scissor.getY(), existing_scissor.getX(), existing_scissor.getY())
            ) {
                scissor.setX(Math.max(15, Math.min(x, this.cols - 15)));
                scissor.setY(Math.max(15, Math.min(y, this.rows - 15)));
            }
        });
        this.stones.forEach((stone) => {
            let near_food =
                this.scissors.length > 0
                    ? this.scissors.reduce((prev, curr) => {
                          return dist(curr.getX(), curr.getY(), stone.getX(), stone.getY()) <
                              dist(prev.getX(), prev.getY(), stone.getX(), stone.getY())
                              ? curr
                              : prev;
                      })
                    : null;
            let near_foe =
                this.papers.length > 0
                    ? this.papers.reduce((prev, curr) => {
                          return dist(curr.getX(), curr.getY(), stone.getX(), stone.getY()) <
                              dist(prev.getX(), prev.getY(), stone.getX(), stone.getY())
                              ? curr
                              : prev;
                      })
                    : null;
            let { x, y } = stone.move(near_food, near_foe, STONE_SPEED || 1.2);
            let existing_stone = this.stones.find((s) => s !== stone && dist(s.getX(), s.getY(), x, y) < 20);
            if (
                !existing_stone ||
                // (near_food && dist(near_food.getX(), near_food.getY(), stone.getX(), stone.y < 2)) ||
                dist(existing_stone.getX(), existing_stone.getY(), stone.getX(), stone.getY()) <
                    dist(existing_stone.getX(), existing_stone.getY(), x, y)
            ) {
                if (isNaN(x) || isNaN(y)) {
                    console.log(x, y);
                }
                stone.setX(Math.max(15, Math.min(x, this.cols - 15)));
                stone.setY(Math.max(15, Math.min(y, this.rows - 15)));
            }
        });

        // check for collisions
        this.papers.forEach((paper) => {
            let dead = this.stones.find((x) => dist(x.getX(), x.getY(), paper.getX(), paper.getY()) < 20);
            if (dead) {
                this.papers.push(new Player(dead.getX(), dead.getY()));
                PAPER_SOUND.play();
                this.stones = this.stones.filter((x) => x !== dead);
            }
        });
        this.scissors.forEach((scissor) => {
            let dead = this.papers.find((x) => dist(x.getX(), x.getY(), scissor.getX(), scissor.getY()) < 20);
            if (dead) {
                this.scissors.push(new Player(dead.getX(), dead.getY()));
                SCISSOR_SOUND.play();
                this.papers = this.papers.filter((x) => x !== dead);
            }
        });
        this.stones.forEach((stone) => {
            let dead = this.scissors.find((x) => dist(x.getX(), x.getY(), stone.getX(), stone.getY()) < 20);
            if (dead) {
                this.stones.push(new Player(dead.getX(), dead.getY()));
                STONE_SOUND.play();
                this.scissors = this.scissors.filter((x) => x !== dead);
            }
        });
    };
}
