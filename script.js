import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let loaderAnim = document.getElementById('js-loader');
let loaderBar = document.getElementById('loader')

let center = [];
let tyres = [];
let spokes = [];
let model;

const canvas = document.querySelector('#c');
const backgroundColor = 0x212121;

let scene = new THREE.Scene();
scene.background = new THREE.Color(backgroundColor);

let renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
renderer.setPixelRatio(window.devicePixelRatio);//to maintain quality
document.body.appendChild(renderer.domElement);

let camera = new THREE.PerspectiveCamera(
    300,
    window.innerWidth / window.innerHeight,
    1,
    1000
);
camera.position.set(200, -80, -170);
camera.lookAt(10, 50, 10);

const controls = new OrbitControls(camera, renderer.domElement);
controls.minPolarAngle = Math.PI * 0.55;

let ambilight = new THREE.AmbientLight(0xffffff, 4);
scene.add(ambilight);

//resize canvas dimensions when window is resized
function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let canvasPixelWidth = canvas.width / window.devicePixelRatio;
    let canvasPixelHeight = canvas.height / window.devicePixelRatio;

    const needResize =
        canvasPixelWidth !== width || canvasPixelHeight !== height;//checks if window has been resized
    if (needResize) {
        renderer.setSize(width, height, false);//third parameter prevents any style updates in the canvas
    }
    return needResize;
}

const MODEL_PATH = './model.glb'; //the gltf model
var loader = new GLTFLoader();

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

//uncomment to find the name of a clicked part of the car
// function onMouseClick(event) {
//     // Convert mouse position to normalized device coordinates (-1 to +1)
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//     // Set raycaster from camera and mouse position
//     raycaster.setFromCamera(mouse, camera);

//     // Check for intersections
//     const intersects = raycaster.intersectObjects(scene.children, true); // 'true' to include child meshes
//     if (intersects.length > 0) {
//         const selectedPart = intersects[0].object;
//         selectedPart.material.color.set(0xff0000); // Highlight part
//         // selectedPart.rotation.x = 0.75;
//         console.log(selectedPart);
//         console.log(selectedPart.name);
//     }
// }

//window.addEventListener('click', onMouseClick);

loader.load(MODEL_PATH, function (gltf) {
    model = gltf.scene;
    model.rotation.x = Math.PI;
    model.traverse(o => {//allows you to use all components in the model
        if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
        }

        //add all tyre meshes in the 'tyres' array
        if (o.name === "polySurface107_w_TNRRims_87A18NaTireBlur_Material1_0") {
            tyres.push(o);
        }
        if (o.name === "polySurface123_w_TNRRims_87A18NaTireBlur_Material1_0") {
            tyres.push(o);
        }
        if (o.name === "polySurface115_w_TNRRims_87A18NaTireBlur_Material1_0") {
            tyres.push(o);
        }
        if (o.name === "polySurface131_w_TNRRims_87A18NaTireBlur_Material1_0") {
            tyres.push(o);
        }

        //add all center cap meshes in the 'center' array
        if (o.name === "polySurface300_w_TNRRims_87A18NaTNR_Rim87A_Material1_0") {
            center.push(o);
        }
        if (o.name === "polySurface392_w_TNRRims_87A18NaTNR_Rim87A_Material1_0") {
            center.push(o);
        }
        if (o.name === "polySurface347_w_TNRRims_87A18NaTNR_Rim87A_Material1_0") {
            center.push(o);
        }
        if (o.name === "polySurface439_w_TNRRims_87A18NaTNR_Rim87A_Material1_0") {
            center.push(o);
        }

        //add all spoke meshes in the 'spokes' array
        if (o.name === "polySurface318_w_TNRRims_87A18NaTNR_Rim87A_Material1_0") {
            spokes.push(o);
        }
        if (o.name === "polySurface301_w_TNRRims_87A18NaTNR_Rim87A_Material1_0") {
            spokes.push(o);
        }
        if (o.name === "polySurface414_w_TNRRims_87A18NaTNR_Rim87A_Material1_0") {
            spokes.push(o);
        }
        if (o.name === "polySurface412_w_TNRRims_87A18NaTNR_Rim87A_Material1_0") {
            spokes.push(o);
        }
        if (o.name === "polySurface365_w_TNRRims_87A18NaTNR_Rim87A_Material1_0") {
            spokes.push(o);
        }
        if (o.name === "polySurface348_w_TNRRims_87A18NaTNR_Rim87A_Material1_0") {
            spokes.push(o);
        }
        if (o.name === "polySurface461_w_TNRRims_87A18NaTNR_Rim87A_Material1_0") {
            spokes.push(o);
        }
        if (o.name === "polySurface459_w_TNRRims_87A18NaTNR_Rim87A_Material1_0") {
            spokes.push(o);
        }
    });

    model.scale.set(5000, 5000, 5000);
    model.position.y = -5;

    

    function showScene() {
        scene.add(model);
        loaderAnim.remove();
        animate();
    }
    setTimeout(showScene, 8000);

}, function (gltf) {
    let loaded_percentage = Math.floor(gltf.loaded / gltf.total * 100);
    console.log(loaded_percentage);
    // for (let a = 0; a <= loaded_percentage.length; a++) {
    loaderBar.style.width = ((loaded_percentage / 100) * 400) + "px";
    // console.log(loaded_percentage[a]);
    // }
    // 

}, function (error) { console.log(error) });

let d = 200;
let dirLight1 = new THREE.DirectionalLight(0xffffff, 5);
dirLight1.position.set(-80, -160, 80);
const targetObject = new THREE.Object3D();
targetObject.position.set(0, -10, 0);
scene.add(model);
dirLight1.target = targetObject;

dirLight1.castShadow = true;
dirLight1.shadow.mapSize = new THREE.Vector2(1024, 1024);
dirLight1.shadow.radius = 1.5;
dirLight1.shadow.camera.near = 10;
dirLight1.shadow.camera.far = 250;
dirLight1.shadow.camera.left = d;
dirLight1.shadow.camera.right = -d;
dirLight1.shadow.camera.top = d;
dirLight1.shadow.camera.bottom = -d;
scene.add(dirLight1);

const dirLight2 = dirLight1.clone();
dirLight2.position.set(80, -160, 120);
scene.add(dirLight2)

//create a floor to cast shadow
let floorGeometry = new THREE.PlaneGeometry(5000, 5000, 10, 1);
let floorMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x000000,
    metalness: 0.5,
    roughness: 0.4
});

let floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = 0.5 * Math.PI;
floor.receiveShadow = true;
floor.position.y = -5;
scene.add(floor);

function animate() {

    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    controls.update()

    for (let i = 0; i < spokes.length; i++) {
        if (spokes[i]) spokes[i].rotation.x += 0.3;
    }
    center
    for (let x = 0; x < tyres.length; x++) {
        if (tyres[x]) tyres[x].rotation.x += 0.3;
    }

    for (let y = 0; y < center.length; y++) {
        if (center[y]) center[y].rotation.x += 0.3
    }

    console.log(loaderBar.style.width);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
