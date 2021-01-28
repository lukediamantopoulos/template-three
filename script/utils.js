// Some helpers for us to use

export default (() => ({
    sel: id => {
        const items = [...document.querySelectorAll(id)];
        if (items.length <= 1) {
            return items[0];
        } else if (items > 1) {
            return items;
        } 
    }
}))();