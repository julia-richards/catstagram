window.addEventListener('DOMContentLoaded', async (event) => {
  const response = await fetch('/kitten/image')
  const json = await response.json();
  document.querySelector('.cat-pic').src = json.src
  if (!response.ok) {} // update DOM w error message
});

document.getElementById('new-pic')
.addEventListener('click', async (event) => {
  document.querySelector('.loader').innerHTML = 'LOADING...';
  const response = await fetch('/kitten/image');
  document.querySelector('.loader').innerHTML = '';
  const json = await response.json();
  document.querySelector('.cat-pic').src = json.src
  if (!response.ok) { } // update DOM w error message
})