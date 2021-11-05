class Cloth {

    constructor(xx, yy, columns, rows, columnGap, rowGap, crossBrace, particleRadius, particleOptions, constraintOptions) {
        var Body = Matter.Body,
        Bodies = Matter.Bodies,
        Common = Matter.Common,
        Composites = Matter.Composites;
    
        this.columns = columns;
        this.rows = rows;

        var group = Body.nextGroup(true);    
        var particleOptions = Common.extend({ inertia: Infinity, friction: 0.00001, collisionFilter: { group: group }, render: { visible: false }}, particleOptions);
        var constraintOptions = Common.extend({ stiffness: 0.06, render: { type: 'line', anchors: false } }, constraintOptions);
    
        this.cloth = Composites.stack(xx, yy, columns, rows, columnGap, rowGap, function(x, y) {
            return Bodies.circle(x, y, particleRadius, particleOptions);
         });
    
        Composites.mesh(this.cloth, columns, rows, crossBrace, constraintOptions);
    
        this.cloth.label = 'Cloth Body';

        Matter.World.add(world, this.cloth);

        console.log(this.cloth);
    }

    show() {
        this.cloth.Bodies
        
    }

    
}