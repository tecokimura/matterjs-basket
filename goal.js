class Goal {
  constructor(x, y) {
    this.r = 3;
    const options = {
      restitution: 0.5
    };

    // left ring
    this.body1 = Matter.Bodies.circle(x, y, this.r, options);
    Matter.Body.setMass(this.body1, 100);
    this.body1.isStatic = true;
    Matter.World.add(world, this.body1);
    
    // right ring
    this.body2 = Matter.Bodies.circle(x+(10+this.r)*2, y, this.r, options);
    Matter.Body.setMass(this.body2, 100);
    this.body2.isStatic = true;
    Matter.World.add(world, this.body2);
    
    // ring bar
    this.body3 = Matter.Bodies.rectangle(x+(10+this.r)*2+4, y, 10, 2, options);
    Matter.Body.setMass(this.body3, 100);
    this.body3.isStatic = true;
    Matter.World.add(world, this.body3);
    
    // ring back
    this.body4 = Matter.Bodies.rectangle(x+(10+this.r)*2+4+10, y-15, 5, 50, options);
    Matter.Body.setMass(this.body4, 100);
    this.body4.isStatic = true;
    Matter.World.add(world, this.body4);
    
    
  }
  
  show() {
    const pos = this.body1.position;
    const angle = this.body1.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    fill(255);
    rectMode(CENTER);
    circle(0, 0, this.r*2);
    pop();
    
    const pos2 = this.body2.position;
    const angle2 = this.body2.angle;
    push();
    translate(pos2.x, pos2.y);
    rotate(angle2);
    fill(255);
    rectMode(CENTER);
    circle(0, 0, this.r*2);
    pop();
    
    const pos3 = this.body3.position;
    const angle3 = this.body3.angle;
    push();
    translate(pos3.x, pos3.y);
    rotate(angle3);
    fill(255);
    rectMode(CENTER);
    rect(0, 0, 14, 2);
    pop();
    
    const pos4 = this.body4.position;
    const angle4 = this.body4.angle;
    push();
    translate(pos4.x, pos4.y);
    rotate(angle4);
    fill(255);
    rectMode(CENTER);
    rect(0, 0, 5, 50);
    pop();
    
  }

}
