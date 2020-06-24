const {
  Engine,
  World,
  Bodies,
  Mouse,
  MouseConstraint,
  Constraint
} = Matter;

let wall;
let wall2;
let ground;
const boxesA = [];
const boxesB = [];
let ball;
let world, engine;
let mConstraint;
let slingshot;
let goal = [];

function setup() {
  const canvas = createCanvas(720, 720);
  engine = Engine.create();
  world = engine.world;

  sky = new Ground(width / 2, -100, width, 50);
  wall = new Ground(width, 0, 40, height * 2);
  wall2 = new Ground(0, 0, 40, height * 2);
  ground = new Ground(width / 2, height - 10, width*2, 20);

  for (let i = 0; i < 10; i++) {
    boxesA[i] = new Box(300, 500 - i * 200, 30, 80);
    boxesB[i] = new Box(500, 500 - i * 200, 40, 80);
  }

  ball = new Ball(150, 550, 32);

  slingshot = new SlingShot(150, 550, ball.body);
  goal[0] = new Goal(400, 500);
  goal[1] = new Goal(640, 350);


  const mouse = Mouse.create(canvas.elt);
  options = {
    mouse: mouse
  };
  mouse.pixelRatio = pixelDensity();

  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);


  setTimeout(() => {
    checkReset();
  }, 100);
}


function checkReset() {
  
  var absBallVelo = Math.abs(ball.body.velocity.x)+Math.abs(ball.body.velocity.y);
  
  if (!slingshot.isAttached()
  &&  absBallVelo * 4 < 0.05) {
    reset();
  }

  setTimeout(() => {
    checkReset();
  }, 100);

}

function reset() {
    World.remove(world, ball.body);
    ball = new Ball(150, 550, 32);
    slingshot.attach(ball.body);    
}


function keyPressed() {
  if (key == ' ') {
    reset();
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
  if (slingshot.isAttached()) {
    Matter.Body.scale(ball.body, 0.25, 0.25);
    setTimeout(() => {
      slingshot.fly();
    }, 100);

  }
}

function renewBall() {
  if (!slingshot.isAttached()) {
    World.remove(world, ball.body);
    ball = new Ball(150, 550, 32);
    slingshot.attach(ball.body);
  }
}


function draw() {
  background(0);
  Matter.Engine.update(engine);
  wall.show();
  wall2.show();
  ground.show();

  for (let i = 0; i < 10; i++) {
    boxesA[i].show();
    boxesB[i].show();
  }

  slingshot.show();
  ball.show();

  for (let i = 0; i < 2; i++) {
    goal[i].show();
  }
}

