export const getLocalStorageForArray = (key) => {
  const output = localStorage.getItem(key);
  return JSON.parse(output) || [];
};

export const setLocalStorageForArray = (key, value) => {
  const curLocalStorage = getLocalStorageForArray(key).filter((history) => history !== value);
  if (curLocalStorage.length >= 10) {
    curLocalStorage.shift();
  }
  curLocalStorage.push(value);

  localStorage.setItem(key, JSON.stringify(curLocalStorage));
};
