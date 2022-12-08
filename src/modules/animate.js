const randomValue = (arr) => arr[Math.floor(Math.random() * arr.length)];
export default ($) => {
  const bArray = [];
  const sArray = [2, 3, 4, 5];
  for (let i = 0; i < $('.bubbles').width(); i += 1) {
    bArray.push(i);
  }
  setInterval(() => {
    const size = randomValue(sArray);
    $('.bubbles').append(`<div class="individual-bubble" style="left: ${randomValue(bArray)}px; width: ${size}px; height:${size}px;"></div>`);
    $('.individual-bubble').animate({
      bottom: '100%',
      opacity: '-=0.7',
    }, 15000, () => {
      $(this).remove();
    });
  }, 350);
};