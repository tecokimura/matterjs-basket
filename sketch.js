const {
  Engine,
  World,
  Bodies,
  Mouse,
  MouseConstraint,
  Constraint
} = Matter;

let wall;
let ground;
const boxes = [];
let ball;
let world, engine;
let mConstraint;
let slingshot;
let goal;
let ami1 = [];
let ami2 = [];

function setup() {
  const canvas = createCanvas(680, 480);
  engine = Engine.create();
  world = engine.world;

  wall = new Ground(width-10, height / 2, 20, height);
  ground = new Ground(width / 2, height - 10, width, 20);

  for (let i = 0; i < 3; i++) {
    boxes[i] = new Box(500 - i * 2, 300 - i * 100, 30, 80);
  }

  ball = new Ball(200, 350, 8);

  slingshot = new SlingShot(150, 300, ball.body);
  goal = new Goal(550, 200);

  var prevBody = goal.body1;
  var constraint;
  var options;
  for (let i = 0; i < 4; i++) {
    ami1[i] = new Maru(550, 200 + (i * 10), 1);
    options = {
      bodyA: prevBody,
      bodyB: ami1[i].body,
      length: 10,
      stiffness: 0.4
    }

    constraint = Matter.Constraint.create(options);
    prevBody = ami1[i].body;
    World.add(world, constraint);
  }


  prevBody = goal.body2;
  for (let i = 0; i < 4; i++) {
    ami2[i] = new Maru(600, 200 + (i * 10), 1);
    options = {
      bodyA: prevBody,
      bodyB: ami2[i].body,
      length: 10,
      stiffness: 0.4
    }

    constraint = Matter.Constraint.create(options);
    prevBody = ami2[i].body;
    World.add(world, constraint);
  }

  options = {
    bodyA: ami1[3].body,
    bodyB: ami2[3].body,
    length: 15,
    stiffness: 0
  }

  constraint = Matter.Constraint.create(options);
  World.add(world, constraint);




  const mouse = Mouse.create(canvas.elt);
  options = {
    mouse: mouse
  };
  mouse.pixelRatio = pixelDensity();

  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);

}

function keyPressed() {
  if (key == ' ') {
    World.remove(world, ball.body);
    ball = new Ball(150, 300, 8);
    slingshot.attach(ball.body);
  } else if (key == 'a') {
    // ball.setVelocity();
    const velo = {
      x: 10,
      y: -10,
    };
    Matter.Body.setVelocity(ballj.body, velo);
  }
}

function mouseReleased() {
  setTimeout(() => {
    slingshot.fly();
  }, 100);
}


function draw() {
  background(0);
  Matter.Engine.update(engine);
  wall.show();
  ground.show();

  for (let i = 0; i < 3; i++) {
    boxes[i].show();
  }

  ball.show();
  slingshot.show();
  goal.show();

  for (let i = 0; i < 4; i++) {
    ami1[i].show();
    ami2[i].show();
  }


}
