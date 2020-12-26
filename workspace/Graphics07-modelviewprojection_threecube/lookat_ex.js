var canvas;
var gl;

var numVertices  = 84;

var points = [];
var colors = [];

var radius = 1.0;
var theta  = 0.0;
var phi    = 0.0;
var dr = 5.0 * Math.PI/180.0;

var mvMatrix;
var modelView;
var eye;

const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);









// quad uses first index to set color for face

function quad(a, b, c, d) {

    var vertices = [
        vec4( -0.5, -0.5,  0.5, 1.0 ),
        vec4( -0.5,  0.5,  0.5, 1.0 ),
        vec4( 0.5,  0.5,  0.5, 1.0 ),
        vec4( 0.5, -0.5,  0.5, 1.0 ),
        vec4( -0.5, -0.5, -0.5, 1.0 ),
        vec4( -0.5,  0.5, -0.5, 1.0 ),
        vec4( 0.5,  0.5, -0.5, 1.0 ),
        vec4( 0.5, -0.5, -0.5, 1.0 ),

        vec4( -0.5, -0.5-1.0,  0.5, 1.0 ),
        vec4( -0.5,  0.5-1.0,  0.5, 1.0 ),
        vec4( 0.5,  0.5-1.0,  0.5, 1.0 ),
        vec4( 0.5, -0.5-1.0,  0.5, 1.0 ),
        vec4( -0.5, -0.5-1.0, -0.5, 1.0 ),
        vec4( -0.5,  0.5-1.0, -0.5, 1.0 ),
        vec4( 0.5,  0.5-1.0, -0.5, 1.0 ),
        vec4( 0.5, -0.5-1.0, -0.5, 1.0 ),

        vec4( -0.5+1.0, -0.5,  0.5, 1.0 ),
        vec4( -0.5+1.0,  0.5,  0.5, 1.0 ),
        vec4( 0.5+1.0,  0.5,  0.5, 1.0 ),
        vec4( 0.5+1.0, -0.5,  0.5, 1.0 ),
        vec4( -0.5+1.0, -0.5, -0.5, 1.0 ),
        vec4( -0.5+1.0,  0.5, -0.5, 1.0 ),
        vec4( 0.5+1.0,  0.5, -0.5, 1.0 ),
        vec4( 0.5+1.0, -0.5, -0.5, 1.0 )
    ];

    
    var vertexColors = [
        vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
        vec4( 0.0, 1.0, 1.0, 1.0 ),  // cyan
        vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
    ];

    var indices = [a,b,c,a,c,d];
    for (var i=0; i<indices.length; ++i){
        points.push(vertices[indices[i]]);
        colors.push(vertexColors[a%8]);
    }
}

// Each face determines two triangles

function colorCube()
{
    quad( 1, 0, 3, 2 );
    // quad( 2, 3, 7, 6 );
    // quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );

    quad(8+1, 8+0, 8+3, 8+2 );
    quad(8+2, 8+3, 8+7, 8+6 );
    quad(8+3, 8+0, 8+4, 8+7 );
    quad(8+4, 8+5, 8+6, 8+7 );
    quad(8+5, 8+4, 8+0, 8+1 );
    
    quad(16+1, 16+0, 16+3, 16+2 );
    quad(16+2, 16+3, 16+7, 16+6 );
    quad(16+3, 16+0, 16+4, 16+7 );
    quad(16+6, 16+5, 16+1, 16+2 );
    quad(16+4, 16+5, 16+6, 16+7 );
    
}



window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );

    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);
	//gl.enable(gl.CULL_FACE);
    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    colorCube();

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    modelView = gl.getUniformLocation( program, "modelView" );

// buttons to change viewing parameters

    document.getElementById("Button1").onclick = function(){radius *= 1.1; render();};
    document.getElementById("Button2").onclick = function(){radius *= 0.9; render();};
    document.getElementById("Button3").onclick = function(){theta += dr; render();};
    document.getElementById("Button4").onclick = function(){theta -= dr; render();};
    document.getElementById("Button5").onclick = function(){phi += dr; render();};
    document.getElementById("Button6").onclick = function(){phi -= dr; render();};

    render();

}


var render = function() {
        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        eye = vec3(radius*Math.sin(phi), radius*Math.sin(theta),
             radius*Math.cos(phi)); // eye point
        mvMatrix = lookAt(eye, at , up);
        gl.uniformMatrix4fv( modelView, false, flatten(mvMatrix) )
        gl.drawArrays( gl.TRIANGLES, 0, numVertices );
       
    }

