// включение валидации всех форм
export function enableValidation(validationConfig) {
  const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));

  forms.forEach((form) => {
    // добавляем слушалки сабмита и инпута на все формы
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, validationConfig);
  });
}

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
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

// проверка валидности
const checkInputValidity = (formElement, inputElement, validationConfig) => {
  // если ошибка вызвана паттерном
  if (inputElement.validity.patternMismatch) {
    // выводим кастомное сообщение из data-error-message
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    // в противном случае - стандартное сообщение об ошибке
    inputElement.setCustomValidity('');
  }

  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, validationConfig);
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  }
};

// слушалки ввода на все поля всех форм
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
  if (hasInvalidInput(inputs)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

// поиск невалидных полей ввода
const hasInvalidInput = (inputs) => {
  return inputs.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// очистка ошибок валидации
export function clearValidation(formElement, validationConfig) {
  const inputs = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));

  inputs.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  });
  toggleButtonState(
    inputs,
    formElement.querySelector(validationConfig.submitButtonSelector),
    validationConfig
  );
}
