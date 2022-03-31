
import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls.js";

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
    
   ////             ////
    ////  TEXTURES  ////
    ////             ////
    const texture = new THREE.TextureLoader().load( 'rock.jpg' );


    ////             ////
    //// GEOMETRIES  ////
    ////             ////

    let room_geo = new THREE.BoxGeometry(500, 200, 1000);
    let floor_geo = new THREE.PlaneGeometry(300, 1000);
    let cube1_geo = new THREE.BoxGeometry(10, 10, 10);
    let cube2_geo = new THREE.BoxGeometry(250, 40, 1);
    
    
    ////             ////
    ////  MATERIALS  ////
    ////             ////

    let room_mat = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
    let floor_mat = new THREE.MeshLambertMaterial({color: 0xF});
    let cube1_mat = new THREE.MeshLambertMaterial({color: 0xFFCCFF});
    let cube2_mat = new THREE.MeshLambertMaterial({color: 0x001144});
    room_mat.side = THREE.DoubleSide;
    floor_mat.side = THREE.DoubleSide;
    cube2_mat.map = texture;


   

    ////             ////
    ////    MESH     ////
    ////             ////

    let room = new THREE.Mesh(room_geo, room_mat);
    let floor = new THREE.Mesh(floor_geo, floor_mat);
    let cube1 = new THREE.Mesh(cube1_geo, cube1_mat);
    let cube2 = new THREE.Mesh(cube2_geo, cube2_mat);


    ////             ////
    ////   LIGHTS    ////
    ////             ////
    
    let light1 = new THREE.PointLight(0xFFFFFF, 1, 10000);
    let light2 = new THREE.PointLight(0xFFFFEE, 1, 10000);
    let light3 = new THREE.PointLight(0xFFFFFF, 1, 10000);
    light1.position.set( 50, 0, 20 );
    light2.position.set( -50, 300, -1490 );
    light3.position.set( -50, 700, 1490 );
    light1.rotation.x = 200


    ////             ////
    ////  POSITIONS  ////
    ////             ////

    camera.position.z = 150;

    let center = new THREE.Vector3();
    floor.position.y = -95
    floor.rotation.x = 0.5 * 3.14;
    cube2.position.z = -488

    //room.position.z = 50
    ////             ////
    ////  SCENE.ADD  ////
    ////             ////
    scene.add(room);
    scene.add(cube1);
    scene.add(cube2);
   // scene.add(floor);
    scene.add(light1);
    scene.add(light2);
    scene.add(light3);

    let x = 0;


    ////       ////
    //// ORBIT ////
    ////       ////
   
    const controls = new OrbitControls( camera, renderer.domElement );
   // controls.enabled = false;
   controls.minDistance = 20;
   controls.maxDistance = 100;
    controls.enableDamping = true;
   // controls.enableZoom = false;
    controls.dampingFactor = 0.06;


    controls.keys = {
	LEFT: 'ArrowLeft', //left arrow
	UP: 'ArrowUp', // up arrow
	RIGHT: 'ArrowRight', // right arrow
	BOTTOM: 'ArrowDown' // down arrow
}

    function moveHome()
    {
        //camera.position.y += 4 * Math.random();
        tween.start();
        controls.enabled = true;
        
    }
    document.getElementById("home").addEventListener("click", moveHome);

    document.onkeydown = function(e) {
        console.log("KUK");
    }   

   // window.addEventListener( 'keydown', onKeyDown, false );

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

    
   // tween.start();


    function animate(){
        requestAnimationFrame(animate);
        cube1.rotation.x += 0.02;
        cube1.rotation.y += 0.02;

        TWEEN.update();
        
        controls.update();
        
        camera.rotation.z += 0.001 * Math.cos(x/20) + (0.001 * Math.random());
        camera.rotation.y += 0.004 * Math.cos(x/20) + (0.001 * Math.random());
        camera.rotation.x += 0.006 * Math.sin(x/20) + (0.001 * Math.random());
      //  camera.lookAt(cube1);
        //cube2.position.y += 2 * Math.cos(x/20);
    //    cube2.position.z += 20 * Math.cos(x/40);
        
        
        x += 1;
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
    sound.play();
    
	
});






}   
    main();