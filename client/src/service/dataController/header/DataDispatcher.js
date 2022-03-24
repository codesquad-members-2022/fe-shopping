class HedearDataDispatcher {
  constructor(
    searchInputToggle,
    searchMenuToggle,
    searchInputView,
    searchMenuView,
    headerKeyManager
  ) {
    this.searchInputModel = searchInputToggle;
    this.searchMenuModel = searchMenuToggle;
    this.searchInputView = searchInputView;
    this.searchMenuView = searchMenuView;
    this.headerKeyManager = headerKeyManager; // 흠...
  }

  set searchInputData(data) {
    if (data.length === 0) {
      // 나중에 router쪽에서 값이 없으면 차단하는것도 고려
      return;
    }
    const inputData = this.fitDataSize(data);
    const DOM = this.searchInputModel.getHTML(inputData);
    this.headerKeyManager.initCount();
    this.searchInputView.renderSearchAutoComplete(DOM);
  }

  set searchMenuData(data) {
    const menuDOM = this.searchMenuModel.getHTML(data);
    this.searchMenuView.renderMenu(menuDOM);
  }

  fitDataSize(data) {
    const MAX_SIZE = 10;

    if (data.length > MAX_SIZE) {
      data.splice(MAX_SIZE, data.length);
    }

    return data;
  }

  // focus
}

export { HedearDataDispatcher };
