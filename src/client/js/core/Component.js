export default function Component($target, $props) {
  this.$target = $target;
  this.$props = $props;
  this.setup();
  this.render();
  this.setEvent();
}

Component.prototype = {
  setup() {
    // this.state 초기 셋업
  },
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  },
  mount() {
    // render 이후 로직 실행
  },
  render() {
    this.$target.innerHTML = this.template();
    this.mount();
  },
  template() {
    // html 태그 templating
    return ``;
  },
  addEvent(eventType, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)];
    const isTarget = (target) =>
      children.includes(target) || target.closest(selector);
    this.$target.addEventListener(eventType, (event) => {
      if (!isTarget(event.target)) return false;
      callback(event);
    });
  },
  setEvent() {
    // addEvent 등록
  },
};
