class Ball {
  constructor(x, y, r) {

    const options = {
      density: 0.01,
      restitution: 0.8,
      friction: 0.05,
      frictionAir: 0.001
    };

    this.body = Matter.Bodies.circle(x, y, r, options);
    Matter.Body.setMass(this.body, 50);
    Matter.World.add(world, this.body);
    this.r = r;

  }

  show() {
    const pos = this.body.position;
    const angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    fill(color(255, 160, 16));
    rectMode(CENTER);
    circle(0, 0, this.r*2/4);
    pop();
  }

}
