import Dropdown from './search/dropdown.js';
import InputEvent from './search/input-form/input-event.js';
(() => {
  const dropdown = new Dropdown();
  dropdown.addBtnEvent();
  const inputEvent = new InputEvent();
  inputEvent.addInputEvent();
})();
