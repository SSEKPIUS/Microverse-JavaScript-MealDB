import './style.css';
import $ from 'jquery';
import animate from './modules/animate.js';
import load from './modules/meals.js';

$(document).ready(($) => {
  animate($);
  load();
});
