import './index.css';
import { initialCards } from './components/card/cards';
import { createCard, deleteCard, likeCard } from './components/card/card';
import { openModal, closeModal, onOverlayCloseModal } from './components/modal';

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
const addNewCardForm = document.forms['new-place'];
const addNewCardFormNameInput = addNewCardForm.querySelector('.popup__input_type_card-name'); 
const addNewCardFormLinkInput = addNewCardForm.querySelector('.popup__input_type_url'); 
const modals = document.querySelectorAll('.popup');
const cardImageModal = document.querySelector('.popup_type_image');
const modalImage = cardImageModal.querySelector('.popup__image'); 
const modalCaption = cardImageModal.querySelector('.popup__caption');

const openImageModal = (cardData) => {
    modalImage.src = cardData.link;
    modalImage.alt = cardData.name;
    modalCaption.textContent = cardData.name;

    openModal(cardImageModal);
};

const cardsList = document.querySelector('.places__list'); 
initialCards.forEach((cardData) => {                
    const card = createCard({cardData, deleteCard, openImageModal, likeCard});  
    cardsList.append(card);                         
 });

editProfileButton.addEventListener('click', () => {          
    editProfileNameInput.value = profileTitle.textContent;              
    editProfileDescriptionInput.value = profileDescription.textContent; 
    
    openModal(editProfileModal);   
});

const handleSubmitProfileForm = (evt) => {                   
    evt.preventDefault();                                    

    profileTitle.textContent = editProfileNameInput.value;              
    profileDescription.textContent = editProfileDescriptionInput.value; 

    closeModal(editProfileModal);  
};

editProfileForm.addEventListener('submit', handleSubmitProfileForm); 

addNewCardButton.addEventListener('click', () => { 
    openModal(addNewCardModal);                    
});

const handleSubmitCardForm = (evt) => {  
    evt.preventDefault();        

    const cardData = {  
        name: addNewCardFormNameInput.value, 
        link: addNewCardFormLinkInput.value  
    };

    const newCard = createCard({deleteCard, cardData, openImageModal, likeCard});

    cardsList.prepend(newCard);
    addNewCardForm.reset();
    closeModal(addNewCardModal);  
};

addNewCardForm.addEventListener('submit', handleSubmitCardForm); 

closeModalButtons.forEach((button) => {      
    button.addEventListener('click', (evt) => { 
        closeModal(evt.target.closest('.popup'));                        
    });
});

modals.forEach((popup) => {
    popup.addEventListener('click', onOverlayCloseModal);
});

