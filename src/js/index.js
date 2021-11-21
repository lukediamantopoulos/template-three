// Style
import '../css/index.scss'

// Three
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Store
import { Store, events } from '../js/store'

// Utils
import { sel } from './utils'
import * as dat from 'lil-gui'

// Shaders
import vertex from './shaders/vertex.glsl'
import fragment from './shaders/fragment.glsl'

// Static
import img from '../../static/type.png'

class Experience {

    constructor(element) {
        
		this.canvas = element
		this.scene = new THREE.Scene()

		this.screen = {
            w: this.canvas.offsetWidth,
		    h: this.canvas.offsetHeight
		}

        this.debug = false

        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(this.screen.w, this.screen.h)
        this.renderer.antialias = true
        this.renderer.outputEncoding = THREE.sRGBEncoding

        this.camera = new THREE.PerspectiveCamera(
			70, // field of view
			this.screen.w / this.screen.h, // ratio
			0.001, // near
			1000 // far
		)
		this.camera.position.set(0, 0, 8)

        this.clock = new THREE.Clock()

        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
		this.controls.enableDamping = true
		this.controls.update()

        this.textures = []

        this.canvas.appendChild(this.renderer.domElement)

        this.init([
          
            this.events,
            this.settings,
            this.playground,
            this.render
        ])
	}

    init(callbacks) {
        callbacks.forEach(cb => cb.call(this))
    }

    playground() {
        this.texture = new THREE.TextureLoader().load(img, (texture) => {
			this.texture.minFilter = THREE.NearestFilter
		})
		this.geometry = new THREE.TorusGeometry(3, 1, 100, 100)
		this.material = new THREE.ShaderMaterial({
			uniforms: {
				uTexture: { value: this.texture },
				uTime: { type: "f", value: 1.0 },
			},
			transparent: true,
			vertexShader: vertex,
			fragmentShader: fragment,
		})
		this.mesh = new THREE.Mesh(this.geometry, this.material)
		this.scene.add(this.mesh)
    }

    events() {
        window.addEventListener('resize', () => {
            Store.emit(events.resize, {
				w: this.canvas.offsetWidth,
				h: this.canvas.offsetHeight,
			})
        })

        Store.subscribe(events.resize, this.resize.bind(this))
    }

    settings() {
        if (this.debug === false) return
        this.gui = new dat.GUI()
        this.gui.add(this.camera.position, 'z').min(0).max(20).step(.05)
    }

    resize({ payload }) {

        this.screen.w = payload.w
        this.screen.h = payload.h

        this.renderer.setSize(this.screen.w, this.screen.h)
        this.camera.aspect = this.screen.w / this.screen.h
        this.camera.updateProjectionMatrix()
    }

    update() {
        const time = this.clock.getElapsedTime()
        this.material.uniforms.uTime.value = time
    }

    render() {
        requestAnimationFrame(this.render.bind(this))
        this.controls.update()
        this.update.call(this)
        this.renderer.render(this.scene, this.camera)
    }

}

window.addEventListener("load", () => new Experience(sel("#gl-container")))