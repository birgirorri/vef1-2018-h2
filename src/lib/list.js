import { empty, createElement } from './helpers';
import { generateImage, generateTitle } from './converter';
import { clear, saveTypes, removeTypes, loadSavedTypes, loadSavedLectures } from './storage';

let htmlGreen = false;
let cssGreen = false;
let jsGreen = false;

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    this.url = '../lectures.json';
  }

  loadLectures() {
    return fetch(this.url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Gat ekki sótt fyrirlestur');
        }
        return res.json();
      });
  }

  renderDataType(data, type) {
    data.lectures.map((item) => {
      if (item.category === type) {
        this.renderItem(item);
      }
    });
  }

  /**
   * Sér um að setja allt inn í html-ið
   * @param {*} data 
   */
  renderData(data) {

    data.lectures.map((item) => {
      this.renderItem(item);
    });
  }

  renderItem(item) {
    const lecturediv = createElement('div', 'fyrirlestur');
    this.container.appendChild(lecturediv);

    lecturediv.appendChild(generateImage(item.thumbnail));
    const textdiv = createElement('div', 'fyrirlestur__text');
    lecturediv.appendChild(textdiv);

    const titlecatdiv = createElement('div', 'fyrirlestur__cate');
    textdiv.appendChild(titlecatdiv);

    const categorydiv = createElement('div', 'category');
    titlecatdiv.appendChild(categorydiv);
    categorydiv.appendChild(createElement('h3', 'category__title', item.category));

    const titlediv = createElement('div', 'title');
    titlecatdiv.appendChild(titlediv);

    titlediv.appendChild(generateTitle(item.title, item.slug));

    if (loadSavedLectures().includes(item.title)) {
      textdiv.appendChild(createElement('div', 'check', '\u2713'));
    }
  }
  // Viljum skipta þessu upp, eitt fall fyrir mynd, eitt fyrir myndband, o.s.frv.

  updateList(e) {

    switch (e.srcElement.name) {
      case "html":
        if (htmlGreen) {
          htmlGreen = false;
        } else {
          htmlGreen = true;
        }
        break;
      case "css":
        if (cssGreen) {
          cssGreen = false;
        } else {
          cssGreen = true;
        }
        break;
      case "js":
        if (jsGreen) {
          jsGreen = false;
        } else {
          jsGreen = true;
        }
        break;
    }

    const list = new List();
    empty(list.container);

    if ((jsGreen && htmlGreen && cssGreen) || (!jsGreen && !htmlGreen && !cssGreen)) { // Sýna alla
      list.loadLectures()
        .then((data) => list.renderData(data));
    } else {
      removeTypes("HTML");
      removeTypes("CSS");
      removeTypes("Javascript");
      if (htmlGreen) { // Sýna html
        saveTypes('HTML');
        list.loadLectures()
          .then((data) => list.renderDataType(data, 'html'));
      }
      if (cssGreen) { // Sýna CSS
        saveTypes('CSS');
        list.loadLectures()
          .then((data) => list.renderDataType(data, 'css'));
      }
      if (jsGreen) { // Sýna js
        saveTypes('Javascript');
        list.loadLectures()
          .then((data) => list.renderDataType(data, 'javascript'));
      }
    }
  }

  clearLocalStorage() {
    clear();
  }

  load() {
    empty(this.container);
    this.loadLectures()
      .then((data) => this.renderData(data));

    const HTMLbutton = document.querySelector('.flokkar__html');
    HTMLbutton.addEventListener('click', this.updateList);

    const CSSbutton = document.querySelector('.flokkar__css');
    CSSbutton.addEventListener('click', this.updateList);

    const JSbutton = document.querySelector('.flokkar__javascript');
    JSbutton.addEventListener('click', this.updateList);

    const clearLocalst = document.querySelector('.clearLocal');
    clearLocalst.addEventListener('click', this.clearLocalStorage);
  }
}