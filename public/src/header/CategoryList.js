import Toggler from "../components/Toggler.js";

export default class CategoryList extends Toggler {
    constructor(categories = [], toggleKey = 'hidden') {
        super(null, toggleKey);
        this.categories = categories;
    }

    createHTML() {
        return /* html */ `
            <ul class="search__category--list hidden">
            ${this.categories.reduce((text, category) => text += `<li class="search__category--item">${category.name}</li>`, '')}
            </ul>
        `
    }

    setClickEvent(handleFunc) {
        this.$target.addEventListener('click', handleFunc);
    }
}