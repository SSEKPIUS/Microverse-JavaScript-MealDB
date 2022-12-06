import $ from 'jquery';
import { fillDom } from './Dom.js';

export default async () => {
  await $.get(
    `${process.env.URL}filter.php?a=American`,
    (data, status) => {
      if (status === 'success') {
        fillDom(data.meals);
      }
    },
  );
};