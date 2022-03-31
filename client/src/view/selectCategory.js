export class SelectCategory {
  constructor() {
    this.$select = document.querySelector('.select__category');
    this.renderSelectCategory();
  }

  setEvents() {
    this.$select.addEventListener('click', this.categoryClickHandle);
  }

  templateDropDownItem(data) {
    return data.reduce((acc, cur) => acc + `<li><a href="#">${cur}</a></li>`, '');
  }

  renderSelectCategory() {
    const categoryData = ['전체', '여성패션', '남성패션', '남녀 공용 패션', '유아동패션'];
    const template = `
      <ul class="select__drop-down">
        ${this.templateDropDownItem(categoryData)}
      </ul>
    `;
    this.$select.insertAdjacentHTML('beforeend', template);
  }

  toggleSelectCategory() {
    const selectCategoryList = document.querySelector('.select__drop-down');
    selectCategoryList.classList.toggle('focus');
  }

  setArrowIcons() {
    const selectCategoryList = document.querySelector('.select__drop-down');
    const arrowText = selectCategoryList.classList.contains('focus') ? 'arrow_drop_up' : 'arrow_drop_down';
    this.$select.querySelector('.material-icons').innerText = arrowText;
  }

  selectCategory(e) {
    document.querySelector('.select__label').innerText = e.target.innerText;
  }
}
