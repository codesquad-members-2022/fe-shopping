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

document.addEventListener('keyup', moveAutoCompleteItem);
input.$input.addEventListener('input', setAutoCompleteByInputValue);
input.$input.addEventListener('focusin', () => history.show = true );
input.$input.addEventListener('focusout', () => history.show = false );
category.$category.addEventListener('click', selectCategoryItem);

function setAutoCompleteByInputValue ({target}) {
  input.value = target.value;
  if(!input.value) {
    history.show = true;
    return;
  }
  debounce(() => {
    getAutoComplete(input.value)
    .then(data => {
      autoComplete.keyword = input.value;
      autoComplete.list = data;
    });
  }, 500);
}
function moveAutoCompleteItem ({code}) {
  if (code === 'ArrowUp') {
    autoComplete.selectItem(BEFORE);
    input.value = autoComplete.selectedItem;
  }
  else if (code === 'ArrowDown') {
    autoComplete.selectItem(NEXT);
    input.value = autoComplete.selectedItem;
  }
}
function selectCategoryItem ({target}) {
  const selectedItemElement = target.closest('a');
  if (!selectedItemElement) return;
  category.selectItem(selectedItemElement);
}