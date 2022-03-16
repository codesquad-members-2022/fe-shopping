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
    const { query } = options;
    const fullUrl = `${API_END_POINT}${url}${
      query
        ? `?${Object.entries(query)
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

export { delay, request };
