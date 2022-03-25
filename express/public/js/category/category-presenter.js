import { $, fetchData } from '../utility/util.js';
import { makeShoppingCategory } from '../utility/template.js';
import ModelController from './category-model.js';
import ViewController from './category-view.js';

export default class CategoryPresenter {
  constructor() {
    this.model = new ModelController();
    this.view = new ViewController();
  }

  categoryInit() {
    this.makeData();
    this.view.getPresenterThis(this);
    this.view.addCategoryMouseEvent();
  }

  async makeData() {
    const jsonData = await fetchData('/categoryData');
    const categoryData = jsonData.categoryData;
    this.model.getData(categoryData);
  }

  makeFirstContents = ({ target }) => {
    if (!target.closest('div')) return;
    const categoryData = this.model.printData();

    const firstContentTemplate = makeShoppingCategory(categoryData, 'firstContent');
    this.view.showFirstContent(firstContentTemplate);
  };

  makeSecondContents = ({ target }) => {
    if (!target.closest('button')) return;
    const categoryData = this.model.printData();
    let curTarget = null;

    for (const value of categoryData) {
      if (target.textContent === value.firstContent) {
        curTarget = value.child;
        break;
      }
    }

    const secondContentTemplate = makeShoppingCategory(curTarget, 'secondContent');
    this.view.showSecondContent(secondContentTemplate);
  };

  makeThirdContents = ({ target }) => {
    if (!target.closest('button')) return;
    const categoryData = this.model.printData();
    let curTarget = null;

    for (const value of categoryData) {
      for (const el of value.child) {
        if (target.textContent === el.secondContent) {
          curTarget = el.child;
          break;
        }
      }
    }

    const thirdContentTemplate = makeShoppingCategory(curTarget, 'thirdContent');
    this.view.showThirdContent(thirdContentTemplate);
  };
}
