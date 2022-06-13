import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';


function main()
{
    
    ////             ////
    //// FHELLO WORLD ////
    ////             ////

    const canvas = document.querySelector('#c');
    const scene = new THREE.Scene();
    {
      const color = 0xFF0000;
      const density = 0.0002;
      scene.fog = new THREE.FogExp2(color, density);
    }
    const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
    const camera = new THREE.PerspectiveCamera(55, innerWidth/innerHeight, 0.1, 10000);
    renderer.setSize(innerWidth, innerHeight);
    //const controls = new OrbitControls( camera, renderer.domElement );
    const song1_texture = new THREE.TextureLoader().load( 'assets/imgs/swirltexture.jpeg' )
    let song2_texture;
    const MODEL_PATH = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/stacy_lightweight.glb';
    let stacy_txt = new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/stacy.jpg');
    stacy_txt.flipY = false;
    const stacy_mtl = new THREE.MeshPhongMaterial({
        map: stacy_txt,
        color: 0xffffff,
        skinning: true
      });

    let model;
    let apple_model;
    let orange_model;

    
    let loader = new THREE.GLTFLoader();
    loader.load(
        MODEL_PATH,
        function(gltf) {
        // A lot is going to happen here
          model = gltf.scene;
          let fileAnimations = gltf.animations;
      
          model.scale.set(10, 10, 10);
          model.rotation.y = Math.PI;
          model.position.y -= 20;
          model.traverse(o => {
            if (o.isMesh) {
              o.castShadow = true;
              o.receiveShadow = true;
              o.material = stacy_mtl;
            }
          });

          //scene.add(model);
          
        },
        undefined, // We don't need this function
        function(error) {
          console.error(error);
        }
      );

      let apple_loader = new THREE.GLTFLoader();
      apple_loader.load(
          '/assets/GLTF/PUMPKIN.glb',
          function(gltf) {
          apple_model = gltf.scene;
          //apple_model.scale.set(3, 3, 3);
            //model.rotation.y = Math.PI;
            console.log(apple_model);
            apple_model.position.y -= 10;
            apple_model.material = song1_texture;
            apple_model.traverse(o => {
              if (o.isMesh) {
                o.castShadow = true;
                o.receiveShadow = true;
                //o.material = song2_texture;
               // o.material = stacy_mtl;
              }
            });
  
            scene.add(apple_model);
            
          },
          undefined, // We don't need this function
          function(error) {
            console.error(error);
          }
        );

      let orange_loader = new THREE.GLTFLoader();
      orange_loader.load(
          '/assets/GLTF/APPLE.glb',
          function(gltf) {
            orange_model = gltf.scene;
            orange_model.scale.set(2, 2, 2);
            //model.rotation.y = Math.PI;
          
            orange_model.position.set(-100, -10, 0);
          //  orange_model.material = song1_texture;
            orange_model.traverse(o => {
              if (o.isMesh) {
                o.castShadow = true;
                o.receiveShadow = true;
                //o.material = song2_texture;
               // o.material = stacy_mtl;
              }
            });
  
            scene.add(orange_model);
            
          },
          undefined, // We don't need this function
          function(error) {
            console.error(error);
          }
        );
    


    camera.position.z = -40;
    camera.position.y = 15;

    let xhr = {};
    let xhr2 = {};
    let name = [];
    let posts = [];
    let values = [];
    
    

    // FUNCS
    async function load(url1, count) {
 //   let url = 'https://www.reddit.com/r/frankocean/.json';
    let obj1 = await (await fetch(url1)).json();
    console.log(obj1);
    //console.log(obj[0].data.children[0].data.thumbnail);
    //name_elem = document.getElementById("NAME");  
 //   name = obj[0].data.children[0].data.author
    let y = 0;
    while (y < obj1.data.children.length)
    {
        //console.log(obj.data.children[x].data.author);
        console.log(count);

        name[y] = obj1.data.children[y].data.title;
        values[y] = obj1.data.children[y].data.score;

        y++;
        
    }
    
    //song2_texture = new THREE.TextureLoader().load( path );
    return obj1;
} 

    const SUBREDDIT = ["science", "romance", "lol", "softsex"];
    let url_count = 0;
    while (url_count < SUBREDDIT.length){
        xhr = load(`https://www.reddit.com/r/${SUBREDDIT[url_count]}/.json`, url_count);    
        url_count++;
    }
    //xhr = load(`https://www.reddit.com/r/${SUBREDDIT[url_count]}/.json`);
    //xhr = load('https://www.reddit.com/user/coolconrad/.json');
 //   xhr = load2('https://www.reddit.com/user/coolconrad/.json');

    console.log(xhr);

    // GEO
    const torus_geo_1 = new THREE.TorusGeometry(20/4, 5/4, 100/1, 100);
    const room_geo_1 = new THREE.BoxGeometry(1800, 1000, 1800, 20, 10);

    // MAT
    let torus_mat_1 = new THREE.MeshPhysicalMaterial({color: 0x99FFDD, transmission: 1, roughness: 0, thickness: 1});
    let torus_mat_2 = new THREE.MeshPhysicalMaterial({color: 0xFF99DD, transmission: 0, roughness: 0});
    const room_mat_1 = new THREE.MeshPhysicalMaterial({color: 0xFFAAAA, roughness: 1, transmission: .7, wireframe: false, wireframeLinejoin: "miter"});

    torus_mat_1.bumpMap = song1_texture;
    torus_mat_2.bumpMap = song1_texture;
    torus_mat_1.bumpScale = .1
    room_mat_1.side = THREE.DoubleSide;
    
    // MESH
    let torus_1 = new THREE.Mesh(torus_geo_1, torus_mat_1);
    let torus_2 = new THREE.Mesh(torus_geo_1, torus_mat_2);
    let room_1 = new THREE.Mesh(room_geo_1, room_mat_1);

    // LIGHTS
    let ambient_light_1 = new THREE.AmbientLight(0xFFFFFF, .5, 1000);
    ambient_light_1.position.set(101, 101, 102);
    let point_light_1 = new THREE.PointLight(0xFFFFFF, 2, 1000);
    point_light_1.position.set(90, 30, -40);
    let point_light_2 = new THREE.PointLight(0xFFFFFF, 1, 1000);
    point_light_2.position.set(-90, 30, -40);
  //  envMap: hdrEquirect

    // SCENE_ADD
   // scene.add(torus_1);
    //scene.add(torus_2);
    torus_2.position.x = -80;
    torus_2.position.y = 0;
    scene.add(ambient_light_1);
    scene.add(point_light_1);
    scene.add(point_light_2);
    scene.add(room_1);
    console.log(scene);

    camera.lookAt(torus_1.position);
    let name_count = 0;
    let frame = 0;
    function animate()
    {
        document.getElementById("NAME").innerHTML = "- " + name[name_count];
    //    controls.update();
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        frame++;
        if (frame % 200 == 0){
            name_count++;
            //camera.lookAt(torus_2.position);
            if (name_count % 2 == 0) {
                torus_1.rotation.y = Math.PI * .4;
                camera.position.x = torus_1.position.x;
                camera.lookAt(torus_1.position);
                
            }
            else {
                torus_2.rotation.y = Math.PI * .4;
                camera.position.x = orange_model.position.x;
                camera.lookAt(orange_model.position.x, torus_1.position.y, orange_model.position.z );
                
            }

        //    torus_1.scale.y += name_count / 5;
        //    torus_1.scale.x += name_count / 5;
        }
        if (name_count == name.length - 1){
            name_count = 0; 
        }
        console.log("values[frame]: " + values[name_count]);
        //apple_model.rotation.y += values[name_count]/100 * Math.sin(values[name_count]/1000);
        torus_1.rotation.y += 0.007;
        torus_2.rotation.y += 0.007;
        apple_model.rotation.y += Math.random(101) * .002;
        orange_model.rotation.y += Math.random(101) * .002;
        
    }
    animate();
  }
  main();