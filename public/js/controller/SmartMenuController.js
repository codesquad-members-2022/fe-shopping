import SmartMenuView from '../view/smartmenuview.js';
import SmartMenuModel from '../model/smartmenumodel.js';

export default class SmartMenuController {
  constructor() {
    this.smartmenuView = new SmartMenuView();
    this.smartmenuModel = new SmartMenuModel();
  }

  init() {
    this.smartmenuView.init('.header-gnb');
  }
}
