var object1;
var cost = 0;
var duplicate = new Array(25);
duplicate.fill(0);
window.onload = function () {

    let scene = new THREE.Scene();
    let light;
    let camera;
    let objLoader; // OBJLoader 객체를 넣을 변수를 선언합니다.
    let mtlLoader; // MTLLoader 객체를 넣을 변수를 선언합니다.
    let mtlLoader2;

    document.getElementById('balance').innerHTML = 15 - cost + "$";

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
    function loadMTLLoader_3ds(){

    }

    // -- 스트라이커 --

    // 벤제마 클릭
    document.getElementById("benzema").onclick = function() {
        // //벤제마
        if(cost + 1 <= 15 && duplicate[0]%2 == 0){
            loader.load('benzema.obj', function (object4) {
                object4.position.x = -0.75;
                object4.position.y = -1;
                object4.position.z = 8;
                object4.scale.x = 0.25;
                object4.scale.y = 0.25;
                object4.scale.z = 0.25;
                scene.add(object4);;
                object1 = object4;
                cost+=1;
                duplicate[0] += 1;
                document.getElementById('balance').innerHTML = 15 - cost + "$";
            }, function (xhr) {
                // 모델이 로드되는 동안 호출되는 함수
                console.log(xhr.loaded / xhr.total * 100, '% loaded');
            }, function (error) {
                // 모델 로드가 실패했을 때 호출하는 함수
                alert('모델을 로드 중 오류가 발생하였습니다.');
            });
        }
        else if(cost + 1 > 15)
            alert('Too High Cost!');
        else if(duplicate[0]%2 != 0)
            alert('Duplicated One!');
    }
    // 뮐러 클릭
    document.getElementById("muller").onclick = function() {
        if(cost + 2 <= 15 && duplicate[1]%2 == 0){
            // 뮌헨 : 뮐러
            loader.load('muller.obj', function (muller) {
                // 모델 로드가 완료되었을때 호출되는 함수
                muller.position.x = -0.75;
                muller.position.y = -1;
                muller.position.z = 8;
                muller.scale.x = 0.25;
                muller.scale.y = 0.255;
                muller.scale.z = 0.25;
                scene.add(muller);
                object1 = muller;
                cost+=2;
                duplicate[1] += 1;
                document.getElementById('balance').innerHTML = 15 - cost + "$";
            }, function (xhr) {
                // 모델이 로드되는 동안 호출되는 함수
                console.log(xhr.loaded / xhr.total * 100, '% loaded');
            }, function (error) {
                // 모델 로드가 실패했을 때 호출하는 함수
                alert('모델을 로드 중 오류가 발생하였습니다.');
            });
        }
        else if(cost + 2 > 15)
            alert('Too High Cost!');
        else if(duplicate[1]%2 != 0)
            alert('Duplicated One!');
    }

    // 아구에로 클릭
    document.getElementById("aguero").onclick = function() {
        if(cost + 3 <= 15 && duplicate[2]%2 == 0){
            // //아구에로
            loader.load('aguero.obj', function (object4) {
                // 모델 로드가 완료되었을때 호출되는 함수
                object4.position.x = -0.75;
                object4.position.y = -1;
                object4.position.z = 8;
                object4.scale.x = 0.25;
                object4.scale.y = 0.19;
                object4.scale.z = 0.25;
                scene.add(object4);
                object1 = object4;
                cost+=3;
                duplicate[2] += 1;
                document.getElementById('balance').innerHTML = 15 - cost + "$";
            }, function (xhr) {
                // 모델이 로드되는 동안 호출되는 함수
                console.log(xhr.loaded / xhr.total * 100, '% loaded');
            }, function (error) {
                // 모델 로드가 실패했을 때 호출하는 함수
                alert('모델을 로드 중 오류가 발생하였습니다.');
            });
        }
        else if(cost + 3 > 15)
            alert('Too High Cost!');
        else if(duplicate[2]%2 != 0)
            alert('Duplicated One!');
    }

    // 레반도프스키 클릭
    document.getElementById("lewan").onclick = function() {
        if(cost + 4 <= 15 && duplicate[3]%2 == 0){
            // 뮌헨 : 레반도프스키
            loader.load('Lewandowski.obj', function (lewandowski) {
                // 모델 로드가 완료되었을때 호출되는 함수
                lewandowski.position.x = -0.75;
                lewandowski.position.y = -1;
                lewandowski.position.z = 8;
                lewandowski.scale.x = 0.25;
                lewandowski.scale.y = 0.245;
                lewandowski.scale.z = 0.25;
                scene.add(lewandowski);
                object1 = lewandowski;
                cost+=4;
                duplicate[3] += 1;
                document.getElementById('balance').innerHTML = 15 - cost + "$";
            }, function (xhr) {
                // 모델이 로드되는 동안 호출되는 함수
                console.log(xhr.loaded / xhr.total * 100, '% loaded');
            }, function (error) {
                // 모델 로드가 실패했을 때 호출하는 함수
                alert('모델을 로드 중 오류가 발생하였습니다.');
            });
        }
        else if(cost + 4 > 15)
            alert('Too High Cost!');
        else if(duplicate[3]%2 != 0)
            alert('Duplicated One!');

    }

    // 호날두 클릭
    document.getElementById("ronaldo").onclick = function() {
        if(cost + 5 <= 15 && duplicate[4]%2 == 0){
            // 호날두
            loader.load('ronaldo.obj', function (ronaldo) {
                // 모델 로드가 완료되었을때 호출되는 함수
                ronaldo.position.x = -0.75;
                ronaldo.position.y = -1;
                ronaldo.position.z = 8;
                ronaldo.scale.x = 0.25;
                ronaldo.scale.y = 0.26;
                ronaldo.scale.z = 0.25;
                scene.add(ronaldo);
                object1 = ronaldo;
                cost+=5;
                duplicate[4] += 1;
                document.getElementById('balance').innerHTML = 15 - cost + "$";
            }, function (xhr) {
                // 모델이 로드되는 동안 호출되는 함수
                console.log(xhr.loaded / xhr.total * 100, '% loaded');
            }, function (error) {
                // 모델 로드가 실패했을 때 호출하는 함수
                alert('모델을 로드 중 오류가 발생하였습니다.');
            });
        }
        else if(cost + 5 > 15)
            alert('Too High Cost!');
        else if(duplicate[4]%2 != 0)
            alert('Duplicated One!');
    }


    // -- 윙어 --

    // 아센시오 클릭
    document.getElementById("assensio").onclick = function() {
        if(cost + 1 <= 15 && duplicate[5]%2 == 0){
            // //아센시오
            loader.load('assensio.obj', function (object4) {
                // 모델 로드가 완료되었을때 호출되는 함수
                object4.position.x = -0.75;
                object4.position.y = -1;
                object4.position.z = 8;
                object4.scale.x = 0.25;
                object4.scale.y = 0.235;
                object4.scale.z = 0.25;
                scene.add(object4);
                object1 = object4;
                cost+=1;
                duplicate[5] += 1;
                document.getElementById('balance').innerHTML = 15 - cost + "$";
            }, function (xhr) {
                // 모델이 로드되는 동안 호출되는 함수
                console.log(xhr.loaded / xhr.total * 100, '% loaded');
            }, function (error) {
                // 모델 로드가 실패했을 때 호출하는 함수
                alert('모델을 로드 중 오류가 발생하였습니다.');
            });
        }
        else if(cost + 1 > 15)
            alert('Too High Cost!');
        else if(duplicate[5]%2 != 0)
            alert('Duplicated One!');
    }

    // 디발라 클릭
    document.getElementById("dybala").onclick = function() {
        if(cost + 2 <= 15 && duplicate[6]%2 == 0){
            // 디발라
            loader.load('dybala.obj', function (dybala) {
                // 모델 로드가 완료되었을때 호출되는 함수
                dybala.position.x = -0.75;
                dybala.position.y = -1;
                dybala.position.z = 8;
                dybala.scale.x = 0.25;
                dybala.scale.y = 0.21;
                dybala.scale.z = 0.25;
                scene.add(dybala);
                object1 = dybala;
                cost+=2;
                duplicate[6] += 1;
                document.getElementById('balance').innerHTML = 15 - cost + "$";
            }, function (xhr) {
                // 모델이 로드되는 동안 호출되는 함수
                console.log(xhr.loaded / xhr.total * 100, '% loaded');
            }, function (error) {
                // 모델 로드가 실패했을 때 호출하는 함수
                alert('모델을 로드 중 오류가 발생하였습니다.');
            });
        }
        else if(cost + 2 > 15)
            alert('Too High Cost!');
        else if(duplicate[6]%2 != 0)
            alert('Duplicated One!');
    }
    // 베르나르도 실바 클릭
    document.getElementById("silva").onclick = function() {
        if(cost + 3 <= 15 && duplicate[7]%2 == 0){
            // //베르나르도 실바
            loader.load('silva.obj', function (object4) {
                // 모델 로드가 완료되었을때 호출되는 함수
                object4.position.x = -0.75;
                object4.position.y = -1;
                object4.position.z = 8;
                object4.scale.x = 0.25;
                object4.scale.y = 0.19;
                object4.scale.z = 0.25;
                scene.add(object4);
                object1 = object4;
                cost+=3;
                duplicate[7] += 1;
                document.getElementById('balance').innerHTML = 15 - cost + "$";
            }, function (xhr) {
                // 모델이 로드되는 동안 호출되는 함수
                console.log(xhr.loaded / xhr.total * 100, '% loaded');
            }, function (error) {
                // 모델 로드가 실패했을 때 호출하는 함수
                alert('모델을 로드 중 오류가 발생하였습니다.');
            });
        }
        else if(cost + 3 > 15)
            alert('Too High Cost!');
        else if(duplicate[7]%2 != 0)
            alert('Duplicated One!');
    }

    // 아자르 클릭
    document.getElementById("hazard").onclick = function() {
        if(cost + 4 <= 15 && duplicate[8]%2 == 0){
            // //아자르
            loader.load('harzard.obj', function (object4) {
                // 모델 로드가 완료되었을때 호출되는 함수
                object4.position.x = -0.75;
                object4.position.y = -1;
                object4.position.z = 8;
                object4.scale.x = 0.25;
                object4.scale.y = 0.2;
                object4.scale.z = 0.25;
                scene.add(object4);
                object1 = object4;
                cost+=4;
                duplicate[8] += 1;
                document.getElementById('balance').innerHTML = 15 - cost + "$";
            }, function (xhr) {
                // 모델이 로드되는 동안 호출되는 함수
                console.log(xhr.loaded / xhr.total * 100, '% loaded');
            }, function (error) {
                // 모델 로드가 실패했을 때 호출하는 함수
                alert('모델을 로드 중 오류가 발생하였습니다.');
            });
        }
        else if(cost + 4 > 15)
            alert('Too High Cost!');
        else if(duplicate[8]%2 != 0)
            alert('Duplicated One!');
    }

    // 손흥민 클릭
    document.getElementById("son").onclick = function() {
        if(cost + 5 <= 15 && duplicate[9]%2 == 0){
            // 토트넘 : 손흥민
            loader.load('Son.obj', function (alderweireld) {
                // 모델 로드가 완료되었을때 호출되는 함수
                alderweireld.position.x = -0.75;
                alderweireld.position.y = -1;
                alderweireld.position.z = 8;
                alderweireld.scale.x = 0.25;
                alderweireld.scale.y = 0.24;
                alderweireld.scale.z = 0.25;
                scene.add(alderweireld);
                object1 = alderweireld;
                cost+=5;
                duplicate[9] += 1;
                document.getElementById('balance').innerHTML = 15 - cost + "$";
            }, function (xhr) {
                // 모델이 로드되는 동안 호출되는 함수
                console.log(xhr.loaded / xhr.total * 100, '% loaded');
            }, function (error) {
                // 모델 로드가 실패했을 때 호출하는 함수
                alert('모델을 로드 중 오류가 발생하였습니다.');
            });
        }
        else if(cost + 5 > 15)
            alert('Too High Cost!');
        else if(duplicate[9]%2 != 0)
            alert('Duplicated One!');
    }

    // -- 중미 --

    // 귄도간 클릭
    document.getElementById("gundogan").onclick = function() {
        if(cost + 1 <= 15 && duplicate[10]%2 == 0){
            // //귄도안
            loader.load('gundogan.obj', function (object4) {
                // 모델 로드가 완료되었을때 호출되는 함수
                object4.position.x = -0.75;
                object4.position.y = -1;
                object4.position.z = 8;
                object4.scale.x = 0.25;
                object4.scale.y = 0.225;
                object4.scale.z = 0.25;
                scene.add(object4);
                object1 = object4;
                cost+=1;
                duplicate[10] += 1;
                document.getElementById('balance').innerHTML = 15 - cost + "$";
            }, function (xhr) {
                // 모델이 로드되는 동안 호출되는 함수
                console.log(xhr.loaded / xhr.total * 100, '% loaded');
            }, function (error) {
                // 모델 로드가 실패했을 때 호출하는 함수
                alert('모델을 로드 중 오류가 발생하였습니다.');
            });
        }
        else if(cost + 1 > 15)
            alert('Too High Cost!');
        else if(duplicate[10]%2 != 0)
            alert('Duplicated One!');
    }

    // 고레츠카 클릭
    document.getElementById("gore").onclick = function() {
        if(cost + 2 <= 15 && duplicate[11]%2 == 0){
            // 뮌헨 : 고레츠카
            loader.load('Goretzka.obj', function (goretzka) {
                // 모델 로드가 완료되었을때 호출되는 함수
                goretzka.position.x = -0.75;
                goretzka.position.y = -1;
                goretzka.position.z = 8;
                goretzka.scale.x = 0.25;
                goretzka.scale.y = 0.27;
                goretzka.scale.z = 0.25;
                scene.add(goretzka);
                object1 = goretzka;
                cost+=2;
                duplicate[11] += 1;
                document.getElementById('balance').innerHTML = 15 - cost + "$";
            }, function (xhr) {
                // 모델이 로드되는 동안 호출되는 함수
                console.log(xhr.loaded / xhr.total * 100, '% loaded');
            }, function (error) {
                // 모델 로드가 실패했을 때 호출하는 함수
                alert('모델을 로드 중 오류가 발생하였습니다.');
            });
        }
        else if(cost + 2 > 15)
            alert('Too High Cost!');
        else if(duplicate[11]%2 != 0)
            alert('Duplicated One!');
    }

    // 포그바 클릭
    document.getElementById("pogba").onclick = function() {
        if(cost + 3 <= 15 && duplicate[12]%2 == 0){
            // 맨유 : 포그바
            loader.load('pogba.obj', function (pogba) {
                // 모델 로드가 완료되었을때 호출되는 함수
                pogba.position.x = -0.75;
                pogba.position.y = -1;
                pogba.position.z = 8;
                pogba.scale.x = 0.25;
                pogba.scale.y = 0.28;
                pogba.scale.z = 0.25;
                scene.add(pogba);
                object1 = pogba;
                cost+=3;
                duplicate[12] += 1;
                document.getElementById('balance').innerHTML = 15 - cost + "$";
            }, function (xhr) {
                // 모델이 로드되는 동안 호출되는 함수
                console.log(xhr.loaded / xhr.total * 100, '% loaded');
            }, function (error) {
                // 모델 로드가 실패했을 때 호출하는 함수
                alert('모델을 로드 중 오류가 발생하였습니다.');
            });
        }
        else if(cost + 3 > 15)
            alert('Too High Cost!');
        else if(duplicate[12]%2 != 0)
            alert('Duplicated One!');
    }

    // 브페 클릭
    document.getElementById("bruno").onclick = function() {
        if(cost + 4 <= 15 && duplicate[13]%2 == 0){
            // 맨유 : 브루노 페르난데스
            loader.load('Bruno.obj', function (bruno) {
                // 모델 로드가 완료되었을때 호출되는 함수
                bruno.position.x = -0.75;
                bruno.position.y = -1;
                bruno.position.z = 8;
                bruno.scale.x = 0.25;
                bruno.scale.y = 0.22;
                bruno.scale.z = 0.25;
                scene.add(bruno);
                object1 = bruno;
                cost+=4;
                duplicate[13] += 1;
                document.getElementById('balance').innerHTML = 15 - cost + "$";
            }, function (xhr) {
                // 모델이 로드되는 동안 호출되는 함수
                console.log(xhr.loaded / xhr.total * 100, '% loaded');
            }, function (error) {
                // 모델 로드가 실패했을 때 호출하는 함수
                alert('모델을 로드 중 오류가 발생하였습니다.');
            });
        }
        else if(cost + 4 > 15)
            alert('Too High Cost!');
        else if(duplicate[13]%2 != 0)
            alert('Duplicated One!');
    }

    // 크로스 클릭
    document.getElementById("kroos").onclick = function() {
        if(cost + 5 <= 15 && duplicate[14]%2 == 0){
            // //크루스
            loader.load('kroos.obj', function (object4) {
                object4.position.x = -0.75;
                object4.position.y = -1;
                object4.position.z = 8;
                object4.scale.x = 0.25;
                object4.scale.y = 0.24;
                object4.scale.z = 0.25;
                scene.add(object4);
                object1 = object4;
                cost+=5;
                duplicate[14] += 1;
                document.getElementById('balance').innerHTML = 15 - cost + "$";
            }, function (xhr) {
                // 모델이 로드되는 동안 호출되는 함수
                console.log(xhr.loaded / xhr.total * 100, '% loaded');
            }, function (error) {
                // 모델 로드가 실패했을 때 호출하는 함수
                alert('모델을 로드 중 오류가 발생하였습니다.');
            });
        }
        else if(cost + 5 > 15)
            alert('Too High Cost!');
        else if(duplicate[14]%2 != 0)
            alert('Duplicated One!');
    }

    // -- 수비수 --
    // 산체스 클릭
    document.getElementById("sanchez").onclick = function() {
        if(cost + 1 <= 15 && duplicate[15]%2 == 0){
            // 토트넘 : 산체스
            loader.load('sanchez.obj', function (sanchez) {
                // 모델 로드가 완료되었을때 호출되는 함수
                sanchez.position.x = -0.75;
                sanchez.position.y = -1;
                sanchez.position.z = 8;
                sanchez.scale.x = 0.25;
                sanchez.scale.y = 0.26;
                sanchez.scale.z = 0.25;
                scene.add(sanchez);
                object1 = sanchez;
                cost+=1;
                duplicate[15] += 1;
                document.getElementById('balance').innerHTML = 15 - cost + "$";
            }, function (xhr) {
                // 모델이 로드되는 동안 호출되는 함수
                console.log(xhr.loaded / xhr.total * 100, '% loaded');
            }, function (error) {
                // 모델 로드가 실패했을 때 호출하는 함수
                alert('모델을 로드 중 오류가 발생하였습니다.');
            });
        }
        else if(cost + 1 > 15)
            alert('Too High Cost!');
        else if(duplicate[15]%2 != 0)
            alert('Duplicated One!');
    }

    // 스톤스 클릭
    document.getElementById("stones").onclick = function() {
        if(cost + 2 <= 15 && duplicate[16]%2 == 0){
            // //존 스톤스
            loader.load('stones.obj', function (object4) {
                // 모델 로드가 완료되었을때 호출되는 함수
                object4.position.x = -0.75;
                object4.position.y = -1;
                object4.position.z = 8;
                object4.scale.x = 0.25;
                object4.scale.y = 0.265;
                object4.scale.z = 0.25;
                scene.add(object4);
                object1 = object4;
                cost+=2;
                duplicate[16] += 1;
                document.getElementById('balance').innerHTML = 15 - cost + "$";
            }, function (xhr) {
                // 모델이 로드되는 동안 호출되는 함수
                console.log(xhr.loaded / xhr.total * 100, '% loaded');
            }, function (error) {
                // 모델 로드가 실패했을 때 호출하는 함수
                alert('모델을 로드 중 오류가 발생하였습니다.');
            });
        }
        else if(cost + 2 > 15)
            alert('Too High Cost!');
        else if(duplicate[16]%2 != 0)
            alert('Duplicated One!');
    }

    // 매과이어 클릭
    document.getElementById("maguire").onclick = function() {
        if(cost + 3 <= 15 && duplicate[17]%2 == 0){
            // 맨유 : 맥과이어
            loader.load('Maguire.obj', function (macguire) {
                // 모델 로드가 완료되었을때 호출되는 함수
                macguire.position.x = -0.75;
                macguire.position.y = -1;
                macguire.position.z = 8;
                macguire.scale.x = 0.25;
                macguire.scale.y = 0.295;
                macguire.scale.z = 0.25;
                scene.add(macguire);
                object1 = macguire;
                cost+=3;
                duplicate[17] += 1;
                document.getElementById('balance').innerHTML = 15 - cost + "$";
            }, function (xhr) {
                // 모델이 로드되는 동안 호출되는 함수
                console.log(xhr.loaded / xhr.total * 100, '% loaded');
            }, function (error) {
                // 모델 로드가 실패했을 때 호출하는 함수
                alert('모델을 로드 중 오류가 발생하였습니다.');
            });
        }
        else if(cost + 3 > 15)
            alert('Too High Cost!');
        else if(duplicate[17]%2 != 0)
            alert('Duplicated One!');
    }

    // 알더웨이럴트 클릭
    document.getElementById("alder").onclick = function() {
        if(cost + 4 <= 15 && duplicate[18]%2 == 0){
            // 토트넘 : 알더웨이럴트
            loader.load('Alderweireld.obj', function (alderweireld) {
                // 모델 로드가 완료되었을때 호출되는 함수
                alderweireld.position.x = -0.75;
                alderweireld.position.y = -1;
                alderweireld.position.z = 8;
                alderweireld.scale.x = 0.25;
                alderweireld.scale.y = 0.26;
                alderweireld.scale.z = 0.25;
                scene.add(alderweireld);
                object1 = alderweireld;
                cost+=4;
                duplicate[18] += 1;
                document.getElementById('balance').innerHTML = 15 - cost + "$";
            }, function (xhr) {
                // 모델이 로드되는 동안 호출되는 함수
                console.log(xhr.loaded / xhr.total * 100, '% loaded');
            }, function (error) {
                // 모델 로드가 실패했을 때 호출하는 함수
                alert('모델을 로드 중 오류가 발생하였습니다.');
            });
        }
        else if(cost + 4 > 15)
            alert('Too High Cost!');
        else if(duplicate[18]%2 != 0)
            alert('Duplicated One!');
    }

    // 키엘리니 클릭
    document.getElementById("chi").onclick = function() {
        if(cost + 5 <= 15 && duplicate[19]%2 == 0){
            // 키엘리니
            loader.load('chi.obj', function (chi) {
                // 모델 로드가 완료되었을때 호출되는 함수
                chi.position.x = -0.75;
                chi.position.y = -1;
                chi.position.z = 8;
                chi.scale.x = 0.25;
                chi.scale.y = 0.26;
                chi.scale.z = 0.25;
                scene.add(chi);
                object1 = chi;
                cost+=5;
                duplicate[19] += 1;
                document.getElementById('balance').innerHTML = 15 - cost + "$";
            }, function (xhr) {
                // 모델이 로드되는 동안 호출되는 함수
                console.log(xhr.loaded / xhr.total * 100, '% loaded');
            }, function (error) {
                // 모델 로드가 실패했을 때 호출하는 함수
                alert('모델을 로드 중 오류가 발생하였습니다.');
            });
        }
        else if(cost + 5 > 15)
            alert('Too High Cost!');
        else if(duplicate[19]%2 != 0)
            alert('Duplicated One!');
    }

    // -- 골키퍼 --
    // 케파 클릭
    document.getElementById("kepa").onclick = function() {
        if(cost + 1 <= 15 && duplicate[20]%2 == 0){
            // 케파
            loader.load('kepa.obj', function (kepa) {
                // 모델 로드가 완료되었을때 호출되는 함수
                kepa.position.x = -0.75;
                kepa.position.y = -1;
                kepa.position.z = 8;
                kepa.scale.x = 0.25;
                kepa.scale.y = 0.255;
                kepa.scale.z = 0.25;
                scene.add(kepa);
                object1 = kepa;
                cost+=1;
                duplicate[20] += 1;
                document.getElementById('balance').innerHTML = 15 - cost + "$";
            }, function (xhr) {
                // 모델이 로드되는 동안 호출되는 함수
                console.log(xhr.loaded / xhr.total * 100, '% loaded');
            }, function (error) {
                // 모델 로드가 실패했을 때 호출하는 함수
                alert('모델을 로드 중 오류가 발생하였습니다.');
            });
        }
        else if(cost + 1 > 15)
            alert('Too High Cost!');
        else if(duplicate[20]%2 != 0)
            alert('Duplicated One!');
    }

    // 픽포드 클릭
    document.getElementById("pick").onclick = function() {
        if(cost + 2 <= 15 && duplicate[21]%2 == 0){
            // 픽포드
            loader.load('pick.obj', function (pick) {
                // 모델 로드가 완료되었을때 호출되는 함수
                pick.position.x = -0.75;
                pick.position.y = -1;
                pick.position.z = 8;
                pick.scale.x = 0.25;
                pick.scale.y = 0.25;
                pick.scale.z = 0.25;
                scene.add(pick);
                object1 = pick;
                cost+=2;
                duplicate[21] += 1;
                document.getElementById('balance').innerHTML = 15 - cost + "$";
            }, function (xhr) {
                // 모델이 로드되는 동안 호출되는 함수
                console.log(xhr.loaded / xhr.total * 100, '% loaded');
            }, function (error) {
                // 모델 로드가 실패했을 때 호출하는 함수
                alert('모델을 로드 중 오류가 발생하였습니다.');
            });
        }
        else if(cost + 2 > 15)
            alert('Too High Cost!');
        else if(duplicate[21]%2 != 0)
            alert('Duplicated One!');
    }


    // 쿠르트와 클릭
    document.getElementById("cour").onclick = function() {
        if(cost + 3 <= 15 && duplicate[22]%2 == 0){
            // 쿠르트와
            loader.load('cou.obj', function (cou) {
                cou.position.x = -0.75;
                cou.position.y = -1;
                cou.position.z = 8;
                cou.scale.x = 0.25;
                cou.scale.y = 0.32;
                cou.scale.z = 0.25;
                scene.add(cou);
                object1 = cou;
                cost+=3;
                duplicate[22] += 1;
                document.getElementById('balance').innerHTML = 15 - cost + "$";
            }, function (xhr) {
                // 모델이 로드되는 동안 호출되는 함수
                console.log(xhr.loaded / xhr.total * 100, '% loaded');
            }, function (error) {
                // 모델 로드가 실패했을 때 호출하는 함수
                alert('모델을 로드 중 오류가 발생하였습니다.');
            });
        }
        else if(cost + 3 > 15)
            alert('Too High Cost!');
        else if(duplicate[22]%2 != 0)
            alert('Duplicated One!');
    }

    // 데헤아 클릭
    document.getElementById("degea").onclick = function() {
        if(cost + 4 <= 15 && duplicate[23]%2 == 0){
            // 데헤아
            loader.load('de.obj', function (de) {
                // 모델 로드가 완료되었을때 호출되는 함수
                de.position.x = -0.75;
                de.position.y = -1;
                de.position.z = 8;
                de.scale.x = 0.25;
                de.scale.y = 0.285;
                de.scale.z = 0.25;
                scene.add(de);
                object1 = de;
                cost+=4;
                duplicate[23] += 1;
                document.getElementById('balance').innerHTML = 15 - cost + "$";
            }, function (xhr) {
                // 모델이 로드되는 동안 호출되는 함수
                console.log(xhr.loaded / xhr.total * 100, '% loaded');
            }, function (error) {
                // 모델 로드가 실패했을 때 호출하는 함수
                alert('모델을 로드 중 오류가 발생하였습니다.');
            });
        }
        else if(cost + 4 > 15)
            alert('Too High Cost!');
        else if(duplicate[23]%2 != 0)
            alert('Duplicated One!');
    }

    // 카시야스 클릭
    document.getElementById("casi").onclick = function() {
        if(cost + 5 <= 15 && duplicate[24]%2 == 0){
            // 카시야스
            loader.load('cas.obj', function (cas) {
                // 모델 로드가 완료되었을때 호출되는 함수
                cas.position.x = -0.75;
                cas.position.y = -1;
                cas.position.z = 8;
                cas.scale.x = 0.25;
                cas.scale.y = 0.235;
                cas.scale.z = 0.25;
                scene.add(cas);
                object1 = cas;
                cost+=5;
                duplicate[24] += 1;
                document.getElementById('balance').innerHTML = 15 - cost + "$";
            }, function (xhr) {
                // 모델이 로드되는 동안 호출되는 함수
                console.log(xhr.loaded / xhr.total * 100, '% loaded');
            }, function (error) {
                // 모델 로드가 실패했을 때 호출하는 함수
                alert('모델을 로드 중 오류가 발생하였습니다.');
            });
        }
        else if(cost + 5 > 15)
            alert('Too High Cost!');
        else if(duplicate[24]%2 != 0)
            alert('Duplicated One!');
    }


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
    //경기장 obj로드
    function loadOBJLoader(materials) {
        loader = new THREE.OBJLoader();

        // MTLLoader에서 로드한 materials 파일을 설정합니다.
        loader.setMaterials(materials);

        // OBJLoader OBJ 파일을 사용할 전역 경로를 설정합니다.
        loader.setPath('./resources/stardium/');

        // 로드할 OBJ 파일 명을 입력합니다.
        loader.load('Stadium.obj', function (object) {
            // 모델 로드가 완료되었을때 호출되는 함수
            object.position.x = -0.75;
            object.position.y = 0;
            object.position.z = 8;
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
        renderer.setSize(1600, window.innerHeight);
        renderer.setClearColor(0xffffff, 1); // 전체적인 배경색 수정
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        var can = document.getElementById("canvas");
        can.append(renderer.domElement);

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

        window.addEventListener("keydown", c2);
        animate();
    }
}

function c2() {

    // a 이벤트 (좌측 이동)
    if (event.keyCode == '65') {
        object1.position.x = object1.position.x - 0.5;

    }
    // w 이벤트 (뒤로 이동)
    if (event.keyCode == '87') {
        object1.position.z = object1.position.z - 0.5;

    }
    // s 이벤트 (앞으로 이동)
    if (event.keyCode == '83') {
        object1.position.z = object1.position.z + 0.5;

    }
    // d 이벤트 (우측 이동)
    if (event.keyCode == '68') {
        object1.position.x = object1.position.x + 0.5;

    }
    // q 이벤트 (왼쪽 회전)
    if (event.keyCode == '81') {
        object1.rotation.y = object1.rotation.y - 0.1;

    }

    // e 이벤트 (오른쪽 회전)
    if (event.keyCode == '69') {
        object1.rotation.y = object1.rotation.y + 0.1;

    }

};