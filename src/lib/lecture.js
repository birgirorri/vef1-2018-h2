import { generateImage, generateText, generateQuote, generateHeading, generateList, generateCode, generateYoutube } from './converter';
import { saveLectures, loadSavedLectures, removeLectures } from './storage';
import { empty, createElement } from './helpers';

export default class Lecture {
  constructor() {
    this.container = document.querySelector('.lecture');
    this.url = '../lectures.json';
    this.header = document.querySelector('.header');
  }

  findTitle(slug) {
    let title;
    switch (slug) {
      case 'sagan':
        title = 'Sagan';
        break;
      case 'element':
        title = 'Element';
        break;
      case 'a11y':
        title = 'Aðgengi';
        break;
      case 'syntax':
        title = 'Málfræði';
        break;
      case 'box':
        title = 'Box model';
        break;
      case 'flexbox':
        title = 'Flexbox';
        break;
      case 'responsive':
        title = 'Skalanleg vefhönnun';
        break;
      case 'basic':
        title = 'Gildi, týpur og virkjar';
        break;
      case 'programs':
        title = 'Forrit';
        break;
      case 'functions':
        title = 'Föll';
        break;
      case 'array':
        title = 'Array & objects';
        break;
      case 'dom':
        title = 'DOM & vafrinn';
        break;
      case 'example':
        title = 'Dæmi';
        break;
      default: break;
    }
    return title;
  }

/**
 * 
 * @param {Kóði fyrir slóðina á tiltekna vefsíðu} slug 
 * Hleður inn gögnum fyrir hvern fyrirlestur.
 */

  loadLecture(slug) {
    this.page = slug;
    const slugArray = slug.split('-');
    const slugCategory = slugArray[0];
    const slugTitle = slugArray[1];
    const realTitle = this.findTitle(slugTitle);
    const title = generateHeading(realTitle, 'h1');
    title.classList.add('header__h1');
    const category = generateHeading(slugCategory, 'h2');
    category.classList.add('header__h2');

    const titlediv = document.querySelector('.header__title');
    titlediv.appendChild(category);
    titlediv.appendChild(title);

    const savedArray = loadSavedLectures();
    if (savedArray.includes(document.querySelector('.header__h1').textContent)) {
      const finishLecture = document.querySelector('.footer__finish');
      finishLecture.classList.add('footer__finish--hidden')
      const finishedLecture = document.querySelector('.footer__finished');
      finishedLecture.classList.remove('footer__finished--hidden');
    }

    return fetch(this.url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Gat ekki sótt fyrirlestra');
        }
        return res.json();
      })
      .then((data) => {
        const found = data.lectures.find(i => i.slug === slug);
        if (!found) {
          throw new Error('Fyrirlestur fannst ekki');
        }
        return found;
      });
  }
  /**
  *
  * Fer í gegnum öll JSON gögnin og mappar þau
  */

  renderData(data) {
    console.log(data.content);
    data.content.map((item) => {
      this.renderItem(item);
    });

  }

  renderItem(item) {
    if (item.type === 'image') {
      const imageElement = generateImage(item.data);
      imageElement.classList.add('img');
      const imageText = document.createElement('p');
      imageText.classList.add('image__caption');
      imageText.appendChild(document.createTextNode(item.caption));
      this.container.appendChild(imageElement);
      this.container.appendChild(imageText);
    }
    else if (item.type === 'text') {
      const textElement = generateText(item.data);
      this.container.appendChild(textElement);
    }
    else if (item.type === 'quote') {
      const quoteElement = generateQuote(item);
      this.container.appendChild(quoteElement);
    }
    else if (item.type === 'heading') {
      const headingElement = generateHeading(item.data, 'h2');
      headingElement.classList.add('heading');
      this.container.appendChild(headingElement);
    }
    else if (item.type === 'list') {
      const listElement = document.createElement('ul');
      listElement.classList.add('list');

      for (let i = 0; i < item.data.length; i += 1) {
        const listitem = generateList(item.data[i]);
        listitem.classList.add('list__tag');
        listElement.appendChild(listitem);
        this.container.appendChild(listElement);
      }
    }
    else if (item.type === 'code') {
      const codeElement = generateCode(item.data);
      codeElement.classList.add('code');
      this.container.appendChild(codeElement);
    }
    else if (item.type === 'youtube') {
      const videoElement = generateYoutube(item.data);
      videoElement.classList.add('youtube');
      this.container.appendChild(videoElement);
    }
  }

  unfinishLecture(e) {
    const finishedLecture = document.querySelector('.footer__finished');
    finishedLecture.classList.add('footer__finished--hidden');
    const unfinishedLecture = document.querySelector('.footer__finish');
    unfinishedLecture.classList.remove('footer__finish--hidden');
    removeLectures(document.querySelector('.header__h1').textContent);
  }

  finishLecture(e) {
    const finishLecture = document.querySelector('.footer__finish');
    finishLecture.classList.add('footer__finish--hidden')
    const finishedLecture = document.querySelector('.footer__finished');
    finishedLecture.classList.remove('footer__finished--hidden');
    saveLectures(document.querySelector('.header__h1').textContent);
  }

  load() {
    const qs = new URLSearchParams(window.location.search);
    console.log(qs);
    const slug = qs.get('slug');

    loadSavedLectures();

    this.loadLecture(slug).then((data) => this.renderData(data));
    const finishButton = document.querySelector('.footer__finish');
    finishButton.addEventListener('click', this.finishLecture);
    const finishedButton = document.querySelector('.footer__finished');
    finishedButton.addEventListener('click', this.unfinishLecture);
  }
}