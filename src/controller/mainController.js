import data from "../data/recent.json";

const mainController = (req, res) => {
  const recentData = data.map(({ keyword }) => keyword);
  res.render("base", { recentData });
};

export { mainController };
