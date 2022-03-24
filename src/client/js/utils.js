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
  const events = {};
  return function (event) {
    events[event.type] = {};
    events[event.type].event = event;
    delay(msTime).then(() => {
      if (events[event.type].event === event) {
        callback(event);
      }
    });
  };
};

export { delay, request, debounce };
