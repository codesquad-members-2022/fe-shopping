export const SearchMenuDropBox = function (dropBox, dropBoxInfo) {
  this.searchViewMenuDropBox = dropBox;
  this.dropBoxInfo = dropBoxInfo;
};

SearchMenuDropBox.prototype = {
  constructor: SearchMenuDropBox,
  render(data) {
    this.searchViewMenuDropBox.info.dropBox = this.searchViewMenuDropBox.createDropBoxTemplate(
      data,
      this.searchViewMenuDropBox.info.dropBoxClassName
    );
  },
  onDropBoxRenderEvent() {
    this.searchViewMenuDropBox.onDropBoxRenderEvent();
  },
};
