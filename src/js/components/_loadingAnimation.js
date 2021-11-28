import { Store, events } from "../store"
import { sel } from "../utils"

export default class LoadingAnimation {
	constructor() {
		this.experience = experience

		this.loadingBar = sel('.loader')
		this.canvas = this.experience.canvas
        console.log('INITING LOADING ANIMATION')
		this.events()
	}

	events() {
		Store.subscribe(events.assetsProgress, this.onProgress.bind(this))
        Store.subscribe(events.assetsReady, this.onReady.bind(this))
	}

    onProgress(data) {
        const { loading, loaded } = data.payload
        console.log( loading, loaded)
        this.progress = loading / loaded
		this.loadingBar.style.transform = `scaleX(${this.progress})`
    }

    onReady(data) {
        console.log(data)
        setTimeout(() => {
			this.canvas.classList.remove("hidden")
			this.loadingBar.classList.add("hidden")
			this.loadingBar.style.transform = ""
		}, 500)
    }
}

