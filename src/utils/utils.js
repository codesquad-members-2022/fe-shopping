export function addClickEventToElement(elementName, func) {
  const element = document.querySelector(elementName);

  element.addEventListener("click", func);
}
