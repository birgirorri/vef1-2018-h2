import { createElement } from './helpers';

/**
 * Hér koma föll sem sjá um að búa til element fyrir sérhverja týpu af elementum á síðunni
 */

export function generateImage(imagePath) {
  if (!imagePath) {
    return document.createElement('div', 'noPhoto');
  }
  const imageElement = createElement('img', 'photo');
  imageElement.src = `../../${imagePath}`;
  imageElement.classList.add('thumbnail');
  return imageElement;
}

export function generateTitle(title, slug) {
  const link = document.createElement('a');
  link.href = `/fyrirlestur.html?slug=${slug}`;
  // slug = linkurinn sem við ætlum að hafa
  const titleEle = document.createElement('h2');
  titleEle.appendChild(document.createTextNode(title));

  link.appendChild(titleEle);
  return link;
}

export function generateCategory(category) {
  const categoryEle = document.createElement('h3');
  categoryEle.appendChild(document.createTextNode(category));
  return categoryEle;
}

export function generateText(text) {
  const textEle = document.createElement('p');
  textEle.appendChild(document.createTextNode(text));
  textEle.classList.add('text');
  return textEle;
}

export function generateQuote(quote) {
  const quoteEle = document.createElement('blockquote');
  quoteEle.classList.add('quote');
  const quoteText = generateText(quote.data);
  quoteText.classList.add('quote__data');
  const quoteAtt = generateText(quote.attribute);
  quoteAtt.classList.add('quote__attribute');
  quoteEle.appendChild(quoteText);
  quoteEle.appendChild(quoteAtt);
  return quoteEle;
}

export function generateHeading(headText, size) {
  const headingEle = document.createElement(size);
  headingEle.appendChild(document.createTextNode(headText));
  return headingEle;
}

export function generateCode(codeText) {
  const preEle = document.createElement('pre');
  const codeEle = document.createElement('code');
  codeEle.appendChild(document.createTextNode(codeText));
  preEle.appendChild(codeEle);
  return preEle;
}

export function generateList(listText) {
  const liEle = document.createElement('li');
  liEle.appendChild(document.createTextNode(listText));
  return liEle;
}

export function generateYoutube(videoLink) {
  const videoEle = document.createElement('iframe');
  videoEle.src = videoLink;
  videoEle.frameborder = '0';
  videoEle.allowfullscreen = '0';
  return videoEle;
}