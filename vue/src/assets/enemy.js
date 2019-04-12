function Enemy(x, y, v, maxExpansionCount) {
    this.x = x;
    this.y = y;
    this.r = 1;
    this.sizeChangeVelocity = v;
    this.expansionCount = 0;
    this.maxExpansionCount = maxExpansionCount;

    var shrinking = false
    this.update = function () {
        if (this.expansionCount >= this.maxExpansionCount) {
            return
        }

        if (shrinking) {
            this.sizeChangeVelocity = 0 - (this.sizeChangeVelocity)
        }

        if (this.expansionCount >= this.maxExpansionCount / 2 && !shrinking) {
            shrinking = true
        }

        this.r += this.sizeChangeVelocity
        this.expansionCount += 1;
    }

    this.display = function () {
        ellipse(this.x, this.y, this.r, this.r);
    }
}