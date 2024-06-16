import './index.css'  
import { createCard, deleteCard } from './components/card/card';
import { openModal, closeModal } from './components/modal';

const editProfileButton = document.querySelector('.profile__edit-button');
const addNewCardButton = document.querySelector('.profile__add-button');
const closeModalButtons = document.querySelectorAll('.popup__close');
const editProfileModal = document.querySelector('.popup_type_edit');
const addNewCardModal = document.querySelector('.popup_type_new-card');
const editProfileForm = document.forms['edit-profile'];
const inputName = editProfileForm.querySelector('.popup__input_type_name');
const inputDescription = editProfileForm.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const addNewCardForm = document.forms['new-place'];

editProfileButton.addEventListener('click', () => {          
    inputName.value = profileTitle.textContent;              
    inputDescription.value = profileDescription.textContent; 
    
    openModal(editProfileModal);   
});

const handleSubmitProfileForm = (evt) => {                   
    evt.preventDefault();                                    

    profileTitle.textContent = inputName.value;              
    profileDescription.textContent = inputDescription.value; 

    closeModal();  
}

editProfileForm.addEventListener('submit', handleSubmitProfileForm); 

addNewCardButton.addEventListener('click', () => { 
    openModal(addNewCardModal);                    
});

const handleSubmitCardForm = (evt) => {  
    evt.preventDefault();                

    const inputName = addNewCardForm.querySelector('.popup__input_type_card-name'); 
    const inputLink = addNewCardForm.querySelector('.popup__input_type_url');       

    const newCard = createCard({  
        name: inputName.value, 
        link: inputLink.value  
    }, deleteCard);

    cardsList.querySelector('li').before(newCard); 
}

addNewCardForm.addEventListener('submit', handleSubmitCardForm); 

closeModalButtons.forEach((button) => {      
    button.addEventListener('click', () => { 
        closeModal();                        
    })
});