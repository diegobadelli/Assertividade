// JavaScript code to create and position bubbles
const numslider_thumb = 10; // Adjust the number of bubbles as needed

for (let i = 0; i < numslider_thumb; i++) {
  const slider_thumb = document.createElement('div');
  slider_thumb.classList.add('bubble');
  document.body.appendChild(slider_thumb);

  // Randomize the position
  const randomX = Math.random() * window.innerWidth;
  const randomY = Math.random() * window.innerHeight;

  slider_thumb.style.left = `${randomX}px`;
  slider_thumb.style.top = `${randomY}px`;
}
