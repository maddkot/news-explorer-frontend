import React from 'react';
import '../PopupWithRegister/PopupWithRegister.css';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function PopupWithRegister({isOpen, onChangePopup, onClose}) {
    return (
        <PopupWithForm
            isOpen={isOpen}
            onChangePopup={onChangePopup}
            onClose={onClose}

            nameForm='register'
            title='Регистрация'
            changelinkText='Войти'>
            <label className="popup__label">Email</label>
            <input
                className="popup__input"
                type="email"
                name="email"
                placeholder="Введите почту"
                required
                minLength="5"
                maxLength="15"></input>
            <span className="popup__input-error"></span>

            <label className="popup__label">Пароль</label>
            <input
                className="popup__input"
                type="password"
                name="password"
                placeholder="Введите пароль"
                required
                minLength="5"
                maxLength="15"></input>
            <span className="popup__input-error"></span>

            <input className="popup__input"
                type="text"
                name="name"
                placeholder="Введите свое имя"
                required
                minLength="5"
                maxLength="15"></input>
            <span className="popup__input-error"></span>

            <h6 className="popup__input-error">Текст ошибки из API</h6>

            <button className="popup__submit" type="submit">Войти</button>

        </PopupWithForm>
    )
}

export default PopupWithRegister;