import InputView from './InputView.js';
import InputController from './InputController.js';

export default async function initInput(searchModel) {
  const inputView = new InputView();
  const inputController = new InputController({
    model: searchModel,
    view: inputView,
  });

  inputController.init();
}
