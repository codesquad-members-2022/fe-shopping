import { fetchHeaderData } from './header-fetch.js';
import { fetchCarouselData } from './carousel-fetch.js';

async function parseData() {
  await fetchHeaderData();
  await fetchCarouselData();
}

parseData();
