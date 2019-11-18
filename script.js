// var pencil = document.querySelector(".pencil");
// mousedown
// mousemove
// mouseup
var isDown = false;
const undostack = [];
const redostack = [];
const undo = document.querySelector(".undo");
const redo = document.querySelector(".redo");
redo.addEventListener("mousedown", function () {
  interval = window.setInterval(function () {
    if (redostack.length <= 0) {
      return;
    }
    var redo = redostack.pop();
    undostack.push(redo);
    redraw();
    var i = redostack.length - 1;
    while (redostack[i].type != "begin") {
      var redo = redostack.pop();
      undostack.push(redo);
      redraw();
      i--;
    }
  }, 50);
})
redo.addEventListener("mouseup", function () {
  clearInterval(interval);
  interval = null;
})
undo.addEventListener("mousedown", function () {
  interval = window.setInterval(function () {
    if (undostack.length <= 0) {
      return;
    }
    var i = undostack.length - 1;
    while (undostack[i].type != "begin") {
      var undo = undostack.pop();
      redostack.push(undo);
      redraw();
      i--;
    }
    var undo = undostack.pop();
    redostack.push(undo);
    redraw();
  }, 50);

})

undo.addEventListener("mouseup", function () {
  clearInterval(interval);
  interval = null;
})
function redraw() {
  if (undostack.length <= 0) {
    return;
  }
  ctx.clearRect(0, 0, board.width, board.height);
  for (var i = 0; i < undostack.length; i++) {
    let { x, y, effect, color, width, type } = undostack[i];
  
    if (type === "begin") {
      ctx.lineWidth = width;
      ctx.strokeStyle = color;
      ctx.globalCompositeOperation = effect;
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
    else if (type === "end") {
      ctx.lineWidth = width;
      ctx.strokeStyle = color;
      ctx.globalCompositeOperation = effect;
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }
}

  board.addEventListener("mousedown", function (event) {
    var { x, y } = getLocation(event);
    ctx.beginPath();
    ctx.moveTo(x, y);
    isDown = true;
    const point = {
      x, y,
      effect: ctx.globalCompositeOperation,
      color: ctx.strokeStyle,
      width: ctx.lineWidth,
      type:"begin"

    
    }
    undostack.push(point);
    console.log("down");
  });

  board.addEventListener("mousemove", function (event) {
    if (!isDown) return;
    var { x, y } = getLocation(event);
    ctx.lineTo(x, y);
    ctx.stroke();
    const point = {
      x, y,
      effect: ctx.globalCompositeOperation,
      color: ctx.strokeStyle,
      width: ctx.lineWidth,
      type:"end"


    }
    undostack.push(point);
    console.log("move");
  });
  board.addEventListener("mouseup", function () {
    isDown = false;
  });
  function getLocation(event) {
    console.log(board.getBoundingClientRect());
    console.log(event.clientY);
    return {
      x: event.clientX - board.getBoundingClientRect().left,

      y: event.clientY - board.getBoundingClientRect().top
    };
  }
