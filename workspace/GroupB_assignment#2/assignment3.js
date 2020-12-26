//Introduction
//I express a house where the clear sky, forest, and sea coexist.
//I wanted to express the sea where the waves were rising lively
//and to express the forest by making trees around the house.
var gl;
var points;
var theta = 0.0;
var thetaLoc;
var u_color;
var vOffset;
var vSize;
var vColor;
var reverse = 0;
var count = 0;
var rect = [];


var sunny_color_x=1.0;
var sunny_color_y=0.0;
var sunny_color_z=0.0;
var wave_color_x=0;
var wave_color_y=0;
var wave_color_z=0.9;

var vertex_check_rotation;
var vertex_check_rotation2;

var offset_x;
var offset_y;
var color_z;
var x_size;
var y_size;
var offset_x2;
var offset_y2;
var color_z2;
var x_size2;
var y_size2;
// sunny octagon vertex
var octagon_vertices = [
    vec2(0.65, 0.95), vec2(0.6, 0.9), vec2(0.6, 0.8), vec2(0.65, 0.75),
    vec2(0.75, 0.75), vec2(0.8, 0.8), vec2(0.8, 0.9), vec2(0.75, 0.95)
];
var sun_Color = [ //Set sun color : 팔각형 왼쪽위부터 반시계방향으로 컬러설정
    vec4(1.0, 0.75, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 0.5, 0.0, 1.0),
    vec4(1.0, 0.25, 0.0, 1.0),
    vec4(1.0, 0.25, 0.0, 1.0),
    vec4(1.0, 0.5, 0.0, 1.0)
];
window.onload = function init() {

    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }

    //  Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);//(0,0)을 (100,100)으로 바꿔봐라
    // Define the color of background (set the yellow color)
    gl.clearColor(1.0, 1.0, 0.8, 1.0);

    //  Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);


    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);

    // Associate vertex data buffer with shader variables
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    document.getElementById("Button").onclick = function(){
        reverse += 1;
    }
    // uniform variable color & offset & size를 유니폼 로케이션으로 가져와준다.
    u_color = gl.getUniformLocation(program, "u_color");
    vOffset = gl.getUniformLocation(program, "vOffset");
    vSize = gl.getUniformLocation(program, "vSize");
    vColor = gl.getAttribLocation(program, "vColor");

    canvas.addEventListener("mousedown", function (event) {

        var t = vec2(2 * event.clientX / canvas.width - 1,
            2 * (canvas.height - event.clientY) / canvas.height - 1
        );
        var rectVertices = [
            vec2(t[0],t[1]),
            vec2(t[0]-0.05,t[1]+0.09),
            vec2(t[0]+0.05,t[1]+0.09),
            vec2(t[0],t[1]+0.12),
            vec2(t[0]-0.05,t[1]+0.025),
            vec2(t[0]+0.05,t[1]+0.025)
        ];
        rect.push(rectVertices[0]);
        rect.push(rectVertices[1]);
        rect.push(rectVertices[2]);
        rect.push(rectVertices[3]);
        rect.push(rectVertices[4]);
        rect.push(rectVertices[5]);
    });

    vertex_check_rotation = gl.getUniformLocation(program, "rotation");
    vertex_check_rotation2 = gl.getUniformLocation(program, "rotation2");

    thetaLoc = gl.getUniformLocation(program, "theta");

    render();
};


function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    var trees = [
        vec2(0, 0.3), vec2(-0.15, 0.15), vec2(0.15, 0.15),
        vec2(0, 0.15), vec2(-0.15, 0), vec2(0.15, 0),
        vec2(0, 0), vec2(-0.15, -0.15), vec2(0.15, -0.15),
        vec2(-0.05, -0.15), vec2(-0.05, -0.35), vec2(0.05, -0.15), vec2(0.05, -0.35)
    ];

    gl.bufferData(gl.ARRAY_BUFFER, flatten(trees), gl.STATIC_DRAW);//2. 벡터형태로 했을 때 flatten()추가

    //Set 3 Left Trees
    //Change position through offset & increase in size(*1.1)
    offset_x = -0.85
    offset_y = 0
    color_z = 0.0
    x_size = 1.0
    y_size = 1.0
    for (var i = 0; i < 3; i++) {
        gl.uniform4f(vSize, x_size, y_size, 1, 1)
        gl.uniform4f(vOffset, offset_x, offset_y, 0, 0);
        gl.uniform4f(u_color, 0, 1, color_z, 1); // 초록색 세팅
        gl.drawArrays(gl.TRIANGLES, 0, 9);// 삼각형 형태로 3개 그림
        gl.uniform4f(u_color, 0.5, 0.25, 0, 1); // 갈색 세팅
        gl.drawArrays(gl.TRIANGLE_STRIP, 9, 4); //STRIP으로 삼각형 2개 그림
        color_z = color_z + 0.2;
        offset_x = offset_x + 0.15;
        offset_y = offset_y + 0.05;
        x_size = x_size * 1.1;
        y_size = y_size * 1.1;
    }

    //Set 3 Right Trees
    //Change position through offset & increase in size(*1.1)
    offset_x2 = 0.85
    offset_y2 = 0
    color_z2 = 0
    x_size2 = 1.0
    y_size2 = 1.0
    for (var j = 0; j < 3; j++) {
        gl.uniform4f(vSize, x_size2, y_size2, 1, 1);
        gl.uniform4f(vOffset, offset_x2, offset_y2, 0, 0);
        gl.uniform4f(u_color, 0, 1, color_z2, 1); // 초록색 세팅
        gl.drawArrays(gl.TRIANGLES, 0, 9);// 삼각형 형태로 3개 그림
        gl.uniform4f(u_color, 0.5, 0.25, 0, 1); // 갈색 세팅
        gl.drawArrays(gl.TRIANGLE_STRIP, 9, 4); //STRIP으로 삼각형 2개 그림
        color_z2 = color_z2 + 0.2;
        offset_x2 = offset_x2 - 0.15;
        offset_y2 = offset_y2 + 0.05;
        x_size2 = x_size2 * 1.1;
        y_size2 = y_size2 * 1.1;
    }

    var background = [
        vec2(-1.0, -1.0), vec2(-1.0, -0.65), vec2(1.0, -1.0), vec2(1.0, -0.65)
    ];
    var x = 0.2
    gl.bufferData(gl.ARRAY_BUFFER, flatten(background), gl.STATIC_DRAW);

    // Set Blue_color Sea
    for(i=0;i<1000;i++){
        gl.uniform4f(vSize, 1, 1, 1, 1)
        gl.uniform4f(vOffset, 0, 0, 0, 0)
        //바닷물 배경색 변경
        if (wave_color_y<0.8){
            gl.uniform4f(u_color, wave_color_x, wave_color_y, wave_color_z, 1);
            wave_color_y+=0.05;
        }else if(wave_color_y > 0.8 && wave_color_x<0.7){
            gl.uniform4f(u_color, wave_color_x, wave_color_y, wave_color_z, 1);
            wave_color_x+=0.025;
            wave_color_y-=0.025;
        }
        else if(wave_color_y<0.8 && wave_color_x<0.8){
            wave_color_y-=0.02;
            wave_color_x-=0.02;
        }else if(wave_color_y>0.1 && wave_color_x>0.1){
            wave_color_z=0.9;
            wave_color_y=0;
            wave_color_x=0;
        }
        gl.uniform4f(u_color, wave_color_x, wave_color_y, wave_color_z, 1);
        // gl.uniform4f(u_color, 0, 0, 0.9, 1); // 파란색 세팅
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); //STRIP으로 삼각형 2개 그림
    }


    // Set sky_color Sky >> sea에서 offset으로 이동
    gl.uniform4f(vSize, 1, 1, 1, 1)
    gl.uniform4f(vOffset, 0, 1.65, 0, 0)
    gl.uniform4f(u_color, 0.2, 0.8, 1.0, 1); //하늘색 세팅
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); //STRIP으로 삼각형 2개 그림

    x = 0.5;
    // draw sea wave with octagon : 바닷물결 움직이도록 + 색변경
    gl.bufferData(gl.ARRAY_BUFFER, flatten(octagon_vertices), gl.STATIC_DRAW);
    for (var i = 0; i < 7; i++) {
        gl.uniform4f(vSize, 1, 1, 1, 1);
        if(count%10 == 0)
            offset_x-=0.1;
        else if(count%10 == 9)
            offset_x+=0.1;
        gl.uniform4f(vOffset, x + offset_x, -1.55, 0, 0);
        //바닷물결 색 변경
        for(var j=0;j<10;j++){
            if (wave_color_y<0.8){
                gl.uniform4f(u_color, wave_color_x, wave_color_y, wave_color_z, 1);
                wave_color_y+=0.05;
            }else if(wave_color_y > 0.8 && wave_color_x<0.7){
                gl.uniform4f(u_color, wave_color_x, wave_color_y, wave_color_z, 1);
                wave_color_x+=0.025;
                wave_color_y-=0.025;
            }
            else if(wave_color_y<0.8 && wave_color_x<0.8){
                wave_color_y-=0.02;
                wave_color_x-=0.02;
            }else if(wave_color_y>0.1 && wave_color_x>0.1){
                wave_color_z=0.9;
                wave_color_y=0;
                wave_color_x=0;
            }
            gl.uniform4f(u_color, wave_color_x, wave_color_y, wave_color_z, 1);
        }
        // gl.uniform4f(u_color, 0, 0, 0.9, 1); // 파란색 세팅
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 8); //FAN으로 팔각형
        x = x + -0.3
    }
    count++;

    gl.bufferData(gl.ARRAY_BUFFER, flatten(octagon_vertices), gl.STATIC_DRAW);
    offset_x = -1.4;
    offset_y = 0.2;
    //
    for (var i = 0; i < 8; i++) {
        if (i == 3 || i == 6) { // Move xoffset : When create 3 cloud
            offset_x = offset_x + 0.15;
        } else if (i == 7) { // Express the smoke coming from the burrow.
            offset_y = offset_y - 0.1
        }
        gl.uniform4f(vSize, 0.75, 0.75, 1, 1);
        gl.uniform4f(vOffset, offset_x, offset_y, 0, 0)
        gl.uniform4f(u_color, 1, 1, 1, 1); // 하얀색 세팅
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 8); //FAN으로 삼각형
        offset_x = offset_x + 0.125
    }

    // sea wave w모양 물결 선 표시
    var sea_wave = [
        vec2(-0.80, -0.75), vec2(-0.75, -0.80), vec2(-0.70, -0.75), vec2(-0.65, -0.80),
        vec2(-0.60, -0.75), vec2(-0.55, -0.8), vec2(-0.50, -0.75)
    ];

    offset_x = 0
    offset_y = 0
    gl.bufferData(gl.ARRAY_BUFFER, flatten(sea_wave), gl.STATIC_DRAW);
    for (var i = 0; i < 5; i++) {
        if (i % 2 != 0) {
            offset_y = -0.15;
        } else {
            offset_y = 0;
        }
        gl.uniform4f(vSize, 1, 1, 1, 1);
        gl.uniform4f(vOffset, offset_x, offset_y, 0, 0);
        gl.uniform4f(u_color, 1, 1, 1, 1); // 하얀색 세팅
        gl.drawArrays(gl.LINE_STRIP, 0, 7); //FAN으로 삼각형
        offset_x = offset_x + 0.3;
    }

    // house function

    var house1 = [ //빨간지붕
        vec2(-0.2, 0.5), vec2(-0.4, 0.3), vec2(0.2, 0.5), vec2(0.4, 0.3)
    ];
    var house2 = [ //노란벽 , 하늘색창문(노라벽*size)
        vec2(-0.4, 0.3), vec2(-0.4, -0.3), vec2(0.4, 0.3), vec2(0.4, -0.3)
    ]
    var house3 = [ //굴뚝 끝부분
        vec2(0.2, 0.65), vec2(0.2, 0.3), vec2(0.4, 0.65), vec2(0.4, 0.3)
    ]
    var house4 = [ //굴뚝
        vec2(0.15, 0.65), vec2(0.15, 0.6), vec2(0.45, 0.65), vec2(0.45, 0.6)
    ]
    var house5 = [ //창문 세로선
        vec2(0, 0.3), vec2(0, -0.3)
    ]
    var house6 = [ //창문 가로선
        vec2(-0.4, 0), vec2(0.4, 0)
    ]
    //굴뚝 위치+색 설정 및 그리기
    gl.bufferData(gl.ARRAY_BUFFER, flatten(house4), gl.STATIC_DRAW);
    gl.uniform4f(vOffset, 0, 0.05, 0, 0)
    gl.uniform4f(u_color, 0.6, 0.2, 0.2, 1); // 갈색 세팅
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    //굴뚝 끝부분 위치+색 설정 및 그리기
    gl.bufferData(gl.ARRAY_BUFFER, flatten(house3), gl.STATIC_DRAW);
    gl.uniform4f(vOffset, 0, 0, 0, 0)
    gl.uniform4f(u_color, 0.6, 0.2, 0.2, 1); // 갈색 세팅
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); //FAN으로 삼각형
    ////지붕 위치+색 설정 및 그리기
    gl.bufferData(gl.ARRAY_BUFFER, flatten(house1), gl.STATIC_DRAW);
    gl.uniform4f(vOffset, 0, 0, 0, 0)
    gl.uniform4f(u_color, 1, 0.1, 0.1, 1); // 빨간색 세팅
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    //벽 위치+색 설정 및 그리기
    gl.bufferData(gl.ARRAY_BUFFER, flatten(house2), gl.STATIC_DRAW);
    gl.uniform4f(vOffset, 0, 0, 0, 0)
    gl.uniform4f(u_color, 1, 1, 0.2, 1); // 노란색 세팅
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    //창문 위치+색+크기 설정 및 그리기
    gl.bufferData(gl.ARRAY_BUFFER, flatten(house2), gl.STATIC_DRAW);
    gl.uniform4f(vSize, 0.4, 0.4, 1, 1);
    gl.uniform4f(vOffset, 0, 0, 0, 0);
    gl.uniform4f(u_color, 0.4, 1, 1, 1); // 하늘색 세팅
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    //창문 세로선 위치+색+크기 설정 및 그리기
    gl.bufferData(gl.ARRAY_BUFFER, flatten(house5), gl.STATIC_DRAW);
    gl.uniform4f(vSize, 0.4, 0.4, 1, 1);
    gl.uniform4f(vOffset, 0, 0, 0, 0)
    gl.uniform4f(u_color, 1, 1, 1, 1); // 하얀색 세팅
    gl.drawArrays(gl.LINES, 0, 2);
    //창문 가로선 위치+색+크기 설정 및 그리기
    gl.bufferData(gl.ARRAY_BUFFER, flatten(house6), gl.STATIC_DRAW);
    gl.uniform4f(vSize, 0.4, 0.4, 1, 1);
    gl.uniform4f(vOffset, 0, 0, 0, 0)
    gl.uniform4f(u_color, 1, 1, 1, 1); // 하얀색 세팅
    gl.drawArrays(gl.LINES, 0, 2);

    //sunny
    // set for draw sunny : boolean uniform을 이용하여 vertex-shader와 fragment-shader값 변경해줌
    // true : 세타값을 넣어 회전시킬 수 있는 포지션, false : 일반 포지션*사이즈 + 오프셋
    // 여기선 Sunny를 회전시키기 위해 true로 설정
    gl.uniform1i(vertex_check_rotation, true);
    gl.uniform1i(vertex_check_rotation2, true);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(octagon_vertices), gl.STATIC_DRAW);
    gl.uniform4f(vSize, 1.3, 1.3, 1, 1);
    gl.uniform4f(vOffset, -0.15, -0.275, 0, 0);
    if (sunny_color_y<0.8){
        gl.uniform4f(u_color, sunny_color_x, sunny_color_y, sunny_color_z, 1);
        sunny_color_y+=0.05;
    }else if(sunny_color_y > 0.8 && sunny_color_z<0.7){
        gl.uniform4f(u_color, sunny_color_x, sunny_color_y, sunny_color_z, 1);
        sunny_color_z+=0.025;
        sunny_color_y-=0.025;
    }
    else if(sunny_color_y<0.8 && sunny_color_z<0.8){
        sunny_color_y-=0.02;
        sunny_color_z-=0.02;
    }else if(sunny_color_y>0.1 && sunny_color_z>0.1){
        sunny_color_x=1;
        sunny_color_y=0;
        sunny_color_z=0;
    }

        //var sunny_color_x=1.0;
        // var sunny_color_y=0.0;
        // var sunny_color_z=0.0;
    // //컬러 버퍼 할당
    // var colorBufferId = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferId);
    // gl.bufferData(gl.ARRAY_BUFFER, flatten(sun_Color), gl.STATIC_DRAW);
    // gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    // gl.enableVertexAttribArray(vColor);

    //draw sunny
    if(reverse%2 == 0){
        theta += 0.1;//좌표값 설정 :
    }
    else
        theta -= 0.1;
    console.log(theta)
    gl.uniform1f(thetaLoc, theta);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 8);
    // gl.disableVertexAttribArray(vColor);
    gl.uniform1i(vertex_check_rotation, false);
    gl.uniform1i(vertex_check_rotation2, false);

    gl.bufferData(gl.ARRAY_BUFFER, flatten(rect), gl.STATIC_DRAW);
    // Set Blue_color Sea
    gl.uniform4f(vSize, 1, 1, 1, 1)
    gl.uniform4f(vOffset, 0, 0, 0, 0)
    gl.uniform4f(u_color, 1, 0.751, 0.97, 1); // 컬러 셋팅
    gl.drawArrays(gl.TRIANGLES, 0, rect.length); // 별 그리기

    setTimeout(
        function () { requestAnimFrame(render); }, 100
    );

}