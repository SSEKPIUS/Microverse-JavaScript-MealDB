import ht2 from './images/heart2.png';
// import countFoods from './countFoods.js';
// import { addlikes, getlikes } from './likes.js';
// import { showPopup } from './popup.js';

const container = document.querySelector('.food-container');

// eslint-disable-next-line no-unused-vars
const loadPopUp = (id) => {
  // showPopup(id);
};

// eslint-disable-next-line no-unused-vars
const like = (element) => {
  // addlikes(element);
};

const innerData = (meals) => {
  const holder = document.createElement('div');
  holder.classList.add('grid-container');
  meals.forEach((meal) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="grid-item">
          <div class="food">
              <div>
                 <span style="display: none" id="idCategory">${meal.idMeal}</span>
                  <img src="${meal.strMealThumb}" alt="">
              </div>
              <div class="food-name padded">
                  <span>${meal.strMeal}</span>
                  <span class="like"><img src="${ht2}" alt="" width="15" height="15" srcset=""></span>
              </div>
              <div class="likes padded">
                  <span class="likes-count">0<span> likes</span></span>
              </div>
              <div>
               <input type="button" value="comments">
              </div>
          </div>
      </div>`;
    div.querySelector('input[type="button"]').addEventListener('click', () => {
      loadPopUp(meal.idMeal);
    });
    div.querySelector('.like').addEventListener('click', (e) => {
      like(e.target.parentNode.parentNode.parentNode.querySelector('#idCategory').innerText);
    });
    holder.appendChild(div);
  });
  return holder;
};

const fillDom = (meals) => {
  container.append(innerData(meals));
  // countFoods(meals.length);
  // getlikes();
};

export { fillDom, innerData };