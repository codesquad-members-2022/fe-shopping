import { delay, $ } from '../util.js';

export class AutoComplete {
  constructor() {
    this.$searchInput = $('.search-form-input');
    this.$autocompleteBox = $('.autocomplete-popup');
  }

  getAutocomplete(value) {
    return fetch(`/autocomplete?value=${value}`).then((res) => res.json());
  }

  showAutocomplete(data, keyword) {
    const length = keyword.length;
    let template = `<div> `;
    data.forEach((element) => {
      const matched = element.slice(0, length);
      const notMatched = element.slice(length);
      template += `<li>${matched}<span>${notMatched}</span></li>`;
    });
    template += `</div>`;

    this.$autocompleteBox.innerHTML = template;
  }

  setAutoCompleteListener() {
    this.$searchInput.addEventListener('input', ({ target }) => {
      const keyword = target.value;
      this.$autocompleteBox.classList.add('showAutocomplete');
      delay(500)
        .then((res) => this.getAutocomplete(target.value))
        .then((data) => this.showAutocomplete(data, keyword));
    });
  }
}
