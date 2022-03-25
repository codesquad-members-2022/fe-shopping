export class Core {
  render(child, parent) {
    const $parent = document.querySelector(parent);
    $parent.append(child);
  }
}
