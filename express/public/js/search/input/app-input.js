import Model from './model.js';
import View from './view.js';
import Controller from './controller.js';

export function inputInit() {
  const model = new Model();
  const view = new View();
  const controller = new Controller(model, view);

  controller.startInput();
}
