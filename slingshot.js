class SlingShot {
  constructor(x, y, body) {
    const options = {
      pointA: {
        x: x,
        y: y
      },
      bodyB: body,
      stiffness: 0.1,
      length: 40
    }

    this.sling = Constraint.create(options);
    World.add(world, this.sling);
  }

  fly() {
    this.sling.bodyB = null;
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
    this.sling.length = 40;
    this.sling.stiffness = 0.1;
    this.sling.bodyB = body;
  }

  isAttached() {
    return (this.sling.bodyB != null);
  }

  /**
   * slingの長さをチェックする
   */
  checkLength() {
    if (this.sling.bodyB) {
      let distLength = dist(this.sling.pointA.x, this.sling.pointA.y, this.sling.bodyB.position.x, this.sling.bodyB.position.y);
      if (distLength > 100) {
 //       this.sling.stiffness = 1;
 //       this.sling.length = 100;
      } else {
 //       this.sling.stiffness = 0.1;
 //       this.sling.length = distLength;
      }
    }
  }

}
