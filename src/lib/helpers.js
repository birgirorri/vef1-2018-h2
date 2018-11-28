export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function createElement(el, className, text) {
  const element = document.createElement(el);
  if (className) {
    element.classList.add(className);
  }
  if (text) {
    element.appendChild(document.createTextNode(text));
  }
  return element;
}