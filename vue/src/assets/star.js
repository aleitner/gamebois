function Star() {
  this.x = random(0, width);
  this.y = random(0, height);
  this.z = random(width);
  this.speed = random(1,2);
  this.size = random(1,4);

  this.move = function() {
    if (this.y > height) {
      this.y = 0;
      this.speed = random(1,2);
      this.size = random(1,4);
    }

    this.y = this.y + this.speed;
  }

  this.display = function() {
    fill(255);
    ellipse(this.x, this.y, this.size, this.size);
  }
}
