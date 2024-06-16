

export const openModal = (popup) => {                             
    popup.classList.add('popup_is-opened');                
    document.addEventListener('keydown', onKeyCloseModal); 
    popup.addEventListener('click', onOverlayCloseModal);  
};
     
export const closeModal = () => {                                          
    const openedModal = document.querySelector('.popup_is-opened'); 

    openedModal.classList.remove('popup_is-opened');                
    document.removeEventListener('keydown', onKeyCloseModal);       
    openedModal.removeEventListener('click', onOverlayCloseModal);  
};

const onKeyCloseModal = (evt) => {  
    if(evt.key === 'Escape') {      
        closeModal();               
    }                            
};

const onOverlayCloseModal = (evt) => {          
    if(!evt.target.closest('.popup__content')){ 
        closeModal();                           
    }
}