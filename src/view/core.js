export class Core {
  render(template, element) {
    const $element = document.querySelector(element);
    $element.innerHTML += `${template}`;
  }
}
