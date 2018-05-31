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