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
    return `<button type="button" class="select-btn">전체</button>
            <div class="bottom-window"></div>`;
  }

  setEvent() {
    this.addEvent('click', '.select-btn', () => {
      const $bottomWindow = this.$target.querySelector('.bottom-window');

      if ($bottomWindow.classList.contains('open')) {
        $bottomWindow.classList.remove('open');
        $bottomWindow.innerHTML = '';
      }

      else {
        this.$props.renderBottomWindow('.bottom-window', {
          windowList: this.$state.category,
        });
      }
    });

    this.addEvent('blur', '.select-box', () => {
      this.$props.removeBottomWindow('.bottom-window');
    }, true);
  }

}

export default SelectBox;
