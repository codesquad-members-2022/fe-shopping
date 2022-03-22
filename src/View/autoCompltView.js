class View {
  _target;

  constructor(target) {
    this._target = document.querySelector(".searched-items");
    this.userInput = document.querySelector(".coupang-search").value;
  }

  Template(state) {
    return state.reduce((acc, el) => {
      const [unrelatedHead, unrelatedTail] = el.name.split(this.userInput); //유저 입력값만 색깔을 바꿔주기 위해 head와 tail로 나눔
      return acc + `<a href="#">${unrelatedHead}<span class="related-word">${this.userInput}</span>${unrelatedTail}</a>`;
    }, "");
  }

  getElement(elementName) {
    return document.querySelector("elementName");
  }

  render(state) {
    this._target.innerHTML = this.Template(state);
  }
}
