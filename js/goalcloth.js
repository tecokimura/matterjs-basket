class GoalCloth {
  
    constructor(x, y) {
      var options = {
        restitution: 1.0
      };
  
      this.ringL = 0;
      this.ringR = 0;
      this.bar   = 0;
      this.board = 0;
  
      const RING_R   = 3; // リングの両端、淵の円の半径
      const RING_MESS= 70; // リングの重さ？(setMess)
      this.WIDTH_RING   = 30; // リングのサイズ
      const ADD_BAR_Y    = 36;
      const ADD_BOARD_Y  = 40;
  
      this.r = RING_R;
  
      // left ring
      this.ringL = Matter.Bodies.circle(x, y, this.r, options);
      Matter.Body.setMass(this.ringL, RING_MESS);
      this.ringL.isStatic = true;
      Matter.World.add(world, this.ringL);
  
      // right ring
      this.ringR = Matter.Bodies.circle(x + this.WIDTH_RING, y, this.r, options);
      Matter.Body.setMass(this.ringR, RING_MESS);
      this.ringR.isStatic = true;
      Matter.World.add(world, this.ringR);
  
      this.body3 = Matter.Bodies.rectangle(x + ADD_BAR_Y, y, 2, 2, options);
      Matter.Body.setMass(this.body3, RING_MESS);
      this.body3.isStatic = true;
      Matter.World.add(world, this.body3);
  
      this.body4 = Matter.Bodies.rectangle(x + ADD_BOARD_Y, y - 15, 5, 50, options);
      Matter.Body.setMass(this.body4, RING_MESS);
      this.body4.isStatic = true;
      Matter.World.add(world, this.body4);
  
      // cloth
      this.cloth = new Cloth(x-this.r, y-this.r, 4, 4, 4, 6, false, 3);

  
  
    }
  
    show() {
        let pos;
        let angle;
        
        this.cloth.show();

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
  
      push();
      fill(color(255, 0, 0));
      rectMode(CENTER);
      rect(this.ringL.position.x+(this.WIDTH_RING/2), this.ringL.position.y, this.WIDTH_RING, this.r*2);
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
  