/**
 * contact.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

// Option 2: Import just the parts you need.
import { Scene, WebGLRenderer, Mesh, OrthographicCamera, Euler, PCFShadowMap } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import SplineLoader from '@splinetool/loader';

// camera
const camera = new OrthographicCamera(
	window.innerWidth / -2,
	window.innerWidth / 2,
	window.innerHeight / 2,
	window.innerHeight / -2,
	-100000,
	100000,
);
camera.position.set(130, 490, 980);
camera.quaternion.setFromEuler(new Euler(-0.1, 0.02, 0));

// scene
const scene = new Scene();

// spline scene
const loader = new SplineLoader();
loader.load('https://prod.spline.design/AYdFLnjAQeRhWoo6/scene.splinecode', (splineScene) => {
	scene.add(splineScene);
});

// renderer
const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// scene settings
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFShadowMap;
renderer.setClearAlpha(1);

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.125;
controls.addEventListener('change', (event) => {
	console.log(controls.object.position);
});

window.addEventListener('resize', onWindowResize);

function onWindowResize() {
	camera.left = window.innerWidth / -2;
	camera.right = window.innerWidth / 2;
	camera.top = window.innerHeight / 2;
	camera.bottom = window.innerHeight / -2;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate(time) {
	controls.update();
	renderer.render(scene, camera);
}

// import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader.js";
// import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
// import Stats from "three/examples/jsm/libs/stats.module.js";
// import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
// import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader.js";
//
// const scene = new Scene()
// scene.add(new AxesHelper(5))
//
//
// const light = new PointLight()
// light.position.set(0.8, 1.4, 1.0)
// scene.add(light)
//
// // const ambientLight = new AmbientLight()
// // scene.add(ambientLight)
//
// const camera = new PerspectiveCamera(
// 	75,
// 	window.innerWidth / window.innerHeight,
// 	0.1,
// 	1000
// )
// camera.position.set(1.1, 0.9, 7)
// camera.zoom = 0.01;
//
// const renderer = new WebGLRenderer()
// renderer.setSize(window.innerWidth, window.innerHeight)
// renderer.setPixelRatio(window.devicePixelRatio);
// document.body.appendChild(renderer.domElement)
//
// const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true
// controls.target.set(0, 1, 0)
// controls.addEventListener( "change", event => {
// 	console.log( controls.object.position );
// })
//
// const draco = new DRACOLoader()
// draco.setDecoderPath('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/');
//
// const fbxLoader = new GLTFLoader()
// fbxLoader.setDRACOLoader(draco);
//
// fbxLoader.load(
// 	'/3d/test.gltf',
// 	(object) => {
// 		console.log(object);
// 		scene.add(object.scene);
// 	},
// 	(xhr) => {
// 		console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
// 	},
// 	(error) => {
// 		console.log(error)
// 	}
// )
//
// window.addEventListener('resize', onWindowResize, false)
// function onWindowResize() {
// 	camera.aspect = window.innerWidth / window.innerHeight
// 	camera.updateProjectionMatrix()
// 	renderer.setSize(window.innerWidth, window.innerHeight)
// 	render()
// }
//
// const stats = Stats()
// document.body.appendChild(stats.dom)
//
// function animate() {
// 	requestAnimationFrame(animate)
// 	controls.update()
// 	render()
// 	stats.update()
// }
//
// function render() {
// 	renderer.render(scene, camera)
// }
//
// animate()
