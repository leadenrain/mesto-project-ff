

export const openModal = (popup) => {                             
    popup.classList.add('popup_is-opened');                
    document.addEventListener('keydown', onKeyCloseModal); 
};
     
export const closeModal = (popup) => {    
    popup.classList.remove('popup_is-opened');                
    document.removeEventListener('keydown', onKeyCloseModal);       
};

const onKeyCloseModal = (evt) => {  
    const openedModal = document.querySelector('.popup_is-opened');
    if(evt.key === 'Escape') {  
        closeModal(openedModal);               
    }                            
};

export const openImageModal = (cardData) => {
    const cardImageModal = document.querySelector('.popup_type_image');
    const modalImage = cardImageModal.querySelector('.popup__image'); 
    const modalCaption = cardImageModal.querySelector('.popup__caption');

    modalImage.src = cardData.link;
    modalImage.alt = cardData.name;
    modalCaption.textContent = cardData.name;

    openModal(cardImageModal);
};
