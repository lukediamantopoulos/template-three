// Some helpers for us to use

const sel = id => {
    const items = [...document.querySelectorAll(id)];
    if (items.length == 0) {
        return null;
    } else if (items > 1) {
        return items;
    } else {
        return items[0];
    }
}


export {
    sel
}