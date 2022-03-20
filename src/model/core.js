export class Core {
  render(template, element) {
    const $element = document.querySelector(element);
    $element.innerHTML += `${template}`;
  }
  addEvent(eventType, callback, element) {
    const $element = document.querySelector(element);
    $element.addEvent(eventType, callback);
  }
}
