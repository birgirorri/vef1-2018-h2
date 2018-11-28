import { createElement } from './helpers';

/**
 * Hér koma föll sem sjá um að búa til element fyrir sérhverja týpu af elementum á síðunni
 */

export function generateImage(imagePath, className) {
  if (!imagePath) {
    return createElement('div', 'noPhoto');
  }
  const imageElement = createElement('img', className);
  imageElement.src = `../../${imagePath}`;
  imageElement.classList.add('thumbnail');
  return imageElement;
}

export function generateTitle(title, slug) {
  const link = document.createElement('a');
  link.href = `/fyrirlestur.html?slug=${slug}`;
  
  // slug = linkurinn sem við ætlum að hafa
  const titleEle = createElement('h2', 'title', title);
  link.appendChild(titleEle);
  return link;
}

export function generateQuote(quote) {
  const quoteText = createElement('p', 'quote__data', quote.data);
  const quoteAtt = createElement('p', 'quote__attribute', quote.attribute);

  const quoteEle = createElement('blockquote', 'quote');
  quoteEle.appendChild(quoteText);
  quoteEle.appendChild(quoteAtt);
  return quoteEle;
}

export function generateCode(codeText) {
  const preEle = document.createElement('pre', 'code');
  const codeEle = createElement('code', 'codeText', codeText);
  preEle.appendChild(codeEle);
  return preEle;
}

export function generateYoutube(videoLink) {
  const videoEle = document.createElement('iframe', 'youtube');
  videoEle.src = videoLink;
  videoEle.frameborder = '0';
  videoEle.allowfullscreen = '0';
  return videoEle;
}