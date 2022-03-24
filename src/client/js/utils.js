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

const debounce = ({ baseTarget, standardValue, msTime, callback }) => {
  const baseValue = baseTarget[standardValue];
  delay(msTime).then(() => {
    if (baseValue === baseTarget[standardValue]) {
      callback();
    }
  });
};

export { delay, request, debounce };
