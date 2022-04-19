import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

function main()
{
    const canvas = document.querySelector('#c');
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
    renderer.setSize(innerWidth, innerHeight);
    const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.001, 10000);

    renderer.setClearColor( 0xffffff, 1);
    renderer.render(scene, camera);

    camera.lookAt(0, 0, 0);
    camera.position.z = .4;
    camera.position.y = .3;

}

main();