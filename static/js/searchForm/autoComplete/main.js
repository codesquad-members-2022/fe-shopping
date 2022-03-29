import AutoCompleteView from './AutoCompleteView.js';
import AutoCompleteController from './AutoCompleteController.js';

export default async function initAutoComplete(searchModel) {
  const autoCompleteView = new AutoCompleteView();
  const autoCompleteController = new AutoCompleteController({
    model: searchModel,
    view: autoCompleteView,
  });

  autoCompleteController.init();
}
