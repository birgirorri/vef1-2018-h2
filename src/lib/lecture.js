import { generateImage, generateQuote, generateCode, generateYoutube } from './converter';
import { saveLectures, loadSavedLectures, removeLectures } from './storage';
import { createElement } from './helpers';

export default class Lecture {
  constructor() {
    this.container = document.querySelector('.lecture');
    this.url = 'lectures.json';
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
    const title = createElement('h1', 'header__h1', realTitle);
    const category = createElement('h2', 'header__h2', slugCategory);

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
    switch(item.type) {
        case 'image': 
            const imageEle = generateImage(item.data, 'img');
            const imageText = createElement('p', 'image__caption', item.caption);
            this.container.appendChild(imageEle);
            this.container.appendChild(imageText);
            break;
        case 'text':
            const textArray = item.data.split('\n');
            for (let i in textArray) {  
              const textEle = createElement('p', 'text', textArray[i]);
              this.container.appendChild(textEle);
            }
            break;
        case 'quote':
            const quoteEle = generateQuote(item);
            this.container.appendChild(quoteEle);
            break;
        case 'heading':
            const headingEle = createElement('h2', 'heading', item.data);
            this.container.appendChild(headingEle);
            break;
        case 'list':
            const listEle = createElement('ul', 'list');
            for (let i = 0; i < item.data.length; i++) {
                const listitem = createElement('li', 'list__item', item.data[i]);
                listEle.appendChild(listitem);
                this.container.appendChild(listEle);
            }
            break;
        case 'code':
            const codeEle = generateCode(item.data);
            this.container.appendChild(codeEle);
            break;
        case 'youtube':
            const videoEle = generateYoutube(item.data);
            this.container.appendChild(videoEle);
            break;
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