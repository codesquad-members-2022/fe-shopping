export default class SearchInput {
  constructor() {
    this.$input = document.querySelector('.search-input');
    this._value = '';
  }
  set value(newValue) {
    this._value = newValue;
    this.render();
  }
  get value() {
    return this._value;
  }
  render() {
    this.$input.value = this._value;
  }
}