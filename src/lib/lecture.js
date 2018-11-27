export default class Lecture {
    constructor() {
      this.container = document.querySelector('.lecture');
      this.url = '../lectures.json';
    }
     loadLecture(slug) {
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
     load() {
      const qs = new URLSearchParams(window.location.search);
      const slug = qs.get('slug');
       this.loadLecture(slug).then(data => console.log(data));
    }
  }