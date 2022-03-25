import { Store, events } from '../store'
import { sel } from '../utils'
import * as THREE from 'three'

export default class ResourceManager {
	constructor(sources) {
		this.experience = experience
		this.sources = sources

		this.items = {}
		this.toLoad = this.sources.length
		this.loaded = 0

		this.loadingBar = sel('.loader')
		this.canvas = this.experience.canvas

		this.manager = new THREE.LoadingManager(this.onComplete.bind(this), this.onProgress.bind(this))

		this.setLoaders()
		this.loadSources()
	}

	onComplete() {
		Store.emit(events.assetsReady)
	}

	onProgress(item, loading, loaded) {
		Store.emit(events.assetsProgress, {
			item,
			loading,
			loaded
		})
	}

	setLoaders() {
		this.loaders = {}
		this.loaders.Texture = new THREE.TextureLoader(this.manager)
	}

	loadSources() {
		for (const source of this.sources) {
			this.loaders[source.loader].load(source.path, (file) => {
				this.items[source.name] = file
			})
		}
	}
}