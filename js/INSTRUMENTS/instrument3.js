import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

function main()
{
    const canvas = document.querySelector('#c');
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
    renderer.setSize(innerWidth, innerHeight);
    const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.001, 10000);
    let   domEvents	= new THREEx.DomEvents(camera, renderer.domElement);
    let x = 0;
    let y = 0;

    camera.position.z = 100;
    camera.position.y = -20;
    camera.position.x = 50;
    camera.lookAt(0, 0, 0);

    const key_geo1 = new THREE.CylinderGeometry(6, 6, 100, 120, 50);
    const room_geo = new THREE.CylinderGeometry(300, 200, 300);
    const backdrop_geo = new THREE.PlaneGeometry(1200, 1200);


    const controls = new OrbitControls( camera, renderer.domElement );

    // F_MATERIALS //

    const backdrop_texture = new THREE.TextureLoader().load( 'assets/imgs/glass1.jpeg' );

    const key_mat_C2 = new THREE.MeshPhysicalMaterial({color: 0xFFFFFF, roughness: 0, transmission: 0, thickness: 0, wireframe: false, wireframeLineWidth: 10, wireframeLinejoin: "round"});
    const key_mat_D2 = new THREE.MeshPhysicalMaterial({color: 0xFFFFFF, roughness: 1, transmission: 0, thickness: 0, wireframe: false, wireframeLineWidth: 10, wireframeLinejoin: "round"});
    const key_mat_E2 = new THREE.MeshPhysicalMaterial({color: 0xFFFFFF, roughness: 1, transmission: 0, thickness: 0, wireframe: false, wireframeLineWidth: 10, wireframeLinejoin: "round"});
    const key_mat_F2 = new THREE.MeshPhysicalMaterial({color: 0xFFFFFF, roughness: 1, transmission: 0, thickness: 0, wireframe: false, wireframeLineWidth: 10, wireframeLinejoin: "round"});
    const key_mat_G2 = new THREE.MeshPhysicalMaterial({color: 0xFFFFFF, roughness: 1, transmission: 0, thickness: 0, wireframe: false, wireframeLineWidth: 10, wireframeLinejoin: "round"});
    const key_mat_A2 = new THREE.MeshPhysicalMaterial({color: 0xFFFFFF, roughness: 1, transmission: 0, thickness: 0, wireframe: false, wireframeLineWidth: 10, wireframeLinejoin: "round"});
    const key_mat_B2 = new THREE.MeshPhysicalMaterial({color: 0xFFFFFF, roughness: 1, transmission: 0, thickness: 0, wireframe: false, wireframeLineWidth: 10, wireframeLinejoin: "round"});
    const key_mat_C3 = new THREE.MeshPhysicalMaterial({color: 0xFFFFFF, roughness: 1, transmission: 0, thickness: 0, wireframe: false, wireframeLineWidth: 10, wireframeLinejoin: "round"});
    //const backdrop_mat = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
    const backdrop_mat = new THREE.MeshPhysicalMaterial({color: 0xFFFFFF, roughness: 1, metalness: 0});
    backdrop_mat.side = THREE.DoubleSide;

    key_mat_C2.bumpMap = backdrop_texture;
    key_mat_C2.bumpScale = .02;
    key_mat_D2.bumpMap = backdrop_texture;
    key_mat_D2.bumpScale = .02;
    key_mat_E2.bumpMap = backdrop_texture;
    key_mat_E2.bumpScale = .02;
    key_mat_F2.bumpMap = backdrop_texture;
    key_mat_F2.bumpScale = .02;
    key_mat_G2.bumpMap = backdrop_texture;
    key_mat_G2.bumpScale = .02;
    key_mat_A2.bumpMap = backdrop_texture;
    key_mat_A2.bumpScale = .02;
    key_mat_B2.bumpMap = backdrop_texture;
    key_mat_B2.bumpScale = .02;
    key_mat_C3.bumpMap = backdrop_texture;
    key_mat_C3.bumpScale = .02;

    const room_mat = new THREE.MeshLambertMaterial({color: 0x223333});
    room_mat.side = THREE.BackSide;
    //renderer.setClearColor( 0xffefff, 1);

    // F_MESHES //
    const key_C2 = new THREE.Mesh(key_geo1, key_mat_C2);
    const key_D2 = new THREE.Mesh(key_geo1, key_mat_D2);
    const key_E2 = new THREE.Mesh(key_geo1, key_mat_E2);
    const key_F2 = new THREE.Mesh(key_geo1, key_mat_F2);
    const key_G2 = new THREE.Mesh(key_geo1, key_mat_G2);
    const key_A2 = new THREE.Mesh(key_geo1, key_mat_A2);
    const key_B2 = new THREE.Mesh(key_geo1, key_mat_B2);
    const key_C3 = new THREE.Mesh(key_geo1, key_mat_C3);
    const room = new THREE.Mesh(room_geo, room_mat);
    const backdrop = new THREE.Mesh(backdrop_geo, backdrop_mat);

    const ambient_light1 = new THREE.AmbientLight({color: 0xFFFFFF}, .2, 100);
    const point_light1 = new THREE.PointLight({color: 0xCFFFFF}, .2, 1000);
    const point_light2 = new THREE.PointLight({color: 0xCFFFFF}, .1, 1000);
    
    const spot_light3 = new THREE.SpotLight(0xFFAA99FF, 2.5, 1000, 90);
    const spot_light4 = new THREE.SpotLight(0xFFFF0099, .3, 1000, 90);
    
    point_light1.lookAt(key_G2.position);
    point_light1.position.z = 300;
    point_light1.position.y = 500;
    spot_light3.lookAt(backdrop.position);
    spot_light3.position.x = -200;
    spot_light3.position.y = 200;
    spot_light3.position.z = 400;
    spot_light4.position.x = 400;
    spot_light4.position.y = 0;
    spot_light4.position.z = 400;
    //spot_light4.lookAt(-900, 100, 30);
    backdrop.rotation.y += .8;
    backdrop.scale.y += 20;
    backdrop.scale.x += 100;
    backdrop.position.y -= 900;

    scene.add(key_C2);
    scene.add(key_D2);
    scene.add(key_E2);
    scene.add(key_F2);
    scene.add(key_G2);
    scene.add(key_A2);
    scene.add(key_B2);
    scene.add(key_C3);
    scene.add(backdrop);
    scene.add(ambient_light1);
    //scene.add(point_light1);
    scene.add(point_light2);
    scene.add(spot_light3);
    scene.add(spot_light4);
   // scene.add(room);





    // F_POSITIONS //
    key_C2.position.x = -70;
    key_D2.position.x = -50;
    key_E2.position.x = -30;
    key_F2.position.x = -10;
    key_G2.position.x = 10;
    key_A2.position.x = 30;
    key_B2.position.x = 50;
    key_C3.position.x = 70;
    point_light1.position.y = 30;
    point_light1.position.z = 20;
    point_light2.position.y = -30;
    point_light2.position.z = 20;
    room.position.y = 50;
    backdrop.position.z = -100;
    backdrop.rotation.x = 100;

    
    
    function keyAnimation(key_mat, key, color)
    {
        key_mat.color.set(color);
        
    }

    function keyPlay(key_material, path)
    {
        key_material.color.set(0xFF1144);
        x = 0;
        
        let sound = new Audio(path);
            sound.play();
        
    }






    domEvents.addEventListener(key_C2, 'click', function(event){
        keyPlay(key_mat_C2, "assets/audio/instrument2/C2.mp3")
    }, false)
    domEvents.addEventListener(key_C2, 'touchstart', function(event){
        keyPlay(key_mat_C2, "assets/audio/instrument2/C2.mp3")
    }, false)
    domEvents.addEventListener(key_D2, 'click', function(event){
        keyPlay(key_mat_D2, "assets/audio/instrument2/D2.mp3")
    }, false)
    domEvents.addEventListener(key_D2, 'touchstart', function(event){
        keyPlay(key_mat_D2, "assets/audio/instrument2/D2.mp3")
    }, false)
    domEvents.addEventListener(key_E2, 'click', function(event){
        keyPlay(key_mat_E2, "assets/audio/instrument2/E2.mp3")
    }, false)
    domEvents.addEventListener(key_E2, 'touchstart', function(event){
        keyPlay(key_mat_E2, "assets/audio/instrument2/E2.mp3")
    }, false)
    domEvents.addEventListener(key_F2, 'click', function(event){
        keyPlay(key_mat_F2, "assets/audio/instrument2/F2.mp3")
    }, false)   
    domEvents.addEventListener(key_F2, 'touchstart', function(event){
        keyPlay(key_mat_F2, "assets/audio/instrument2/F2.mp3")
    }, false)
    domEvents.addEventListener(key_G2, 'click', function(event){
        keyPlay(key_mat_G2, "assets/audio/instrument2/G2.mp3")
    }, false)
    domEvents.addEventListener(key_G2, 'touchstart', function(event){
        keyPlay(key_mat_G2, "assets/audio/instrument2/G2.mp3")
    }, false)
    domEvents.addEventListener(key_A2, 'click', function(event){
        keyPlay(key_mat_A2, "assets/audio/instrument2/A2.mp3")
    }, false)
    domEvents.addEventListener(key_A2, 'touchstart', function(event){
        keyPlay(key_mat_A2, "assets/audio/instrument2/A2.mp3")
    }, false)
    domEvents.addEventListener(key_B2, 'click', function(event){
        keyPlay(key_mat_B2, "assets/audio/instrument2/B2.mp3")
    }, false)
    domEvents.addEventListener(key_B2, 'touchstart', function(event){
        keyPlay(key_mat_B2, "assets/audio/instrument2/B2.mp3")
    }, false)
    domEvents.addEventListener(key_C3, 'click', function(event){
        keyPlay(key_mat_C3, "assets/audio/instrument2/C3.mp3")
    }, false)    
    domEvents.addEventListener(key_C3, 'touchstart', function(event){
        keyPlay(key_mat_C3, "assets/audio/instrument2/C3.mp3")
    }, false)
    
    document.onkeydown = function(a) {
        if (a.key  == 'a'){
            keyPlay(key_mat_C2, "assets/audio/instrument2/C2.mp3")
        }
        if (a.key  == 's'){
            keyPlay(key_mat_D2, "assets/audio/instrument2/D2.mp3")
            }
            if (a.key  == 'd'){
                keyPlay(key_mat_E2, "assets/audio/instrument2/E2.mp3")
            }
            if (a.key  == 'f'){
                keyPlay(key_mat_F2, "assets/audio/instrument2/F2.mp3")
                }
                if (a.key  == 'g'){
                    keyPlay(key_mat_G2, "assets/audio/instrument2/G2.mp3")
                    }
                    if (a.key  == 'h'){
                        keyPlay(key_mat_A2, "assets/audio/instrument2/A2.mp3")
                    }
                    if (a.key  == 'j'){
                        keyPlay(key_mat_B2, "assets/audio/instrument2/B2.mp3")
                        }
                        if (a.key  == 'k'){
                            keyPlay(key_mat_C3, "assets/audio/instrument2/C3.mp3")
                            }
        
    }   






    function animate(){
        requestAnimationFrame(animate);
        x += 1;
        if (x == 10)
        {
            keyAnimation(key_mat_C2, key_C2);
            key_mat_C2.color.set(0xFFCCEE);
            key_mat_D2.color.set(0xFFCCEE);
            key_mat_E2.color.set(0xFFCCEE);
            key_mat_F2.color.set(0xFFCCEE);
            key_mat_G2.color.set(0xFFCCEE);
            key_mat_A2.color.set(0xFFCCEE);
            key_mat_B2.color.set(0xFFCCEE);
            key_mat_C3.color.set(0xFFCCEE);
        }
      //  console.log(x);
        renderer.render(scene, camera);
    }

    const listener_C2 = new THREE.AudioListener();
    camera.add( listener_C2 );
    const sound_C2 = new THREE.Audio( listener_C2 );
    const audioLoader_C2 = new THREE.AudioLoader();
    audioLoader_C2.load( 'assets/audio/instrument2/C2.mp3', function( buffer ) {
	sound_C2.setBuffer( buffer );
	sound_C2.setVolume( .5 );	
    });

    const listener_D2 = new THREE.AudioListener();
    camera.add( listener_D2 );
    const sound_D2 = new THREE.Audio( listener_D2 );
    const audioLoader_D2 = new THREE.AudioLoader();
    audioLoader_D2.load( 'assets/audio/instrument2/D2.mp3', function( buffer ) {
	sound_D2.setBuffer( buffer );
	sound_D2.setVolume( .5 );	
});

const listener_E2 = new THREE.AudioListener();
camera.add( listener_E2 );
const sound_E2 = new THREE.Audio( listener_E2 );
const audioLoader_E2 = new THREE.AudioLoader();
audioLoader_E2.load( 'assets/audio/instrument2/E2.mp3', function( buffer ) {
sound_E2.setBuffer( buffer );
sound_E2.setVolume( .5 );	
});

const listener_F2 = new THREE.AudioListener();
camera.add( listener_F2 );
const sound_F2 = new THREE.Audio( listener_F2 );
const audioLoader_F2 = new THREE.AudioLoader();
audioLoader_F2.load( 'assets/audio/instrument2/F2.mp3', function( buffer ) {
sound_F2.setBuffer( buffer );
sound_F2.setVolume( .5 );
});

const listener_G2 = new THREE.AudioListener();
camera.add( listener_G2 );
const sound_G2 = new THREE.Audio( listener_G2 );
const audioLoader_G2 = new THREE.AudioLoader();
audioLoader_G2.load( 'assets/audio/instrument2/G2.mp3', function( buffer ) {
sound_G2.setBuffer( buffer );
sound_G2.setVolume( .5 );
});

const listener_A2 = new THREE.AudioListener();
camera.add( listener_A2 );
const sound_A2 = new THREE.Audio( listener_A2 );
const audioLoader_A2 = new THREE.AudioLoader();
audioLoader_A2.load( 'assets/audio/instrument2/A2.mp3', function( buffer ) {
sound_A2.setBuffer( buffer );
sound_A2.setVolume( .5 );
});

const listener_B2 = new THREE.AudioListener();
camera.add( listener_B2 );
const sound_B2 = new THREE.Audio( listener_B2 );
const audioLoader_B2 = new THREE.AudioLoader();
audioLoader_B2.load( 'assets/audio/instrument2/B2.mp3', function( buffer ) {
sound_B2.setBuffer( buffer );
sound_B2.setVolume( .5 );
});

const listener_C3 = new THREE.AudioListener();
camera.add( listener_C3 );
const sound_C3 = new THREE.Audio( listener_C3 );
const audioLoader_C3 = new THREE.AudioLoader();
audioLoader_C3.load( 'assets/audio/instrument2/C3.mp3', function( buffer ) {
sound_C3.setBuffer( buffer );
sound_C3.setVolume( .5 );
});






    animate();

}


main();