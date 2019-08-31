const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const rect = canvas.getBoundingClientRect();
const minus = document.getElementById('minus');

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
    ctx.strokeStyle = document.getElementById('daColor').value;
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

// function colorChange(e) {
  // var color = e.target.getAttribute('id');
  // e.target.classList.add('active');

  // ctx.strokeStyle = document.getElementById('daColor').value;
// };


function sizeChange(e) {
  var size = e.target.getAttribute('id');

  if (size === "plus") {
    ctx.lineWidth += 5;
  } else {
    ctx.lineWidth -=5
    if (ctx.lineWidth < 1) {
      ctx.lineWidth === 1;
      minus.classList.add('inactive');
    }
  }
  document.getElementById('brushSize').innerHTML = 'Brush size: ' + ctx.lineWidth + 'px';
  if (ctx.lineWidth === 1) {
    minus.classList.add('inactive');
  } else {
    minus.classList.remove('inactive');
  }
};

function save(e) {
  const save = document.getElementById('save');
  save.setAttribute('download', 'my-drawing.png');
  save.setAttribute('href', canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream'));
}

canvas.addEventListener('mousedown', mousedown);
canvas.addEventListener('mouseup', mouseup);
canvas.addEventListener('mousemove', mousemove);

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('color-clik')) {
    let active = document.querySelector('.active');
    if (active) {
      active.classList.remove('active');
    }
    colorChange(event);
  } else if (event.target.classList.contains('size-clik')) {
    sizeChange(event);
  } else if (event.target.id === 'save') {
    save(event);
  }
}, false);

window.onload = function() {
  minus.classList.add('inactive');
};