import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
//import { CameraHelper } from 'three';

function main()
{
        const canvas = document.querySelector('#c');
        const scene = new THREE.Scene();
        const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
        renderer.setSize(innerWidth, innerHeight);
        const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.001, 10000);

        let button = document.getElementById("button");
        let change = document.getElementById("change");
        renderer.render(scene, camera);

        //camera.position.z = 5000;
     //   camera.position.y = 4000;
        camera.position.set(-60, 0, -110);
        camera.rotation.x = 0;
        camera.rotation.y = 0;
        camera.rotation.z = 0;
        change.style.display = "none";
        
        let room_geo = new THREE.BoxGeometry(10, 10, 10 );
        let room_mat = new THREE.MeshLambertMaterial({color: 0x808080});
        let room = new THREE.Mesh(room_geo, room_mat);
        room.side = THREE.DoubleSide;
    //    scene.add(room);
        
        
        let light1 = new THREE.PointLight(0xFFAAFF, 30, 100);
        const light = new THREE.AmbientLight( 0xFFFFFF ); // soft white light
        light.position.set(0, 0, 0);
        scene.add( light );
        
        scene.add(light1);
        const material = new THREE.MeshLambertMaterial();

        const points = [];
          


        //const geometry = new THREE.BufferGeometry().setFromPoints( points );
        const geometry = new THREE.BoxGeometry(points.position);
        const line = new THREE.Line( geometry, material );
        scene.add( line );

       const controls = new OrbitControls( camera, renderer.domElement );
       camera.rotation.z = 2;
        let x = 0;
        let y = 2;
        let z = 0;
        let i = 0;
  //      controls.autoRotate = true;
        controls.autoRotateSpeed = 4;
        controls.maxDistance = 3000;
        let coefficient = 0;

        addEventListener('scroll', animate);


        let text = document.getElementById('text');
        

        button.addEventListener('click', () => {
                animate();
                button.style.display = "none";
                change.style.display = "inline";
                document.getElementById("text").innerHTML = "interact";
                
        } );

        change.addEventListener('click', () => {
                animate();
                
             //   //coefficient = Math.random(2) * 100;
                x = 0;
                y += 20;
                z += 2;
             //   z += 2000;
                light.color.setHex(255 - y);
        } );

        window.addEventListener('touchmove', function() { //touchmove works for iOS, I don't know if Android supports it
                window.dispatchEvent( new Event('wheel') );
              });

        function animate()
        {

                requestAnimationFrame(animate);
              
                renderer.render(scene, camera);
                x += 1;
                
                
                controls.update();
                if (x < 60){
                        console.log(camera.rotation.z);
                        z += y/20;
                        light1.position.set( points );
                        points.push( new THREE.Vector3(0.01*(x+y), 0.01*(x+y), 0.01*(x+y+z)));        
                        light1.color.set(0xFFEEcc);
                }

                document.getElementById("text").innerHTML = i;
            
                const geometry = new THREE.BufferGeometry().setFromPoints( points );
                const line = new THREE.Line( geometry, material );
                points.push( new THREE.Vector3(x+y, x+y, x+y+z));     
               if (x % 60 == 0)
                {
                        y += 100/1+coefficient;
                        //z += 300;
                        x = 30;
                }
                if (y % 600 == 0)
                {
                        y = 0;
                        //z += 300;
                        z = 0;
                
                }
               i++;
               

        scene.add( line );

        }
 
}
main();
