export default (data) => {
  document.querySelector('.no-comment').innerText = `(${data.length})`;
  return data;
};