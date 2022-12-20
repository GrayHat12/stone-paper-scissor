const PLAY_BANNER = document.getElementById("play-banner");

let game_started = false;

let game = new Game(10);

function preload() {
    game.preload();
}

function setup() {
    createCanvas(600, 600);
    frameRate(40);
    game.setup();
}

function draw() {
    if (!game_started) {
        clear();
        background(220);
        return
    };
    clear();
    background(220);
    game.draw();
}

document.addEventListener("click", () => {
    PLAY_BANNER.style.display = "none";
    game_started = true;
});