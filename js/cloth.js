/**
 * ネットの描画をしている。
 * 伸び、重さとかを調整する必要あり
 */
class Cloth {

    constructor(xx, yy, columns, rows, columnGap, rowGap, crossBrace, particleRadius, particleOptions, constraintOptions) {

        // 描画に使うので保存しておく
        this.posX = xx;
        this.posY = yy;
        this.numWidth = columns;
        this.numHeight= rows;
        this.numPoint = columns * rows;

        var group = Matter.Body.nextGroup(true);    
        var particleOptions = Matter.Common.extend({ inertia: Infinity, friction: 0.00001, collisionFilter: { group: group }, render: { visible: false }}, particleOptions);
        var constraintOptions = Matter.Common.extend({ stiffness: 0.06, render: { type: 'line', anchors: false } }, constraintOptions);
    
        this.cloth = Matter.Composites.stack(xx, yy, columns, rows, columnGap, rowGap, function(x, y, col, row) {
            return Matter.Bodies.circle(x, y, particleRadius, particleOptions);
         });

        // 落ちちゃうので一列目の左上[0]と右上[numWidth-1]を固定して当たり判定取らないように？センサーにしておく
        for(let i=0;i<this.numWidth;i++) {
            this.cloth.bodies[i].isStatic = true;
            this.cloth.bodies[i].isSensor = true;
        }

        Matter.Composites.mesh(this.cloth, columns, rows, crossBrace, constraintOptions);
        this.cloth.label = 'cloth';

        Matter.World.add(world, this.cloth);

        console.log(this.cloth);
    }

    show() {
        if (this.cloth) {
            stroke(255);
            
            let a, b = 0;    
            for(let ih=0; ih<this.numHeight; ih++) {
                for(let iw=0; iw<this.numWidth; iw++) {

                    // 右端以外での横線の描画
                    if (iw < this.numWidth-1) {
                        /// index;
                        a = (ih * this.numWidth) + iw;
                        b = (ih * this.numWidth) + iw + 1;

                        line(
                            this.cloth.bodies[a].position.x, this.cloth.bodies[a].position.y,
                            this.cloth.bodies[b].position.x, this.cloth.bodies[b].position.y
                        );
                    }

                    // 一番下ではないなら縦線の描画
                    if (ih < this.numHeight-1) {
                        a = (ih * this.numWidth) + iw;
                        b = ((ih+1) * this.numWidth) + iw;
    
                        line(
                            this.cloth.bodies[a].position.x, this.cloth.bodies[a].position.y,
                            this.cloth.bodies[b].position.x, this.cloth.bodies[b].position.y
                        );
                    }
                }
            }
        }
    }   
}