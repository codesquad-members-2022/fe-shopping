class SearchInputModel {
  constructor(state) {
    this.state = state;
  }

  set liContents(data) {
    const incomeData = this.fitDataSize(data);
    this.state.toggle.liContents = incomeData;
  }

  get autoCompleteData() {
    return this.state.toggle.liContents;
  }

  set hilightCount(income) {
    this.state.prevHilightIdx = this.state.hilightIdx;
    this.state.hilightIdx += income;

    if (this.state.hilightIdx < 0) {
      this.state.hilightIdx = this.state.toggleList.length - 1;
      return;
    }

    if (this.state.hilightIdx >= this.state.toggleList.length) {
      this.state.hilightIdx = 0;
      return;
    }
  }

  set checkToggleList(list) {
    this.state.toggleList = list;
  }

  fitDataSize(data) {
    const { MAX_SIZE } = this.state;
    if (data.length > MAX_SIZE) {
      data.splice(MAX_SIZE, data.length);
    }

    return data;
  }

  changeHilightIdx(count) {
    const {
      hilightIdx: { next },
    } = this.state;

    this.state.hilightIdx.next += count;
    this.state.hilightIdx.prev = next - count;
  }
}

class SearchMenuModel {
  constructor(state) {
    this.state = state;
  }

  set clickedContents(idx) {}

  get clickedContents() {
    this.state.clickedContentsIdx;
  }
}

export { SearchInputModel, SearchMenuModel };
