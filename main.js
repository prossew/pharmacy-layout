const burger      = document.getElementById('burger');
const mobileMenu  = document.getElementById('mobileMenu');
const menuClose   = document.getElementById('menuClose');
const menuOverlay = document.getElementById('menuOverlay');
const menuLinks   = document.querySelectorAll('.mobile-menu__link');

function openMenu()  { mobileMenu.classList.add('open'); }
function closeMenu() { mobileMenu.classList.remove('open'); }

burger.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', closeMenu);
menuLinks.forEach(link => link.addEventListener('click', closeMenu));


const slides = document.querySelectorAll('.frow');
const prev = document.querySelector('.features__btn--prev');
const next = document.querySelector('.features__btn--next');

let index = 0;

function isMobile() {
  return window.innerWidth <= 375;
}

function initSlider() {
  if (!isMobile()) {
    slides.forEach(slide => {
      slide.style.transform = '';
      slide.style.transition = '';
      slide.style.position = '';
    });
    return;
  }
  slides.forEach((slide, i) => {
    slide.style.transition = '0.4s ease';
    slide.style.transform = `translateX(${i * 100}%)`;
  });

  index = 0;
  updateSlider();
}

function updateSlider() {
  if (!isMobile()) return;

  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${(i - index) * 100}%)`;
  });

  prev.style.opacity    = index > 0 ? '1' : '0';
  prev.style.visibility = index > 0 ? 'visible' : 'hidden';

  next.style.opacity    = index >= slides.length - 1 ? '0' : '1';
  next.style.visibility = index >= slides.length - 1 ? 'hidden' : 'visible';
}

next.addEventListener('click', () => {
  if (isMobile() && index < slides.length - 1) {
    index++;
    updateSlider();
  }
});

prev.addEventListener('click', () => {
  if (isMobile() && index > 0) {
    index--;
    updateSlider();
  }
});

initSlider();
window.addEventListener('resize', initSlider);