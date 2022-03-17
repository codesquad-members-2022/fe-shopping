export class SelectCategory {
  constructor() {
    this.$select = document.querySelector('.select__category');
    this.renderSelectCategory();
  }

  renderSelectCategory() {
    // 카테고리 데이터는 나중에 json으로 받아올 수 있도록 수정하기
    const categoryData = ['전체', '여성패션', '남성패션', '남녀 공용 패션', '유아동패션'];
    const template = `
      <ul class="select__drop-down">
        ${this.templateDropDownItem(categoryData)}
      </ul>
    `;
    this.$select.insertAdjacentHTML('beforeend', template);
  }

  templateDropDownItem(data) {
    return data.reduce((acc, cur) => acc + `<li><a href="#">${cur}</a></li>`, '');
  }

  showCategory() {
    const lastChild = this.$select.lastElementChild;
    lastChild.classList.toggle('focus');
    const arrowText = lastChild.classList.contains('focus') ? 'arrow_drop_up' : 'arrow_drop_down';
    this.$select.querySelector('.material-icons').innerText = arrowText;
  }

  selectCategory(e) {
    document.querySelector('.select__label').innerText = e.target.innerText;
  }
}
