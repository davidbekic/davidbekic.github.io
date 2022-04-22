import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

function main()
{
    
    ////             ////
    //// FHELLO WORLD ////
    ////             ////

    const canvas = document.querySelector('#c');
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
    renderer.setSize(innerWidth, innerHeight);
    const camera = new THREE.PerspectiveCamera(55, innerWidth/innerHeight, 0.1, 10000);
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let   INTERSECTED;
    let   domEvents	= new THREEx.DomEvents(camera, renderer.domElement);
    let   frontText_loader = new THREE.GLTFLoader();
    let   caged_loader = new THREE.GLTFLoader();
    let   roomsText_loader = new THREE.GLTFLoader();
    let   mainSculpture_loader = new THREE.GLTFLoader();
    let   glassCylinder_loader = new THREE.GLTFLoader();
    let instrument1_loader = new THREE.GLTFLoader();
    let spectrum_loader = new THREE.GLTFLoader();
    let runestone_loader = new THREE.GLTFLoader();
    let screamerText_loader = new THREE.GLTFLoader();
    renderer.shadowMap.enabled = true;
    document.getElementById('music-menu').style.display = "none";
    let currentStation = "landing";
    

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














    ////             ////
    //// FGEOMETRIES  ////
    ////             ////

    let room_geo = new THREE.BoxGeometry(2000, 350, 1000);
    let text_plane_geo = new THREE.PlaneGeometry(192/1.3, 108/1.3);
    let floor_geo = new THREE.PlaneGeometry(300, 1000);
    let cube1_geo = new THREE.BoxGeometry(10, 10, 10);
    let song1_geo = new THREE.BoxGeometry(60, 25, 20);
    let song2_geo = new THREE.BoxGeometry(25, 60, 20);
    let ceiling_geo = new THREE.PlaneGeometry(2200, 1000);
    const screen = new THREE.PlaneGeometry(30, 80);
    const instrument1_proxy_geo = new THREE.PlaneGeometry(50, 50);
    const gradient_canvas_geo = new THREE.PlaneGeometry(200, 30);
    const video_song1 = document.getElementById('video_song1');
    const video_song2 = document.getElementById('video_song2');
    const video_song3 = document.getElementById('video_song3');
    const video_song4 = document.getElementById('video_song4');

    
    
    
    ////             ////
    ////  FTEXTURES  ////
    ////            ////

    const song1_texture = new THREE.TextureLoader().load( 'assets/imgs/song1.png' );
    const song2_texture = new THREE.TextureLoader().load( 'assets/imgs/song2.png' );
    const concrete_texture = new THREE.TextureLoader().load( 'assets/imgs/cloth.webp' );
    const text_plane_texture = new THREE.TextureLoader().load( 'assets/imgs/silkcolor.jpeg' );
    const silverfoil_texture = new THREE.TextureLoader().load( 'assets/imgs/glass1.jpeg' );
    //const text_plane_texture = THREE.ImageUtils.loadTexture('text2.jpeg');
    silverfoil_texture.wrapS = silverfoil_texture.wrapT = THREE.RepeatWrapping;
    //silverfoil_texture.offset.set( 1, 1 );
    silverfoil_texture.repeat.set( 5, 5);
    
    concrete_texture.wrapS = silverfoil_texture.wrapT = THREE.RepeatWrapping;
   // concrete_texture.offset.set( 1, 1 );
    //concrete_texture.repeat.set(60, 60);
   
    //song1_texture.generateMipmaps = false;
    silverfoil_texture.generateMipmaps = false;
    //song2_texture.generateMipmaps = false;
//    text_plane_texture.generateMipmaps = false;
    text_plane_texture.magFilter = THREE.LinearFilter;
    text_plane_texture.minFilter = THREE.LinearFilter;
    song1_texture.magFilter = THREE.LinearFilter;
    song1_texture.minFilter = THREE.LinearFilter;
    song2_texture.magFilter = THREE.LinearFilter;
    song2_texture.minFilter = THREE.LinearFilter;



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
    let instrument1_proxy_mat = new THREE.MeshStandardMaterial();
    const gradient_canvas_mat = new THREE.MeshPhysicalMaterial({color: 0xCCAA99CC, roughness: 1, metalness: 0});
    let ceiling_mat = new THREE.MeshStandardMaterial({color: 0x00FFFFFF});
    room_mat.side = THREE.DoubleSide;
    //room_mat.map = concrete_texture;
    gradient_canvas_mat.side = THREE.BackSide;
    ceiling_mat.side = THREE.DoubleSide;
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
    //instrument1_proxy_mat.side = THREE.DoubleSide;
    

   

     ////             ////
    ////    FMESH     ////
   ////             ////

    let room = new THREE.Mesh(room_geo, room_mat);
    let floor = new THREE.Mesh(floor_geo, floor_mat);
    let cube1 = new THREE.Mesh(cube1_geo, cube1_mat);
    let song1 = new THREE.Mesh(song1_geo, song1_mat);
    let song2 = new THREE.Mesh(song2_geo, song2_mat);
    let text_plane = new THREE.Mesh(text_plane_geo, text_plane_mat);
    const gradient_canvas = new THREE.Mesh(gradient_canvas_geo, gradient_canvas_mat);
    let instrument1_proxy = new THREE.Mesh(instrument1_proxy_geo, instrument1_proxy_mat);
    let ceiling = new THREE.Mesh(ceiling_geo, ceiling_mat);
    const song_group = new THREE.Group();
    let frontText;
    let caged;
    let roomsText;
    let mainSculpture;
    let glassCylinder;
    let instrument1;
    let screamerText;
    let spectrum;
    let runestone;
    //  console.log(song_group);
    
    song_group.add(song1);
    song_group.add(song2);
 
    
      ////            ////
     ////    FOBJS    ////
    ////            ////

    frontText_loader.load(
        // resource URL
        'assets/GLTF/RANDOMTEXT2.glb',
        // called when the resource is loaded  
        function ( gltf ) {
            frontText = gltf.scene;
          
            //console.log(model1.children[0]);
            scene.add( frontText );
    
            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object
            frontText.scale.x += 2000;
            frontText.rotation.y += 1/2 * -3.14;
            frontText.position.x = -80;
            frontText.position.y = -97;
            frontText.position.z = -490;
            frontText.children[0].material.map = song2_texture;
    
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

    caged_loader.load(
    // resource URL
        'assets/GLTF/CAGED.glb',
        // called when the resource is loaded  
        function ( gltf ) {
            caged = gltf.scene;
          
            console.log(caged.children[0]);
            scene.add( caged );
    
            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object
           // model2.scale += 20;
            caged.rotation.y += 1/2 * -3.14;
            caged.position.x = 230;
            caged.position.y = -50;
            caged.position.z = -400;
            caged.children[0].material.map = song2_texture;
    
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

    roomsText_loader.load(
        'assets/GLTF/ROOMS.glb',
        // called when the resource is loaded  
        function ( gltf ) {
            roomsText = gltf.scene;

            scene.add( roomsText );
            roomsText.position.x = 10;
            roomsText.position.y = 0;
            roomsText.position.z = 0;
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

    mainSculpture_loader.load(
        // resource URL
        'assets/GLTF/BRAIN.glb',
        // called when the resource is loaded  
        function ( gltf ) {
            mainSculpture = gltf.scene;
            scene.add( mainSculpture );

            mainSculpture.position.x = -0;
            mainSculpture.position.y = -45;
            mainSculpture.position.z = 0;
            mainSculpture.rotation.set(1, 2.3, 2.6);
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

    glassCylinder_loader.load(
        // resource URL
        'assets/GLTF/CAGE.glb',
        // called when the resource is loaded  
        function ( gltf ) {
            glassCylinder = gltf.scene;
            scene.add( glassCylinder );
    
            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object
           // model2.scale += 20;
            glassCylinder.rotation.y += 1/2 * -3.14;
            glassCylinder.position.x = 0;
            glassCylinder.position.y = -90;
            glassCylinder.position.z = 0;
    
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

    instrument1_loader.load(
        // resource URL
        'assets/GLTF/INSTRUMENT1.glb',
        // called when the resource is loaded  
        function ( gltf ) {
            instrument1 = gltf.scene;
            scene.add( instrument1 );
            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object
            
            instrument1.rotation.y += 1/2 * 3.14;
            instrument1.rotation.z += 3.14;
            
            instrument1.rotation.x = -1/2 * 3.14;
            instrument1.position.x = 100;
            instrument1.position.y = -95;
            instrument1.position.z = 410;
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

    screamerText_loader.load(
        // resource URL
        'assets/GLTF/SCREAMERTEXT.glb',
        // called when the resource is loaded  
        function ( gltf ) {
            screamerText = gltf.scene;
            scene.add( screamerText );
            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object
            
            screamerText.rotation.y += 1/2 * 3.14;
            screamerText.rotation.z += 3.14;
            
            screamerText.rotation.x = -1/2 * 3.14;
            screamerText.position.x = 100;
            screamerText.position.y = -99;
            screamerText.position.z = 315;
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

    spectrum_loader.load(
        // resource URL
        'assets/GLTF/SPECTRUM.glb',
        // called when the resource is loaded  
        function ( gltf ) {
            spectrum = gltf.scene;
            scene.add( spectrum );
            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object
            
          //  spectrum.position.set(400, 300, 200);
            spectrum.rotation.y = 1;
            spectrum.rotation.z = 1;
            spectrum.position.x += 300;
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

    runestone_loader.load(
        // resource URL
        'assets/GLTF/BRAIN2.glb',
        // called when the resource is loaded  
        function ( gltf ) {
            runestone = gltf.scene;
            scene.add( runestone );
            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object

            runestone.position.set(-940, -20, 450);
            runestone.rotation.y = -1;
          //runestone.position.x = 600;
          //runestone.position.x += 300;
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
    ////   FLIGHTS    ////
    ////             ////
    
    let light1 = new THREE.PointLight(0xEEEEFF, .7, 3000);
    let light2 = new THREE.PointLight(0xEEEEFF, .7, 3000);
    let light3 = new THREE.PointLight(0xEEEEFF, .7, 300);
    let ambientLight1 = new THREE.AmbientLight(0xDDDDEE, .45, 1000);
    
    light1.position.set(870, -20, -241);
    //    light1.lookAt(-570, 8, 241);
    light2.position.set(0, 8, 401);
    light3.position.set(-870, -20, 0);
  //  light2.lookAt(570, 8, -241);

  //  light1.lookAt(videoScreen1.position);

    
   // light2.position.set( -50, 300, -1490 );
    
    light1.rotation.x = 200


    ////             ////
    ////  FPOSITIONS  ////
    ////             ////

    
    camera.position.y = -199;
    camera.position.z = 30;
    videoScreen1.position.x = 230 + 600;
    videoScreen1.rotation.y = 0.5 * Math.PI;
    videoScreen1.position.z = -250;
    videoScreen2.position.x = 230 + 600;
    videoScreen2.position.z = -150;   
    videoScreen2.position.y = -30;
    videoScreen2.rotation.y = 0.5 * Math.PI;
    videoScreen3.position.x = 230 + 600;
    videoScreen3.position.y = 25;
    videoScreen3.position.z = -200;
    videoScreen3.rotation.y = 0.5 * Math.PI;
    videoScreen4.position.x = 220 + 600;
    videoScreen4.position.y = 20;
    videoScreen4.position.z = -300;
    videoScreen4.rotation.y = 0.5 * Math.PI;
    text_plane.rotation.y = 0.5 * Math.PI;
   // text_plane.rotation.x = -0.16 * Math.PI;
    gradient_canvas.position.z = 490;
    gradient_canvas.position.y = 80;
    gradient_canvas.rotation.x = -1.3;
    ceiling.rotation.x = 3.14 / 2;
    ceiling.position.y = -100;
    room.position.y = 74;

    instrument1_proxy.rotation.y += 1/2 * 3.14;
    instrument1_proxy.rotation.y += 1/2 * 3.14;
    instrument1_proxy.position.x = 100;
    instrument1_proxy.position.y = -99;
    instrument1_proxy.position.z = 470;
    instrument1_proxy.rotation.y = -3.14;
 

    let center = new THREE.Vector3();
    floor.position.y = -95
    floor.rotation.x = 0.5 * 3.14;
    text_plane.position.x = -900;
    text_plane.position.y = 30;

    song_group.position.z = -488;
    song1.position.x = -30;
    song1.position.y = -87.4;
    song2.position.z = 10;
    song1.position.z = 10;
    song2.position.x = -20;
    song2.position.y = -45;

    console.log(song_group);


    console.log(videoScreen1.position);
    
    ////             ////
    ////  FSCENE.ADD  ////
    ////             ////

    scene.add(room);
 //   scene.add(cube1);
    scene.add(light1);
    scene.add(light2);
    scene.add(light3);
    scene.add(ambientLight1);
    scene.add(text_plane);
    scene.add(song_group);
    scene.add(videoScreen1);
    scene.add(videoScreen2);
    scene.add(videoScreen3);
    scene.add(videoScreen4);
    scene.add(instrument1_proxy);
    instrument1_proxy.visible = false;
    scene.add(gradient_canvas);
    scene.add(ceiling);
    

    let x = 0;


    ////       ////
    //// FORBIT ////
    ////       ////


    const controls = new OrbitControls( camera, renderer.domElement );
   // controls.enabled = false;
   controls.target.set(0, -50, 0);
   controls.minDistance = 20;
 
   controls.maxDistance = 38;
   controls.maxAzimuthAngle = (-.1, .1);
    controls.enableDamping = true;
    controls.minPolarAngle = .8;
    controls.maxPolarAngle = 2;
   // controls.enableZoom = false;
    controls.dampingFactor = 0.06;
    controls.keys = {
        LEFT: 37, //left arrow
        UP: 38, // up arrow
        RIGHT: 39, // right arrow
        BOTTOM: 40 // down arrow
      };
  


 


    
    
    ////             ////
    ////  FFUNCTIONS  ////
    ////             ////
    room.visible = false;
    
    function moveHome(){
        //camera.position.y += 4 * Math.random();
        //tween.start();
        document.getElementById('first-menu').style.display = "inline";
        document.getElementById('music-menu').style.display = "none";
        document.getElementById("contact").innerHTML = "contact";


        controls.target.set(0, -50, 0);
        controls.minDistance = 20;
      
        controls.maxDistance = 38;

        controls.minPolarAngle = .8;
        controls.maxPolarAngle = 2;
        sound.play();
        room.visible = true;
        roomEntered = true;
    }

    document.onkeydown = function(e) {
        console.log("KUK");
    }   
  //  console.log(videoScreen1.position);
    function aboutMove(){
        controls.target.set(-530, 0, 0);
        
        room.visible = true;
        roomEntered = true;
    }
    function netMove(){
        currentStation = "net";
        controls.target.set(700, 0, -250);
        camera.position.set(400, 0, -230);
        controls.minDistance = 0;
        controls.maxDistance = 40;
        room.visible = true; 
        roomEntered = true;
        controls.minPolarAngle = .8;
        controls.maxPolarAngle = 2;
    }
    function musicMove(){
        document.getElementById('first-menu').style.display = "none";
        document.getElementById('music-menu').style.display = "inline";
        room.visible = true;
        roomEntered = true;
        controls.minPolarAngle = .8;
        controls.maxPolarAngle = 2;
    }
    function instrumentsMove(){
        document.getElementById('first-menu').style.display = "none";
        document.getElementById('music-menu').style.display = "inline";
        controls.target.set(0, -30, 320);
        camera.lookAt(0, -190, 320);
        controls.minPolarAngle = .8;
        controls.maxPolarAngle = 1.9;
        
        controls.minDistance = 20;
        controls.maxDistance = 150;
        room.visible = true;
        roomEntered = true;
    }
    
    function onPointerMove( event ) {
        pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    }

        ////                 ////
    //// FEVENT LISTENERS ////
    ////                 ////

   /* kuk.addEventListener('resize', onWindowResize, false)
        function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        render()
}*/
document.getElementById("home").addEventListener("click", moveHome);
document.getElementById("music").addEventListener("click", musicMove);
document.getElementById("instruments").addEventListener("click", instrumentsMove);
document.getElementById("net").addEventListener("click", netMove);
document.getElementById("contact").addEventListener("click", function(){
    document.getElementById("contact").innerHTML = "davidbekic@gmail.com";
});

document.getElementById("about").addEventListener("click", aboutMove);
// EVERYTIME I MOVE MOUSE THIS HAPPENS
window.addEventListener( 'pointermove', onPointerMove );



    domEvents.addEventListener(song1, 'click', function(event){
        sound.play();
        video.play();
        song1.rotation.x += Math.PI * 3;
    }, false)

    domEvents.addEventListener(song2, 'click', function(event){
        sound.play();
        song2.rotation.x += Math.PI * 1.5;
    }, false)

    domEvents.addEventListener(song1, 'click', function(event){
        sound.play();
        song2.rotation.x += Math.PI * 1.5;
    }, false)


    let video_count = 0;
    domEvents.addEventListener(videoScreen1, 'click', function(event){
        if (currentStation == "net")
        {
            window.location.href = "lines.html";
        }
        sound.play();
        video_count++;
        console.log("video_count: " + video_count);
        if (video_count % 2 != 0){
            video_song1.play(); }     
        else {
            video_song1.pause();
        }
    }, false)
    domEvents.addEventListener(videoScreen1, 'touchstart', function(event){
        if (currentStation == "net")
        {
            window.location.href = "lines.html";
        }
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
        console.log(videoScreen2);
        if (currentStation == "net")
        {
            window.location.href = "net.html";
        }
    }, false)

    domEvents.addEventListener(videoScreen2, 'touchstart', function(event){
        sound.play();
        if (currentStation == "net")
        {
            window.location.href = "net.html";
        }
    }, false)
    

    
    
    domEvents.addEventListener(videoScreen3, 'click', function(event){
        sound.play();
        video_count++;
        if (currentStation == "net")
        {
            window.location.href = "ifc_test.html";
        }

        console.log("video_count: " + video_count);
        if (video_count % 2 != 0){
            video_song3.play(); }     
        else {
            video_song3.pause();
        }
    }, false)
    domEvents.addEventListener(videoScreen3, 'touchstart', function(event){
        sound.play();
        video_count++;
        if (currentStation == "net")
        {
            window.location.href = "ifc_test.html";
        }
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

    domEvents.addEventListener(videoScreen4, 'touchstart', function(event){
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
   //     camera.position.y = coords.y;        
        camera.position.z = coords.z;    
      //  camera.rotation.x = 1 *  coords.z;    
        //console.log(coords.x); 

  //      console.log(camera.position.x); 

    });

    domEvents.addEventListener(instrument1_proxy, 'click', function(event){
        window.location.href = "instrument1.html";
        sound.play();
        video_count++;
        console.log("video_count: " + video_count);
        if (video_count % 2 != 0){
            video_song1.play(); }     
        else {
            video_song1.pause();
        }
    }, false);
    domEvents.addEventListener(instrument1_proxy, 'touchstart', function(event){
        
        window.location.href = "instrument1.html";
        sound.play();
        video_count++;
        console.log("video_count: " + video_count);
        if (video_count % 2 != 0){
            video_song1.play(); }     
        else {
            video_song1.pause();
        }
    }, false);

    
    let roomEntered = false;

    console.log(controls.target);

    function animate(){
        requestAnimationFrame(animate);
        cube1.rotation.x += 0.01;
        cube1.rotation.y += 0.01;
        raycaster.setFromCamera( pointer, camera );
        const intersects = raycaster.intersectObjects( song_group.children);
     //   console.log(intersects.length);

        if (x > 0 && x < 128 && roomEntered == false){
            room.visible = true;
            video_song1.play();
            video_song2.play();
            video_song3.play();
            video_song4.play(); 
        }
        else if (x / 380 && roomEntered == false){
            room.visible = false; 
        }
        if (roomEntered){
            glassCylinder.visible = false;
            mainSculpture.visible = false;
            
        }
        console.log(roomEntered);

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
       // light1.color.setHex(0xFFFEFF);
        //light2.color.setHex( 0xFFFFFF);
        camera.rotation.z += 0.005 * Math.cos(x/20) + (0.001 * Math.random());
        camera.rotation.y += 0.009 * Math.cos(x/20) + (0.001 * Math.random());
        camera.rotation.x += 0.009 * Math.sin(x/20) + (0.001 * Math.random());

        roomsText.rotation.x += 0.009 * Math.sin(x/20);
        text_plane.rotation.y -= 0.002 * Math.sin(x/80);
        
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
    







}   
    main();