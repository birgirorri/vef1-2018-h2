import { createElement } from './helpers';

/**
 * Hér koma föll sem sjá um að búa til element fyrir sérhverja týpu af elementum á síðunni
 */

export function generateImage(imagePath) {
  if (!imagePath) {
    const greydiv = document.createElement('div');
    greydiv.classList.add('greydiv');
    return greydiv;
    // Má nota css til að teikna grátt og jafn stórt
  }
  const imageElement = createElement('img');
  imageElement.src = `../../${imagePath}`;
  imageElement.classList.add('thumbnail');
  return imageElement;
}

export function generateTitle(title, slug) {
  const link = document.createElement('a');
  link.href = `/fyrirlestur.html?slug=${slug}`;
  // slug = linkurinn sem við ætlum að hafa
  const titleElement = document.createElement('h2');
  titleElement.appendChild(document.createTextNode(title));

  link.appendChild(titleElement);
  return link;
}

export function generateCategory(category) {
  const categoryElement = document.createElement('h3');
  categoryElement.appendChild(document.createTextNode(category));
  return categoryElement;
}

export function generateText(text) {
  const textElement = document.createElement('p');
  textElement.appendChild(document.createTextNode(text));
  textElement.classList.add('text');
  return textElement;
}

export function generateQuote(quote) {
  const quoteElement = document.createElement('blockquote');
  quoteElement.classList.add('quote');
  const quoteText = generateText(quote.data);
  quoteText.classList.add('quote__data');
  const quoteAttribute = generateText(quote.attribute);
  quoteAttribute.classList.add('quote__attribute');
  quoteElement.appendChild(quoteText);
  quoteElement.appendChild(quoteAttribute);
  return quoteElement;
}

export function generateHeading(heading, size) {
  const headingElement = document.createElement(size);
  headingElement.appendChild(document.createTextNode(heading));
  return headingElement;
}

export function generateCode(code) {
  const preElement = document.createElement('pre');
  const codeElement = document.createElement('code');
  codeElement.appendChild(document.createTextNode(code));
  preElement.appendChild(codeElement);
  return preElement;
}

export function generateList(listitem) {
  const listdata = document.createElement('li');
  listdata.appendChild(document.createTextNode(listitem));
  return listdata;
}

export function generateYoutube(youtube) {
  const videoElement = document.createElement('iframe');
  videoElement.src = youtube;
  videoElement.frameborder = '0';
  videoElement.allowfullscreen = '0';
  return videoElement;
}