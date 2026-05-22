/* ============================================================
   БУРГЕР МЕНЮ
   Открытие/закрытие мобильного навигационного меню
============================================================ */
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");
const menuClose = document.getElementById("menuClose");
const menuOverlay = document.getElementById("menuOverlay");
const menuLinks = document.querySelectorAll(".mobile-menu__link");

/* Открываем меню — добавляем класс .open */
function openMenu() {
  mobileMenu.classList.add("open");
}

/* Закрываем меню — убираем класс .open */
function closeMenu() {
  mobileMenu.classList.remove("open");
}

/* Слушатели событий для открытия/закрытия */
burger.addEventListener("click", openMenu);
menuClose.addEventListener("click", closeMenu);
menuOverlay.addEventListener("click", closeMenu); /* клик на затемнение */
menuLinks.forEach((link) =>
  link.addEventListener("click", closeMenu),
); /* клик на пункт меню */

/* ============================================================
   СЛАЙДЕР КАРТОЧЕК (секция Features)
   Работает только на мобильных устройствах (до 375px)
   На десктопе карточки отображаются в зигзаг-раскладке
============================================================ */
const slides = document.querySelectorAll(".frow");
const prev = document.querySelector(".features__btn--prev");
const next = document.querySelector(".features__btn--next");

let index = 0; /* текущий индекс активного слайда */

/* Проверяем — мобильное ли устройство */
function isMobile() {
  return window.innerWidth <= 375;
}

/* Инициализация слайдера */
function initSlider() {
  if (!isMobile()) {
    /* Десктоп — сбрасываем все inline стили чтобы CSS управлял раскладкой */
    slides.forEach((slide) => {
      slide.style.transform = "";
      slide.style.transition = "";
      slide.style.position = "";
    });
    return;
  }

  /* Мобилка — расставляем слайды в ряд горизонтально */
  slides.forEach((slide, i) => {
    slide.style.transition = "0.4s ease";
    slide.style.transform = `translateX(${i * 100}%)`;
  });

  index = 0; /* сбрасываем на первый слайд */
  updateSlider();
}

/* Обновление позиций слайдов и состояния кнопок */
function updateSlider() {
  if (!isMobile()) return;

  /* Сдвигаем все слайды относительно текущего индекса */
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${(i - index) * 100}%)`;
  });

  /* Показываем/скрываем кнопку назад */
  prev.style.opacity = index > 0 ? "1" : "0";
  prev.style.visibility = index > 0 ? "visible" : "hidden";

  /* Показываем/скрываем кнопку вперёд */
  next.style.opacity = index >= slides.length - 1 ? "0" : "1";
  next.style.visibility = index >= slides.length - 1 ? "hidden" : "visible";
}

/* Кнопка вперёд */
next.addEventListener("click", () => {
  if (isMobile() && index < slides.length - 1) {
    index++;
    updateSlider();
  }
});

/* Кнопка назад */
prev.addEventListener("click", () => {
  if (isMobile() && index > 0) {
    index--;
    updateSlider();
  }
});

/* Запускаем при загрузке страницы */
initSlider();

/* Перезапускаем при изменении размера окна */
window.addEventListener("resize", initSlider);
