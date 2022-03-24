function Component($target, $props = {}) {
  this.abortController = new AbortController();
  this.$target = $target;
  this.$props = $props;
  this.setup();
  this.render();
  this.setEvent();
}

Component.prototype.setup = function() {};

Component.prototype.template = function() {
  return '';
};

Component.prototype.mounted = function() {};

Component.prototype.render = function() {
  this.$target.innerHTML = this.template();
  this.mounted();
};

Component.prototype.setState = function(newState) {
  this.$state = { ...this.$state, ...newState };
  this.render();
};

Component.prototype.setEvent = function() {};

Component.prototype.addEvent = function(eventType, selector, callback, useCapture = false) {
  const children = [ ...this.$target.querySelectorAll(selector) ];

  const isTarget = (target) => children.includes(target) || target.closest(selector);
  this.$target.addEventListener(eventType, event => {
    if (!isTarget(event.target)) return false;
    callback(event);
  }, { capture: useCapture, signal: this.abortController.signal });
};

Component.prototype.removeEvent = function() {
  this.abortController.abort();
};

Component.prototype.destroy = function() {
  this.removeEvent();
  this.$target.innerHTML = '';
};

export default Component;
