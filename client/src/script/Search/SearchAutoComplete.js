export default class SearchAutoComplete {
  constructor() {
    this.$searchPopup = document.querySelector('.search-popup');
    this._list = [];
    this.keyword = '';
  }
  set list(newList) {
    this._list = newList;
    this.render();
  }
  hiliteWord(word) {
    return word.split(this.keyword).join(`<span class="hilite">${this.keyword}</span>`);
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
        ${this._list.map(item => `<li>${this.hiliteWord(item)}</li>`).join('')}
      </ul>
    </div>
    `
  }
}