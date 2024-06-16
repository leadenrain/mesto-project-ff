const cardsList = document.querySelector('.places__list');

initialCards.forEach((cardData) => {
    const card = addCard(cardData, deleteCard)
    cardsList.append(card);
})

function deleteCard(event) {
    event.target.closest('.card').remove();
}

function addCard(cardData, deleteCard) {

    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    
    const cardTitle = card.querySelector('.card__title');
    const cardImage = card.querySelector('.card__image');

    cardTitle.textContent = cardData.name;
    cardImage.alt = cardData.alt;
    cardImage.src = cardData.link;

    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);

    return card;
}

// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
