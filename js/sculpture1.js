import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';


function main()
{

    const canvas = document.querySelector('#c');
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
    const camera = new THREE.PerspectiveCamera(55, innerWidth/innerHeight, 0.1, 10000);
    let glassCylinder_loader = new THREE.GLTFLoader();
    let sculpture1_loader = new THREE.GLTFLoader();
    let glassCylinder;
    let sculpture1;
    document.getElementById('change').style.display = "none";


    // FGEO
    const room_geo = new THREE.BoxGeometry(500, 100, 500);
    const cube_geo = new THREE.BoxGeometry(50, 10, 50);


    // FMAT
    let room_mat = new THREE.MeshLambertMaterial();
    let cube_mat = new THREE.MeshLambertMaterial();
    room_mat.side = THREE.DoubleSide;


    // FMESH
    let room = new THREE.Mesh(room_geo, room_mat);
    let cube = new THREE.Mesh(cube_geo, cube_mat);


    // FLIGHTS
    const light1 = new THREE.PointLight(0xFFFFFF, 0, 1);
    const light2 = new THREE.AmbientLight(0xCCCCFF, .3, 100);

  

    // FSCENE_ADD
    scene.add(room);
  //  scene.add(cube);
    scene.add(light1);
    scene.add(light2);


    // FPOS
    camera.z = 0;
    camera.y = 0;
    camera.position.set(-5, 9, 0.6);
    camera.rotation.z = .5 * Math.PI;
    light1.lookAt(200, 0, 0);
    light1.position.x = 120;
    console.log(camera.position.y);

    // FOBJS

    glassCylinder_loader.load(
        // resource URL
        'assets/GLTF/CAGE.glb',
        // called when the resource is loaded  
        function ( gltf ) { 
            glassCylinder = gltf.scene;
        //    scene.add( glassCylinder );
            glassCylinder.scale.x += 2000;
    
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


    sculpture1_loader.load(
        // resource URL
        'assets/GLTF/BRAIN.glb',
        // called when the resource is loaded  
        function ( gltf ) { 
            sculpture1 = gltf.scene;
            scene.add( sculpture1 );
            
            sculpture1.scale.x += 20;

    
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

    // FORBIT
    const controls = new OrbitControls( camera, renderer.domElement );
     
    controls.target.set(0, 10, 0);
    controls.minDistance = 1;

  
    controls.maxDistance = 3;
    controls.maxAzimuthAngle = (-.1, .1);
     controls.enableDamping = true;
     controls.minPolarAngle = .8;
     controls.maxPolarAngle = 2;
    // controls.enableZoom = false;
     controls.dampingFactor = 0.06;
  //   controls.autoRotate = true;
     //controls.enabled = false;
     controls.keys = {
        
         LEFT: 37, //left arrow
         UP: 38, // up arrow
         RIGHT: 39, // right arrow
         BOTTOM: 40 // down arrow
       };
   
 


    // FFUNCS

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = innerWidth;
        const height = innerHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function change()
    {
        //camera.position.set(Math.random(1)*100, Math.random(1)*100, Math.random(1)*100);
        //camera.rotation.set(Math.random(1)*100, Math.random(1)*100, Math.random(1)*100)
        //light1.color.setHex( Math.random() * 0x99999999 );
        console.log(light1.color);
    }

    
    document.getElementById("change").addEventListener("click", change);


    let direction = 1;
    let x = 0;
    function animate()
    {
        if (direction == 1){
        x++;
    }
        else{
            x--;
        }

        document.getElementById('text').innerHTML = "time: \u00A0\u00A0" +   x;
        controls.update();
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        
        camera.position.x += .010 * Math.cos(x/50);
        camera.position.y += .004 * Math.cos(x/50);
        camera.position.z += .001 * Math.cos(x/50);
        
        light1.distance = x;
        light1.intensity = x/1000;
        console.log(x);
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
      };
      if (x == 5000)
      {
          direction = -1;
      }
      if (x == 1){
          direction = 1;
      }
    }
    animate();
}
main();