export const getAutoCompleteData = async (keyword) => {
  const url = `https://completion.amazon.com/api/2017/suggestions?mid=ATVPDKIKX0DER&alias=aps&prefix=${keyword}&`;
  const res = await fetch(url);
  const jsonData = await res.json();
  return jsonData.suggestions;
};
