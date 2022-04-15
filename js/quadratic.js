import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
//import { CameraHelper } from 'three';

function main()
{
        const canvas = document.querySelector('#c');
        const scene = new THREE.Scene();
        const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
        renderer.setSize(innerWidth, innerHeight);
        const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.001, 10000);

        renderer.render(scene, camera);

        camera.position.z = 10;
        
        let room_geo = new THREE.BoxGeometry(10, 10, 10 );
        let room_mat = new THREE.MeshLambertMaterial({color: 0x808080});
        let room = new THREE.Mesh(room_geo, room_mat);
        room.side = THREE.DoubleSide;
    //    scene.add(room);
        
        
        let light1 = new THREE.PointLight(0xFFFFFF, 30, 100);
        const light = new THREE.AmbientLight( 0x404040 ); // soft white light
        light.position.set(0, 0, 0);
        scene.add( light );
        
        scene.add(light1);
        const material = new THREE.LineBasicMaterial();

        const points = [];
          

        console.log(points);
        const geometry = new THREE.BufferGeometry().setFromPoints( points );

        const line = new THREE.Line( geometry, material );
        scene.add( line );

       const controls = new OrbitControls( camera, renderer.domElement );
        let x = -100;
        let y = 2;
        let z = 0;
        let i = 0;
  //      controls.autoRotate = true;
        controls.autoRotateSpeed = 4;
        controls.maxDistance = 3000;

        addEventListener('scroll', animate);

        let button = document.getElementById("button");
        let text = document.getElementById('text');
        

        button.addEventListener('click', () => {
                animate();
                button.style.display = "none";
                document.getElementById("text").innerHTML = "interact";
         } );

        window.addEventListener('touchmove', function() { //touchmove works for iOS, I don't know if Android supports it
                window.dispatchEvent( new Event('wheel') );
              });

        function animate()
        {

                requestAnimationFrame(animate);
                console.log(x);
                renderer.render(scene, camera);
                x += Math.random(0.1);
                y = (2  *(x*x*x*x*x*x*x)) + (5*x);
                controls.update();
              if (x < 1500){
                
                y = (2  *(x*x*x*x*x*x*x)) + (5*x);
                console.log("x: " + x);
                z = y/2;
                points.push( new THREE.Vector3( 20*Math.sin(x), 20*Math.cos(Math.random(x*100)), 20*Math.cos(x)));        
               light1.position.set( points );
               light1.color.set(0xFFEEcc);
               
               }

               document.getElementById("text").innerHTML = x;
            
                const geometry = new THREE.BufferGeometry().setFromPoints( points );
                const line = new THREE.Line( geometry, material );
      //  if (x == 500)
        //        x = 0;
               i++;
        scene.add( line );

        }
 
}
main();
