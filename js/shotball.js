class Shotball {

  constructor(x, y, r, image) {

    const options = {
      density: 0.01,
      restitution: 0.8,
      friction: 0.1,
      frictionAir: 0.001
    };

    this.body = Matter.Bodies.circle(x, y, r/2, options);
    Matter.Body.setMass(this.body, 100);
    Matter.World.add(world, this.body);
    this.r = r;

    this.image = image;
  }

  // ボールの描画
  show() {
    const pos = this.body.position;
    const angle = this.body.angle;
    
    push();
    imageMode(CENTER);
    image(this.image, pos.x, pos.y, this.r, this.r);
    pop();
  }

}
