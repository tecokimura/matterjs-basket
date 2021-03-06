class Box {
  constructor(x, y, w, h) {

    const options = {
      density: 0.01,
      restitution: 0.1,
    };


    this.body = Matter.Bodies.rectangle(x, y, w, h, options);
    Matter.World.add(world, this.body);
    this.w = w;
    this.h = h;

    this.color = 255;
  }

  show() {
    const pos = this.body.position;
    const angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    fill(this.color);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
  }


}
