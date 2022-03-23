class View {
  _target;

  constructor() {
    this._target = document.querySelector(".searched-items");
    this.userInput = document.querySelector(".coupang-search").value;
  }

  Template(data) {
    if (!data) return "";
    return data.reduce((acc, el) => {
      const [unrelatedHead, unrelatedTail] = el.name.split(document.querySelector(".coupang-search").value); //유저 입력값만 색깔을 바꿔주기 위해 head와 tail로 나눔
      return (
        acc +
        `<a href="#">${unrelatedHead}<span class="related-word">${
          document.querySelector(".coupang-search").value
        }</span>${unrelatedTail}</a>`
      );
    }, "");
  }

  getElement(elementName) {
    return document.querySelector("elementName");
  }

  render(data) {
    this._target.innerHTML = this.Template(data);
  }
}

export { View };
