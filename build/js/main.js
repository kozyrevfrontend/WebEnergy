"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  'use strict';

  var Slider = /*#__PURE__*/function () {
    function Slider(domNode, delay) {
      _classCallCheck(this, Slider);

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

    _createClass(Slider, [{
      key: "init",
      value: function init() {
        this.setActiveSlide();
        this.buttonLeft.addEventListener('click', this.moveLeft);
        this.buttonRight.addEventListener('click', this.moveRight);
        this.setSlideShow();
      }
    }, {
      key: "setActiveSlide",
      value: function setActiveSlide() {
        this.slides[this.activeSlideIndex].classList.add("slider__item--active");
      }
    }, {
      key: "removeActiveSlide",
      value: function removeActiveSlide() {
        this.slides[this.activeSlideIndex].classList.remove("slider__item--active");
      }
    }, {
      key: "moveRight",
      value: function moveRight() {
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
    }, {
      key: "moveLeft",
      value: function moveLeft() {
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
    }, {
      key: "setSlideShow",
      value: function setSlideShow() {
        setInterval(this.moveRight, this.delay);
      }
    }]);

    return Slider;
  }();

  var slider = new Slider(document.querySelector('.slider'), 4000);

  var Popup = /*#__PURE__*/function () {
    function Popup(button) {
      _classCallCheck(this, Popup);

      this.button = button;
      this.popup = window.$('.popup');
      this.popupOverlay = window.$('.popup__overlay');
      this.closeButton = window.$('.popup__close-btn');
      this.userNameInput = window.$('#user-name');
      this.showPopup = this.showPopup.bind(this);
      this.hidePopup = this.hidePopup.bind(this);
      this.closePopupEscPress = this.closePopupEscPress.bind(this);
      this.popupOverlayClickHandler = this.popupOverlayClickHandler.bind(this);
    }

    _createClass(Popup, [{
      key: "init",
      value: function init() {
        this.button.on('click', this.showPopup);
      }
    }, {
      key: "closePopupEscPress",
      value: function closePopupEscPress(evt) {
        if (evt.key === "Escape") {
          this.hidePopup();
        }
      }
    }, {
      key: "popupOverlayClickHandler",
      value: function popupOverlayClickHandler(evt) {
        if (evt.target === evt.currentTarget) {
          this.hidePopup();
        }
      }
    }, {
      key: "showPopup",
      value: function showPopup() {
        this.popup.fadeIn(1000);
        this.userNameInput.focus();
        window.$('body').css('overflow', 'hidden');
        window.$(document).on('keydown', this.closePopupEscPress);
        this.popupOverlay.on('click', this.popupOverlayClickHandler);
        this.closeButton.on('click', this.hidePopup);
      }
    }, {
      key: "hidePopup",
      value: function hidePopup() {
        this.popup.fadeOut(1000);
        window.$('body').css('overflow', 'visible');
        window.$(document).off('keydown', this.closePopupEscPress);
      }
    }]);

    return Popup;
  }();

  var popup = new Popup(window.$('.contacts__callback-btn'));
  slider.init();
  popup.init();
})();
//# sourceMappingURL=main.js.map
