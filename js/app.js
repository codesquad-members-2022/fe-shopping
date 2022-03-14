import { bar } from './template/bar.js';
import { header } from './template/header.js';

const wrap = document.querySelector('.wrap');
wrap.insertAdjacentHTML('afterbegin', bar);
