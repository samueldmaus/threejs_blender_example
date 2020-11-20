
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

let renderer, camera, controls, scene, loader, model
let canvas = document.getElementById('canvas')
console.log('gg')

init()
animate()
render()
loadModel()


function init() {
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
    })

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth/2, window.innerHeight/2);
    renderer.outputEncoding = THREE.sRGBEncoding

    camera = new THREE.PerspectiveCamera(
        70, window.innerWidth/window.innerHeight, 1, 1000
    );
    camera.position.set(0, 5, 0)

    controls = new OrbitControls(camera, canvas);
    controls.addEventListener('change', render);
    controls.enabled = true;

    scene = new THREE.Scene();
    scene.background = new THREE.Color('skyblue')

    const light1 = new THREE.AmbientLight(0xFFFFFF, 1);
    const light2 = new THREE.DirectionalLight(0xFFFFFF);
    light2.position.set(0, 15, -15)

    scene.add(light1);
    scene.add(light2)

    window.addEventListener('resize', onWindowsResize, false)
}

function animate(){
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
    if(model){
        model.rotation.z += 0.005;
    }
}

function render(){
    renderer.render(scene, camera)
}

function onWindowsResize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth/2, window.innerHeight/2)
}

function loadModel(){
    loader = new GLTFLoader();
    loader.load('wonsulting.glb', (gltf) => {
        model = gltf.scene;
        model.position.z = .5
        scene.add(model)
    },
    function(xhr){
        console.log( (xhr.loaded/xhr.total * 100) + '% loaded');
    },
    function(error) {
        console.log('error has happened')
    }
    )
}
