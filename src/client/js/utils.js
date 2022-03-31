const API_END_POINT = DEPLOY
  ? "https://fe-shopping.herokuapp.com/"
  : "http://localhost:3000/";

const delay = (ms) =>
  new Promise((resolve, reject) => {
    try {
      setTimeout(resolve, ms);
    } catch (e) {
      reject(e);
    }
  });

const request = async (url, options) => {
  try {
    const fullUrl = `${API_END_POINT}${url}${
      options?.query
        ? `?${Object.entries(options.query)
            .map(([key, value]) => `${key}=${value}`)
            .join("&")}`
        : ""
    }`;
    const response = await fetch(fullUrl);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const debounce = ({ msTime, callback }) => {
  const msDiffRange = 10;
  const eventTypes = {};
  return function (event) {
    const { type } = event;
    eventTypes[type] = new Date();
    delay(msTime).then(() => {
      const delayDate = new Date();
      const diff = delayDate - eventTypes[type];
      const isRangeIn = diff <= msTime + msDiffRange && diff >= msTime;
      if (isRangeIn) {
        callback(event);
      }
    });
  };
};

export { delay, request, debounce };
