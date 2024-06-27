import './index.css';
import { createCard, deleteCard, likeCard } from './components/card/card';
import { openModal, closeModal, onOverlayCloseModal } from './components/modal';
import { enableValidation, clearValidation } from './components/validation';
import { getCards, getUserInfo, postNewCard, updateAvatar, editProfile } from './components/API';

// глобальные переменные
const profileAvatar = document.querySelector('.profile__image');
const avatarModal = document.querySelector('.popup_type_avatar');
const editAvatarForm = document.forms['edit-avatar'];
const editAvatarUrlInput = editAvatarForm.querySelector('.popup__input_type_avatar');
const editProfileButton = document.querySelector('.profile__edit-button');
const addNewCardButton = document.querySelector('.profile__add-button');
const closeModalButtons = document.querySelectorAll('.popup__close');
const editProfileModal = document.querySelector('.popup_type_edit');
const addNewCardModal = document.querySelector('.popup_type_new-card');
const editProfileForm = document.forms['edit-profile'];
const editProfileNameInput = editProfileForm.querySelector('.popup__input_type_name');
const editProfileDescriptionInput = editProfileForm.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const cardsList = document.querySelector('.places__list');
const addNewCardForm = document.forms['new-place'];
const addNewCardFormNameInput = addNewCardForm.querySelector('.popup__input_type_card-name');
const addNewCardFormLinkInput = addNewCardForm.querySelector('.popup__input_type_url');
const modals = document.querySelectorAll('.popup');
const cardImageModal = document.querySelector('.popup_type_image');
const modalImage = cardImageModal.querySelector('.popup__image');
const modalCaption = cardImageModal.querySelector('.popup__caption');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//enableValidation(validationConfig);

// сохранение
const showSaving = (submitButton) => {
  submitButton.textContent = 'Сохранение...';
};

// ресет кнопки
const resetSumbitButton = (submitButton) => {
  submitButton.textContent = 'Сохранить';
};

// открытие модалки с картинкой из карточки
const openImageModal = (cardData) => {
  modalImage.src = cardData.link;
  modalImage.alt = cardData.name;
  modalCaption.textContent = cardData.name;

  openModal(cardImageModal);
};

// вывод карточек с сервера
Promise.all([getUserInfo(), getCards()])
  .then(([user, cards]) => {
    const myId = user._id;

    cards.forEach((cardData) => {
      const card = createCard({ cardData, deleteCard, openImageModal, myId });
      cardsList.append(card);
    });
  })
  .catch((err) => {
    alert(err);
  });

// слушатель на кнопки открытия модалки
editProfileButton.addEventListener('click', () => {
  editProfileNameInput.value = profileTitle.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;

  clearValidation(editProfileForm, validationConfig);
  openModal(editProfileModal);
});

// открытие модалки с формой добавления новой карточки
addNewCardButton.addEventListener('click', () => {
  openModal(addNewCardModal);
});

// добавление новых карточек
const handleSubmitCardForm = (evt) => {
  evt.preventDefault();
  showSaving(evt.submitter);

  postNewCard({
    name: addNewCardFormNameInput.value,
    link: addNewCardFormLinkInput.value
  })
    .then((cardData) => {
      const myId = cardData.owner._id;
      const newCard = createCard({ deleteCard, cardData, openImageModal, myId });

      cardsList.prepend(newCard);
      addNewCardForm.reset();

      closeModal(addNewCardModal);
      clearValidation(addNewCardForm, validationConfig);
    })
    .catch((err) => {
      alert(`Карточка не добавлена. ${err}`);
    })
    .finally(() => {
      resetSumbitButton(evt.submitter);
    });
};

addNewCardForm.addEventListener('submit', handleSubmitCardForm);

profileAvatar.addEventListener('click', () => {
  openModal(avatarModal);
});

// редактирование аватара
const changeAvatar = (evt) => {
  evt.preventDefault();
  // const submitButton = evt.target.querySelector('[type="submit"]');
  // const submitButtonText = submitButton.textContent;
  showSaving(evt.submitter);

  updateAvatar({ avatar: editAvatarUrlInput.value })
    .then((profile) => {
      profileAvatar.style.backgroundImage = `url(${profile.avatar})`;
      editAvatarForm.reset();
      closeModal(avatarModal);
    })
    .catch((err) => {
      alert(`Аватар не обновлен. ${err}`);
    })
    .finally(() => {
      // submitButton.textContent = submitButtonText;
      // evt.submitter.textContent = 'Сохранить';
      resetSumbitButton(evt.submitter);
    });
};

editAvatarForm.addEventListener('submit', changeAvatar);

// редактирование профиля
const handleSubmitProfileForm = (evt) => {
  evt.preventDefault();
  showSaving(evt.submitter);

  editProfile({
    name: editProfileNameInput.value,
    about: editProfileDescriptionInput.value
  })
    .then((profile) => {
      profileTitle.textContent = profile.name;
      profileDescription.textContent = profile.about;
      closeModal(editProfileModal);
    })
    .catch((err) => {
      alert(`Профиль не обновлен. ${err}`);
    })
    .finally(() => {
      resetSumbitButton(evt.submitter);
    });
};

editProfileForm.addEventListener('submit', handleSubmitProfileForm);

// закрытие модалок по кнопке Х
closeModalButtons.forEach((button) => {
  button.addEventListener('click', (evt) => {
    closeModal(evt.target.closest('.popup'));
  });
});

// закрытие модалок по оверлею
modals.forEach((popup) => {
  popup.addEventListener('click', onOverlayCloseModal);
});
