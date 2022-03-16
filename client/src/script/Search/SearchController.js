import { getAutoComplete } from "../api.js";
import SearchInput from "./SearchInput.js";
import SearchAutoComplete from "./SearchAutoComplete.js";
import SearchHistory from "./SearchHistory.js";

const input = new SearchInput();
const autoComplete = new SearchAutoComplete();
const history = new SearchHistory();

input.$input.addEventListener('input', ({target}) => {
  if(!target.value) {
    history.show = true;
    return;
  }
  getAutoComplete(target.value).then(data => {
    autoComplete.keyword = target.value;
    autoComplete.list = data;
  });
});
input.$input.addEventListener('focusin', () => {
  history.show = true;
});
input.$input.addEventListener('focusout', () => {
  history.show = false;
});