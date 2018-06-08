const body = document.body;

// body.classList.add("load");
// init
resizeDiv();

//resize main wrapper width window inner height.
function resizeDiv() {
  const limiter = document.getElementById("limiter");
  limiter.style.height = window.innerHeight + "px";
}
window.addEventListener("resize", resizeDiv);

window.onload = () => {
  body.classList.add("load");
};
