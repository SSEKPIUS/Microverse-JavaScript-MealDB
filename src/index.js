import './style.css';
import $ from 'jquery';
import animate from './modules/animate.js';
import countFoods from './modules/countFoods.js';
import ht2 from './images/heart2.png';
import ht from './images/heart.png';
import countComments from './modules/countComments.js';

const container = document.querySelector('.food-container');
const popupSection = document.querySelector('.pop-up');

const createPopHtml = (mealDetails) => {
  const popupDetails = document.createElement('div');
  popupDetails.className = 'popup-details';
  popupDetails.innerHTML = `
    <span id="closebtn" class="closebtn">&times;</span>
    <div class="meal">
      <img src='${mealDetails.strMealThumb}' alt="meal">
    </div>
    <h2>${mealDetails.strMeal}</h2>
    <div class="flex">
      <h4>Area: <span>${mealDetails.strArea}<span/></h4>
      <h4>Category: <span>${mealDetails.strCategory}<span/></h4>
    </div>
    <h3>Comments <span class="no-comment">(0)<span/></h3>
    <div class="comments-div">
    </div>
    <h3>Add a Comment</h3>
    <form method="post" class="flex" id="form">
      <input class="name-field" type="text" id="fname" name="fname" value="" placeholder="Your name" required>
      <textarea maxlength="500" cols="30" rows="10" id="newUserComment" class="text-area" placeholder="Your insights" required></textarea>
      <button class="add-comment-btn" type="submit">Comment</button>
    </form> 
    `;
  popupDetails.querySelector('#closebtn').addEventListener('click', () => {
    popupSection.style.display = 'none';
  });
  popupDetails.querySelector('#form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = e.target.elements.fname.value;
    const comment = e.target.elements.newUserComment.value;
    await $.post(
      `${process.env.BaseURL}comments`,
      {
        item_id: mealDetails.idMeal,
        username: user,
        comment,
      },
      (data, status) => {
        if (status === 'success') {
          e.target.elements.fname.value = '';
          e.target.elements.newUserComment.value = '';
          getComments(mealDetails.idMeal);
        }
      },
    );
  });

  popupSection.innerHTML = '';
  popupSection.append(popupDetails);
  popupSection.style.display = 'block';
  getComments(mealDetails.idMeal);
};

const getComments = async (id) => {
  await $.get(
    `${process.env.BaseURL}comments?item_id=${id}`,
    (data, status) => {
      if (status === 'success') {
        const commentDiv = document.querySelector('.comments-div');
        commentDiv.innerHTML = '';
        data.forEach((el) => {
          const commentParagraph = document.createElement('p');
          commentParagraph.innerHTML = `<span>${el.creation_date}</span><span>${el.username}</span><span>${el.comment}</span>`;
          commentDiv.appendChild(commentParagraph);
        });
        countComments(data);
      }
    },
  );
};

const loadPopUp = async (id) => {
  await $.get(
    `${process.env.URL}lookup.php?i=${id}`,
    (data, status) => {
      if (status === 'success') {
        createPopHtml(data.meals[0]);
      }
    },
  );
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
      addlikes(e);
    });
    holder.appendChild(div);
  });
  return holder;
};

const addlikes = async (e) => {
  const itemId = e.target.parentNode.parentNode.parentNode.querySelector('#idCategory').innerText;
  await $.post(
    `${process.env.BaseURL}likes/`,
    {
      item_id: itemId,
    },
    (data, status) => {
      if (status === 'success') {
        const cVAL = parseInt(e.target.parentNode.parentNode.parentNode.querySelector('.likes-count').innerText.replace('likes', '').trim(), 10) + 1;
        e.target.parentNode.parentNode.parentNode.querySelector('.likes-count').innerHTML = `${cVAL} <span> likes</span>`;
        e.target.parentNode.parentNode.parentNode.querySelector('.like img').src = ht;
      }
    },
  );
};

const getlikes = async () => {
  await $.get(
    `${process.env.BaseURL}likes/`,
    (data, status) => {
      if (status === 'success') {
        const nodes = document.querySelectorAll('.grid-item');
        nodes.forEach((node) => {
          const id = node.querySelector('#idCategory').innerText;
          const value = data.find((set) => set.item_id === id);
          if (value) {
            node.querySelector('.like img').src = ht;
            node.querySelector('.likes-count').innerHTML = `${value.likes}<span> likes</span>`;
          }
        });
      }
    },
  );
};

const fillDom = (meals) => {
  container.innerHTML = '';
  container.append(innerData(meals));
  countFoods(meals.length);
  getlikes();
};

const load = async () => {
  await $.get(
    `${process.env.URL}filter.php?a=American`,
    (data, status) => {
      if (status === 'success') {
        fillDom(data.meals);
      }
    },
  );
};

$(document).ready(($) => {
  animate($);
  load();
});
