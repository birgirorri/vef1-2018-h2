const LOCALSTORAGE_KEY = 'saved_lectures';
let lectureArray = [];
const LOCALSTORAGE_KEY2 = 'saved_types'
let typeArray = [];

export function loadSavedLectures() {
  const saved = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY));

  if (saved) {
    lectureArray = saved;
    return lectureArray;
  }
  return [];
}

export function saveLectures(slug) {
  if (!lectureArray.includes(slug)) {
    lectureArray.push(slug);
  }
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(lectureArray));
  console.log(lectureArray);
}

export function removeLectures(slug) {
  const index = lectureArray.indexOf(slug);
  if (index > -1) {
    lectureArray.splice(index, 1);
  }
  console.log(lectureArray);
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(lectureArray));
}

export function clear() {
  window.localStorage.clear();
  lectureArray = [];
}

export function loadSavedTypes() {
  const saved = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY2));

  if (saved) {
    typeArray = saved;
    return typeArray;
  }
  return [];
}

export function saveTypes(type) {
  typeArray.push(type);
  localStorage.setItem(LOCALSTORAGE_KEY2, JSON.stringify(typeArray));
  console.log(typeArray);
}

export function removeTypes(type) {
  const index = typeArray.indexOf(type);
  if (index > -1) {
    typeArray.splice(index, 1);
  }
  console.log(typeArray);
  localStorage.setItem(LOCALSTORAGE_KEY2, JSON.stringify(typeArray));
}