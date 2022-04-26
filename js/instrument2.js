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

    camera.position.z = 250;
    camera.position.y = -10;
    camera.lookAt(0, 0, 0);

    const key_geo1 = new THREE.CylinderGeometry(5, 5, 100, 20);
    const room_geo = new THREE.CylinderGeometry(300, 200, 300);
    const backdrop_geo = new THREE.PlaneGeometry(1200, 1200);
    let c1;
    let C1_loader = new THREE.GLTFLoader();
    let d1;
    let D1_loader = new THREE.GLTFLoader();
    let e1;
    let E1_loader = new THREE.GLTFLoader();
    let f1;
    let F1_loader = new THREE.GLTFLoader();
    let g1;
    let G1_loader = new THREE.GLTFLoader();
    let a1;
    let A1_loader = new THREE.GLTFLoader();
    let b1;
    let B1_loader = new THREE.GLTFLoader();
    let c2;
    let C2_loader = new THREE.GLTFLoader();
    const keys = new THREE.Group();
    keys.name = "name";
    


    const controls = new OrbitControls( camera, renderer.domElement );



    // FOBJS //
    C1_loader.load('assets/GLTF/PIPETEST.glb',
        function ( gltf ) { 
            c1 = gltf.scene;
            c1.position.x = -100;
            scene.add( c1 );
            c1.children[0].material.color.set( 0xffffff);
        },);

    D1_loader.load('assets/GLTF/PIPETEST.glb',
        function ( gltf ) { 
            d1 = gltf.scene;
            d1.position.x = -70;
            scene.add( d1 );
            d1.children[0].material.color.set( 0xffffff);
            d1.name = "d1";
        },);

    E1_loader.load('assets/GLTF/PIPETEST.glb',
        function ( gltf ) { 
            e1 = gltf.scene;
            e1.position.x = -40;
            scene.add( e1 );
            e1.children[0].material.color.set( 0xffffff);
        },);

    F1_loader.load('assets/GLTF/PIPETEST.glb',
        function ( gltf ) { 
            f1 = gltf.scene;
            f1.position.x = -10;
            scene.add( f1 );
            f1.children[0].material.color.set( 0xffffff);
        },);
    G1_loader.load('assets/GLTF/PIPETEST.glb',
        function ( gltf ) { 
            g1 = gltf.scene;
            g1.position.x = -10;
            scene.add( g1 );
            g1.children[0].material.color.set( 0xffffff);
        },);
    A1_loader.load('assets/GLTF/PIPETEST.glb',
        function ( gltf ) { 
            a1 = gltf.scene;
            a1.position.x = 20;
            scene.add( a1 );
            a1.children[0].material.color.set( 0xffffff);
        },);
    B1_loader.load('assets/GLTF/PIPETEST.glb',
        function ( gltf ) { 
            b1 = gltf.scene;
            b1.position.x = 50;
            scene.add( b1 );
            b1.children[0].material.color.set( 0xffffff);
        },);
    C2_loader.load('assets/GLTF/PIPETEST.glb',
        function ( gltf ) { 
            c2 = gltf.scene;
            c2.position.x = 80;
            scene.add( c2 );
            c2.children[0].material.color.set( 0xffffff);
        },);
    
    

    // F_MATERIALS //

    const key_mat_C2 = new THREE.MeshPhysicalMaterial({color: 0xCC22EE, roughness: 0});
    const key_mat_D2 = new THREE.MeshPhysicalMaterial({color: 0xCC22EE, roughness: 0});
    const key_mat_E2 = new THREE.MeshPhysicalMaterial({color: 0xCC22EE, roughness: 0});
    const key_mat_F2 = new THREE.MeshPhysicalMaterial({color: 0xCC22EE, roughness: 0});
    const key_mat_G2 = new THREE.MeshLambertMaterial({color: 0xCC22EE, roughness: 0});
    const key_mat_A2 = new THREE.MeshLambertMaterial({color: 0xFFFFFF, roughness: 0});
    const key_mat_B2 = new THREE.MeshLambertMaterial({color: 0xFFFFFF, roughness: 0});
    const key_mat_C3 = new THREE.MeshLambertMaterial({color: 0xFFFFFF, roughness: 0});
    //const backdrop_mat = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
    const backdrop_mat = new THREE.MeshPhysicalMaterial({color: 0xFFFFFF, roughness: 1, metalness: 0});
    backdrop_mat.side = THREE.DoubleSide;

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

    const ambient_light1 = new THREE.AmbientLight({color: 0xFFFFFF}, .1, 100);
    const point_light1 = new THREE.PointLight({color: 0xCFFFFF}, 1, 1000);
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
/*
    scene.add(key_C2);
    scene.add(key_D2);
    scene.add(key_E2);
    scene.add(key_F2);
    scene.add(key_G2);
    scene.add(key_A2);
    scene.add(key_B2);
    scene.add(key_C3);*/
    scene.add(backdrop);
    //scene.add(ambient_light1);
   // scene.add(point_light1);
  //  scene.add(point_light2);
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
    backdrop.position.z = -50;
    backdrop.rotation.x = -100.5;
    
    scene.add( keys );
    
    function keyAnimation(key_mat, key, color)
    {
        key_mat.color.set(color);
        
    }

    function keyPlay(key_material, sound)
    {
        key_material.color.set(0xEEEEAA);
        x = 0;
        sound.play();
    }
    

    console.log(scene.getObjectByName( 'd1' ))
    console.log("KUK");

    domEvents.addEventListener(scene.children[0], 'click', function(event){
        keyPlay(c1.children[0].material, sound_C2)
    }, false)
    domEvents.addEventListener(scene.children[0], 'touchstart', function(event){
        keyPlay(c1.children[0].material, sound_C2)
    }, false)
 /*   domEvents.addEventListener(keys.children.children[0], 'click', function(event){
        keyPlay(d2.children[0].material, sound_D2)
    }, false)
    domEvents.addEventListener(scene.children[0], 'touchstart', function(event){
        keyPlay(d2.children[0].material, sound_D2)
    }, false)
    domEvents.addEventListener(scene.children[0], 'click', function(event){
        keyPlay(e1.children[0].material, sound_E2)
    }, false)
    domEvents.addEventListener(scene.children[0], 'touchstart', function(event){
        keyPlay(e1.children[0].material, sound_E2)
    }, false)
    domEvents.addEventListener(scene.children[0], 'click', function(event){
        keyPlay(f1.children[0].material, sound_F2)
    }, false)   
    domEvents.addEventListener(scene.children[0], 'touchstart', function(event){
        keyPlay(f1.children[0].material, sound_F2)
    }, false)
    domEvents.addEventListener(scene.children[0], 'click', function(event){
        keyPlay(g1.children[0].material, sound_G2)
    }, false)
    domEvents.addEventListener(scene.children[0], 'touchstart', function(event){
        keyPlay(g1.children[0].material, sound_G2)
    }, false)
    domEvents.addEventListener(scene.children[0], 'click', function(event){
        keyPlay(a1.children[0].material, sound_A2)
    }, false)
    domEvents.addEventListener(scene.children[0], 'touchstart', function(event){
        keyPlay(a1.children[0].material, sound_A2)
    }, false)
    domEvents.addEventListener(scene.children[0], 'click', function(event){
        keyPlay(b1.children[0].material, sound_B2)
    }, false)
    domEvents.addEventListener(scene.children[0], 'touchstart', function(event){
        keyPlay(b1.children[0].material, sound_B2)
    }, false)
    domEvents.addEventListener(scene.children[0], 'click', function(event){
        keyPlay(c2.children[0].material, sound_C3)
    }, false)    
    domEvents.addEventListener(scene.children[0], 'touchstart', function(event){
        keyPlay(c2.children[0].material, sound_C3)
    }, false)*/
    
    document.onkeydown = function(a) {
        if (a.key  == 'a'){
            keyPlay(c1.children[0].material, sound_C2)
        }
        if (a.key  == 's'){
            keyPlay(d1.children[0].material, sound_D2)
            }
            if (a.key  == 'd'){
                keyPlay(e1.children[0].material, sound_E2)
            }
            if (a.key  == 'f'){
                keyPlay(f1.children[0].material, sound_F2)
                }
                if (a.key  == 'g'){
                    keyPlay(g1.children[0].material, sound_G2)
                    }
                    if (a.key  == 'h'){
                        keyPlay(a1.children[0].material, sound_A2)
                    }
                    if (a.key  == 'j'){
                        keyPlay(b1.children[0].material, sound_B2)
                        }
                        if (a.key  == 'k'){
                            keyPlay(c2.children[0].material, sound_C3)
                            }
        
    }   






    function animate(){
        requestAnimationFrame(animate);
        x += 1;
        if (x == 10)
        {
            
            c1.children[0].material.color.set(0xffffff);
            d1.children[0].color.set(0xffffff);
            e1.children[0].color.set(0xffffff);
            f1.children[0].color.set(0xffffff);
            g1.children[0].color.set(0xffffff);
            a1.children[0].color.set(0xffffff);
            b1.children[0].color.set(0xffffff);
            c2.children[0].color.set(0xffffff);
        }
      //  console.log(x);
        renderer.render(scene, camera);
    }

    const listener_C2 = new THREE.AudioListener();
    camera.add( listener_C2 );
    const sound_C2 = new THREE.Audio( listener_C2 );
    const audioLoader_C2 = new THREE.AudioLoader();
    audioLoader_C2.load( 'assets/audio/instrument1/C2.mp3', function( buffer ) {
	sound_C2.setBuffer( buffer );
	sound_C2.setVolume( .5 );	
    });

    const listener_D2 = new THREE.AudioListener();
    camera.add( listener_D2 );
    const sound_D2 = new THREE.Audio( listener_D2 );
    const audioLoader_D2 = new THREE.AudioLoader();
    audioLoader_D2.load( 'assets/audio/instrument1/D2.mp3', function( buffer ) {
	sound_D2.setBuffer( buffer );
	sound_D2.setVolume( .5 );	
});

const listener_E2 = new THREE.AudioListener();
camera.add( listener_E2 );
const sound_E2 = new THREE.Audio( listener_E2 );
const audioLoader_E2 = new THREE.AudioLoader();
audioLoader_E2.load( 'assets/audio/instrument1/E2.mp3', function( buffer ) {
sound_E2.setBuffer( buffer );
sound_E2.setVolume( .5 );	
});

const listener_F2 = new THREE.AudioListener();
camera.add( listener_F2 );
const sound_F2 = new THREE.Audio( listener_F2 );
const audioLoader_F2 = new THREE.AudioLoader();
audioLoader_F2.load( 'assets/audio/instrument1/F2.mp3', function( buffer ) {
sound_F2.setBuffer( buffer );
sound_F2.setVolume( .5 );
});

const listener_G2 = new THREE.AudioListener();
camera.add( listener_G2 );
const sound_G2 = new THREE.Audio( listener_G2 );
const audioLoader_G2 = new THREE.AudioLoader();
audioLoader_G2.load( 'assets/audio/instrument1/G2.mp3', function( buffer ) {
sound_G2.setBuffer( buffer );
sound_G2.setVolume( .5 );
});

const listener_A2 = new THREE.AudioListener();
camera.add( listener_A2 );
const sound_A2 = new THREE.Audio( listener_A2 );
const audioLoader_A2 = new THREE.AudioLoader();
audioLoader_A2.load( 'assets/audio/instrument1/A2.mp3', function( buffer ) {
sound_A2.setBuffer( buffer );
sound_A2.setVolume( .5 );
});

const listener_B2 = new THREE.AudioListener();
camera.add( listener_B2 );
const sound_B2 = new THREE.Audio( listener_B2 );
const audioLoader_B2 = new THREE.AudioLoader();
audioLoader_B2.load( 'assets/audio/instrument1/B2.mp3', function( buffer ) {
sound_B2.setBuffer( buffer );
sound_B2.setVolume( .5 );
});

const listener_C3 = new THREE.AudioListener();
camera.add( listener_C3 );
const sound_C3 = new THREE.Audio( listener_C3 );
const audioLoader_C3 = new THREE.AudioLoader();
audioLoader_C3.load( 'assets/audio/instrument1/C3.mp3', function( buffer ) {
sound_C3.setBuffer( buffer );
sound_C3.setVolume( .5 );
});






    animate();

}


main();