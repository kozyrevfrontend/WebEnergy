class Popup {
  constructor(button) {
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

  init() {
    this.button.on('click', this.showPopup);
  }

  closePopupEscPress(evt) {
    if (evt.key === `Escape`) {
      this.hidePopup();
    }
  }

  popupOverlayClickHandler(evt) {
    if (evt.target === evt.currentTarget) {
      this.hidePopup();
    }
  }

  showPopup() {
    this.popup.fadeIn(1000);
    this.userNameInput.focus();
    window.$('body').css('overflow', 'hidden');

    window.$(document).on('keydown', this.closePopupEscPress);

    this.popupOverlay.on('click', this.popupOverlayClickHandler);

    this.closeButton.on('click', this.hidePopup);
  }

  hidePopup() {
    this.popup.fadeOut(1000);
    window.$('body').css('overflow', 'visible');
    window.$(document).off('keydown', this.closePopupEscPress);
  }
}

export const popup = new Popup(window.$('.contacts__callback-btn'));
