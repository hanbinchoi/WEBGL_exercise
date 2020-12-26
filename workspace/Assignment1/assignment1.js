
var gl;
var points;

window.onload = function init()
{
    // set canvas
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height);
    gl.clearColor( 0.95, 0.95, 0.95, 1.0 );

    //  Load shaders and initialize
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );

    gl.useProgram( program );

    // create a buffer on gpu and bind point
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );

    // Associate out shader variables with our data buffer
    // attribute variable
    var vPosition = gl.getAttribLocation( program, "vPosition" );

    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( vPosition );


    // uniform variable
    var colorLoc = gl.getUniformLocation(program, "color");
    var vOffset = gl.getUniformLocation(program,"vOffset");
    var vSize = gl.getUniformLocation(program, "vSize");

    // clear buffer bit
    gl.clear( gl.COLOR_BUFFER_BIT );

    // Draw Object
    this.floor(colorLoc,vOffset,vSize);
    this.sky(colorLoc,vOffset,vSize);
    this.houseBody(colorLoc,vOffset,vSize);
    this.root(colorLoc,vOffset,vSize);
    this.windows(colorLoc,vOffset,vSize);
    this.tree(colorLoc,vOffset,vSize);
    this.bigSnowman(colorLoc,vOffset,vSize);
    this.miniSnowman(colorLoc,vOffset,vSize);



};

function floor(colorLoc,vOffset,vSize){
    // floor vertices
    var floor = new Float32Array([
        -1.0,   -0.8, //   v0
        -1.0,   -1.0,  //   v1
        1.0,   -0.8,  //  v2
        1.0,   -1.0   //  v3
    ]);

    // put vertices into buffer
    gl.bufferData(gl.ARRAY_BUFFER, floor, gl.STATIC_DRAW );

    // set size, offset
    gl.uniform4f(vOffset,0,0,0,0);
    gl.uniform4f(vSize, 1,1,1,1)

    // set color
    gl.uniform4fv(colorLoc,[0.91,0.91,0.91,1]); // color (R,G,B,A)

    // draw floor
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
}

function houseBody(colorLoc,vOffset,vSize){

    // house body vertices
    var houseBody = new Float32Array([

        0.2,   -0.2,  //   v0
        0.2,   -0.8,  //   v1
        0.8,   -0.2,  //  v2
        0.8,   -0.8   //  v3
    ]);

    // put vertices into buffer
    gl.bufferData(gl.ARRAY_BUFFER, houseBody, gl.STATIC_DRAW );

    // set size, offset
    gl.uniform4f(vOffset,0,0,0,0);
    gl.uniform4f(vSize, 1,1,1,1);

    // set color
    gl.uniform4f(colorLoc, 0.76, 0.68, 0.6, 1); // color (R,G,B,A)

    // draw body
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
}

function root(colorLoc,vOffset,vSize){

    // house root vertices
    var root = new Float32Array([

        0.0,   -0.2,  //   v0
        0.25,   0.1,  //   v1
        0.5,   -0.2,  //  v2
        0.75,   0.1,   //  v3
        1.0,   -0.2   //  v4
    ]);

    // put vertices into buffer
    gl.bufferData(gl.ARRAY_BUFFER, root, gl.STATIC_DRAW );

    // set offset, size
    gl.uniform4f(vOffset,0,0,0,0);
    gl.uniform4f(vSize, 1,1,1,1)

    // set color
    gl.uniform4f(colorLoc, 0.44, 0.25, 0.29, 1); // color (R,G,B,A)

    // draw root
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 5 );
}

function windows(colorLoc,vOffset,vSize){

    // window vertices
    var Window = new Float32Array([

        0.35,   -0.35,  //   v0
        0.35,   -0.45,  //   v1
        0.45,   -0.35,  //  v2
        0.45,   -0.45   //  v3
    ]);

    // put vertices into buffer
    gl.bufferData(gl.ARRAY_BUFFER, Window, gl.STATIC_DRAW );

    // set size, offset
    gl.uniform4f(vOffset,0,0,0,0);
    gl.uniform4f(vSize, 1,1,1,1)

    // set color
    gl.uniform4f(colorLoc, 0.85, 0.9, 1.0, 0.8); // color (R,G,B,A)

    //draw window
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

    // move 0.2 x-side
    gl.uniform4f(vOffset,0.2,0,0,0);
    //draw window
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
}

function tree(colorLoc,vOffset,vSize){

    // tree body vertices
    var treeBody = new Float32Array([
        -0.75,   -0.8,  //   v0
        -0.75,   -0.4,  //   v1
        -0.65,   -0.8,  //  v2
        -0.65,   -0.4   //  v3
    ]);

    // put vertices into buffer
    gl.bufferData(gl.ARRAY_BUFFER, treeBody, gl.STATIC_DRAW );

    // set offset, size
    gl.uniform4f(vOffset,0,0,0,0);
    gl.uniform4f(vSize, 1,1,1,1)
    // set color
    gl.uniform4f(colorLoc, 0.4, 0.0, 0.0, 1.0); // color (R,G,B,A)
    // draw body
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

    // leaf vertices
    var leafs = new Float32Array([
        -0.9,   -0.4,  //   v0
        -0.7,   -0.2,  //   v1
        -0.5,   -0.4,  //  v2
        -0.9,   -0.2,  //   v0
        -0.7,   0.0,  //   v1
        -0.5,   -0.2,  //  v2
        -0.9,   0.0,  //   v0
        -0.7,   0.2,  //   v1
        -0.5,   0.0,  //  v2
    ]);

    // put vertices into buffer
    gl.bufferData(gl.ARRAY_BUFFER, leafs, gl.STATIC_DRAW );

    // set color
    gl.uniform4f(colorLoc, 0.13, 0.45, 0.11, 1.0); // color (R,G,B,A)

    // draw leafs
    gl.drawArrays( gl.TRIANGLES, 0, 9);

    // star vertices
    var star = new Float32Array([
        -0.7,0.2,
        -0.8,0.3,
        -0.6,0.3,
        -0.7,0.35,
        -0.8,0.225,
        -0.6,0.225
    ]);

    // put vertices into buffer
    gl.bufferData(gl.ARRAY_BUFFER, star, gl.STATIC_DRAW );

    // set color
    gl.uniform4f(colorLoc, 1, 1, 0., 1.0); // color (R,G,B,A)

    // draw star
    gl.drawArrays( gl.TRIANGLES, 0, 6);
}

function bigSnowman(colorLoc,vOffset,vSize){

    // snowman body vertices
    var snowmanBody = new Float32Array([

        -0.375,   -0.72,  //   v0
        -0.5,   -0.8,  //   v1
        -0.25,   -0.8,  //   v2
        -0.2,   -0.7,  //   v3
        -0.2,   -0.6,  //   v4
        -0.25,   -0.5,  //   v5
        -0.5,   -0.5,  //   v6
        -0.55,   -0.6,  //   v7
        -0.55,   -0.7,  //   v8
        -0.5,   -0.8  //   v1
    ]);

    // put vertices into buffer
    gl.bufferData(gl.ARRAY_BUFFER, snowmanBody, gl.STATIC_DRAW );

    // set offset, size
    gl.uniform4f(vOffset,0,0,0,0);
    gl.uniform4f(vSize, 1,1,1,1);
    // set cikir
    gl.uniform4f(colorLoc, 0.83, 0.96, 0.98, 1.0); // color (R,G,B,A)
    // draw snowman body
    gl.drawArrays(gl.TRIANGLE_FAN,0,10);

    // snowman head vertices
    var snowmanHead = new Float32Array([

        -0.37,   -0.57,  //   v0
        -0.4,   -0.5,  //   v1
        -0.35,   -0.5,  //   v2
        -0.3,   -0.45,  //   v3
        -0.3,   -0.4,  //   v4
        -0.35,   -0.35,  //   v5
        -0.4,   -0.35,  //   v6
        -0.45,   -0.4,  //   v7
        -0.45,   -0.45,  //   v8
        -0.4,   -0.5  //   v1
    ]);

    // put vertices into buffer
    gl.bufferData(gl.ARRAY_BUFFER, snowmanHead, gl.STATIC_DRAW );

    // set color
    gl.uniform4f(colorLoc, 0.83, 0.96, 0.98, 1.0); // color (R,G,B,A)
    // draw snowman head
    gl.drawArrays(gl.TRIANGLE_FAN,0,10);

    // snowman eye vertices
    var eye = new Float32Array([

        -0.425,-0.4,
        -0.4,-0.4

    ]);

    // set buffet
    gl.bufferData(gl.ARRAY_BUFFER, eye, gl.STATIC_DRAW );

    // set color
    gl.uniform4f(colorLoc, 0, 0, 0, 1.0); // color (R,G,B,A)
    // draw left eye
    gl.drawArrays(gl.LINE_STRIP,0,2);

    // move 0.05 x-side
    gl.uniform4f(vOffset,0.05,0,0,0);
    gl.uniform4f(colorLoc, 0, 0, 0, 1.0); // color (R,G,B,A)
    // draw right eye
    gl.drawArrays(gl.LINE_STRIP,0,2);

    // snowman nose vertices
    var nose = new Float32Array([

        -0.39,-0.425,
        -0.39,-0.45,
        -0.415,-0.4375

    ]);

    // set buffer
    gl.bufferData(gl.ARRAY_BUFFER, nose, gl.STATIC_DRAW );

    // set color, offset
    gl.uniform4f(colorLoc, 1, 0.37, 0, 1.0); // color (R,G,B,A)
    gl.uniform4f(vOffset,0,0,0,0);
    // draw nose
    gl.drawArrays(gl.TRIANGLES,0,3);
}

function miniSnowman(colorLoc,vOffset,vSize){

    // snowman body vertices
    var snowmanBody = new Float32Array([

        0,   -0.725,  //   v0
        -0.1,   -0.8,  //   v1
        0.1,   -0.8,  //   v2
        0.125,   -0.75,  //   v3
        0.125,   -0.7,  //   v4
        0.1,   -0.65,  //   v5
        -0.1,   -0.65,  //   v6
        -0.125,   -0.7,  //   v7
        -0.125,   -0.75,  //   v8
        -0.1,   -0.8  //   v1
    ]);

    // set buffer
    gl.bufferData(gl.ARRAY_BUFFER, snowmanBody, gl.STATIC_DRAW );

    // set size, offset, color
    gl.uniform4f(vOffset,0,0,0,0);
    gl.uniform4f(vSize, 1,1,1,1);
    gl.uniform4f(colorLoc, 0.83, 0.96, 0.98, 1.0); // color (R,G,B,A)
    // draw snowman body
    gl.drawArrays(gl.TRIANGLE_FAN,0,10);

    // snowman head vertices
    var snowmanHead = new Float32Array([

        0,   -0.575,  //   v0
        -0.02,   -0.65,  //   v1
        0.02,   -0.65,  //   v2
        0.06,   -0.6,  //   v3
        0.06,   -0.55,  //   v4
        0.02,   -0.5,  //   v5
        -0.02,   -0.5,  //   v6
        -0.06,   -0.55,  //   v7
        -0.06,   -0.6,  //   v8
        -0.02,   -0.65  //   v1
    ]);

    // set buffer
    gl.bufferData(gl.ARRAY_BUFFER, snowmanHead, gl.STATIC_DRAW );

    // set color
    gl.uniform4f(colorLoc, 0.83, 0.96, 0.98, 1.0); // color (R,G,B,A)
    // draw snowman head
    gl.drawArrays(gl.TRIANGLE_FAN,0,10);

    // snowman eye vertices
    var eye = new Float32Array([

        -0.04,-0.55,
        -0.02,-0.55
    ]);

    // set buffer
    gl.bufferData(gl.ARRAY_BUFFER, eye, gl.STATIC_DRAW );

    // set color
    gl.uniform4f(colorLoc, 0, 0, 0, 1.0); // color (R,G,B,A)
    // draw left eye
    gl.drawArrays(gl.LINE_STRIP,0,2);

    // move 0.04 x-side
    gl.uniform4f(vOffset,0.04,0,0,0);
    // set color
    gl.uniform4f(colorLoc, 0, 0, 0, 1.0); // color (R,G,B,A)
    // draw right eye
    gl.drawArrays(gl.LINE_STRIP,0,2);

    // nose vertices
    var nose = new Float32Array([

        0,-0.575,
        0,-0.6,
        -0.02,-0.585

    ]);
    // set buffer
    gl.bufferData(gl.ARRAY_BUFFER, nose, gl.STATIC_DRAW );

    // set offset, color
    gl.uniform4f(vOffset,0,0,0,0);
    gl.uniform4f(colorLoc, 1, 0.37, 0, 1.0); // color (R,G,B,A)
    // draw nose
    gl.drawArrays(gl.TRIANGLES,0,3);
}


function sky(colorLoc,vOffset,vSize){
    // christmas vertex
    var christmasLine = new Float32Array([
        -0.9,0.9,
        -0.89,0.89,
        -0.9,0.89,
        -0.89,0.9,
        -0.9,0.895,
        -0.89,0.895
    ]);

    // set buffer
    gl.bufferData(gl.ARRAY_BUFFER, christmasLine, gl.STATIC_DRAW );

    // offset's x y
    var x=0;
    var y=0;
    // set size
    gl.uniform4f(vSize,1,1,1,1);

    // draw 4 lines and 16 object
    for (var i=0;i<4;i++){
        for(var j=0;j<16;j++){
            //set offset
            gl.uniform4f(vOffset,x,y,0,0)
            if(j%2==0){
                // set color -> red
                gl.uniform4f(colorLoc, 0.93, 0, 0, 1); // color (R,G,B,A)
            }
            else{
                // set color -> green
                gl.uniform4f(colorLoc, 0.13, 0.45, 0.11, 1); // color (R,G,B,A)
            }
            // draw object
            gl.drawArrays(gl.LINE_STRIP,0,2);
            gl.drawArrays(gl.LINE_STRIP,2,2);
            gl.drawArrays(gl.LINE_STRIP,4,2);
            // move 0.125 x-side
            x = x + 0.125
        }
        // set odd line
        if(i%2==0){
            x=-0.07
        }
        // set even line
        else{
            x=0;
        }
        // move -0.2 y-side
        y=y-0.2;
        // clear offset
        gl.uniform4f(vOffset,0,0,0,0)
    }



}
