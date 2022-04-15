
//import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls.js";
//import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
//import { DeviceOrientationControls } from 'https://cdn.rawgit.com/mrdoob/three.js/master/examples/js/controls/DeviceOrientationControls.js';
//import { TWEEN } from 'https://cdnjs.cloudflare.com/ajax/libs/tween.js/16.3.5/Tween.min.js';
function main()
{
    
    ////             ////
    //// FHELLO WORLD ////
    ////             ////

    const canvas = document.querySelector('#c');
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
    renderer.setSize(innerWidth, innerHeight);
    const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 10000);
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let   INTERSECTED;
    let   domEvents	= new THREEx.DomEvents(camera, renderer.domElement);
    let   loader = new THREE.GLTFLoader();
    var   loader2 = new THREE.GLTFLoader();
    var   loader3 = new THREE.GLTFLoader();
    var   loader4 = new THREE.GLTFLoader();
    var   loader5 = new THREE.GLTFLoader();
    var   loader6 = new THREE.GLTFLoader();
    renderer.shadowMap.enabled = true;
    


    ////             ////
    //// FGEOMETRIES  ////
    ////             ////

    let room_geo = new THREE.BoxGeometry(500, 200, 1000);
    let text_plane_geo = new THREE.PlaneGeometry(192/1.3, 108/1.3);
    let floor_geo = new THREE.PlaneGeometry(300, 1000);
    let cube1_geo = new THREE.BoxGeometry(10, 10, 10);
    let song1_geo = new THREE.BoxGeometry(60, 25, 20);
    let song2_geo = new THREE.BoxGeometry(25, 60, 20);
    const screen = new THREE.PlaneGeometry(30, 80);
    const video_song1 = document.getElementById('video_song1');
    const video_song2 = document.getElementById('video_song2');
    const video_song3 = document.getElementById('video_song3');
    const video_song4 = document.getElementById('video_song4');
    
    
    
    ////             ////
    ////  FTEXTURES  ////
    ////            ////

    const song1_texture = new THREE.TextureLoader().load( 'assets/imgs/song1.png' );
    const song2_texture = new THREE.TextureLoader().load( 'assets/imgs/song2.png' );
    const text_plane_texture = new THREE.TextureLoader().load( 'assets/imgs/text_test1.png' );
    const silverfoil_texture = new THREE.TextureLoader().load( 'assets/imgs/glass1.jpeg' );
    //const text_plane_texture = THREE.ImageUtils.loadTexture('text2.jpeg');
    silverfoil_texture.wrapS = silverfoil_texture.wrapT = THREE.RepeatWrapping;
    silverfoil_texture.offset.set( 1, 1 );
    silverfoil_texture.repeat.set( 1, 1 );
    
   
    song1_texture.generateMipmaps = false;
    silverfoil_texture.generateMipmaps = false;
    song2_texture.generateMipmaps = false;
    text_plane_texture.generateMipmaps = false;


    const videoTexture1 = new THREE.VideoTexture(video_song1);
    const videoTexture2 = new THREE.VideoTexture(video_song2);
    const videoTexture3 = new THREE.VideoTexture(video_song3);
    const videoTexture4 = new THREE.VideoTexture(video_song4);
    const videoMaterial1 =  new THREE.MeshBasicMaterial( {map: videoTexture1, side: THREE.FrontSide, toneMapped: false} );
    const videoMaterial2 =  new THREE.MeshBasicMaterial( {map: videoTexture2, side: THREE.FrontSide, toneMapped: false} );
    const videoMaterial3 =  new THREE.MeshBasicMaterial( {map: videoTexture3, side: THREE.FrontSide, toneMapped: false} );
    const videoMaterial4 =  new THREE.MeshBasicMaterial( {map: videoTexture4, side: THREE.FrontSide, toneMapped: false} );
    
    const videoScreen1 = new THREE.Mesh(screen, videoMaterial1);
    const videoScreen2 = new THREE.Mesh(screen, videoMaterial2);
    const videoScreen3 = new THREE.Mesh(screen, videoMaterial3);
    const videoScreen4 = new THREE.Mesh(screen, videoMaterial4);

    ////             ////
    ////  FMATERIALS  ////
    ////             ////

    let room_mat = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
    let floor_mat = new THREE.MeshLambertMaterial({color: 0x1});
    let cube1_mat = new THREE.MeshLambertMaterial({color: 0xFFCCFF});
    let song1_mat = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
    let song2_mat = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
    let text_plane_mat = new THREE.MeshLambertMaterial({color: 0xA6A6A6});
    room_mat.side = THREE.DoubleSide;
    //room_mat.map = silverfoil_texture;
    floor_mat.side = THREE.DoubleSide;
    song1_mat.map = song1_texture;
    song2_mat.map = song2_texture;
    cube1_mat.map = videoTexture1;
    text_plane_mat.map = text_plane_texture;
    text_plane_mat.opacity = 0;
    videoMaterial1.side = THREE.BackSide;
    videoMaterial2.side = THREE.BackSide;
    videoMaterial3.side = THREE.BackSide;
    videoMaterial4.side = THREE.BackSide;
    

   

     ////             ////
    ////    FMESH     ////
   ////             ////

    let room = new THREE.Mesh(room_geo, room_mat);
    let floor = new THREE.Mesh(floor_geo, floor_mat);
    let cube1 = new THREE.Mesh(cube1_geo, cube1_mat);
    let song1 = new THREE.Mesh(song1_geo, song1_mat);
    let song2 = new THREE.Mesh(song2_geo, song2_mat);
    let text_plane = new THREE.Mesh(text_plane_geo, text_plane_mat);
    const song_group = new THREE.Group();
    let model1;
    let model2;
    let model3;
    let model4;
    let model5;
    let model6;
    //  console.log(song_group);
    
    song_group.add(song1);
    song_group.add(song2);
    
      ////            ////
     ////    FOBJS    ////
    ////            ////

    loader.load(
        // resource URL
        'assets/GLTF/RANDOMTEXT2.glb',
        // called when the resource is loaded  
        function ( gltf ) {
            model1 = gltf.scene;
          
            //console.log(model1.children[0]);
            scene.add( model1 );
    
            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object
            model1.scale.x += 2000;
            model1.rotation.y += 1/2 * -3.14;
            model1.position.x = -80;
            model1.position.y = -97;
            model1.position.z = -490;
            model1.children[0].material.map = song2_texture;
    
        },
        // called while loading is progressing
        function ( xhr ) {
    
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
        },
        // called when loading has errors
        function ( error ) {
    
            console.log( 'An error happened' );
    
        }
    );

    loader2.load(
        // resource URL
        'assets/GLTF/CAGED.glb',
        // called when the resource is loaded  
        function ( gltf ) {
            model2 = gltf.scene;
          
            console.log(model2.children[0]);
            scene.add( model2 );
    
            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object
           // model2.scale += 20;
            model2.rotation.y += 1/2 * -3.14;
            model2.position.x = 230;
            model2.position.y = -50;
            model2.position.z = -400;
            model2.children[0].material.map = song2_texture;
    
        },
        // called while loading is progressing
        function ( xhr ) {
    
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
        },
        // called when loading has errors
        function ( error ) {
    
            console.log( 'An error happened' );
    
        }
    );

    loader3.load(
        // resource URL
        'assets/GLTF/ROOMS.glb',
        // called when the resource is loaded  
        function ( gltf ) {
            model3 = gltf.scene;
          
            //console.log(model2.children[0]);
            scene.add( model3 );

          //  model3.scale += 20;
         //   model3.rotation.y += 1/2 * -3.14;
            model3.position.x = 10;
            model3.position.y = 0;
            model3.position.z = 0;
        //    model3.children[0].material.map = silverfoil_texture;
    
        },
        // called while loading is progressing
        function ( xhr ) {
    
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
        },
        // called when loading has errors
        function ( error ) {
    
            console.log( 'An error happened' );
    
        }
    );

    loader4.load(
        // resource URL
        'assets/GLTF/CUPGLASSBEND.glb',
        // called when the resource is loaded  
        function ( gltf ) {
            model4 = gltf.scene;
            scene.add( model4 );

            model4.position.x = -20;
            model4.position.y = -30;
            model4.position.z = 0;
            model4.rotation.set(1, 2.3, 2.6);
          //  model4.children[0].material.map = silverfoil_texture;
    
        },
        // called while loading is progressing
        function ( xhr ) {
    
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
        },
        // called when loading has errors
        function ( error ) {
    
            console.log( 'An error happened' );
    
        }
    );

    loader5.load(
        // resource URL
        'assets/GLTF/CAGE.glb',
        // called when the resource is loaded  
        function ( gltf ) {
            model5 = gltf.scene;
            scene.add( model5 );
    
            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object
           // model2.scale += 20;
            model5.rotation.y += 1/2 * -3.14;
            model5.position.x = 0;
            model5.position.y = -90;
            model5.position.z = 0;
    
        },
        // called while loading is progressing
        function ( xhr ) {
    
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
        },
        // called when loading has errors
        function ( error ) {
    
            console.log( 'An error happened' );
    
        }
    );

    loader6.load(
        // resource URL
        'assets/GLTF/GLASS_ROOM.glb',
        // called when the resource is loaded  
        function ( gltf ) {
            model6 = gltf.scene;
        //    scene.add( model6 );
    
            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object
           // model2.scale += 20;
            model6.rotation.y += 1/2 * -3.14;
            model6.position.x = 0;
            model6.position.y = 0;
            model6.position.z = 0;
    
        },
        // called while loading is progressing
        function ( xhr ) {
    
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
        },
        // called when loading has errors
        function ( error ) {
    
            console.log( 'An error happened' );
    
        }
    );


    ////             ////
    ////   FLLIGHTS    ////
    ////             ////
    
    let light1 = new THREE.PointLight(0xFFFFFF, 1, 10000);
    let light2 = new THREE.PointLight(0xFFFFDD, 1, 10000);
    let light3 = new THREE.PointLight(0xFFFFEE, 1, 10000);
    light1.position.set( 50, 0, 20 );
    light2.position.set( -50, 300, -1490 );
    light3.position.set( -50, 700, 1490 );
    light1.rotation.x = 200


    ////             ////
    ////  FPOSITIONS  ////
    ////             ////

    
    camera.position.y = -50;
    camera.position.z = 30;
    videoScreen1.position.x = 230;
    videoScreen1.rotation.y = 0.5 * Math.PI;
    videoScreen1.position.z = -250;
    videoScreen2.position.x = 230;
    videoScreen2.position.z = -150;   
    videoScreen2.position.y = -30;
    videoScreen2.rotation.y = 0.5 * Math.PI;
    videoScreen3.position.x = 230;
    videoScreen3.position.y = 25;
    videoScreen3.position.z = -200;
    videoScreen3.rotation.y = 0.5 * Math.PI;
    videoScreen4.position.x = 220;
    videoScreen4.position.y = 20;
    videoScreen4.position.z = -300;
    videoScreen4.rotation.y = 0.5 * Math.PI;
    text_plane.rotation.y = 0.5 * Math.PI;
 

    let center = new THREE.Vector3();
    floor.position.y = -95
    floor.rotation.x = 0.5 * 3.14;
    text_plane.position.x = -230;

    song_group.position.z = -488;
    song1.position.x = -30;
    song1.position.y = -87.4;
    song2.position.z = 10;
    song1.position.z = 10;
    song2.position.x = -20;
    song2.position.y = -45;
    

    
    ////             ////
    ////  SCENE.ADD  ////
    ////             ////

    scene.add(room);
 //   scene.add(cube1);
    scene.add(light1);
    scene.add(light2);
    scene.add(light3);
    scene.add(text_plane);
    scene.add(song_group);
    scene.add(videoScreen1);
    scene.add(videoScreen2);
    scene.add(videoScreen3);
    scene.add(videoScreen4);

    let x = 0;


    ////       ////
    //// FORBIT ////
    ////       ////


    const controls = new OrbitControls( camera, renderer.domElement );
   // controls.enabled = false;
   controls.target.set(0, -50, 0);
   controls.minDistance = 20;
  // controls.maxDistance = 38;
   controls.maxAzimuthAngle = (0, Math.PI + 20);
    controls.enableDamping = true;
   // controls.enableZoom = false;
    controls.dampingFactor = 0.06;
    controls.keys = {
        LEFT: 37, //left arrow
        UP: 38, // up arrow
        RIGHT: 39, // right arrow
        BOTTOM: 40 // down arrow
      };
  


 

    ////                 ////
    //// FEVENT LISTENERS ////
    ////                 ////

   /* window.addEventListener('resize', onWindowResize, false)
        function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        render()
}*/
    document.getElementById("home").addEventListener("click", moveHome);
    document.getElementById("music").addEventListener("click", musicMove);
    document.getElementById("net").addEventListener("click", netMove);
    document.getElementById("about").addEventListener("click", aboutMove);
    // EVERYTIME I MOVE MOUSE THIS HAPPENS
    window.addEventListener( 'pointermove', onPointerMove );
   
    
    
    
    ////             ////
    ////  FFUNCTIONS  ////
    ////             ////
    room.visible = false;
    
    function moveHome()
    {
        //camera.position.y += 4 * Math.random();
        tween.start();
        controls.enabled = true;
        room.visible = true;
        sound.play();
        controls.target = cube1.position;
    }

    document.onkeydown = function(e) {
        console.log("KUK");
    }   
    function aboutMove(){
        controls.target = text_plane.position;
        room.visible = true;
    }
    function netMove(){
        controls.target = videoScreen1.position;
        controls.minDistance = 60;
        controls.maxDistance = 250;
        room.visible = true; 
    }
    function musicMove(){
        controls.target = song_group.position;
        controls.minDistance = 60;
        controls.maxDistance = 250;
        room.visible = true;
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

    domEvents.addEventListener(song1, 'click', function(event){
        
        sound.play();
        video.play();
        
        song1.rotation.x += Math.PI * 3;
    }, false)

    domEvents.addEventListener(song2, 'click', function(event){
        
        sound.play();
        
     //   song2.rotation.y += Math.PI * 3;
        song2.rotation.x += Math.PI * 1.5;
    }, false)

    let video_count = 0;
    domEvents.addEventListener(videoScreen1, 'click', function(event){
        window.location.href = "lines.html";
        sound.play();
        video_count++;
        console.log("video_count: " + video_count);
        if (video_count % 2 != 0){
            video_song1.play(); }     
        else {
            video_song1.pause();
        }
    }, false)


    domEvents.addEventListener(videoScreen2, 'click', function(event){
        sound.play();
        video_count++;
        console.log("video_count: " + video_count);
        if (video_count % 2 != 0){
            video_song2.play(); }     
        else {
            video_song2.pause();
        }
    }, false)

    
    domEvents.addEventListener(videoScreen3, 'click', function(event){
        sound.play();
        video_count++;
        console.log("video_count: " + video_count);
        if (video_count % 2 != 0){
            video_song3.play(); }     
        else {
            video_song3.pause();
        }
    }, false)

    domEvents.addEventListener(videoScreen4, 'click', function(event){
        sound.play();
        video_count++;
        console.log("video_count: " + video_count);
        if (video_count % 2 != 0){
            video_song4.play(); }     
        else {
            video_song4.pause();
        }
    }, false)


    

 


    ////              ////
    ////    FTWEEN     ////
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


    


    function animate(){
        requestAnimationFrame(animate);
        cube1.rotation.x += 0.01;
        cube1.rotation.y += 0.01;
        raycaster.setFromCamera( pointer, camera );
        const intersects = raycaster.intersectObjects( song_group.children);
       // console.log(intersects.length);

        if (x > 0 && x < 128){
            room.visible = true; 
        }
        else if (x % 380){
            room.visible = false; 
        }





        
        if ( intersects.length > 0 ) {
            
            if ( INTERSECTED != intersects[ 0 ].object ) {
                if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
                
                
                INTERSECTED = intersects[ 0 ].object;
                INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
                INTERSECTED.material.emissive.setHex( 0x1111BB   );
                tween.to({x: 0, y: 10, z: 30}, 2000);
            }
        } else {
            if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
            INTERSECTED = null;
        }
        TWEEN.update();
        controls.update();
        light1.color.setHex(0xFFFEFF);
        light2.color.setHex( 0x11 + x + 20);
        camera.rotation.z += 0.005 * Math.cos(x/20) + (0.001 * Math.random());
        camera.rotation.y += 0.009 * Math.cos(x/20) + (0.001 * Math.random());
        camera.rotation.x += 0.009 * Math.sin(x/20) + (0.001 * Math.random());
        
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
audioLoader.load( 'assets/audio/instrument/C3.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setVolume( .5 );	
});

const audioLoader2 = new THREE.AudioLoader();
audioLoader2.load( 'assets/audio/instrument/B2.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setVolume( .5 );	
});






}   
    main();