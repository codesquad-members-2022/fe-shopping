export default class Component {
    $state;
    $target;
    constructor($target,$state) {
        this.$target = $target;
        this.$state = $state;
        this.render();
    }
    template() { return "" };
    render() {};
    setEvent() {};
}