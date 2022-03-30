import { $, debounce } from '../utility/util.js';

export default class ViewController {
  constructor() {
    this.presenter;
  }

  getPresenterThis(presenter) {
    this.presenter = presenter;
  }

  addCategoryMouseEvent() {
    const $category = $('.category');
    $category.addEventListener('mouseenter', debounce(this.presenter.makeFirstContents, 300));
  }

  showFirstContent(firstContentTemplate) {
    const $firstMenu = $('.shopping-popup-first-list');
    $firstMenu.innerHTML = firstContentTemplate;
    this.addFirstContentMouseEvent();
  }

  addFirstContentMouseEvent() {
    const $firstMenu = $('.shopping-popup-first-list');
    $firstMenu.addEventListener('mouseover', debounce(this.presenter.makeSecondContents, 300));
    $firstMenu.addEventListener('mouseout', this.noShowFirstMenu);
  }

  noShowFirstMenu = ({ relatedTarget }) => {
    if (relatedTarget.className === 'firstContent' || relatedTarget.className === 'secondContent') {
      return;
    }

    this.hiddenSmartCategory('.shopping-popup-first-list', '.shopping-popup-second-list');
  };

  showSecondContent(secondContentTemplate) {
    const $secondMenu = $('.shopping-popup-second-list');
    $secondMenu.innerHTML = secondContentTemplate;
    this.addSecondContentMouseEvent();
  }

  addSecondContentMouseEvent() {
    const $secondMenu = $('.shopping-popup-second-list');
    $secondMenu.addEventListener('mouseover', debounce(this.presenter.makeThirdContents, 300));
    $secondMenu.addEventListener('mouseout', this.noShowSecondMenu);
  }

  noShowSecondMenu = ({ relatedTarget }) => {
    if (relatedTarget.className === 'secondContent' || relatedTarget.className === 'thirdContent')
      return;

    if (relatedTarget.className === 'firstContent') {
      this.hiddenSmartCategory('.shopping-popup-third-list');
      return;
    }
    this.hiddenSmartCategory(
      '.shopping-popup-first-list',
      '.shopping-popup-second-list',
      '.shopping-popup-third-list'
    );
  };

  showThirdContent(thirdContentTemplate) {
    const $thirdMenu = $('.shopping-popup-third-list');
    console.log($thirdMenu);
    $thirdMenu.innerHTML = thirdContentTemplate;
  }

  addThirdContentMouseEvent() {
    const thirdMenu = $('.shopping-popup-third-list');
    thirdMenu.addEventListener('mouseout', this.noShowThirdMenu);
  }

  noShowThirdMenu({ relatedTarget }) {
    if (relatedTarget.className === 'secondContent' || relatedTarget.className === 'thirdContent')
      return;

    this.hiddenSmartCategory(
      '.shopping-popup-first-list',
      '.shopping-popup-second-list',
      '.shopping-popup-third-list'
    );
  }

  hiddenSmartCategory(...args) {
    for (const classList of [...args]) {
      console.log(classList);
      let list = $(classList);
      list.innerHTML = '';
    }
  }
}
