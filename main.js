
//import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls.js";
//import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
//import { DeviceOrientationControls } from 'https://cdn.rawgit.com/mrdoob/three.js/master/examples/js/controls/DeviceOrientationControls.js';
//import { TWEEN } from 'https://cdnjs.cloudflare.com/ajax/libs/tween.js/16.3.5/Tween.min.js';
function main()
{
    
    ////             ////
    //// HELLO WORLD ////
    ////             ////

    const canvas = document.querySelector('#c');
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
    renderer.setSize(innerWidth, innerHeight);
    const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 10000);
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let   INTERSECTED;
    
    
    ////             ////
    ////  TEXTURES  ////
    ////            ////

    const song1_texture = new THREE.TextureLoader().load( 'song1.png' );
    //Get your video element:
    song1_texture.generateMipmaps = false;
    //song1_texture.magFilter = THREE.NearestFilter;
    //song1_texture.minFilter = THREE.LinearMipMapLinearFilter;
    
const video = document.getElementById('video');

//Create your video texture:
const videoTexture = new THREE.VideoTexture(video);
const videoMaterial =  new THREE.MeshBasicMaterial( {map: videoTexture, side: THREE.FrontSide, toneMapped: false} );
//Create screen
const screen = new THREE.PlaneGeometry(60, 60);
const videoScreen = new THREE.Mesh(screen, videoMaterial);
scene.add(videoScreen);


//let controls2 = new DeviceOrientationControls( camera );
    

    ////             ////
    //// GEOMETRIES  ////
    ////             ////

    let room_geo = new THREE.BoxGeometry(500, 200, 1000);
    let floor_geo = new THREE.PlaneGeometry(300, 1000);
    let cube1_geo = new THREE.BoxGeometry(10, 10, 10);
    let song1_geo = new THREE.BoxGeometry(120, 50, 1);
    
    
    ////             ////
    ////  MATERIALS  ////
    ////             ////

    let room_mat = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
    let floor_mat = new THREE.MeshLambertMaterial({color: 0x1});
    let cube1_mat = new THREE.MeshLambertMaterial({color: 0xFFCCFF});
    let song1_mat = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
    room_mat.side = THREE.DoubleSide;
    floor_mat.side = THREE.DoubleSide;
    song1_mat.map = song1_texture;
    cube1_mat.map = videoTexture;
    videoMaterial.side = THREE.BackSide;


    ////             ////
    ////    MESH     ////
    ////             ////

    let room = new THREE.Mesh(room_geo, room_mat);
    let floor = new THREE.Mesh(floor_geo, floor_mat);
    let cube1 = new THREE.Mesh(cube1_geo, cube1_mat);
    let song1 = new THREE.Mesh(song1_geo, song1_mat);
    const song_group = new THREE.Group();
  //  console.log(song_group);
    
    song_group.add(song1);
    
    


    ////             ////
    ////   LIGHTS    ////
    ////             ////
    
    let light1 = new THREE.PointLight(0xFFFFFF, 1, 10000);
    let light2 = new THREE.PointLight(0xFFFFDD, 1, 10000);
    let light3 = new THREE.PointLight(0xFFFFEE, 1, 10000);
    light1.position.set( 50, 0, 20 );
    light2.position.set( -50, 300, -1490 );
    light3.position.set( -50, 700, 1490 );
    light1.rotation.x = 200


    ////             ////
    ////  POSITIONS  ////
    ////             ////

    camera.position.z = 150;
    videoScreen.position.x = 200;
    videoScreen.rotation.y = 0.5 * Math.PI;
 

    let center = new THREE.Vector3();
    floor.position.y = -95
    floor.rotation.x = 0.5 * 3.14;
    song1.position.z = -488

    
    ////             ////
    ////  SCENE.ADD  ////
    ////             ////

    scene.add(room);
    scene.add(cube1);
    //scene.add(song1);
   // scene.add(floor);
    scene.add(light1);
    scene.add(light2);
    scene.add(light3);
    scene.add(song_group);

    let x = 0;


    ////       ////
    //// ORBIT ////
    ////       ////
   
    const controls = new OrbitControls( camera, renderer.domElement );
   // controls.enabled = false;
   //controls.target = floor.position;
   controls.minDistance = 20;
 //  controls.maxDistance = 100;
   controls.maxAzimuthAngle = (0, Math.PI + 20);
    controls.enableDamping = true;
   // controls.enableZoom = false;
    controls.dampingFactor = 0.06;


    function moveHome()
    {
        //camera.position.y += 4 * Math.random();
        tween.start();
        controls.enabled = true;
        sound.play();
        controls.target = cube1.position;
        
        
    }

    ////                 ////
    //// EVENT LISTENERS ////
    ////                 ////

    document.getElementById("home").addEventListener("click", moveHome);
    document.getElementById("music").addEventListener("click", musicMove);
    document.getElementById("about").addEventListener("click", aboutMove);
    window.addEventListener( 'pointermove', onPointerMove );
    
    ////             ////
    ////  FUNCTIONS  ////
    ////             ////

    document.onkeydown = function(e) {
        console.log("KUK");
    }   
    function aboutMove(){
        controls.target = videoScreen.position;
    }
    function musicMove(){
        controls.target = song1.position;
        controls.minDistance = 60;
        controls.maxDistance = 200;
    }
  /*  function songDance(song){
        let x;
        song.rotatation.x += Math.sin(x/20);

    }*/

    function onPointerMove( event ) {

        // calculate pointer position in normalized device coordinates
        // (-1 to +1) for both components
    
        pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
    }

    ////              ////
    ////    TWEEN     ////
    ////              ////

    var coords = { x: 0, y: 0, z: 150 };
    var tween = new TWEEN.Tween(coords);
    tween.to({x: 0, y: 10, z: 30}, 2000);
	
    tween.onUpdate(function(){
      //  camera.position.x = coords.y;
        camera.position.y = coords.y;        
        camera.position.z = coords.z;    
      //  camera.rotation.x = 1 *  coords.z;    
        //console.log(coords.x); 

        console.log(camera.position.x); 

    });


    console.log(song_group[0]);


    function animate(){
        requestAnimationFrame(animate);
        cube1.rotation.x += 0.01;
        cube1.rotation.y += 0.01;
        raycaster.setFromCamera( pointer, camera );
        const intersects = raycaster.intersectObjects( song_group.children);
        console.log(intersects.length);

  

        if ( intersects.length > 0 ) {
            if ( INTERSECTED != intersects[ 0 ].object ) {
                if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
                
                INTERSECTED = intersects[ 0 ].object;
                INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
                INTERSECTED.material.emissive.setHex( 0xff0000 );
                tween.to({x: 0, y: 10, z: 30}, 2000);
            }
        } else {
            if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
            INTERSECTED = null;
        }

            
        

        TWEEN.update();
        
        controls.update();
        
        light1.color.setHex(0xFFFEFF);
        light2.color.setHex(0xFFDEFF);
     //  light2.color.setHex(100);
        //light3.color.setHex( 0x11 + x + 20);
        
        camera.rotation.z += 0.001 * Math.cos(x/20) + (0.001 * Math.random());
        camera.rotation.y += 0.004 * Math.cos(x/20) + (0.001 * Math.random());
        camera.rotation.x += 0.006 * Math.sin(x/20) + (0.001 * Math.random());
        
        //  camera.lookAt(cube1);
        //cube2.position.y += 2 * Math.cos(x/20);
    //    cube2.position.z += 20 * Math.cos(x/40);
        
        
        x += 1;
        if(x == 256)
        {
            x = 0;
        }
       
       // console.log(light1.color);
        renderer.render(scene, camera);

}



    animate();
    
// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add( listener );

// create a global audio source
const sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( 'those days1711.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( .5 );
    
    
	
});






}   
    main();