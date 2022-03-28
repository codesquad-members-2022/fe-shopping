import { fetchHeaderData } from './header-fetch.js';
import { fetchCategoryData } from './category-fetch.js';

async function parseData() {
  await fetchHeaderData();
  await fetchCategoryData();
}

parseData();
