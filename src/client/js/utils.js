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

const debounce = ({
  event,
  standardValue,
  standardValues,
  msTime,
  callback,
}) => {
  const findBaseValue = (standardValue) => {
    const [firstDepth, secondDepth] = standardValue.split("-");
    const baseValue = secondDepth
      ? event[firstDepth][secondDepth]
      : event[firstDepth];
    return baseValue;
  };

  const isSameValues = (valuesOne, valuesTwo) => {
    if (!Array.isArray(valuesOne) && !Array.isArray(valuesTwo)) {
      return valuesOne === valuesTwo;
    }
    return valuesOne.every((v1, idx) => {
      const v2 = valuesTwo[idx];
      return v1 === v2;
    });
  };

  const baseValue = standardValues
    ? standardValues.map((standard) => findBaseValue(standard))
    : findBaseValue(standardValue);

  delay(msTime).then(() => {
    const compareValue = standardValues
      ? standardValues.map((standard) => findBaseValue(standard))
      : findBaseValue(standardValue);

    console.log(baseValue, compareValue);
    if (isSameValues(baseValue, compareValue)) {
      callback();
    }
  });
};

export { delay, request, debounce };
