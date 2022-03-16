import Component from '../../core/Component.js';
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
      const $bottomWindow = this.$target.querySelector('.bottom-window');

      if ($bottomWindow) {
        this.$props.removeBottomWindow('.select-box');
      }

      else {
        this.$props.renderBottomWindow('.select-box', {
          windowList: this.$state.category,
        });
      }
    });

    this.addEvent('blur', '.select-box', () => {
      this.$props.removeBottomWindow('.select-box');
    }, true);
  }

}

export default SelectBox;
