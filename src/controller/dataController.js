import items from "../data/items.json";
import recent from "../data/recent.json";
import categories from "../data/categories.json";
import { koreanMatcher } from "./util";
import { async } from "regenerator-runtime";

const getItemsWithValue = (value) => {
  if (value === "") return [];
  const filteredData = items
    .filter(({ keyword }) => koreanMatcher(value).test(keyword))
    .map(({ keyword }) => keyword);
  return filteredData;
};

const searchWithKeyword = async (req, res) => {
  const {
    body: { value },
  } = req;
  res.json(getItemsWithValue(value));
};

const searchRecent = (req, res) => {
  const filteredData = recent.map(({ keyword }) => keyword);
  res.json(filteredData);
};

const sendCategories = (req, res) => {
  res.json(categories);
};

export { searchWithKeyword, searchRecent, sendCategories };
