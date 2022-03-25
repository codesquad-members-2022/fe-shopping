import { $, $$ } from '../utility/util.js';

export default class ViewController {
  constructor() {
    this.presenter;
  }

  getPresenterThis(presenter) {
    this.presenter = presenter;
  }

  addCategoryMouseEvent() {
    const $category = $('.category');
    $category.addEventListener('mouseenter', this.presenter.makeFirstContents);
  }

  showFirstContent(firstContentTemplate) {
    const $firstMenu = $('.shopping-popup-first-list');
    $firstMenu.innerHTML = firstContentTemplate;
    this.addFirstContentMouseEvent();
  }

  addFirstContentMouseEvent() {
    const firstLists = $$('.firstContent');

    firstLists.forEach((list) => {
      list.addEventListener('mouseenter', this.presenter.makeSecondContents);
      list.addEventListener('mouseleave', this.noShowFirstMenu);
    });
  }

  noShowFirstMenu = ({ relatedTarget }) => {
    if (relatedTarget.tagName === 'BUTTON') {
      this.addSecondContentMouseEvent();
      return;
    }
    $('.shopping-popup-second-list').innerHTML = '';
    $('.shopping-popup-first-list').innerHTML = '';
  };

  showSecondContent(secondContentTemplate) {
    const $secondMenu = $('.shopping-popup-second-list');
    $secondMenu.innerHTML = secondContentTemplate;
    $('.shopping-popup-third-list').innerHTML = '';
    this.addSecondContentMouseEvent();
  }

  addSecondContentMouseEvent() {
    const secondLists = $$('.secondContent');

    secondLists.forEach((list) => {
      list.addEventListener('mouseenter', this.presenter.makeThirdContents);
    });
  }

  showThirdContent(thirdContentTemplate) {
    const $thirdMenu = $('.shopping-popup-third-list');
    $thirdMenu.innerHTML = thirdContentTemplate;
  }
}
