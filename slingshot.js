
const SLINGSHOT_BASE_STIFFNESS= 0.1;
const SLINGSHOT_BASE_LENGTH   = 40;
const SLINGSHOT_MAX_VELOCITY  = 20;

class SlingShot {

  constructor(x, y, body) {
    const options = {
      pointA: {
        x: x,
        y: y
      },
      bodyB: body,
      stiffness: SLINGSHOT_BASE_STIFFNESS,
      length: SLINGSHOT_BASE_LENGTH
    }

    this.sling = Constraint.create(options);
    World.add(world, this.sling);
  }

  /**
   * マウスドラッグなどでボールを発射する際の処理
   * slingshotとの紐付けを外す
   */
  shoot() {

    // 速度が上限言ってたら上書きする
//    print("sp="+this.sling.bodyB.speed+",vx="+this.sling.bodyB.velocity.x+",vy="+this.sling.bodyB.velocity.y);
    this.updateShotMaxVelocity(this.sling.bodyB, SLINGSHOT_MAX_VELOCITY);

    this.sling.bodyB = null;
  }


  /**
   * 放たれた時の最大速度を制限する（目に見えなくなるので）
   * body
   * maxVelocity
   */
  updateShotMaxVelocity(body, maxVelocity) {
    let newVeloX = body.velocity.x;
    let newVeloY = body.velocity.y;

    if( body.velocity.x < maxVelocity * -1) newVeloX = maxVelocity * -1;
    if( maxVelocity < body.velocity.x) newVeloX = maxVelocity;
    if( body.velocity.y < maxVelocity * -1) newVeloY = maxVelocity * -1;
    if( maxVelocity < body.velocity.y) newVeloY = maxVelocity;

    Matter.Body.setVelocity(body, Matter.Vector.create(newVeloX, newVeloY));

  }

  show() {
    if (this.sling.bodyB) {
      stroke(255);
      const posA = this.sling.pointA;
      const posB = this.sling.bodyB.position;
      line(posA.x, posA.y, posB.x, posB.y);
    }
  }

  attach(body) {
    this.sling.stiffness = SLINGSHOT_BASE_STIFFNESS;
    this.sling.length = SLINGSHOT_BASE_LENGTH;
    this.sling.bodyB = body;
  }

  isAttached() {
    return (this.sling.bodyB != null);
  }

}
