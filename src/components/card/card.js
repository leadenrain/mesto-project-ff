export const deleteCard = (evt) => {             
    evt.target.closest('.card').remove(); 
}

export const likeCard = (evt) => {
    evt.target.classList.toggle('card__like-button_is-active');
}

export const createCard = ({cardData, deleteCard, openImageModal, likeCard}) => {  

    const cardTemplate = document.querySelector('#card-template').content; 
    const cardElement = cardTemplate.cloneNode(true); 
    const card = cardElement.querySelector('.card');
    
    const cardTitle = card.querySelector('.card__title'); 
    const cardImage = card.querySelector('.card__image'); 

    cardTitle.textContent = cardData.name; 
    cardImage.alt = cardData.name;         
    cardImage.src = cardData.link;        

    cardImage.addEventListener('click', () => {
        openImageModal(cardData);
    })

    const deleteCardButton = card.querySelector('.card__delete-button'); 
    deleteCardButton.addEventListener('click', deleteCard);              

    const likeButton = card.querySelector('.card__like-button'); 
    likeButton.addEventListener('click', likeCard);               
    
    return card; 
};




