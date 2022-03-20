
export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);

export const removeClass = (element, className) => {
  element.classList.remove(className);
}

export const addClass = (element, className) => {
  element.classList.add(className);
}

export const addEvent = (element, type, eventHandler) => {
  element.addEventListener(type, eventHandler);
}

export const delay = (callback, url) => {
  new Promise((resolve) =>
  setTimeout(() => {
    const searchedDB = fetch(`${url}?input=${$('.coupang-search').value}`)
      .then((res) => res.json());
      resolve(searchedDB);
    }, 500)
)
.then((data) => callback(data));
};

export const filterInputData = (data, userInput) => {
  return data
    .filter(v => v["name"].includes(userInput))
    .sort((a, b) => b.views - a.views);
}

export const template = (element, innerContent) => {
  element.innerHTML = innerContent;
}

export const makeRelatedTemplate = (filteredItem, userInput) => {
  return filteredItem.reduce((acc, el) => {
    const [unrelatedHead, unrelatedTail] = el.name.split(userInput);  //유저 입력값만 색깔을 바꿔주기 위해 head와 tail로 나눔
    return acc + `<a href="#">${unrelatedHead}<span class="related-word">${userInput}</span>${unrelatedTail}</a>`;
  },'');   
}

export const webStorage = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  get (key) {
    return localStorage.getItem(key);
  },

  clear(key) {
    localStorage.removeItem(key);
  }
}