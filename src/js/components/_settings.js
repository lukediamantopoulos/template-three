import * as dat from "lil-gui"
import Stats from "three/examples/jsm/libs/stats.module.js"

export default class Settings {
	constructor() {
		this.experience = experience

		if (this.experience.debug) {
			this.gui = new dat.GUI()
			this.stats = new Stats()
			this.experience.canvas.appendChild(this.stats.dom)

			this.addSettings()
		}
	}

	addSettings() {
		this.gui.add(this.experience.camera.position, "z").min(0).max(20).step(0.05)
	}
}
