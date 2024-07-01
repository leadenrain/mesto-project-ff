import './index.css';
import { createCard, likeCard } from './components/card/card';
import { openModal, closeModal, onOverlayCloseModal } from './components/modal';
import { enableValidation, clearValidation } from './components/validation';
import {
  getCards,
  getUserInfo,
  postNewCard,
  updateAvatar,
  editProfile,
  removeCard,
  checkAvatarUrlValidity
} from './components/API';

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
const confirmModal = document.querySelector('.popup_type_confirm');
const confirmButton = confirmModal.querySelector('.button');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
let cardToDeleteId, cardToDelete;

enableValidation(validationConfig);

// сохранение
const showProcessButtonTitle = (submitButton, title = 'Сохранение...') => {
  submitButton.textContent = title;
};

// ресет кнопки
const showDefaultButtonTitle = (submitButton, title = 'Сохранить') => {
  submitButton.textContent = title;
};

// вывод профиля и карточек
Promise.all([getUserInfo(), getCards()])
  .then(([user, cards]) => {
    const myId = user._id;
    editProfileNameInput.value = user.name;
    editProfileDescriptionInput.value = user.about;

    cards.forEach((cardData) => {
      const card = createCard({ cardData, openConfirmModal, openImageModal, myId });
      cardsList.append(card);
    });
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileAvatar.style.backgroundImage = `url(${user.avatar})`;
  })
  .catch((err) => {
    alert(err);
  });

// открытие модалки с картинкой из карточки
const openImageModal = (cardData) => {
  modalImage.src = cardData.link;
  modalImage.alt = cardData.name;
  modalCaption.textContent = cardData.name;

  openModal(cardImageModal);
};

// слушатель на кнопку редактирования профиля
editProfileButton.addEventListener('click', () => {
  // при открытии модалки данные пользователя уже введены в форму
  editProfileNameInput.value = profileTitle.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;

  clearValidation(editProfileForm, validationConfig);
  openModal(editProfileModal);
});

// слушалка на кнопку добавления новой карточки
addNewCardButton.addEventListener('click', () => {
  clearValidation(addNewCardForm, validationConfig);
  addNewCardForm.reset();
  openModal(addNewCardModal);
});

// добавление новых карточек
const handleSubmitCardForm = (evt) => {
  showProcessButtonTitle(evt.submitter);

  postNewCard({
    name: addNewCardFormNameInput.value,
    link: addNewCardFormLinkInput.value
  })
    .then((cardData) => {
      const myId = cardData.owner._id;
      const newCard = createCard({
        deleteCard,
        cardData,
        openImageModal,
        myId,
        openConfirmModal
      });

      cardsList.prepend(newCard);
      addNewCardForm.reset();

      closeModal(addNewCardModal);
    })
    .catch((err) => {
      alert(`Карточка не добавлена. ${err}`);
    })
    .finally(() => {
      showDefaultButtonTitle(evt.submitter);
    });
};

addNewCardForm.addEventListener('submit', handleSubmitCardForm);

// удаление карточки
const deleteCard = (cardId, card) => {
  showProcessButtonTitle(confirmButton, 'Удаление...');
  removeCard(cardId)
    .then(() => {
      card.remove();
      closeModal(confirmModal);
    })
    .catch((err) => {
      alert(`Удаление не завершено. ${err}`);
    })
    .finally(() => {
      showDefaultButtonTitle(confirmButton, 'Да');
    });
};

// открыте модалки с формой подтверждения
function openConfirmModal(cardId, card) {
  cardToDeleteId = cardId;
  cardToDelete = card;
  openModal(confirmModal);
}

confirmButton.addEventListener('click', () => {
  deleteCard(cardToDeleteId, cardToDelete);
});

// подтверждение удаления карточки
// const handleDeleteCardConfirm = (cardId) => {
//   const handleConfirmClick = () => {
//     deleteCard(cardId);
//     confirmButton.removeEventListener('click', handleConfirmClick);
//   };
//   openModal(confirmModal);
//   confirmButton.addEventListener('click', handleConfirmClick);
// };

profileAvatar.addEventListener('click', () => {
  clearValidation(editAvatarForm, validationConfig);
  editAvatarForm.reset();
  openModal(avatarModal);
});

// редактирование аватара
const changeAvatar = (evt) => {
  showProcessButtonTitle(evt.submitter);
  checkAvatarUrlValidity(editAvatarUrlInput.value).then((isValid) => {
    if (isValid) {
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
          showDefaultButtonTitle(evt.submitter);
        });
    } else {
      alert('По данному адресу картинка не обнаружена');
      showDefaultButtonTitle(evt.submitter);
    }
  });
};

editAvatarForm.addEventListener('submit', changeAvatar);

// редактирование профиля
const handleSubmitProfileForm = (evt) => {
  showProcessButtonTitle(evt.submitter);

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
      showDefaultButtonTitle(evt.submitter);
    });
};

editProfileForm.addEventListener('submit', handleSubmitProfileForm);

// закрытие модалки по кнопке Х
closeModalButtons.forEach((button) => {
  button.addEventListener('click', (evt) => {
    closeModal(evt.target.closest('.popup'));
  });
});

// закрытие модалки по оверлею
modals.forEach((popup) => {
  popup.addEventListener('click', onOverlayCloseModal);
});
