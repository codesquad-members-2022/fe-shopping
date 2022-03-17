import { getAutoComplete } from "../api.js";
import SearchInput from "./SearchInput.js";
import SearchAutoComplete from "./SearchAutoComplete.js";
import SearchHistory from "./SearchHistory.js";

const [NEXT, BEFORE] = [1, -1];
const input = new SearchInput();
const autoComplete = new SearchAutoComplete();
const history = new SearchHistory();

input.$input.addEventListener('input', ({target}) => {
  if(!target.value) {
    history.show = true;
    return;
  }
  else if (target.value === input._value) return;

  input.value = target.value;
  getAutoComplete(target.value).then(data => {
    autoComplete.keyword = target.value;
    autoComplete.list = data;
  });
});
input.$input.addEventListener('focusin', () => history.show = true );
input.$input.addEventListener('focusout', () => history.show = false );
document.addEventListener('keyup', ({code}) => {
  if (code === 'ArrowUp') {
    autoComplete.selectItem(BEFORE);
    input.value = autoComplete.selectedItem;
  }
  else if (code === 'ArrowDown') {
    autoComplete.selectItem(NEXT);
    input.value = autoComplete.selectedItem;
  }
});
