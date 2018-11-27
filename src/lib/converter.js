import { createElement } from './helpers';
 export function generateImage(imagePath) {
  if (!imagePath) {
    return document.createElement('div');
    // Má nota css til að teikna grátt og jafn stórt
  }
  const imageElement = createElement('img');
  imageElement.src = `../../${imagePath}`;
  return imageElement;
}
 export function generateTitle(title, slug) {
  const link = document.createElement('a');
  link.href = `/fyrirlestur.html?slug=${slug}`;
  // slug = linkurinn sem við ætlum að hafa
  const titleElement = document.createElement('h1');
  titleElement.appendChild(document.createTextNode(title));
   link.appendChild(titleElement);
  return link;
}
 export function generateQuote() {
  // eitthvað dót
}
 export function generateText() {
  // eitthvað dót
}˙