const body = document.body;

// sticky nav
function stickyNavigation() {
    var headerHeight = document.querySelector(".header").clientHeight;
    var scrollY = window.scrollY;

    if (headerHeight <= scrollY) {
        body.classList.add('scrolling');
    } else {
        body.classList.remove('scrolling');
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

// fit project image height to width
function fitHeightToWidth() {
    const projects = document.querySelectorAll('.portfolio__project');
    const height = projects[0].clientWidth;

    for (const iterator of projects) {
        iterator.style.height = height + 'px';
    }
}
fitHeightToWidth();
window.addEventListener("resize", fitHeightToWidth);

// float button event
const floatBtn = document.querySelector('.float-btn--circle');
floatBtn.onclick = () => {
    window.scroll({
        top: 0,
        behavior: 'smooth'
    })
}

// scroll to section
const navLink = document.querySelectorAll('header a');

(function setLink() {
    for (const iterator of navLink) {
        iterator.onclick = linkTo;
    }
})();

function linkTo(e) {
    e.preventDefault();

    const g = this.getAttribute('href');
    const t = document.querySelector('.' + g);

    window.scroll({
        top: t.offsetTop - 80,
        behavior: 'smooth'
    });
}

//project inlarge image
(function inlargeInit() {
    const images = document.querySelectorAll('.portfolio__project img');

    for (const iterator of images) {
        iterator.onclick = inlargeImage;
    }

})();

function inlargeImage() {
    body.classList.add('lock');
    const img = document.querySelector('.modal__image');
    img.setAttribute('src', this.getAttribute('src'));
    img.setAttribute('alt', this.getAttribute('alt'));

    document.querySelector('.modal').onclick = () => {
        body.classList.remove('lock');
    }
}

//IE,Edge fix Object-fit
if ('objectFit' in document.documentElement.style === false) {
    const imgContainer = document.querySelectorAll('.portfolio__project');
    const modalContainer = document.querySelector('.modal__container');

    for (const iterator of imgContainer) {
        const imgSrc = iterator.querySelector('img').src;
        iterator.querySelector('img').style.display = 'none';
        iterator.style.backgroundSize = 'cover';
        iterator.style.backgroundImage = 'url(./images' + imgSrc.split('images')[1] + ')';
    }
}