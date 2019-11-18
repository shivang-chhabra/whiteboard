// var activeTool="pencil"
ctx.strokeStyle = "red";
ctx.lineWidth = 5;
var eraser = document.querySelector(".eraser");
var pencil = document.querySelector(".pencil");

function handletoolChange(tool) {
  if (tool=="eraser") {
    // activeTool = "eraser";
    eraser.classList.add("active");
    pencil.classList.remove("active");
    ctx.globalCompositeOperation="destination-out";
  } else if(tool=="pencil") {
    // activeTool = "pen";
    pencil.classList.add("active");
    eraser.classList.remove("active");
    ctx.strokeStyle = "red";
    ctx.globalCompositeOperation = "source-over";
  }
}
