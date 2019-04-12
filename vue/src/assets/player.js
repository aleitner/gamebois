function Player(x, y) {
    this.x = x;
    this.y = y;
    this.walkSpeed = 5;
    this.dashSpeed = 25;
    this.dashing = false;
    this.dashEndX = 0;
    this.dashEndY = 0;
    this.dashMaxDistance = 600;
    this.r = 20;

    this.update = function () {

        if (this.dashing) { // dashing
            this.dash()
        }
        if (keyIsDown(LEFT_ARROW)) {
            player.walk(LEFT_ARROW)
        }

        if (keyIsDown(RIGHT_ARROW)) {
            player.walk(RIGHT_ARROW)
        }

        if (keyIsDown(UP_ARROW)) {
            player.walk(UP_ARROW)
        }

        if (keyIsDown(DOWN_ARROW)) {
            player.walk(DOWN_ARROW)
        }
    }

    this.display = function () {
        ellipse(this.x, this.y, this.r, this.r);
    }

    this.walk = function (direction) {
        switch (direction) {
            case LEFT_ARROW:
                this.x -= this.walkSpeed
                break;
            case RIGHT_ARROW:
                this.x += this.walkSpeed
                break;
            case UP_ARROW:
                this.y -= this.walkSpeed
                break;
            case DOWN_ARROW:
                this.y += this.walkSpeed
                break;
        }
    }

    // initialize dashing animation
    this.initializeDash = function (x, y) {
        if (this.dashing) {
            return
        }

        var p = calculateDash(this.dashMaxDistance, this.x, this.y, x, y)
        this.dashEndX = p.x;
        this.dashEndY = p.y;
        this.dashing = true;
    }

    // Calculate ends points of a dash
    this.dash = function () {
        var p = calculateDash(this.dashSpeed, this.x, this.y, this.dashEndX, this.dashEndY)
        this.x = p.x
        this.y = p.y

        if (this.x == this.dashEndX && this.y == this.dashEndY) {
            this.dashing = false;
        }
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