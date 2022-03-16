export default class SearchHistory {
  constructor() {
    this.$searchPopup = document.querySelector('.search-popup');
    this._list = [];
    this._show = false;
  }
  set show(isShow) {
    this._show = isShow;
    this.render();
  }
  render() {
    if (!this._show) {
      this.$searchPopup.style.display = 'none';
      this.$searchPopup.innerHTML = '';
      return;
    }
    this.$searchPopup.style.display = 'block';
    this.$searchPopup.innerHTML = `
    <div class="search-history">
      최근 검색엉
    </div>
    `
  }
}