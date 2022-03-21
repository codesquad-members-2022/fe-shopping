import recentData from "../data/recent.json";
import categoryData from "../data/categories.json";

const mainController = (req, res) => {
  const recentKeywords = recentData.map(({ keyword }) => keyword);
  const categories = categoryData;
  res.render("base", { recentKeywords, categories });
};

export { mainController };
