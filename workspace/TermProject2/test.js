var gl;
var numVertices  = 36;//12개 삼각형 * 점3개 = 36개

var axis = 0;
var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var theta = [ 0, 0, 0 ];
var thetaLoc;

var flag = true;//진행

var head_vertices = [
    vec3( -0.25, -0.25,  0.25), //0
    vec3( -0.25,  0.25,  0.25), //1
    vec3(  0.25,  0.25,  0.25), //2
    vec3(  0.25, -0.25,  0.25), //3
    vec3( -0.25, -0.25, -0.25), //4
    vec3( -0.25,  0.25, -0.25), //5
    vec3(  0.25,  0.25, -0.25), //6
    vec3(  0.25, -0.25, -0.25)  //7
];
var head_colors = [
    vec4(0.98, 0.80, 0.69, 1.0),//살색
    vec4(0.98, 0.80, 0.69, 1.0),//살색
    vec4(0.98, 0.80, 0.69, 1.0),//살색
    vec4(0.98, 0.80, 0.69, 1.0),//살색
    vec4(0.98, 0.80, 0.69, 1.0),//살색
    vec4(0.98, 0.80, 0.69, 1.0),//살색
    vec4(0.98, 0.80, 0.69, 1.0),//살색
    vec4(0.98, 0.80, 0.69, 1.0)//살색
];
var indices = [
    1,0,3,
    3,2,1,//앞면
    2,3,7,
    7,6,2,//오른쪽면
    3,0,4,
    4,7,3,//밑면
    6,5,1,
    1,2,6,//윗면
    4,5,6,
    6,7,4,
    5,4,0,
    0,1,5
]
var Sx = 0.5, Sy = 0.5, Sz = 0.5;
var xformMatrix = new Float32Array([
    0.5,   0.0,  0.0,  0.0,
    0.0,  0.5,   0.0,  0.0,
    0.0,  0.0,  0.5,   0.0,
    0.0,  0.0,  0.0,   1.0,
]);
function solution(vector, arr2, arr3, arr4) {
    return vector = [
        vec3( -0.25*arr2, -0.25*arr3,  0.25*arr4), //0
        vec3( -0.25*arr2,  0.25*arr3,  0.25*arr4), //1
        vec3(  0.25*arr2,  0.25*arr3,  0.25*arr4), //2
        vec3(  0.25*arr2, -0.25*arr3,  0.25*arr4), //3
        vec3( -0.25*arr2, -0.25*arr3, -0.25*arr4), //4
        vec3( -0.25*arr2,  0.25*arr3, -0.25*arr4), //5
        vec3(  0.25*arr2,  0.25*arr3, -0.25*arr4), //6
        vec3(  0.25*arr2, -0.25*arr3, -0.25*arr4)  //7
    ];
}

var a = solution(head_vertices, 1.5,1.5,1.5)
console.log(a)

window.onload = function () {

    //[1]. html에서 canvas를 가져오고
    var canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }

    //뎁스 세팅
    gl.enable(gl.DEPTH_TEST);

    //  Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);//(0,0)을 (100,100)으로 바꿔봐라
    gl.clearColor(1.0, 1.0, 1.0, 1.0);//배경색 black

    //  Load shaders and initialize attribute buffers
    //[2,3,4] 만들었던 shader코드를 컴파일한다,사용할 수 있도록만듬
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);//shader program을 실행할 것.

    //array element buffer
    var iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);

    //color Buffer
    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(head_colors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);


    //vertex Buffer
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(a), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    thetaLoc = gl.getUniformLocation(program, "theta");

    //event listeners for buttons

    document.getElementById("xButton").onclick = function () {
        axis = xAxis;
    };
    document.getElementById("yButton").onclick = function () {
        axis = yAxis;
    };
    document.getElementById("zButton").onclick = function () {
        axis = zAxis;
    };
    document.getElementById("ButtonT").onclick = function () {
        flag = !flag;
    };

    render();

    let scene = new THREE.Scene();
    let light;
    let camera;
    let objLoader; // OBJLoader 객체를 넣을 변수를 선언합니다.
    let mtlLoader; // MTLLoader 객체를 넣을 변수를 선언합니다.

    initThree();
    addDirectionalLight();
    loadMTLLoader();

    /**
     * DirectionalLight를 추가하는 함수
     *
     * @method addDirectionalLight
     */
    function addDirectionalLight() {
        let light1 = new THREE.DirectionalLight(0xffffff, 1);
        light1.position.set(-100, 0, 100);
        let light2 = new THREE.DirectionalLight(0xffffff, 1);
        light2.position.set(100, 0, 100);
        let light3 = new THREE.DirectionalLight(0xffffff, 1);
        light3.position.set(100, 0, -100);
        let light4 = new THREE.DirectionalLight(0xffffff, 1);
        light4.position.set(-100, 100, -100);
        scene.add(light1);
        scene.add(light2);
        scene.add(light3);
        scene.add(light4);
    }

    /**
     * Material 파일을 로드하는 함수
     *
     * @method loadMTLLoader
     */
    function loadMTLLoader() {
        mtlLoader = new THREE.MTLLoader();

        // MTLLoader Material 파일을 사용할 전역 경로를 설정합니다.
        mtlLoader.setPath('./resources/stardium/');

        // 로드할 Material 파일 명을 입력합니다.
        mtlLoader.load('Stadium.mtl', function (materials) {
            // 로드 완료되었을때 호출하는 함수
            materials.preload();

            loadOBJLoader(materials);
        }, function (xhr) {
            // 로드되는 동안 호출되는 함수
            console.log('MTLLoader: ', xhr.loaded / xhr.total * 100, '% loaded');
        }, function (error) {
            // 로드가 실패했을때 호출하는 함수
            console.error('MTLLoader 로드 중 오류가 발생하였습니다.', error);
            alert('MTLLoader 로드 중 오류가 발생하였습니다.');
        });
    }

    /**
     * .obj 파일의 모델을 로드하는 함수
     *
     * @method loadObjLoader
     * @param {Object} materials MTLLoader에서 로드한 Materials 값
     */
    function loadOBJLoader(materials) {
        loader = new THREE.OBJLoader();

        // MTLLoader에서 로드한 materials 파일을 설정합니다.
        loader.setMaterials(materials);

        // OBJLoader OBJ 파일을 사용할 전역 경로를 설정합니다.
        loader.setPath('./resources/stardium/');

        // 로드할 OBJ 파일 명을 입력합니다.
        loader.load('Stadium.obj', function (object) {
            // 모델 로드가 완료되었을때 호출되는 함수
            object.position.x = 0;
            object.position.y = 0;
            object.position.z = 0;
            scene.add(object);
        }, function (xhr) {
            // 모델이 로드되는 동안 호출되는 함수
            console.log('OBJLoader: ', xhr.loaded / xhr.total * 100, '% loaded');
        }, function (error) {
            // 모델 로드가 실패했을 때 호출하는 함수
            alert('모델을 로드 중 오류가 발생하였습니다.');
        });
    }

    /**
     * Threejs 초기화 함수
     *
     * @method initThree
     */
    function initThree() {
        // 브라우저가 WebGL을 지원하는지 체크
        if (WEBGL.isWebGLAvailable()) {
            console.log('이 브라우저는 WEBGL을 지원합니다.');
        } else {
            console.log('이 브라우저는 WEBGL을 지원하지 않습니다.');
        }

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        let renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xffffff, 1); // 전체적인 배경색 수정
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild(renderer.domElement);

        let axes = new THREE.AxisHelper(10);
        scene.add(axes);

        camera.position.x = 1;
        camera.position.y = 3;
        camera.position.z = 3;

        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.rotateSpeed = 1.0;
        controls.zoomSpeed = 2;
        controls.panSpeed = 0.8;
        controls.minDistance = 3;
        controls.maxDistance = 10000;

        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            controls.update();
        }

        animate();
    }
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);// 화면을 clear 시켜줌

    if(flag) theta[axis] += 2.0;
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements( gl.TRIANGLES, numVertices, gl.UNSIGNED_BYTE,0 );

    requestAnimFrame( render );
}