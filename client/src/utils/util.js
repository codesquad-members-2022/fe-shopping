export const $ = className => document.querySelector(className);
export const $$ = className => document.querySelectorAll(className);
const deploy = 'PROD';
const serverURL = deploy === 'DEV' ? 'http://localhost:3000' : 'https://mupang.herokuapp.com';

export const fetchGetData = (path, keyword) => {
  const url = `${serverURL}/${path}/${keyword}`;

  return fetch(url)
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

export const timeDelay = time => new Promise(resolve => setTimeout(resolve, time));

export const checkElementClass = obj => {
  if (!obj.target) {
    return false;
  }

  const isExistClass = obj.checkClasses.some(className => {
    if (obj.target.classList.contains(className)) return true;
  });

  if (isExistClass) {
    return true;
  } else {
    return false;
  }
};

export const toggleClass = (element, classes) => {
  if (!element) {
    return;
  }
  const classList = classes.split(' ');
  classList.forEach(className => {
    element.classList.toggle(className);
  });
};

export const debounce = (callback, time) => {
  let timerId = null;

  return function () {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => callback.apply(this, arguments), time);
  };
};
