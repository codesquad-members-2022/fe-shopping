import { bar } from './template/bar.js';
import { header } from './template/header.js';
import { carousel } from './template/carousel.js';

const wrap = document.querySelector('.wrap');
wrap.insertAdjacentHTML('afterbegin', bar);

const container = document.querySelector('.container');
container.insertAdjacentHTML('afterbegin', header);
container.insertAdjacentHTML('afterbegin', carousel);
