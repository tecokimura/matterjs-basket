/**
 * What's Slingshot
 * パチンコみたいな紐、ゴムを引っ張ってボールを投げる
 */
const SLINGSHOT_BASE_STIFFNESS= 0.1;
const SLINGSHOT_BASE_LENGTH   = 40;
const SLINGSHOT_MAX_VELOCITY  = 20;

class SlingShot {

  constructor(slingX, slingY, ballR) {

    this.initX = slingX;
    this.initY = slingY;
    this.ball = new Ball(slingX, slingY, ballR);

    const options = {
      pointA: {
        x: slingX,
        y: slingY
      },
      bodyB: this.ball.body,
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
    this.updateShotMaxVelocity(this.sling.bodyB, SLINGSHOT_MAX_VELOCITY);
    this.sling.bodyB = null;
  }

  // ボールをセットし直す
  reset() {

    this.attach(); 

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

    
    this.ball.show();
  }

  attach() {
    Matter.Body.setPosition(this.ball.body, { x: this.initX, y: this.initY})
    Matter.Body.setVelocity(this.ball.body, { x: 0, y: 0})

    this.sling.stiffness = SLINGSHOT_BASE_STIFFNESS;
    this.sling.length = SLINGSHOT_BASE_LENGTH;
    this.sling.bodyB = this.ball.body;
  }

  isAttached() {
    return (this.sling.bodyB != null);
  }

}
