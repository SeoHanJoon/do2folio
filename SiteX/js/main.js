// sticky nav
function stickyNavigation() {
    var headerHeight = document.querySelector(".header").clientHeight;
    var scrollY = window.scrollY;

    if (headerHeight <= scrollY) {
        document.body.classList.add('scrolling');
    } else {
        document.body.classList.remove('scrolling');
    }
}

window.addEventListener("scroll", stickyNavigation);


// toggle hamburger menu
(function toggleMenu() {
    const menu = document.querySelector('.header__nav--m');
    const menuClasses = menu.classList;

    menu.onclick = function () {
        menuClasses.toggle('active');
    }
})();

function resizeSlider() {
    const slider = document.querySelector('.slider');
    const windowHeight = window.innerHeight;

}

function fitHeightToWidth() {
    const projects = document.querySelectorAll('.portfolio__project');

    // for (let i = 0; i < projects.length; i++) {
    //     projects[i].style.height = projects[i].clientWidth + 'px';
    // }

    for (const iterator of projects) {
        iterator.style.height = iterator.clientWidth + 'px';
    }
}

fitHeightToWidth();
window.addEventListener("resize", fitHeightToWidth);

const floatBtn = document.querySelector('.float-btn--circle');
floatBtn.onclick = function () {
    window.scroll({
        top: 0,
        behavior: 'smooth'
    })
}