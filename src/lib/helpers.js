export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function createElement(el, className) {
  const element = document.createElement(el);
  if (className) {
    console.log("komst");
    element.classList.add(className);
  }
  console.log(className);
  return element;
}