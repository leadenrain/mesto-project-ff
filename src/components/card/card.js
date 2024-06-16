import { initialCards } from './cards.js'; 
import { openModal } from '../modal.js';


export const deleteCard = (event) => {             
    event.target.closest('.card').remove(); 
}

export const createCard = (cardData, deleteCard) => {  

    const cardTemplate = document.querySelector('#card-template').content; 
    const card = cardTemplate.querySelector('.card').cloneNode(true);     
    
    const cardTitle = card.querySelector('.card__title'); 
    const cardImage = card.querySelector('.card__image'); 

    cardTitle.textContent = cardData.name; 
    cardImage.alt = cardData.name;         
    cardImage.src = cardData.link;        

    cardImage.addEventListener('click', () => {    
        const cardImageModal = document.querySelector('.popup_type_image');
        const modalImage = cardImageModal.querySelector('.popup__image'); 
        modalImage.src = cardImage.src;                                   
        openModal(cardImageModal); 
    });
  
    const deleteCardButton = card.querySelector('.card__delete-button'); 
    deleteCardButton.addEventListener('click', deleteCard);              

    const likeButton = card.querySelector('.card__like-button'); 
    likeButton.addEventListener('click', () => {                 
        likeButton.classList.add('card__like-button_is-active'); 
    });

    return card; 
};

const cardsList = document.querySelector('.places__list'); 
initialCards.forEach((cardData) => {                
    const card = createCard(cardData, deleteCard);  
    cardsList.append(card);                         
 });