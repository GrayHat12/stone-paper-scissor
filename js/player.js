class Player {
    
    constructor(x, y) {
        this.__x = x;
        this.__y = y;
    }

    preload = () => {
        // this.image = loadImage('assets/scissor.png');
    }

    setup = () => {
        ;
    }

    getX = () => parseFloat(`${this.__x}`);
    getY = () => parseFloat(`${this.__y}`);

    setX = (x) => {
        if (isNaN(x)) {
            console.log("Invalid x value");
            return;
        };
        this.__x = x;
    }
    setY = (y) => {
        if (isNaN(y)) {
            console.log("Invalid y value");
            return;
        };
        this.__y = y;
    }

    draw = (img) => {
        if (this.__x == NaN) this.__x = 600 - 15;
        if (this.__y == NaN) this.__y = 600 - 15;
        image(img, this.__x - 15, this.__y - 15, 30, 30);
    };

    move = (nearest_food, nearest_foe) => {
        let distance_from_food = Infinity;
        let distance_from_foe = Infinity;
        let x = this.__x;
        let y = this.__y
        if (nearest_food) distance_from_food = dist(this.__x, this.__y, nearest_food.getX(), nearest_food.getY());
        if (nearest_foe) distance_from_foe = dist(this.__x, this.__y, nearest_foe.getX(), nearest_foe.getY());

        let speed = 1;
        if (distance_from_food < distance_from_foe && nearest_food) {
            if (nearest_food.getX() > this.__x) x += speed;
            else if (nearest_food.getX() < this.__x) x -= speed;
            if (nearest_food.getY() > this.__y) y += speed;
            else if (nearest_food.getY() < this.__y) y -= speed;
        } else if (nearest_foe) {
            if (nearest_foe.getX() > this.__x) x -= speed;
            else if (nearest_foe.getX() < this.__x) x += speed;
            if (nearest_foe.getY() > this.__y) y -= speed;
            else if (nearest_foe.getY() < this.__y) y += speed;
        }
        if (x == Infinity || x == NaN) x = this.__x;
        if (y == Infinity || y == NaN) y = this.__y;
        x += (Math.random() < 0.5 ? -1 : 1) * (Math.random());
        y += (Math.random() < 0.5 ? -1 : 1) * (Math.random());
        return {x, y}
    };
}
