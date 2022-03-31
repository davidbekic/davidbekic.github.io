import * as THREE from '/node_modules/three/build/three.module.js';
import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from '/node_modules/three/examples/jsm/loaders/GLTFLoader.js';
    
const scene = new THREE.Scene();
// scene.fog = new THREE.Fog(0xFFFFFF, 10, 100);
const camera = new THREE.PerspectiveCamera(75, innerWidth / 
innerHeight, 0.1, 10000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);


const loader = new GLTFLoader();

loader.load( '/eye.glb', function ( gltf ) {

scene.add( gltf.scene );
},
  undefined, function ( error ) {

console.error( error ); 

} );




var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(0, 350, 20);
scene.add(spotLight);
camera.position.z = 50;
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
// window.addEventListener( 'keydown', onKeyDown, false );
const cubeGeo = new THREE.BoxGeometry(10, 10, 10);
const cubeMat = new THREE.MeshPhongMaterial({
  color: 0xe62739,
  specular: 0xf2efe8} );
  
const cube1 = new THREE.Mesh(cubeGeo, cubeMat);
scene.add(cube1);

const cubeGeo2 = new THREE.BoxGeometry(100, 40, 200);
const cubeMat2 = new THREE.MeshBasicMaterial({color: 0xFFF91F});
const cube2 = new THREE.Mesh(cubeGeo2, cubeMat2);
cube2.material = THREE.DoubleSide;
scene.add(cube2);

//   const controls = new OrbitControls( camera, renderer.domElement );

function animate()
{
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    cube1.rotation.x += 0.004;
    cube1.rotation.x -= 0.0008;
    cube1.rotation.z += 0.004;
    controls.update();
}
animate();