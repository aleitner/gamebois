var player;
var enemies = [];
var stars = [];
var starCount = 200;
var points = 0;
var maxEnemies = 10;
var gameSong;
var titleSong;

const SPACE_KEY = 32;
const W_KEY = 87;
const A_KEY = 65;
const S_KEY = 83;
const D_KEY = 68;

let canvasWidth, canvasHeight, canvasCenterX, canvasCenterY,
    menu, start;
let playing = false;

function preload() {
    gameSong = loadSound('./assets/summerspot.mp3');
    titleSong = loadSound('./assets/horizon.mp3')
}

function setup() {
    canvasWidth = window.innerWidth * .99;
    canvasHeight = window.innerHeight * .99;
    createCanvas(canvasWidth, canvasHeight);

    canvasCenterX = canvasWidth/2;
    canvasCenterY = canvasHeight/2;
    createStarfield();
    player = new Player(canvasCenterX, canvasCenterY, 300);
}


function draw() {
    background(0);
    moveStarField();
    displayScore();

    if (!gameSong.isPlaying()) {
        gameSong.play()
    }

    if (player.health <= 0) {
        if (playing) {
            playing = false;
            menu.style.opacity = 1;
        }
        return;
    }

    if (enemies.length < maxEnemies) {
        var enemy;
        switch (Math.floor(Math.random() * 3)) {
            case 0:
                enemy = newFallingEnemy();
                break;
            case 1:
                enemy = newRisingEnemy();
                break;
            case 2:
                enemy = newExpandingEnemy();
                break
        }
        enemies.push(enemy)
    }

    for (var i = 0; i < enemies.length; i++) {
        enemies[i].update()
    }

    for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].done) {
            enemies.splice(i, 1)
        }
    }

    if (playing) {
        for (h = 0; h < enemies.length; h++) {
            if (player.collidesWith(enemies[h]) && enemies[h].tangible) {
                player.health -= 1;
            }
        }

        player.update()
        player.display();
        displayCursor();
    }

    for (var i = 0; i < enemies.length; i++) {
        enemies[i].display()
    }

    if (!playing) return;
    points += 10;
}

function mouseClicked(e) {
    if (playing) {
        player.initializeDash(e.clientX, e.clientY)
        return
    }
}

function displayCursor() {
    if (player.dashing) {
        return
    }
    var p = calculateDash(player.dashMaxDistance, player.x, player.y, mouseX, mouseY)

    stroke(255, 204, 0);
    strokeWeight(1);
    fill(52)
    line(player.x, player.y, p.x, p.y);
    ellipseMode(RADIUS);
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

function newExpandingEnemy() {
    return new ExpandingEnemy(
        Math.floor(Math.random() * width),
        Math.floor(Math.random() * height),
        Math.floor(Math.random() * 2) + 1,
        Math.floor(Math.random() * 100) + 80
    )
}

function newFallingEnemy() {
    var r = Math.floor(Math.random() * 20) + 15
    return new FallingEnemy(
        Math.floor(Math.random() * width),
        -(2 * r),
        Math.floor(Math.random() * width),
        height + 2 * r,
        Math.floor(Math.random() * 5) + 3,
        r
    )
}

function newRisingEnemy() {
    var r = Math.floor(Math.random() * 20) + 15
    return new FallingEnemy(
        Math.floor(Math.random() * width),
        height + 2 * r,
        Math.floor(Math.random() * width),
        -(2 * r),
        Math.floor(Math.random() * 5) + 3,
        r
    )
}

document.addEventListener('DOMContentLoaded', function (e) {
    menu = document.getElementById('menu');
    start = document.getElementById('start');
    start.addEventListener('click', function (e) {
        console.log('CLICKED@@')
        reset()
        menu.style.opacity = 0;
    });
});

function reset() {
    playing = true;
    player.health = 1
    player = new Player(canvasCenterX, canvasCenterY, 300);
}
