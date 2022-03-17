const delay = (data, time) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), time);
  });
};

export { delay };