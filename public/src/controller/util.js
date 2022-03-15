function debounce(callback, limit = 100) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback.apply(this, args);
    }, limit);
  };
}

const fetchData = async (url) => {
  const response = await fetch("./carouselData.json");
  return response.json();
};

export { debounce, fetchData };
