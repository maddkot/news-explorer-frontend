import React from 'react';
import '../PopupWithRegister/PopupWithRegister.css';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ValidationForm from '../../utils/ValidatorForm';

function PopupWithRegister({ isOpen, onChangePopup, onClose }) {
    
    const {
        values,
        errors,
        isValid,
        handleChange,
        resetForm,
    } = ValidationForm();

    function handleSubmit(event) {
        event.preventDefault();
    }

    React.useEffect(() => {
        resetForm();
    }, [resetForm, isOpen])


    return (
        <PopupWithForm
            isOpen={isOpen}
            onChangePopup={onChangePopup}
            onClose={onClose}
            onSubmit={handleSubmit}
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
                maxLength="20"
                value={values.email || ''}
                onChange={handleChange}
            ></input>
            <span className="popup__input-error">{ errors.email || ''}</span>

            <label className="popup__label">Пароль</label>
            <input
                className="popup__input"
                type="password"
                name="password"
                placeholder="Введите пароль"
                required
                minLength="5"
                maxLength="15"
                value={values.password || ''}
                onChange={handleChange}
            ></input>
            <span className="popup__input-error">{ errors.password || ''}</span>

            <label className="popup__label">Имя</label>
            <input className="popup__input"
                type="text"
                name="name"
                placeholder="Введите свое имя"
                required
                minLength="2"
                maxLength="20"
                value={values.name || ''}
                onChange={handleChange}
            ></input>
            <span className="popup__input-error">{ errors.name || ''}</span>

            <h6 className="popup__input-error">Текст ошибки из API</h6>

            <button className={`popup__submit ${isValid ? 'popup__submit_activev' : ''}`} type="submit" disabled={!isValid}>Зарегистрироваться</button>

        </PopupWithForm>
    )
}

export default PopupWithRegister;