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

    toggle(toggleKey) {
        this.$target.classList.toggle(toggleKey || this.toggleKey);
    }
}