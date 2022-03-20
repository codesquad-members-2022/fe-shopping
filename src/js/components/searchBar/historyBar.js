import { $, removeClass, addClass, addEvent }  from '../../utils/utils.js';
class RenderHistoryBar {
  constructor() {
    this.inputElement = $('.latest-search');    
  }
  
  render() {
    addEvent(document, 'click', this.eventHandler);
  }
  
  eventHandler = (e) => {  //왜 arrow function 일때는 this참조가 가능한가
    if (e.target === $('.coupang-search')) {
      // console.log(this.inputElement) 왜 undefined가 뜨는지 (함수에 e라는 변수가 들어오면 this가 바뀐다?)
      removeClass(this.inputElement, 'down');
      addClass(this.inputElement, 'up');
    } else if (e.target.closest('.latest-search')) { //부모요소에 latest Search가 있으면 true 리턴
      return;
    } else {
      removeClass(this.inputElement, 'up');
      addClass(this.inputElement, 'down');
    }
  }

  init() {
    this.render();
  }
}

export { RenderHistoryBar };