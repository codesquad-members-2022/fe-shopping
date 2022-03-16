import { fetchHeaderData } from './header-fetch.js';
import { fetchCarouselData } from './carousel-fetch.js';
import { fetchCategoryData } from './category-fetch.js';

async function parseData() {
  await fetchHeaderData();
  await fetchCarouselData();
  await fetchCategoryData();
}

parseData();
