function Player(x, y, maxDistance) {
    this.x = x;
    this.y = y;
    this.walkSpeed = 5;
    this.dashSpeed = 25;
    this.dashing = false;
    this.dashEndX = 0;
    this.dashEndY = 0;
    this.dashMaxDistance = maxDistance;
    this.r = 20;
    this.health = 1;

    this.update = function () {
        if (this.dashing) { // dashing
            this.dash()
        }
        if (keyIsDown(LEFT_ARROW) || keyIsDown(A_KEY)) {
            player.walk(LEFT_ARROW)
        }

        if (keyIsDown(RIGHT_ARROW) || keyIsDown(D_KEY)) {
            player.walk(RIGHT_ARROW)
        }

        if (keyIsDown(UP_ARROW) || keyIsDown(W_KEY)) {
            player.walk(UP_ARROW)
        }

        if (keyIsDown(DOWN_ARROW) || keyIsDown(S_KEY)) {
            player.walk(DOWN_ARROW)
        }

        if (keyIsDown(SPACE_KEY)) {
            player.initializeDash(mouseX, mouseY)
        }


        // prevent from leaving border
        if (this.x > width) {
            this.x = width - this.r
        }

        if (this.y > height - this.r) {
            this.y = height - this.r
        }

        if (this.x < 0) {
            this.x = this.r
        }

        if (this.y < 0) {
            this.y = this.r
        }
    }

    this.display = function () {
        stroke(51);
        strokeWeight(3);
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

    this.collidesWith = function (object) {
        var distance = dist(this.x, this.y, object.x, object.y);

        if (distance < object.r + this.r) {
            return true;
        }

        return false;
    }
}