import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

function main()
{
        const canvas = document.querySelector('#c');
        const scene = new THREE.Scene();
        const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
        renderer.setSize(innerWidth, innerHeight);
        const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.001, 10000);

        renderer.render(scene, camera);

        camera.position.z = 2;
        
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
        let x = 0;
        let i = 0;
        controls.autoRotate = false;
        controls.autoRotateSpeed = 4;
        controls.maxDistance = 3;

        addEventListener('scroll', animate);

        window.addEventListener('wheel', () => {
                //console.log(window.scrollY);
                if (x < 150){
                        x += .06;
                        console.log(x);
                        renderer.render(scene, camera);
        
                                points.push( new THREE.Vector3( Math.sin(x/10)*.1, 
                                Math.cos(x/10), Math.sin(x)*0.1));
                                light1.position.set( points );
                       
                       
                                controls.autoRotate = true;
                    
                                const geometry = new THREE.BufferGeometry().setFromPoints( points );
                                const line = new THREE.Line( geometry, material );

                                scene.add( line );
                                controls.update();
                        }
                else{
                        controls.autoRotate = true;
                }
            }, true);

        window.addEventListener('touchmove', function() { //touchmove works for iOS, I don't know if Android supports it
                window.dispatchEvent( new Event('wheel') );
              });

        function animate()
        {
                requestAnimationFrame(animate);
                renderer.render(scene, camera);
                controls.autoRotate = false;
                controls.update();/*
               if (x < 100){
                x += 0.1 + Math.random(x);
                points.push( new THREE.Vector3( Math.sin(x/10)*.1, Math.cos(x/10), Math.sin(x)*0.1));
               light1.position.set( points );
               
               }
            
                const geometry = new THREE.BufferGeometry().setFromPoints( points );
                const line = new THREE.Line( geometry, material );
        if (x == 500)
                x = 0;
        if (i == 500){
        controls.autoRotate = false;
        }
               i++;
        scene.add( line );
*/
        }
        animate();
}
main();
