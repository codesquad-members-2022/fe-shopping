export default class SearchAutoComplete {
  constructor() {
    this.$searchPopup = document.querySelector('.search-popup');
    this._list = [];
  }
  set list(newList) {
    this._list = newList;
    this.render();
  }
  render() {
    this.$searchPopup.innerHTML = `
    <ul>
      ${this._list.map(item => `<li>${item}</li>`).join('')}
    </ul>
    `
  }
}