```css
body {
    background-color: #202020;
}

html,
body {
    padding: 0;
    margin: 0;
    overflow: hidden;
}

* {
    box-sizing: border-box;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    cursor: none;
    user-select: none;
    -webkit-user-drag: none;
}

.cursor {
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background: white;
  position: absolute;
  z-index: 999;
  pointer-events: none;
  mix-blend-mode: difference;
}
.cursor-f {
  width: var(--size);
  height: var(--size);
  position: absolute;
  top: 0;
  left: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='47' height='47' viewBox='0 0 47 47' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M42.4202 42.4202C38.8403 46 33.3594 46 23.5 46C13.6406 46 8.15966 46 4.57983 42.4202C1 38.8403 1 33.3594 1 23.5C1 13.6406 1 8.15966 4.57983 4.57983C8.15966 1 13.6406 1 23.5 1C33.3594 1 38.8403 1 42.4202 4.57983C46 8.15966 46 13.6406 46 23.5C46 33.3594 46 38.8403 42.4202 42.4202Z' stroke='white'/%3E%3C/svg%3E%0A");
  background-size: cover;
  mix-blend-mode: difference;
  pointer-events: none;
  opacity: 0.5;
}
```

```javascript

//提前引入
//<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.6/gsap.min.js"></script>
const cursor = document.createElement('div');
cursor.className = 'cursor';

const cursorF = document.createElement('div');
cursorF.className = 'cursor-f';
let cursorX = 0;
let cursorY = 0;
let pageX = 0;
let pageY = 0;
let size = 8;
let sizeF = 36;
let followSpeed = .16;

document.body.appendChild(cursor);
document.body.appendChild(cursorF);

if ('ontouchstart' in window) {
  cursor.style.display = 'none';
  cursorF.style.display = 'none';
}

cursor.style.setProperty('--size', size+'px');
cursorF.style.setProperty('--size', sizeF+'px');

window.addEventListener('mousemove', function(e) {
  pageX = e.clientX;
  pageY = e.clientY;
  cursor.style.left = e.clientX-size/2+'px';
  cursor.style.top = e.clientY-size/2+'px';
});

function loop() {
  cursorX = lerp(cursorX, pageX, followSpeed);
  cursorY = lerp(cursorY, pageY, followSpeed);
  cursorF.style.top = cursorY - sizeF/2 + 'px';
  cursorF.style.left = cursorX - sizeF/2 + 'px';
  requestAnimationFrame(loop);
}

loop();

let startY;
let endY;
let clicked = false;

function mousedown(e) {
  gsap.to(cursor, {scale: 4.5});
  gsap.to(cursorF, {scale: .4});

  clicked = true;
  startY = e.clientY || e.touches[0].clientY || e.targetTouches[0].clientY;
}
function mouseup(e) {
  gsap.to(cursor, {scale: 1});
  gsap.to(cursorF, {scale: 1});

  endY = e.clientY || endY;
  if (clicked && startY && Math.abs(startY - endY) >= 40) {
    go(!Math.min(0, startY - endY)?1:-1);
    clicked = false;
    startY = null;
    endY = null;
  }
}
window.addEventListener('mousedown', mousedown, false);
window.addEventListener('touchstart', mousedown, false);
window.addEventListener('touchmove', function(e) {
  if (clicked) {
    endY = e.touches[0].clientY || e.targetTouches[0].clientY;
  }
}, false);
window.addEventListener('touchend', mouseup, false);
window.addEventListener('mouseup', mouseup, false);

```

