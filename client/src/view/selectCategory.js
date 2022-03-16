export class selectCategory {
  constructor() {
    this.$select = document.querySelector('.select__category');
    this.renderSelectCategory();
  }

  renderSelectCategory() {
    // 카테고리 데이터는 나중에 json으로 받아올 수 있도록 수정하기
    const categoryData = ['전체', '여성패션', '남성패션', '남녀 공용 패션', '유아동패션'];
    const template = `
      <ul class="select__drop-down">
        ${categoryData.reduce((acc, cur) => acc + this.templateDropDownItem(cur), '')}
      </ul>
    `;
    this.$select.insertAdjacentHTML('beforeend', template);
  }

  templateDropDownItem(data) {
    return `<li><a href="#">${data}</a></li>`;
  }

  showCategory() {
    const lastChild = this.$select.lastElementChild;
    lastChild.classList.toggle('focus');
    this.$select.querySelector('.material-icons').innerText = lastChild.classList.contains('focus')
      ? 'arrow_drop_up'
      : 'arrow_drop_down';
  }

  selectCategory(e) {
    document.querySelector('.select__label').innerText = e.target.innerText;
  }
}
