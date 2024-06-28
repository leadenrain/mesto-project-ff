const token = {
  masterUrl: 'https://nomoreparties.co/v1/wff-cohort-17',
  headers: {
    authorization: '68cc21ca-3fc0-4208-86dc-3c3bbeb32cfa',
    'Content-Type': 'application/json'
  }
};

// проверка успешности запроса
const checkRes = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// загрузка информации о пользователе
export const getUserInfo = () => {
  return fetch(`${token.masterUrl}/users/me`, {
    headers: token.headers
  }).then(checkRes);
};

// редактирование профиля
export const editProfile = (profile) => {
  return fetch(`${token.masterUrl}/users/me`, {
    method: 'PATCH',
    headers: token.headers,
    body: JSON.stringify(profile)
  }).then(checkRes);
};

// обновление аватара
export const updateAvatar = (avatar) => {
  return fetch(`${token.masterUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: token.headers,
    body: JSON.stringify(avatar)
  }).then(checkRes);
};

// проверка действительности URL
export const checkAvatarUrlValidity = (url) => {
  return fetch(url, {
    method: 'HEAD'
  })
    .then((res) => {
      if (res.ok) {
        return true;
      } else {
        return 'Картинка не найдена';
      }
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
};

// загрузка карточек с сервера
export const getCards = () => {
  return fetch(`${token.masterUrl}/cards`, {
    headers: token.headers
  }).then(checkRes);
};

// добавление новой карточки
export const postNewCard = (newCard) => {
  return fetch(`${token.masterUrl}/cards`, {
    method: 'POST',
    headers: token.headers,
    body: JSON.stringify({
      name: newCard.name,
      link: newCard.link
    })
  }).then(checkRes);
};

// удаление карточки
export const removeCard = (cardId) => {
  return fetch(`${token.masterUrl}/cards/${cardId} `, {
    method: 'DELETE',
    headers: token.headers
  }).then(checkRes);
};

// лайк
export const addLike = (cardId) => {
  return fetch(`${token.masterUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: token.headers
  }).then(checkRes);
};

// снятие лайка
export const removeLike = (cardId) => {
  return fetch(`${token.masterUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: token.headers
  }).then(checkRes);
};
