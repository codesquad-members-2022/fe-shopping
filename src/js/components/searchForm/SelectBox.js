import Component from '../../core/Component.js';
import BottomWindow from '../common/BottomWindow.js';
import { category } from '../../../data';

class SelectBox extends Component {

  setup() {
    this.$state = {
      value: '',
      category: category,
      autoComplete: [],
    };
  }

  template() {
    return `<div class="select-box">
              <button type="button" class="select-btn">전체</button>
            </div>`;
  }

  setEvent() {
    this.addEvent('click', '.select-btn', () => {
      const $selectBox = this.$target.querySelector('.select-box');
      new BottomWindow($selectBox, {
        windowList: this.$state.category,
      });
    });

    this.addEvent('blur', '.select-box', () => {
      const $selectBox = this.$target.querySelector('.select-box');
      const $bottomWindow = $selectBox.querySelector('.bottom-window');
      if ($bottomWindow) $selectBox.removeChild($bottomWindow);
    }, true);
  }

}

export default SelectBox;
