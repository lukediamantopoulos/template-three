
const sel = (selector) => {
	const items = [...document.querySelectorAll(selector)]
	if (items.length == 0) {
		return null
	} else if (items > 1) {
		return items
	} else {
		return items[0]
	}
}

export { sel }
