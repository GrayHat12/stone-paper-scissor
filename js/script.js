const PLAY_BANNER = document.getElementById("play-banner");
const STONE_SPEED_SLIDER = document.getElementById("stone-speed");
const PAPER_SPEED_SLIDER = document.getElementById("paper-speed");
const SCISSOR_SPEED_SLIDER = document.getElementById("scissor-speed");
// const CANVAS = document.getElementsByTagName("canvas")[0];

let game_started = false;

let STONE_SPEED = 1.2;
let PAPER_SPEED = 1.2;
let SCISSOR_SPEED = 1.2;

let game = new Game(20);

function preload() {
    game.preload();
}

function setup() {
    createCanvas(600, 600);
    frameRate(60);
    game.setup();
}

function draw() {
    if (!game_started) {
        // clear();
        background(220);
        return;
    }
    clear();
    background(220);
    game.draw();
}

document.addEventListener("click", (ev) => {
    // console.log(ev.target.tagName);
    if (ev.target.tagName == "CANVAS" || ev.target.id === "play-banner") {
        PLAY_BANNER.style.display = "none";
        game_started = true;
    }
});

STONE_SPEED_SLIDER.addEventListener("change", () => {
    STONE_SPEED = parseFloat(STONE_SPEED_SLIDER.value);
});
PAPER_SPEED_SLIDER.addEventListener("change", () => {
    PAPER_SPEED = parseFloat(PAPER_SPEED_SLIDER.value);
});
SCISSOR_SPEED_SLIDER.addEventListener("change", () => {
    SCISSOR_SPEED = parseFloat(SCISSOR_SPEED_SLIDER.value);
});
