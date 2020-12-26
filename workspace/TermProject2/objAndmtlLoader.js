window.onload = function () {

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

        controls = new THREE.OrbitControls(camera, renderer.domElement );
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