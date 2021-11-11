import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { sel } from './utils';

import vertex from './shaders/vertex.glsl';
import fragment from './shaders/fragment.glsl';

import img from '../assets/type.png';
    
const Sketch = ( element => {

    let scene, camera, renderer, canvas, screen, controls, clock;
    let material, geometry, mesh;

    const init = element => {

        canvas = sel(element);

        screen = {
            w: canvas.offsetWidth,
            h: canvas.offsetHeight
        }

        // Scene
        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0xffffff, 0, 10);

        // Renderer
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(screen.w, screen.h);
        renderer.setClearColor(0x000, 1);
        renderer.antialias = true;
        renderer.physicallyCorrectLights = true;
        renderer.outputEncoding = THREE.sRGBEncoding;

        // Camera
        camera = new THREE.PerspectiveCamera(
            70, // field of view
            canvas.offsetWidth / canvas.offsetHeight, // ratio
            0.001, // near
            1000 // far
        )
        camera.position.set(0, 0, 8);

        // Clock
        clock = new THREE.Clock();

        // Controls
        controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
        controls.update();

        canvas.appendChild(renderer.domElement);

        playground();
        addListeners();
        render();
        
    }

    const playground = () => {

        const texture = new THREE.TextureLoader().load(img, (texture) => {
            texture.minFilter = THREE.NearestFilter;
        })
        geometry = new THREE.TorusGeometry(3, 1, 100, 100);
        material = new THREE.ShaderMaterial({
            uniforms: {
                colorA: {type: 'vec3', value: new THREE.Color(0x74ebd5)},
                colorB: {type: 'vec3', value: new THREE.Color(0xACB6E5)},
                uTexture: {value: texture},
                uTime: {type: 'f', value: 1.0},
            },
            // wireframe: true,
            transparent: true,
            vertexShader: vertex,
            fragmentShader: fragment
        });
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
    }

    const resize = () => {
        screen.w = canvas.offsetWidth;
        screen.h = canvas.offsetHeight;
        renderer.setSize(screen.w, screen.h);
        camera.aspect = screen.w / screen.h;
        camera.updateProjectionMatrix();
    }
    
    const update = () => {
        const time = clock.getElapsedTime();
        material.uniforms.uTime.value = time;
    }

    const render = () => {
        requestAnimationFrame( render );
        controls.update();
        update();
        renderer.render( scene, camera )
    }


    const addListeners = () => {
        window.addEventListener('resize', resize);
    }
    
    return {
        init
    }
})();

window.addEventListener("load", () => Sketch.init("#gl-container"));