import SmartMenuView from '../view/SmartMenuView.js';

import SmartMenuModel from '../model/SmartMenuModel.js';

export default class SmartMenuController {
  constructor() {
    this.smartMenuView = new SmartMenuView();

    this.SmartMenuModel = new SmartMenuModel();
  }

  init() {
    console.log('[SmartMenuController]');
    this.smartMenuView.setUp();
  }

  tempFetch() {
    this.SmartMenuModel.divisionData();
  }
}
