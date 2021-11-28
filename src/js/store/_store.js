class Store {
	constructor() {
		this.events = []
	}

	subscribe(event, callback) {
		if (!callback) {
			throw new Error("callback is missing from subscribe: " + event)
		}
		if (!this.events.hasOwnProperty(event)) {
			this.events[event] = []
		}
		return this.events[event].push(callback)
	}

	emit(event, payload = {}) {
		if (!this.events.hasOwnProperty(event)) return
		return this.events[event].map((callback) => callback({event, payload}))
	}

	unSubscribe(event, callback) {
		if (!callback) {
			throw new Error("callback or event is missing from subscribe: " + event)
		}
		if (!this.events.hasOwnProperty(event)) return
		return this.events[event] = this.events[event].filter(fn => fn.name !== callback.name)
	}
}

export default new Store()