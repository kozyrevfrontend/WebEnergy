(function () {
  'use strict';

  class Slider {
    constructor(domNode, delay) {
      this.sliderContainer = domNode.querySelector(".slider__container");
      this.slides = this.sliderContainer.querySelectorAll(".slider__item");
      this.buttonLeft = domNode.querySelector(".slider__btn--left");
      this.buttonRight = domNode.querySelector(".slider__btn--right");
      this.slidesCount = this.slides.length;
      this.activeSlideIndex = 0;
      this.delay = delay;

      this.moveLeft = this.moveLeft.bind(this);
      this.moveRight = this.moveRight.bind(this);
    }

    init() {
      this.setActiveSlide();
      this.buttonLeft.addEventListener('click', this.moveLeft);
      this.buttonRight.addEventListener('click', this.moveRight);
      this.setSlideShow();
    }

    setActiveSlide() {
      this.slides[this.activeSlideIndex].classList.add("slider__item--active");
    }

    removeActiveSlide() {
      this.slides[this.activeSlideIndex].classList.remove("slider__item--active");
    }

    moveRight() {
      if (this.activeSlideIndex === this.slidesCount - 1) {
        this.removeActiveSlide();
        this.activeSlideIndex = 0;
        this.setActiveSlide();
        return;
      }

      this.removeActiveSlide();
      this.activeSlideIndex++;
      this.setActiveSlide();
    }

    moveLeft() {
      if (this.activeSlideIndex === 0) {
        this.removeActiveSlide();
        this.activeSlideIndex = this.slidesCount - 1;
        this.setActiveSlide();
        return;
      }

      this.removeActiveSlide();
      this.activeSlideIndex--;
      this.setActiveSlide();
    }

    setSlideShow() {
      setInterval(this.moveRight, this.delay);
    }
  }

  const slider = new Slider(document.querySelector('.slider'), 4000);

  slider.init();

}());

//# sourceMappingURL=main.js.map
