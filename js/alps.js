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

    camera.position.z = 150;
    camera.position.y = 80;
    camera.lookAt(0, 0, 0);
    let   alps_loader = new THREE.GLTFLoader();
    let alps;    
    const controls = new OrbitControls( camera, renderer.domElement );
    const ambient_light1 = new THREE.AmbientLight({color: 0xFFFFFF}, 1, 100);
    const point_light1 = new THREE.PointLight({color: 0xFFFFFF}, 4, 100);
    const point_light2 = new THREE.PointLight({color: 0xFFFFFF}, 10, 100);
    point_light1.position.set(0, 90, 0);
    point_light2.position.set(0, 90, 80);

    const room_geo = new THREE.BoxGeometry(100, 100, 800);
    const room_mat = new THREE.MeshLambertMaterial();
    const room = new THREE.Mesh(room_geo, room_mat);
    room_mat.side = THREE.DoubleSide;

   // scene.add(ambient_light1);
    scene.add(point_light1);
    scene.add(point_light2);
    //scene.add(room);

    alps_loader.load(
        // resource URL
        'assets/GLTF/ALPS.glb',
        // called when the resource is loaded  
        function ( gltf ) {
            alps = gltf.scene;
          
            //console.log(model1.children[0]);
            scene.add( alps );
    
            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object
            
            //alps.children[0].material.map = song2_texture;
    
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



    function animate()
    {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        controls.update();
    }

    animate();

}


main();