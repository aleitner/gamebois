var player;
var enemies = [];
var stars = [];
var starCount = 200;
var points = 0;
var maxEnemies = 10;
var cursor;

const SPACE_KEY = 32;
const W_KEY = 87;
const A_KEY = 65;
const S_KEY = 83;
const D_KEY = 68;

function setup() {
    createCanvas(displayWidth * .99, displayHeight * .89);
    createStarfield();
    player = new Player(displayWidth / 2, displayHeight / 2, 300);
}

function draw() {
    background(0);
    moveStarField();
    displayScore();

    if (player.health <= 0) {
        textSize(32);
        text('You Lose', displayWidth / 2, displayHeight / 2);
        return;
    }

    if (enemies.length < maxEnemies) {
        enemies.push(
            new Enemy(
                Math.floor(Math.random() * width),
                Math.floor(Math.random() * height),
                Math.floor(Math.random() * 2) + 1,
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

    player.update()


    for (h = 0; h < enemies.length; h++) {
        if (player.collidesWith(enemies[h]) && enemies[h].tangible) {
            player.health -= 1;
        }
    }


    player.display();

    for (var i = 0; i < enemies.length; i++) {
        enemies[i].display()
    }

    displayCursor();

    points += 10;
}

function mouseClicked(e) {
    player.initializeDash(e.clientX, e.clientY)
}

function displayCursor() {
    if (player.dashing) {
        return
    }
    var p = calculateDash(player.dashMaxDistance, player.x, player.y, mouseX, mouseY)
    console.log("Mouse: ", mouseX, mouseY)
    console.log(p)

    stroke(255, 204, 0);
    strokeWeight(1);
    fill(52)
    line(player.x, player.y, p.x, p.y);
    ellipse(p.x, p.y, 7, 7);
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

function distance(x1, y1, x2, y2) {
    xDist = x1 - x2;
    yDist = y1 - y2;

    return Math.sqrt(xDist * xDist + yDist * yDist);
}

function calculateDash(maxDistance, x1, y1, x2, y2) {
    var xDist = x2 - x1;
    var yDist = y2 - y1;
    var dist = Math.sqrt(xDist * xDist + yDist * yDist);

    if (dist <= maxDistance) {
        var p = {
            x: x2,
            y: y2,
            distance: dist
        }
        return p
    }

    var fractionOfTotal = maxDistance / dist;

    this.dashEndX = x1 + (xDist * fractionOfTotal);
    this.dashEndY = y1 + (yDist * fractionOfTotal);

    var p = {
        x: x1 + (xDist * fractionOfTotal),
        y: y1 + (yDist * fractionOfTotal),
        distance: maxDistance
    }
    return p
}

function displayScore() {
    fill(255, 255, 255)
    stroke(0);
    strokeWeight(0);
    textSize(12);
    text(points + ' points', 10, 20);
}