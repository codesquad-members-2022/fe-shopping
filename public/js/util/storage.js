export default {
  setLocalStorage(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
  },

  getLocalStorage(key) {
    if (!localStorage.getItem(key)) return;
    return JSON.parse(localStorage.getItem(key));
  },

  removeFromLocalStorage(key) {
    localStorage.removeItem(key);
  },
};
