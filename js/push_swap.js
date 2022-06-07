import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

function main()
{
    const canvas = document.querySelector('#c');
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
    renderer.setSize(innerWidth, innerHeight);
    const camera = new THREE.PerspectiveCamera(75, innerWidth/1.5/innerHeight, 0.001, 1000000);
    let   domEvents	= new THREEx.DomEvents(camera, renderer.domElement);
    let x = 0;
    let y = 0;
    let time = 0;
    let instr_num = 0;

    let button = document.getElementById("button");
    let inp_button = document.getElementById("instructions");
    let pa_button = document.getElementById("pa");
    let pb_button = document.getElementById("pb");
    let ra_button = document.getElementById("ra");
    let rb_button = document.getElementById("rb");
    let rra_button = document.getElementById("rra");
    let rrb_button = document.getElementById("rrb");
    let rr_button = document.getElementById("rr");
    let rrr_button = document.getElementById("rrr");
    let sa_button = document.getElementById("sa");
    let sb_button = document.getElementById("sb");
    let ss_button = document.getElementById("ss");
    let play_button = document.getElementById("play");
    

    pa_button.style.display = "none";
    inp_button.style.display = "none";
    pb_button.style.display = "none";
    ra_button.style.display = "none";
    rb_button.style.display = "none";
    rra_button.style.display = "none";
    rrb_button.style.display = "none";
    rr_button.style.display = "none";
    rrr_button.style.display = "none";
    sa_button.style.display = "none";
    sb_button.style.display = "none";
    ss_button.style.display = "none";
    play_button.style.display = "none";
    document.getElementById("play_buttons").style.display = "none";

    camera.position.z = 20;
    camera.position.y = 10;
    let delay = 300;
//    camera.lookAt(0, 0, 0);
    camera.position.set(0, 10, 30);
    const key_geo1 = new THREE.BoxGeometry(10, 10, 100);
    const room_geo = new THREE.BoxGeometry(300, 200, 300);
    const backdrop_geo = new THREE.PlaneGeometry(1920*2, 1080*2);
    const backdrop_room = new THREE.PlaneGeometry(1920, 300, 2000);

    const boxtexture = new THREE.TextureLoader().load( 'graysilk.jpeg' );
    const bumptexture = new THREE.TextureLoader().load( 'swirltexture.jpeg' );

    const controls = new OrbitControls( camera, renderer.domElement );

    // F_MATERIALS //

    //const backdrop_texture = new THREE.TextureLoader().load('assets/imgs/meta1.png');


    const backdrop_mat = new THREE.MeshPhysicalMaterial({color: 0x888888, roughness: 1, metalness: 0});
    

    // RANDOM NUMS



    
    backdrop_mat.side = THREE.DoubleSide;
  //  backdrop_texture.magFilter = THREE.LinearFilter;
//    backdrop_texture.minFilter = THREE.LinearFilter;

    const room_mat = new THREE.MeshLambertMaterial({color: 0x223333});
    room_mat.side = THREE.BackSide;
    //renderer.setClearColor( 0xffefff, 1);

    // F_MESHES //

    let stack_a = [];
    let stack_b = [];
    const room = new THREE.Mesh(room_geo, room_mat);
    const backdrop = new THREE.Mesh(backdrop_geo, backdrop_mat);



    


    // LIGHTS //
    const ambient_light1 = new THREE.AmbientLight({color: 0xFFFFFF}, .5, 1000);
    const point_light1 = new THREE.PointLight({color: 0xCFFFFF}, 3, 1000);
    const point_light2 = new THREE.PointLight({color: 0xCFFFFF}, 50, 1000);
    
    
    const spot_light3 = new THREE.SpotLight(0xFFAA99FF, 6.5, 1000, 90);
    const spot_light4 = new THREE.SpotLight(0xFFFF0099, .3, 1000, 90);
    point_light1.lookAt(backdrop.position);
    point_light1.position.z = 100;
    point_light1.position.x = 100;
    point_light1.position.y = 500;
    spot_light3.lookAt(backdrop.position);
    spot_light3.position.x = -200;
    spot_light3.position.y = 200;
    spot_light3.position.z = 400;
    spot_light4.position.x = 400;
    spot_light4.position.y = 0;
    spot_light4.position.z = 400;
    room.position.y += 110;
    var z = 0;

   // scene.add(room);
    scene.add(backdrop);
   scene.add(spot_light3);
//  scene.add(ambient_light1);
  // scene.add(point_light1);
  //  scene.add(spot_light4);



    


    // F_POSITIONS //
 
    point_light1.position.y = 30;
    point_light1.position.z = 20;
    point_light2.position.y = -30;
    point_light2.position.z = 20;

    backdrop.position.z = -400;
    backdrop.position.x = 0;
    backdrop.position.y = -300;

  
    let arr = [];
    let num;

    // FUNCTIONS //

    function initialize_stack()
    {
        num = prompt("Num of elements", "9");
        let input_arr = [];
        //console.log("num: " + num);
        y = 0;
        while(input_arr.length < num){
         //   var r = Math.floor(Math.random() * 100 + 1);
            input_arr[y] = y + 1;
            
        //    if(input_arr.indexOf(r) === -1) input_arr.push(r);
        y++;        
        }
        shuffle(input_arr);
        const rev_arr = [...input_arr];
        rev_arr.reverse();
    //    console.log("input_arr.len: " + input_arr.length);
        window.alert("copy these nums for input to your push_swap: " + rev_arr.join(' '));
        
        console.log("STACK SIZE: " + y);
    
        
        y = input_arr.length;
        while (y > (0))
        {
            
        //    console.log(input_arr[y]);
            add_element(input_arr[y - 1] / 10, y);
       //     console.log("stack_a.length in filling loop: " + stack_a.length);
            y--;
            

            //x++;
        }
        }

        window.console = {
            log: function(str){
              var node = document.createElement("div");
              node.appendChild(document.createTextNode(str));
              document.getElementById("myLog").appendChild(node);
            }
          }

        function shuffle(array) {
            let currentIndex = array.length,  randomIndex;
          
            // While there remain elements to shuffle.
            while (currentIndex != 0) {
          
              // Pick a remaining element.
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex--;
          
              // And swap it with the current element.
              [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
            }
          
            return array;
          }

        function input_instructions()
        {
            let nums = prompt("instructions: ", "");
            arr = nums.split("\n");
            arr[arr.length] = 0;
            let pb_str = "pb";
        }

    function add_element(size, position)
    {
        const geo = new THREE.BoxGeometry(size, .2, size);
        const mat = new THREE.MeshLambertMaterial({color: 0xFFFFFFF, wireframe: false, wireframeLinewidth: 15});
        mat.roughness = 1;
        mat.map = bumptexture;
         mat.bumpMap = bumptexture;
        mat.alphaMap = bumptexture;
       //  mat.normalMap = bumptexture;
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(1, position, 1);
        stack_a.push(mesh);
        scene.add(mesh)
    }

    function pa(stack_b, x)
    {
        stack_b[0].position.set(1, stack_a.length + 1, 1);
        stack_a.unshift(stack_b[0])
        stack_b.shift(stack_b[0]);
        iter++;
    }

    function pb(stack_a, x)
    {
        stack_a[0].position.set(num/3, stack_b.length, 0);
        
        stack_b.unshift(stack_a[0])
   //     console.log("stack+a[0]: ", stack_a[0]);
        stack_a.shift(stack_a[0]);
        
        iter2++;
    }

    Array.swapItems = function(a, b){
//        console.log("swapped?\n");
        this[a] = this.splice(b, 1, this[a])[0];
        return this;
    }

    function rot(stack, x)
    {
        let count = stack.length - 1;
        while (count > 0)
        {
            stack[count].position.y += 1;
            count--;
        }
        stack[0].position.y = stack[stack.length - 1].position.y - 1;
        stack.push(stack.shift());
        count = 0;
  //      console.log("len of stack_a: " + stack.length);
     //   iter++;
    }

    function rrot(stack, x)
    {
        let count = 0;
        let roof = stack.length - 1;
        while (count < roof)
        {
            stack[count].position.y -= 1;
            count++;
        }
        stack[stack.length - 1].position.y = stack[0].position.y + 1;
        stack.unshift(stack.pop());
        count = 0;
  //      console.log("len of stack_a: " + stack.length);
     //   iter++;
    }

    function SWAP(stack, x)
    {
        stack[0].position.y -= 1;
        stack[1].position.y += 1;
        [stack[0], stack[1]] = [stack[1], stack[0]];
    //    console.log("kuksug");

    }



    x = 0;
    y = 0;
    let iter = 0;
    let iter2 = 0;

    


    button.addEventListener('click', () => {
        button.style.display = "none";
        inp_button.style.display = "inline";
        play_button.style.display = "inline";
        pa_button.style.display = "inline";
        pb_button.style.display = "inline";
        ra_button.style.display = "inline";
        rb_button.style.display = "inline";
        rra_button.style.display = "inline";
        rrb_button.style.display = "inline";
        rr_button.style.display = "inline";
        rrr_button.style.display = "inline";
        sa_button.style.display = "inline";
        sb_button.style.display = "inline";
        ss_button.style.display = "inline";
        initialize_stack();
        
 } );

    inp_button.addEventListener('click', () => {
        input_instructions();    
    } );

 rr_button.addEventListener('click', () => {
     rot(stack_a, x);
     rot(stack_b, x);
    } );
    rrr_button.addEventListener('click', () => {
        rrot(stack_a, x);
        rrot(stack_b, x);
       } );

    pa_button.addEventListener('click', () => {
        pa(stack_b, x);    
} );
 
    pb_button.addEventListener('click', () => {
        pb(stack_a, x);    
} );

    ra_button.addEventListener('click', () => {
        rot(stack_a, x); } );

    rb_button.addEventListener('click', () => {
        rot(stack_b, x); } );

    rra_button.addEventListener('click', () => {
            rrot(stack_a, x); } );
    
    rrb_button.addEventListener('click', () => {
           rrot(stack_b, x); } );
    
    sa_button.addEventListener('click', () => {
        SWAP(stack_a, x); } );

    sb_button.addEventListener('click', () => {
        SWAP(stack_b, x); } );

    ss_button.addEventListener('click', () => {
        SWAP(stack_a, x);    
        SWAP(stack_b, x); } );

    play_button.addEventListener('click', () => {
        inp_button.style.display = "none";
        play_button.style.display = "none";
        document.getElementById("play_buttons").style.display = "inline";
     } );

    x = 0;

    function animate(){
        requestAnimationFrame(animate);

        renderer.render(scene, camera);
        if (time % .001 > 0)
        {
         //   console.log("arr[x]: " + arr[x]);
         //
         //   console.log("quanto veces");
            if (arr[x] == "pb") {
                pb(stack_a); 
                x++;
                document.getElementById("pstext").innerHTML = "NUM OF INSTRUCTIONS: " + x;
                }
            else if (arr[x] == "pa") {
                pa(stack_b);
                x++;
                document.getElementById("pstext").innerHTML = "NUM OF INSTRUCTIONS: " + x;
                 }
            else if (arr[x] == "ra") {
                rot(stack_a);
                x++;
                document.getElementById("pstext").innerHTML = "NUM OF INSTRUCTIONS: " + x;
                 }
            else if (arr[x] == "rb") {
                rot(stack_b);
                x++;
                document.getElementById("pstext").innerHTML = "NUM OF INSTRUCTIONS: " + x;
                 }
            else if (arr[x] == "rra") {
                
                rrot(stack_a);
                x++;
                document.getElementById("pstext").innerHTML = "NUM OF INSTRUCTIONS: " + x; }
            else if (arr[x] == "rrb") {
                document.getElementById("pstext").innerHTML = "NUM OF INSTRUCTIONS: " + x;
                x++;
                rrot(stack_b);}
            else if (arr[x] == "sa") {
                document.getElementById("pstext").innerHTML = "NUM OF INSTRUCTIONS: " + x;
                x++;
                SWAP(stack_a); }
            else if (arr[x] == "sb") {
                SWAP(stack_b);
                x++;
                document.getElementById("pstext").innerHTML = "NUM OF INSTRUCTIONS: " + x;
                 }
            else if (arr[x] == "ss") {
                SWAP(stack_a);
                SWAP(stack_b);
                x++;
                document.getElementById("pstext").innerHTML = "NUM OF INSTRUCTIONS: " + x;
                 }
            else if (arr[x] == "rr") {                
                rot(stack_a, x);
                rot(stack_b, x);
                x++;
                document.getElementById("pstext").innerHTML = "NUM OF INSTRUCTIONS: " + x;
                
            }
            else if (arr[x] == "rrr") {
                    rrot(stack_a, x);
                    rrot(stack_b, x);
                    x++;
                    document.getElementById("pstext").innerHTML = "NUM OF INSTRUCTIONS: " + x;
            //x = 0;  
        }
        
//        if (arr.length > 0)
  //          {x++;}
    }
    
    time += 1;
//*    console.log("time: " + time);*/
}

    animate();

}


main();