export default class Toggler {
    constructor($target = null, toggleKey = 'hidden') {
        this.$target = $target;
        this.toggleKey = toggleKey;
    }

    setTarget($target) {
        this.$target = $target;
    }

    setToggleKey(toggleKey) {
        this.toggleKey = toggleKey;
    }

    toggle(event) {
        this.$target.classList.toggle(this.toggleKey);
    }
}