export default class SearchAutoComplete {
  constructor() {
    this.$searchPopup = document.querySelector('.search-popup');
    this._list = [];
    this.selectedItemIndex = -1;
    this.keyword = '';
  }
  set list(newList) {
    this._list = newList;
    this.selectedItemIndex = -1;
    this.render();
  }
  selectItem(direction) {
    this.selectedItemIndex += direction;
    if (this.selectedItemIndex > this._list.length - 1) {
      this.selectedItemIndex = 0;
    }
    else if (this.selectedItemIndex < 0) {
      this.selectedItemIndex = -1;
    }
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
        ${this._list.map((item, index) => `<li${index === this.selectedItemIndex ? ' class="selected"' : ''}>${this.hiliteWord(item)}</li>`).join('')}
      </ul>
    </div>
    `
  }
}