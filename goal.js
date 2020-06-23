class Goal {
  
  constructor(x, y) {
    var options = {
      restitution: 0.5
    };

    this.ringL = 0;
    this.ringR = 0;
    this.bar   = 0;
    this.board = 0;

    this.amiL = [];
    this.amiR = [];

    const RING_R   = 3;
    const RING_MESS= 100;
    const ADD_RING_R   = 28;
    const ADD_BAR_Y    = 36;
    const ADD_BOARD_Y  = 40;

    this.r = RING_R;

    // left ring
    this.ringL = Matter.Bodies.circle(x, y, this.r, options);
    Matter.Body.setMass(this.ringL, RING_MESS);
    this.ringL.isStatic = true;
    Matter.World.add(world, this.ringL);

    // right ring
    this.ringR = Matter.Bodies.circle(x + ADD_RING_R, y, this.r, options);
    Matter.Body.setMass(this.ringR, RING_MESS);
    this.ringR.isStatic = true;
    Matter.World.add(world, this.ringR);

    // ring bar
    options = {
      restitution: 0.8,
    };

    this.body3 = Matter.Bodies.rectangle(x + ADD_BAR_Y, y, 2, 2, options);
    Matter.Body.setMass(this.body3, RING_MESS);
    this.body3.isStatic = true;
    Matter.World.add(world, this.body3);

    // ring back
    options = {
      restitution: 0.3,
    };
    this.body4 = Matter.Bodies.rectangle(x + ADD_BOARD_Y, y - 15, 5, 50, options);
    Matter.Body.setMass(this.body4, RING_MESS);
    this.body4.isStatic = true;
    Matter.World.add(world, this.body4);


    var prevBody = this.ringL;
    var constraint;
    for (let i = 0; i < 6; i++) {
      this.amiL[i] = new Maru(x, y + (i * 8), 1);
      options = {
        bodyA: prevBody,
        bodyB: this.amiL[i].body,
        length: 8,
        stiffness: 0.6 
      }

      constraint = Matter.Constraint.create(options);
      prevBody = this.amiL[i].body;
      World.add(world, constraint);
    }


    prevBody = this.ringR;
    for (let i = 0; i < 6; i++) {
      this.amiR[i] = new Maru(x, y + ADD_RING_R + (i * 8), 1);
      options = {
        bodyA: prevBody,
        bodyB: this.amiR[i].body,
        length: 8,
        stiffness: 0.6
      }

      constraint = Matter.Constraint.create(options);
      prevBody = this.amiR[i].body;
      World.add(world, constraint);
    }

    options = {
      bodyA: this.amiL[5].body,
      bodyB: this.amiR[5].body,
      length: 10,
      stiffness: 0
    }

    constraint = Matter.Constraint.create(options);
    World.add(world, constraint);




  }

  show() {
    let pos;
    let angle;

    pos = this.body3.position;
    push();
    translate(pos.x, pos.y);
    rotate(this.body3.angle);
    fill(255);
    rectMode(CENTER);
    rect(0, 0, 10, 2);
    pop();

    pos = this.body4.position;
    push();
    translate(pos.x, pos.y);
    rotate(this.body4.angle);
    fill(255);
    rectMode(CENTER);
    rect(0, 0, 5, 50);
    pop();



    for (let i = 0; i < 6; i++) {
      this.amiL[i].show();
      this.amiR[i].show();
    }

    push();
    fill(color(255, 0, 0));
    rectMode(CENTER);
    rect(this.ringL.position.x+15, this.ringL.position.y, 28, 6);
    pop();

    pos = this.ringL.position;
    push();
    translate(pos.x, pos.y);
    rotate(this.ringL.angle);
    fill(color(255, 0, 0));
    rectMode(CENTER);
    circle(0, 0, this.r * 2);
    pop();

    pos = this.ringR.position;
    push();
    translate(pos.x, pos.y);
    rotate(this.ringR.angle);
    fill(color(255, 0, 0));
    rectMode(CENTER);
    circle(0, 0, this.r * 2);
    pop();


  }

}
