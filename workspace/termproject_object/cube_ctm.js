
var canvas;
var gl;

var NumVertices  = 84;

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0;
var theta = [ 0, 0, 0 ];
var thetaLoc;

var scaleLoc;
var scale= [0.5,0.1,0.5];

var vertices = [
    vec3( -0.5, 0.3,  0.5), // 0
    vec3( -0.5,  0.5,  0.5), // 1
    vec3(  0.5,  0.5,  0.5), // 2
    vec3(  0.5, 0.3,  0.5), // 3
    vec3( -0.5, 0.3, -0.5), // 4
    vec3( -0.5,  0.5, -0.5), // 5
    vec3(  0.5,  0.5, -0.5), // 6
    vec3(  0.5, 0.3, -0.5), // 7
    vec3( -0.5, 0.29,  0.5), // 8
    // 머리카락
    vec3(  0.5, 0.29,  0.5), // 9
    vec3( -0.5, 0.29, -0.5), // 10
    vec3(  0.5, 0.29, -0.5), // 11
    vec3( -0.5, -0.5,  0.5), // 12
    vec3(  0.5, -0.5,  0.5), // 13
    vec3( -0.5, -0.5, -0.5), // 14
    vec3(  0.5, -0.5, -0.5), // 15
    // 머리

];

var colors = [
    [ 0.0, 0.0, 0.0, 1.0 ], //white
    [ 0.0, 0.0, 0.0, 1.0 ], //white
    [ 0.0, 0.0, 0.0, 1.0 ], //white
    [ 0.0, 0.0, 0.0, 1.0 ], //white
    [ 0.0, 0.0, 0.0, 1.0 ], //white
    [ 0.0, 0.0, 0.0, 1.0 ], //white
    [ 0.0, 0.0, 0.0, 1.0 ], //white
    [ 0.0, 0.0, 0.0, 1.0 ], //white
    // 머리카락 색
    [ 0.5, 0.3, 0.1, 0.5 ], //어두운살색
    [ 0.5, 0.3, 0.1, 0.5 ], //어두운살색
    [ 0.5, 0.3, 0.1, 0.5 ], //어두운살색
    [ 0.5, 0.3, 0.1, 0.5 ], //어두운살색
    [ 0.5, 0.3, 0.1, 0.3 ], //밝은살색
    [ 0.5, 0.3, 0.1, 0.3 ], //밝은살색
    [ 0.5, 0.3, 0.1, 0.3 ], //밝은살색
    [ 0.5, 0.3, 0.1, 0.3 ], //밝은살색
    // 피부 색
];
var index = [
    1,0,3,
    3,2,1,
    2,3,7,
    7,6,2,
    6,5,1,
    1,2,6,
    4,5,6,
    6,7,4,
    5,4,0,
    0,1,5,//여기까지 원래 큐브

    0,8,9,
    9,3,0,
    3,9,11,
    11,7,3,
    10,4,7,
    7,11,10,
    4,10,8,
    8,0,4,
    8,12,13,
    13,9,8,
    9,13,15,
    15,11,9,
    13,12,14,
    14,15,13,
    14,10,11,
    11,15,14,
    10,14,12,
    12,8,10
];

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }


    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint8Array(index),gl.STATIC_DRAW);

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    thetaLoc = gl.getUniformLocation(program, "theta");
    scaleLoc = gl.getUniformLocation(program, "scale");
    //event listeners for buttons

    document.getElementById( "xButton" ).onclick = function () {
        axis = xAxis;
        render();
    };
    document.getElementById( "yButton" ).onclick = function () {
        axis = yAxis;
        render();
    };
    document.getElementById( "zButton" ).onclick = function () {
        axis = zAxis;
        render();
    };

    render();
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    theta[axis] += 2.0;
    gl.uniform3fv(thetaLoc, theta);
    gl.uniform3fv(scaleLoc, scale);
    gl.drawElements( gl.TRIANGLES, NumVertices, gl.UNSIGNED_BYTE,0 );

    //requestAnimFrame( render );
}