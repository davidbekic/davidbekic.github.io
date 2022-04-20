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

        camera.lookAt(0, 0, 0);
        camera.position.z = .4;
        camera.position.y = .3;
        
        const backdrop_geo = new THREE.PlaneGeometry(2400, 2400);
        let room_geo = new THREE.BoxGeometry(10, 10, 10 );
        let room_mat = new THREE.MeshLambertMaterial({color: 0x808080});
        let room = new THREE.Mesh(room_geo, room_mat);
        room.side = THREE.DoubleSide;
    //    scene.add(room);
        
        
        let light1 = new THREE.PointLight(0xFFFFFF, 30, 100);
        const light = new THREE.AmbientLight( 0x404040 ); // soft white light
        light.position.set(0, 0, 0);
        const backdrop_mat = new THREE.MeshPhysicalMaterial({color: 0xFFFFFF, roughness: 1, metalness: 0});
       // backdrop_mat.side = THREE.BackSide;
        const backdrop = new THREE.Mesh(backdrop_geo, backdrop_mat);
        scene.add( light );
        
        scene.add(light1);
        const material = new THREE.LineBasicMaterial();

        const points = [];
          

        console.log(points);
        const geometry = new THREE.BufferGeometry().setFromPoints( points );

        const line = new THREE.Line( geometry, material );
        scene.add( line );

       const controls = new OrbitControls( camera, renderer.domElement );
        let x = 1;
        let y = 2;
        let i = 0;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 4;
        controls.maxDistance = 3;

        addEventListener('scroll', animate);

        let button = document.getElementById("button");
        let text = document.getElementById('text');
        

        const ambient_light1 = new THREE.AmbientLight({color: 0xFFFFFF}, 1, 100);
        const point_light1 = new THREE.PointLight({color: 0xCFFFFF}, 1, 1000);
        const point_light2 = new THREE.PointLight({color: 0xCFFFFF}, .1, 1000);
        
        const spot_light3 = new THREE.SpotLight(0xFFAA99FF, 5, 1000, 90);
        const spot_light4 = new THREE.SpotLight(0xFFFF0099, .3, 1000, 90);
        
        
        
        point_light1.position.z = 300;
        point_light1.position.y = 500;
        spot_light3.lookAt(backdrop.position);
        spot_light3.position.x = -200;
        spot_light3.position.y = 200;
        spot_light3.position.z = 400;
        spot_light4.position.x = 400;
        spot_light4.position.y = 0;
        spot_light4.position.z = 400;
        backdrop.position.z = -400;

    scene.add(backdrop);
   // scene.add(ambient_light1);
    //scene.add(ambient_light1);
   // scene.add(point_light1);
  //  scene.add(point_light2);
    scene.add(spot_light3);
    scene.add(spot_light4);

        button.addEventListener('click', () => {
                animate();
                button.style.display = "none";
                document.getElementById("text").innerHTML = "interact";
         } );

        window.addEventListener('touchmove', function() { //touchmove works for iOS, I don't know if Android supports it
                window.dispatchEvent( new Event('wheel') );
              });

        let w = 0;
        function animate()
        {
                w++;
                requestAnimationFrame(animate);
                console.log(x);
                renderer.render(scene, camera);
                controls.update();
              if (x < 1000){
                x += .3;
                y += 15;
                points.push( new THREE.Vector3( Math.sin(x/100)*.1, Math.cos(x/10), Math.sin(x)*0.1));
               light1.position.set( points );
               light1.color.set(0xFFEEcc);
               //camera.position.set(Math.sin(x/100)*.1, Math.cos(x/10), Math.sin(x)*0.1);
               
               }
               
                document.getElementById("text").innerHTML = "web spins: " + w;
                const geometry = new THREE.BufferGeometry().setFromPoints( points );
                const line = new THREE.Line( geometry, material );
      //  if (x == 500)
        //        x = 0;
               i++;
        scene.add( line );

        }
 
}
main();
