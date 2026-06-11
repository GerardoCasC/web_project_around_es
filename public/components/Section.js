export class Section {
    constructor({ items, renderer }, containerSelector) {
        this.renderedItems = items;
        this.renderer = renderer;
        this.container = document.querySelector(containerSelector);
    }
    clear() {
        this.container.innerHTML = "";
    }
    renderItems() {
        this.clear();
        this.renderedItems.forEach((item) => {
            this.renderer(item);
        });
    }
    addItem(element) {
        this.container.append(element);
    }
}
