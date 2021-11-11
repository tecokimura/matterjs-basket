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
    
    this.initX = x;
    this.initY = y;
    this.r = r;

    this.image = image;
  }

  reset() {
    Matter.Body.setPosition(this.body, { x: this.initX, y: this.initY})
    Matter.Body.setVelocity(this.body, { x: 0, y: 0})
    console.log(this.body);
  }

  // ボールの描画
  show() {
    const pos = this.body.position;
    const angle = this.body.angle;
    
    // console.log("pX="+this.body.position.x+" Y="+this.body.position.y);
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, 0, this.r, this.r);
    translate(0, 0);
    pop();
  }

}
