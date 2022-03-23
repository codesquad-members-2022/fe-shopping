import SmartMenuView from '../view/SmartMenuView.js';
import SmartMenuModel from '../model/SmartMenuModel.js';

export default class SmartMenuController {
  constructor() {
    this.smartMenuView = new SmartMenuView();
    this.smartMenuModel = new SmartMenuModel();
  }

  init() {
    this.smartMenuView.init('.header-gnb');
    // Array.from(document.querySelectorAll('.header-lnb-first__link')).forEach(
    //   (e) => console.log(e.dataset.secondList)
    // );
  }
}
