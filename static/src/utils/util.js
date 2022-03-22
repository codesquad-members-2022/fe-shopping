export const fetchData = async url => {
  try {
    const FULL_URL = 'http://localhost:3000/' + url;
    const response = await fetch(FULL_URL);
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
