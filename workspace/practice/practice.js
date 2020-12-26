
var gl;
var points = [];
var colors = [];
var Num = 3;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    var vertices = [
        vec2(0,1),vec2(-1,0),vec2(1,0),vec2(0,-1)
    ];

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,flatten(vertices),gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    var thetaLoc=gl.getUniformLocation(program,"theta");
    render();
};

function triangle(a,b,c,color)
{
    var baseColors = [
        vec3(1.0, 0.0, 0.0),
        vec3(0.0, 1.0, 0.0),
        vec3(0.0, 0.0, 1.0),
        vec3(0.0, 0.0, 0.0)
        
    ];
    colors.push(baseColors[color]);
    points.push(a);
    colors.push(baseColors[color]);
    points.push(b);
    colors.push(baseColors[color]);
    points.push(c);
    
}

function tetra(a,b,c,d)
{
    triangle(b,c,d,3);
    triangle(a,c,b,0);
    triangle(a,c,d,1);
    triangle(a,b,d,2);
    
}

function divideTriangle(a,b,c,d,count)
{
    if (count==0){
        tetra(a,b,c,d);
    }
    else{
        var ab = mix(a,b,0.5);
        var ac = mix(a,c,0.5);
        var ad = mix(a,d,0.5);
        var bc = mix(b,c,0.5);
        var bd = mix(b,d,0.5);
        var cd = mix(c,d,0.5);
        
        
        --count;

        divideTriangle(a,ab,ac,ad,count);
        divideTriangle(ab,b,bc,bd,count);
        divideTriangle(ac,bc,c,cd,count);
        divideTriangle(ad,bd,cd,d,count);
        
    }
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
}
