// включение валидации всех форм
export function enableValidation(validationConfig) {
    const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));

    forms.forEach((formElement => {
        formElement.addEventListener('submit', evt => {
        evt.preventDefault();
    })
    setEventListeners(formElement, validationConfig);
    })
)};

// показ ошибки
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
};

// скрытие ошибки
const hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
console.log(formElement,`.${inputElement.id}-error`)
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
};

// проверка валидности
const checkInputValidity = (formElement, inputElement, validationConfig) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
      hideInputError(formElement, inputElement, validationConfig);
    }
};

// слушалки ввода на все формы
const setEventListeners = (formElement, validationConfig) => {
    const inputs = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const submitButtonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    
    inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, validationConfig);
        toggleButtonState(inputs, submitButtonElement, validationConfig);
      });
    });
    toggleButtonState(inputs, submitButtonElement, validationConfig);
};

// изменение состояния кнопки
const toggleButtonState = (inputs, buttonElement, validationConfig) => {
    if(hasInvalidInput(inputs)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(validationConfig.inactiveButtonClass);
    }
    else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
};

// поиск невалидных полей ввода
const hasInvalidInput = inputs => {  
    return inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    })
};

// очистка ошибок валидации
export function clearValidation(formElement, validationConfig) {
    const inputs = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));

    inputs.forEach(inputElement => {
        hideInputError(formElement, inputElement, validationConfig);
    })
    toggleButtonState(inputs, formElement.querySelector(validationConfig.submitButtonSelector), validationConfig);
};