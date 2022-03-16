import SearchInput from "./SearchInput.js";
import SearchAutoComplete from "./SearchAutoComplete.js";
import { getAutoComplete } from "../api.js";

const input = new SearchInput();
const autoComplete = new SearchAutoComplete();

input.$input.addEventListener('input', ({target}) => { 
  getAutoComplete(target.value).then(data => {
    autoComplete.keyword = target.value;
    autoComplete.list = data;
  });
});
