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
    if (this._list.length === 0) {
      this.$searchPopup.style.display = 'none';
      this.$searchPopup.innerHTML = '';
      return;
    }
    this.$searchPopup.style.display = 'block';
    this.$searchPopup.innerHTML = `
    <div class="search-auto-complete">
      <ul>
        ${this._list.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>
    `
  }
}