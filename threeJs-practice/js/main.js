// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Create a Three.JS Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 25;

let mouseX = 0, mouseY = 0;
let object;

// Load ghost model
const loader = new GLTFLoader();
loader.load(
  `./models/ghost/scene.gltf`,
  function (gltf) {
    object = gltf.scene;
    object.scale.set(4, 4, 4);
    scene.add(object);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(500, 500, 500);
scene.add(light);

scene.add(new THREE.AmbientLight(0x333333, 5));

// Update mouse position
document.addEventListener("mousemove", (event) => {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
  requestAnimationFrame(animate);

  if (object) {
    const targetY = mouseX * Math.PI * 0.2; // Rotate left/right
    const targetX = mouseY * Math.PI * 0.1; // Rotate up/down

    object.rotation.y += (targetY - object.rotation.y) * 0.3; // Smooth transition
    object.rotation.x += (targetX - object.rotation.x) * 0.3;
  }

  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

document.addEventListener("mousemove", (e) => {
    const spotlight = document.getElementById("spotlight");
    spotlight.style.setProperty("--x", `${e.clientX}px`);
    spotlight.style.setProperty("--y", `${e.clientY}px`);
});


animate();


