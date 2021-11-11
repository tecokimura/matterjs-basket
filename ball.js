class Ball {
  constructor(x, y, r) {

    const options = {
      density: 0.01,
      restitution: 0.8,
      friction: 0.05,
      frictionAir: 0.001
    };

    this.body = Matter.Bodies.circle(x, y, r/2, options);
    Matter.Body.setMass(this.body, 80);
    Matter.World.add(world, this.body);
    this.r = r;

  }

  show() {
    const pos = this.body.position;
    const angle = this.body.angle;

    fill(color(255, 160, 16));
    rectMode(CENTER);
    circle(pos.x, pos.y, this.r);
  }

}
