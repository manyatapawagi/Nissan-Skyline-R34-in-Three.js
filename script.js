//Model downloaded from https://sketchfab.com/3d-models/2002-nissan-skyline-r34-gt-r-bb7b67852aee412eacc9c97270886a50

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let loaderAnim = document.querySelector('#js-loader');
let loaderBar = document.querySelector('#loader');

let AnimationList = document.querySelector('#select');

let center = [];
let tyres = [];
let spokes = [];
let headlight = [];
let model;

var wheelBtn = document.querySelectorAll('.option')[0];
var headlightBtn = document.querySelectorAll('.option')[1];

// console.log(wheelBtn); // Does this log the correct button element?


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
scene.add(camera);

const controls = new OrbitControls(camera, renderer.domElement);
controls.minPolarAngle = Math.PI * 0.55;

let ambilight = new THREE.AmbientLight(0xffffff, 2);
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

const OBJECTS = [];

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// uncomment to find the name of a clicked part of the car
// function onMouseClick(event) {
// Convert mouse position to normalized device coordinates (-1 to +1)
// mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
// mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

// Set raycaster from camera and mouse position
// raycaster.setFromCamera(mouse, camera);

// Check for intersections
// const intersects = raycaster.intersectObjects(scene.children, true); // 'true' to include child meshes
// if (intersects.length > 0) {
//     const selectedPart = intersects[0].object;
    // console.log(intersects[0].point); //Get mouse coordinates

// selectedPart.material.color.set(0xff0000); // Highlight part
// console.log(selectedPart.name); //Get part name
// }
// }

// window.addEventListener('click', onMouseClick);

loader.load(MODEL_PATH, function (gltf) {
    model = gltf.scene;
    model.rotation.x = Math.PI;
    camera.lookAt(model.position);
    model.traverse(o => {//allows you to use all components in the model
        if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
            OBJECTS.push(o);
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

        //add all spoke meshes in the 'headlight' array
        if (o.name === "r1Kit0_Light_Geo_lodA_Kit0_Light_Geo_lodA_Nissan_SkylineGTRR34TNR0_2002LightA_Material_r1Nissan_SkylineGTRR34TNR0_2002LightA_Material1_0") {
            headlight.push(o);
        }
    });

    model.scale.set(5000, 5000, 5000);
    model.position.y = -5;

    function showScene() {
        scene.add(model);
        loaderAnim.remove();
        AnimationList.style.display = "block";
        animate();
    }
    setTimeout(showScene, 8000);

}, function (gltf) {
    let loaded_percentage = Math.floor(gltf.loaded / gltf.total * 100);

    if (loaded_percentage > 100) {
        loaderBar.style.width = "400px";
    }
    else {
        loaderBar.style.width = (loaded_percentage / 100 * 400) + "px";
    }

}, function (error) { console.log(error) });

//Adding 2 directional lights to through enough light on both sides of the car model
let d = 200;
let dirLight1 = new THREE.DirectionalLight(0xffffff, 3);
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

//create a floor to cast shadow of the car model
let floorGeometry = new THREE.PlaneGeometry(5000, 5000, 10, 1);
let floorMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x000000,
    metalness: 0.6,
    roughness: 0.8
});

let floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = 0.5 * Math.PI;
floor.receiveShadow = true;
floor.position.y = -5;
scene.add(floor);

function moveWheels() {
    const allParts = [spokes, tyres, center];

    allParts.forEach(partsArray => {
        if (partsArray) {
            partsArray.forEach(part => {
                if (part) part.rotation.x += 0.25;
            });
        }
    });

    requestAnimationFrame(moveWheels);
}

function openHeadlight() {
    const pointLight1 = new THREE.PointLight(0xffffff, 500, 0, 1.1);
    pointLight1.position.set(-30, -36, -105);
    scene.add(pointLight1);

    var bulbGeometry = new THREE.SphereGeometry(2, 32, 32);

    var bulbMat = new THREE.MeshStandardMaterial({
        emissive: 0xffffee,
        emissiveIntensity: 1,
        color: 0xffffee,
        roughness: 1
    });

    var bulb = new THREE.Mesh(bulbGeometry, bulbMat);
    bulb.receiveShadow = true;

    pointLight1.add(bulb);

    pointLight1.shadow.mapSize.width = 1000; // default
    pointLight1.shadow.mapSize.height = 1000; // default
    pointLight1.shadow.camera.near = 0.5; // default
    pointLight1.shadow.camera.far = 500;

    var d = 100;

    pointLight1.shadow.camera.left = -d;
    pointLight1.shadow.camera.right = d;
    pointLight1.shadow.camera.top = 0;
    pointLight1.shadow.camera.bottom = d;

    pointLight1.shadow.camera.far = 200;

    const pointLight2 = pointLight1.clone();
    pointLight2.position.set(30, -36, -105);
    scene.add(pointLight2);

    headlight.forEach(part => {
        part.material = new THREE.MeshStandardMaterial({
            emissive: 0xffffff,
            emissiveIntensity: 5,
            transparent: true,
            opacity: 0.8
        });
    });
};

//Handling click on buttons
$("#btn").click(function () {
    $("#options").toggle();
});

$(wheelBtn).click(moveWheels);
$(headlightBtn).click(openHeadlight);

function animate() {

    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    controls.update();

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
