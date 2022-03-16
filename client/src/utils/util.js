export const $ = className => document.querySelector(className);
const deploy = 'DEV';
const serverURL = deploy === 'DEV' ? 'http://localhost:3000' : 'https://mupang.herokuapp.com';

export const handleHeightBottomAnimate = obj => {
  (function animate() {
    obj.start += obj.value;
    const maxHeight = parseInt(getComputedStyle(obj.element).maxHeight);
    obj.element.style.maxHeight = `${parseInt(maxHeight * obj.start)}px`;
    if (obj.start < obj.height) {
      obj.raf = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(obj.raf);
    }
  })();
};

export const handleHeightTopAnimate = obj => {
  let raf = null;
  (function animate() {
    obj.start += obj.value;
    obj.element.style.maxHeight = `${parseInt(obj.start)}px`;
    if (obj.start >= 0) {
      raf = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(raf);
      obj.parentElement.removeChild(obj.element);
    }
  })();
};

export const fetchPostData = (path, keyword) => {
  const url = `${serverURL}/${path}/${keyword}`;

  return fetch(url)
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });
};
