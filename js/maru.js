class Maru {
  constructor(x, y, r) {

    const options = {
      density: 0.01,
      restitution: 0.7
    };

    this.body = Matter.Bodies.circle(x, y, r, options);
    Matter.Body.setMass(this.body, this.body.mass * 4);
    Matter.World.add(world, this.body);
    this.r = r;
  }

  show() {
    const pos = this.body.position;
    const angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    fill(255);
    rectMode(CENTER);
    circle(0, 0, this.r * 2);
    pop();
  }


}
