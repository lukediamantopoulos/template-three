import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import utils from './utils';

import vertex from './shaders/vertex.glsl';
import fragment from './shaders/fragment.glsl';

import img from '../assets/type.png';

function initialize() {
    
    const Sketch = ( element => {

        let scene, camera, renderer, gl_container, screen, controls, clock;
        let material, geometry, mesh;

        const init = element => {
            
            // Element
            gl_container = utils.sel(element);

            // screen
            screen = {
                w: gl_container.offsetWidth,
                h: gl_container.offsetHeight
            }

            // Scene
            scene = new THREE.Scene();
            scene.fog = new THREE.Fog('0xffffff',0, 10);

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
                70,
                gl_container.offsetWidth / gl_container.offsetHeight,
                0.001,
                1000
            )
            camera.position.set(0, 0, 8);

            // Clock
            clock = new THREE.Clock();

            // Controls
            controls = new OrbitControls(camera, renderer.domElement);
            controls.update();

            gl_container.appendChild(renderer.domElement);

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
            screen.w = gl_container.offsetWidth;
            screen.h = gl_container.offsetHeight;
            renderer.setSize(screen.w, screen.h);
            camera.aspect = screen.w / screen.h;
            camera.updateProjectionMatrix();
        }
        
        const update = () => {
            let time = clock.getElapsedTime();
            material.uniforms.uTime.value = time;
            camera.position.set(0, 0, Math.sin(time) + 8);
        }

        const render = () => {
            requestAnimationFrame( render );
            update();
            controls.update();
            renderer.render( scene, camera )
        }


        const addListeners = () => {
            window.addEventListener('resize', resize);
        }
        
        return {
            init
        }
    })();

    Sketch.init('#gl-container');

}




window.addEventListener('load', initialize)