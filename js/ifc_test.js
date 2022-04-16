import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

function main()
{

    const canvas = document.querySelector('#c');
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
    renderer.setSize(innerWidth, innerHeight);
    const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.001, 10000);
    
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.autoRotate = true;
    

    
    camera.position.z = 30;
    camera.position.y = 2;
    
    const song2_texture = new THREE.TextureLoader().load( 'assets/imgs/silver_foil.jpeg' );

    const point_geo = new THREE.SphereGeometry(.04, 0.02, 0.02);
    const point_mat = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
    const point = new THREE.Mesh(point_geo, point_mat);

    point_mat.map = song2_texture;

    const light = new THREE.PointLight(0xEEFFFA, 5, 100);
    light.position.set(0, 30, 10);
    const light2 = new THREE.PointLight(0xEEFFFA, 5, 100);
    light2.position.set(0, -30, 30);

    scene.add(light);
    scene.add(light2);
   // scene.add(point);

    let x = 0;
    let y = 0;
    let z = 0;
    let count = 0;

    let button = document.getElementById("button");
    button.addEventListener('click', () => {
            animate();
            button.style.display = "none";
            document.getElementById("text").innerHTML = "interact";
     } );

 
    function animate()
    {
        if (z < 100){
            x++;
            count++;
            const point = new THREE.Mesh(point_geo, point_mat);
           // point_mat.color.set(0xFFFFFF - z);
            
            point.position.set(x, y, z); 
            console.log("z: " + z);
            scene.add(point);
    
    
            light.position.set(point.position.x + 10, point.position.y + 10, point.position.z + 10);
            light2.position.set(point.position.x + 10, point.position.y + 10, point.position.z + 10);
            
            
            
            if (x == 10)
            {
                y++;
                x = 0;
            }
            if (y == 10)
            {
                x = 0;
                y = 0;
                z += 1;
            }
            document.getElementById("text").innerHTML = "points: " + count;
            
        }
        controls.target.set(0, 2, 7);
        console.log(controls.target);
        //camera.lookAt(x, y, 0);
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        
        controls.update();
       
     //  console.log(camera.position.z);
        //console.log(point.position);
      //  console.log(light.position);
    }

    






}

main();