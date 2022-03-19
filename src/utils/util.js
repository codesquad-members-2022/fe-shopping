import { MAX_LOCAL_STORAGE } from '../constant/constant.js';

function handlelocalStorage() {
  return {
    set(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    get(key) {
      return JSON.parse(localStorage.getItem(key));
    },
    reset() {
      localStorage.clear();
    },
  };
}

export const myLocalStorage = handlelocalStorage();
