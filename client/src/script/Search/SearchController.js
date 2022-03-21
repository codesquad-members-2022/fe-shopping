import { getAutoComplete } from "../api.js";
import SearchInput from "./SearchInput.js";
import SearchAutoComplete from "./SearchAutoComplete.js";
import SearchHistory from "./SearchHistory.js";
import SearchCategory from "./SearchCategory.js";
import { debounce } from "../util.js";
import { categories } from "../data.js";

const [NEXT, BEFORE] = [1, -1];
const input = new SearchInput();
const autoComplete = new SearchAutoComplete();
const history = new SearchHistory();
const category = new SearchCategory(categories);

input.$input.addEventListener('input', ({target}) => {
  input.value = target.value;
  if(!input.value) {
    history.show = true;
    return;
  }
  debounce(() => {
    getAutoComplete(input.value).then(data => {
      autoComplete.keyword = input.value;
      autoComplete.list = data;
    });
  }, 500);
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

category.$category.addEventListener('click', ({target}) => {
  const selectedItemElement = target.closest('a');
  if (!selectedItemElement) return;
  category.selectItem(selectedItemElement);
});
