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
let cloth;

function setup() {
  const canvas = createCanvas(720, 720);
  engine = Engine.create();
  world = engine.world;

  sky = new Ground(width / 2, -100, width, 50); // 天井に少し余裕をもたせている
  wall = new Ground(width, 0, 40, height * 2);
  wall2 = new Ground(0, 0, 40, height * 2);
  ground = new Ground(width / 2, height - 10, width*2, 20);

  for (let i = 0; i < 3; i++) {
    boxesA[i] = new Box(300, 250 - i * 100, 30, 80);
    boxesB[i] = new Box(500, 250 - i * 100, 40, 80);
  }

  ball = new Ball(150, 500, 32);

  slingshot = new SlingShot(150, 500, ball.body);
  goal[0] = new Goal(400, 400);
  goal[1] = new Goal(640, 275);
  goal[2] = new Goal(240, 525);
  goal[3] = new Goal(540, 475);

  cloth = new Cloth(400, 200, 5, 5, 4, 6, false, 3);

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
  &&  absBallVelo * 2 < 0.05) {
    reset();
  }

  setTimeout(() => {
    checkReset();
  }, 100);

}

function reset() {
    World.remove(world, ball.body);
    ball = new Ball(150, 500, 32);
    slingshot.attach(ball.body); 
}


/**
 * デバッグ機能的なもの
 * Space ボタンでリセット
 * a ボタンで仮発射テスト
 */
function keyPressed() {
  if (key == ' ') {
    reset();
  } else if (key == 'a') {
    // ball.setVelocity();
    const velo = {
      x: 10,
      y: -10,
    };
    Matter.Body.setVelocity(ball.body, velo);
  }
}

function mouseReleased() {
  if (slingshot.isAttached()) {
    Matter.Body.scale(ball.body, 0.25, 0.25);
    setTimeout(() => {
      slingshot.shoot();
    }, 50);

  }
}

function renewBall() {
  if (!slingshot.isAttached()) {
    World.remove(world, ball.body);
    ball = new Ball(150, 500, 32);
    slingshot.attach(ball.body);
  }
}


function draw() {
  background(0);
  Matter.Engine.update(engine);
  wall.show();
  wall2.show();
  ground.show();
  cloth.show();

  for (let i = 0; i < boxesA.length; i++) {
    boxesA[i].show();
    boxesB[i].show();
  }

  slingshot.show();
  ball.show();

  for (let i = 0; i < 4; i++) {
    goal[i].show();
  }
}
