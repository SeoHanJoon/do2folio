const body = document.body;
const wrapper = document.getElementById("wrapper");

// body.classList.add("load");
// init
resizeDiv();

//resize main wrapper width window inner height.
function resizeDiv() {
  wrapper.style.height = window.innerHeight + "px";
}
window.addEventListener("resize", resizeDiv);

window.onload = () => {
  body.classList.add("load");
};
