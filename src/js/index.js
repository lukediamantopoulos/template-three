
import '../css/index.scss'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { sel } from './utils'
import sources from './assets/_sources'

import { Store, events } from './store'
import { Settings, ResourceManager, LoadingAnimation } from './components'

import vertex from './shaders/_vertex.glsl'
import fragment from './shaders/_fragment.glsl'

class Experience {

    constructor(element) {

		this.canvas = element
		this.scene = new THREE.Scene()

        window.experience = this

		this.screen = {
            w: this.canvas.offsetWidth,
            h: this.canvas.offsetHeight
		}

        this.resources = new ResourceManager(sources)
        this.loadingAnimation = new LoadingAnimation()

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

        this.settings = new Settings()

        this.textures = []

        this.canvas.appendChild(this.renderer.domElement)

        this.events()
	}

    init(callbacks) {
        callbacks.forEach(cb => cb.call(this))
    }

    playground() {
        this.torus = {}
        this.torus.texture = this.resources.items.welcome
        this.torus.texture.minFilter = THREE.NearestFilter

		this.torus.geometry = new THREE.TorusGeometry(3, 1, 100, 100)

		this.torus.material = new THREE.ShaderMaterial({
			uniforms: {
				uTexture: { value: this.torus.texture },
				uTime: { type: 'f', value: 1.0 },
			},
			transparent: true,
			vertexShader: vertex,
			fragmentShader: fragment,
		})

		this.torus.mesh = new THREE.Mesh(this.torus.geometry, this.torus.material)
        this.torus.mesh.name = 'Welcome Torus'
		this.scene.add(this.torus.mesh)
    }

    events() {
        window.addEventListener('resize', () => {
            Store.emit(events.resize, {
				w: this.canvas.offsetWidth,
				h: this.canvas.offsetHeight,
			})
        })

        Store.subscribe(events.resize, this.resize.bind(this))
        Store.subscribe(events.assetsReady, () => {
            console.log('RECIEVING FINISHED')
            this.init([
                this.playground, 
                this.render
            ])
        })
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
        this.torus.material.uniforms.uTime.value = time
    }

    render() {
        requestAnimationFrame(this.render.bind(this))
        this.controls.update()
        this.update.call(this)
        this.renderer.render(this.scene, this.camera)
    }

}

window.addEventListener('load', () => new Experience(sel('#gl-container')))