class HedearDataDispatcher {
  constructor(
    searchInputToggle,
    searchMenuToggle,
    searchInputView,
    searchMenuView
  ) {
    this.searchInputModel = searchInputToggle;
    this.searchMenuModel = searchMenuToggle;
    this.searchInputView = searchInputView;
    this.searchMenuView = searchMenuView;
  }

  set searchInputData(data) {
    if (data.length === 0) {
      // 나중에 router쪽에서 값이 없으면 차단하는것도 고려
      return;
    }
    const inputData = this.checkdataSize(data);
    const DOM = this.searchInputModel.getHTML(inputData);
    this.searchInputView.renderSearchAutoComplete(DOM);
  }

  set searchMenuData(data) {
    const menuDOM = this.searchMenuModel.getHTML(data);
    this.searchMenuData.render(menuDOM);
  }

  checkdataSize(...data) {
    const MAX_SIZE = 10;

    if (data.length > MAX_SIZE) {
      data.splice(MAX_SIZE, data.length);
    }

    return data;
  }

  // focus
}
