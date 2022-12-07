import ht2 from './images/heart2.png';
import countFoods from './countFoods.js';
import { addlikes, getlikes } from './likes.js';
import showPopup from './popup.js';

const container = document.querySelector('.food-container');
const popup = document.querySelector('#modalDisplay');
const loadPopUp = (id) => {
  showPopup(id);
};
const like = (element) => {
  addlikes(element);
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
      // loadPopUp(meal.idMeal);

      const pop = () => {
        popup.innerHTML = `
          <div class="popIt">
            <div class ="flex pop column">
             <span class="close-button">&times;</span>
             <div class="popup_image">
                <img class="pop_image" src="${meal.strMealThumb}" alt="asdf">
              </div>
              <p class="pop_meal">Name: ${meal.strMeal}</p> 
            
              <div class="comment_count">
              </div>
              
              <div class="pop_comment">
              </div>
              <div id ="commentList"></div>
                <h3 class="add-comm">Add a comment</h3>
              <div class="inputDiv">
                <form class="form">
                  <input id="name"  type="text" name="user" required placeholder="Your Name"><br>
                  <textarea id="text" type="text" rows=6 name="text" required placeholder="Your insight"></textarea><br>
                  <div>
                  <button class="submit-btn" type="submit">Comment</button>
                  <button class="view_more">Refresh Comments</button>
                </div>
                </form>
                
              </div>
            </div>
            </div>`;
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      };
      pop();
      const close = document.querySelector('.close-button');
      close.addEventListener('click', () => {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto';
      });
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
  countFoods(meals.length);
  getlikes();
};
export { fillDom, innerData };