import * as dat from "lil-gui"

export default class Settings {
	constructor() {
        this.active = window.location.hash === "#debug"

		if (this.active) {
            this.gui = new dat.GUI()
            this.experience = experience

			this.addSettings()
		}
	}

	addSettings() {
		this.gui.add(this.experience.camera.position, "z").min(0).max(20).step(0.05)
	}
}
