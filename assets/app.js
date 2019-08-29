const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const rect = canvas.getBoundingClientRect();

canvas.width = rect.width;
canvas.height = rect.height;

const dpRatio = window.devicePixelRatio;
canvas.width = rect.width * dpRatio;
canvas.height = rect.height * dpRatio;

ctx.scale(dpRatio, dpRatio);

const main_mouse = 0;

var shouldDraw;

function mousedown(event) {
  if (event.button === main_mouse) {
    shouldDraw = true;
    ctx.beginPath();

    let elementRect = event.target.getBoundingClientRect();
    ctx.moveTo(event.clientX - elementRect.left, event.clientY - elementRect.top);
  }
};

function mouseup(event) {
  if (event.button === main_mouse) {
    shouldDraw = false;
  }
};

function mousemove(event) {
  if (shouldDraw) {
    let elementRect = event.target.getBoundingClientRect();
    ctx.lineTo(event.clientX - elementRect.left, event.clientY - elementRect.top);
    ctx.stroke();
  }
};

function colorChange(e) {
  var color = e.target.getAttribute('id');
  console.log(color);

  ctx.strokeStyle = color;

};

function sizeChange(e) {
  var size = e.target.getAttribute('id');
  size = parseInt(size);
  console.log(size);

  ctx.lineWidth = size;
  console.log(ctx.lineWidth);

};
canvas.addEventListener('mousedown', mousedown);
canvas.addEventListener('mouseup', mouseup);
canvas.addEventListener('mousemove', mousemove);

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('color-clik')) {
    colorChange(event);
    console.log(event.target);
  } else if (event.target.classList.contains('size-clik')) {
    sizeChange(event);
    console.log(event.target);
  }
}, false);