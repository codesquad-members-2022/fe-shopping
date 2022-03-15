export const $ = className => document.querySelector(className);
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
