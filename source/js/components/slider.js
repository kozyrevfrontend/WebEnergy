const sliderContainer = document.querySelector(".slider-container");
const slides = sliderContainer.querySelectorAll(".slide");
const btnLeft = document.querySelector(".left");
const btnRight = document.querySelector(".right");

const slidesCount = slides.length;

let activeSlideIndex = 0;

slides[activeSlideIndex].classList.add("slide--active");

function moveRight() {
  if (activeSlideIndex === slidesCount - 1) {
    slides[activeSlideIndex].classList.remove("slide--active");
    activeSlideIndex = 0;
    slides[activeSlideIndex].classList.add("slide--active");
    return;
  }

  slides[activeSlideIndex].classList.remove("slide--active");
  activeSlideIndex++;
  slides[activeSlideIndex].classList.add("slide--active");
}

function moveLeft() {
  if (activeSlideIndex === 0) {
    slides[activeSlideIndex].classList.remove("slide--active");
    activeSlideIndex = slidesCount - 1;
    slides[activeSlideIndex].classList.add("slide--active");
    return;
  }

  slides[activeSlideIndex].classList.remove("slide--active");
  activeSlideIndex--;
  slides[activeSlideIndex].classList.add("slide--active");
}

btnRight.addEventListener("click", moveRight);

btnLeft.addEventListener("click", moveLeft);

function setSlideShow() {
  setInterval(moveRight, 4000);
}

setSlideShow();
