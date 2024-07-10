export const openModal = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', onKeyCloseModal);
};

export const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', onKeyCloseModal);
  document.removeEventListener('click', onOverlayCloseModal);
};

const onKeyCloseModal = (evt) => {
  if (evt.key === 'Escape') {
    const openedModal = document.querySelector('.popup_is-opened');
    closeModal(openedModal);
  }
};

export const onOverlayCloseModal = (evt) => {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
};
