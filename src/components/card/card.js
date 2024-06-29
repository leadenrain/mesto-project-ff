import { addLike, removeLike } from '../API';

// постановка/снятие лайка
const likeCard = (likeButton, cardId, setLikeCount) => {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    removeLike(cardId)
      .then((cardData) => {
        setLikeCount(cardData.likes.length);
        likeButton.classList.remove('card__like-button_is-active');
      })
      .catch((err) => {
        alert(`Лайк не поставлен. ${err}`);
      });
  } else {
    addLike(cardId)
      .then((cardData) => {
        setLikeCount(cardData.likes.length);
        likeButton.classList.add('card__like-button_is-active');
      })
      .catch((err) => {
        alert(`Лайк не удален. ${err}`);
      });
  }
};

// создание карточки
export const createCard = ({ cardData, openImageModal, myId, handleDeleteCardConfirm }) => {
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
  const userId = cardData.owner._id;

  if (userId === myId) {
    deleteCardButton.addEventListener('click', () => {
      handleDeleteCardConfirm(cardId);
    });
  } else {
    deleteCardButton.remove();
  }

  // счетчик лайков
  const setLikeCount = (likesCount) => {
    const likeCount = card.querySelector('.card__like-count');
    likeCount.textContent = likesCount;
  };

  setLikeCount(cardData.likes.length);

  // слушатель на кнопку лайка
  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => {
    likeCard(likeButton, cardId, setLikeCount);
  });

  // вывод лайков
  const hasMyLike = cardData.likes.some(({ _id }) => _id === myId);

  if (hasMyLike) {
    likeButton.classList.add('card__like-button_is-active');
  }

  return card;
};
