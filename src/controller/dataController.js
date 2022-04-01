import items from "../data/items.json";
import recent from "../data/recent.json";
import categories from "../data/categories.json";
import { koreanMatcher } from "./util";
import fs from "fs";
import { async } from "regenerator-runtime";

const getItemsWithValue = (value) => {
  if (value === "") return [];
  const filteredData = items
    .filter(({ keyword }) => koreanMatcher(value).test(keyword))
    .map(({ keyword }) => keyword);
  return filteredData;
};

const searchWithKeyword = async ({ body: { value } }, res) => {
  res.json(getItemsWithValue(value));
};

const editRecentData = (value) => {
  value ? recent.push({ keyword: value }) : (recent.length = 0);
};

const saveRecentData = () => {
  fs.writeFile(
    __dirname + "/../data/recent.json",
    JSON.stringify(recent),
    (err) => {
      if (err) return console.log(err);
    }
  );
};

const sendRecentData = (res) => {
  const filteredData = recent.map(({ keyword }) => keyword);
  res.json(filteredData);
};

const manageRecentData = ({ body: { value }, method }, res) => {
  const isDelete = method === "DELETE";
  if (value || isDelete) {
    editRecentData(value);
    saveRecentData(value);
  }
  if (!isDelete) sendRecentData(res);
};

const sendCategories = (req, res) => {
  res.json(categories);
};

export { searchWithKeyword, manageRecentData, sendCategories };
