var player;
var enemies = [];
var stars = [];
var starCount = 200;
var points = 0;
var maxEnemies = 10;

function setup() {
    createCanvas(displayWidth * .99, displayHeight * .89);
    createStarfield();
    player = new Player(displayWidth / 2, displayHeight / 2);
}

function draw() {
    background(0);
    moveStarField();

    if (enemies.length < maxEnemies) {
        enemies.push(
            new Enemy(
                Math.floor(Math.random() * width),
                Math.floor(Math.random() * height),
                Math.floor(Math.random() * 3) + 1,
                Math.floor(Math.random() * 100) + 80
            )
        )
    }

    for (var i = 0; i < enemies.length; i++) {
        enemies[i].update()
    }

    for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].expansionCount == enemies[i].maxExpansionCount) {
            enemies.splice(i, 1)
        }
    }

    for (var i = 0; i < enemies.length; i++) {
        enemies[i].display()
    }

    //generate enemies

    player.update()
    player.display()

    points += 10

    textSize(12);
    text(points + ' points', 10, 20);
    fill(0, 102, 153);
}

function mouseClicked(e) {
    player.initializeDash(e.clientX, e.clientY)
}

function createStarfield() {
    for (var i = 0; i < starCount; i++) {
        stars[i] = new Star();
    }
}

function moveStarField() {
    for (var i = 0; i < starCount; i++) {
        stars[i].move();
        stars[i].display();
    }
}
