import keywordData from "../data/keywords.json" assert { type: "json" };

export const getSearch = (req, res) => {
  try {
    const keyword = req.params.keyword;
    if (!keyword || !keywordData[keyword]) return;
    return res.json(keywordData[keyword]);
  } catch (err) {
    console.error(err);
  }
};
