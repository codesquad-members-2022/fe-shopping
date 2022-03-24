export default class Toggler {
    constructor($target = null, toggleKey = 'none') {
        this.$target = $target;
        this.toggleKey = toggleKey;
        this.isToggled = true;
    }

    setTarget($target) {
        this.$target = $target;
    }

    setToggleKey(toggleKey) {
        this.toggleKey = toggleKey;
    }

    isToggled() {
        return this.isToggled;
    }

    toggle() {
        this.$target.classList.toggle(this.toggleKey);
        this.isToggled = !this.isToggled;
    }
}