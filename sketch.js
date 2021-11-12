const {
  Engine, World,
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
let slingball;
let world, engine;
let mConstraint;
let slingshot;
let goal = [];
let cloth;

let shotball;

const INIT_SLINGSHOT_POX_X = 150;
const INIT_SLINGSHOT_POX_Y = 500;
const INIT_SLINGBALL_POX_R = 24;

const INIT_SHOTBALL_POX_X = 100;
const INIT_SHOTBALL_POX_Y = 50;
const INIT_SHOTBALL_POX_R = 24;

let imgShotball;

function preload() {
  console.log("start preload");
  imgShotball = loadImage("./img/basketball.png");
  console.log("end preload");
}

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

  slingshot = new SlingShot(INIT_SLINGSHOT_POX_X, INIT_SLINGSHOT_POX_Y, INIT_SLINGBALL_POX_R);

  goal[0] = new Goal(230, 525);
  goal[1] = new Goal(350, 400);
  goal[2] = new Goal(560, 450);
  goal[3] = new Goal(640, 350);

  cloth = new Cloth(400, 50, 6, 12, 4, 6, false, 3);

  shotball = new Shotball(INIT_SHOTBALL_POX_X, INIT_SHOTBALL_POX_Y, INIT_SHOTBALL_POX_R, imgShotball);

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
  
  var absBallVelo = Math.abs(slingshot.ball.body.velocity.x)+Math.abs(slingshot.ball.body.velocity.y);
  
  if (!slingshot.isAttached()
  &&  absBallVelo * 2 < 0.05) {
    // reset();
    // slingshot.reset();
  }

  setTimeout(() => {
    checkReset();
  }, 100);

}

function reset() {
    World.remove(world, slingball.body);
    slingball = new Ball(INIT_SLINGBALL_POX_X, INIT_SLINGBALL_POX_Y, INIT_SLINGBALL_POX_R);
    slingshot.attach(slingball.body); 
}


/**
 * デバッグ機能的なもの
 * Space ボタンでリセット
 * a,s,d ボタンで仮発射テスト
 */
function keyPressed() {
  if (key == 'q') {
    slingshot.reset();
    shotball.reset();

  } else if( key == "a" || key == "s" || key == "d") {
    let n = 1;
    if( key == "s" ) n = 1.2;
    if( key == "d" ) n = 1.5;

    Matter.Body.setVelocity(shotball.body, { x: 4*n, y: -8*n });
  }
}

function mouseReleased() {
  if (slingshot.isAttached()) {

    setTimeout(() => {
      slingshot.shoot();
    }, 50);

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
  // slingball.show();

  shotball.show();

  for (let i = 0; i < 4; i++) {
    goal[i].show();
  }
}
