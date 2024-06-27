import { addLike, removeLike, removeCard } from '../API';
import { closeModal, openModal } from '../modal';

const confirmModal = document.querySelector('.popup_type_confirm');

// удаление карточки
export const deleteCard = (cardId) => {
  removeCard(cardId)
    .then(() => {
      const cardToDelete = document.getElementById(cardId);
      cardToDelete.remove();
      closeModal(confirmModal);
    })
    .catch((err) => {
      alert(`Удаление не завершено. ${err}`);
    });
};

// лайк
const likeCard = (likeButton, cardId, setLikeCount) => {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    removeLike(cardId).then((cardData) => {
      setLikeCount(cardData);
      likeButton.classList.remove('card__like-button_is-active');
    });
  } else {
    addLike(cardId).then((cardData) => {
      setLikeCount(cardData);
      likeButton.classList.add('card__like-button_is-active');
    });
  }
};

// создание карточки
export const createCard = ({ cardData, deleteCard, openImageModal, myId }) => {
  const cardId = cardData._id;
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const card = cardElement.querySelector('.card');
  card.id = cardId;

  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');

  cardTitle.textContent = cardData.name;
  cardImage.alt = cardData.name;
  cardImage.src = cardData.link;

  cardImage.addEventListener('click', () => {
    openImageModal(cardData);
  });

  // отображение корзины и удаление карточки
  const deleteCardButton = card.querySelector('.card__delete-button');
  const confirmButton = confirmModal.querySelector('.button');
  const userId = cardData.owner._id;

  if (userId === myId) {
    deleteCardButton.addEventListener('click', () => {
      openModal(confirmModal);
    });
    // удалить слушалку перед ее добавлением?
    confirmButton.addEventListener('click', () => {
      deleteCard(cardData._id);
    });
  } else {
    deleteCardButton.remove();
  }

  // счетчик лайков
  const setLikeCount = (cardData) => {
    const likeCount = card.querySelector('.card__like-count');
    likeCount.textContent = cardData.likes.length;
  };

  // слушатель на кнопку лайка
  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => {
    likeCard(likeButton, cardId, setLikeCount);
  });

  return card;
};
