import HtmlElement from '../../utils/HtmlElement.js';

const getMethodName = (text) => 'on' + text[0].toUpperCase() + text.slice(1);

export default function Main($element) {
  HtmlElement.call(this, $element);
}

Main.prototype = Object.create(HtmlElement.prototype);
Main.prototype.constructor = Main;

Main.prototype.init = function () {
  this.handleClick = {
    handleEvent: function (event) {
      const {
        target: {
          dataset: { click },
        },
      } = event;
      click && this.EventHandler.onClick[getMethodName(click)](event);
    }.bind(this),
  };
};

Main.prototype.setTemplate = function () {
  return `
      <h1>메인</h1>
      <div data-click="tomato" style="width: 500px; height: 500px; background-color: tomato"></div>
      <div data-click="darkgreen" style="width: 500px; height: 500px; background-color: darkgreen"></div>`;
};

Main.prototype.setEvent = function () {
  this.$element.addEventListener('click', this.handleClick);
};

Main.prototype.EventHandler = {
  onClick: {
    onTomato(event) {
      alert(event.target.dataset.click);
    },
    onDarkgreen(event) {
      alert(event.target.dataset.click);
    },
  },
};
