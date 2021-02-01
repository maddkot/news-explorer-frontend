import React from 'react';
import './PopupWIthLogin.css';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ValidationForm from '../../utils/ValidatorForm';


function PopupWithLogin({ isOpen, onChangePopup, onClose, errorMessageInPopup, onLogin }) {

    const {
        values,
        errors,
        isValid,
        handleChange,
        resetForm,
    } = ValidationForm();

    function handleSubmit(event) {
        event.preventDefault();
        onLogin(values.email, values.password);
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
            nameForm='login'
            title='Вход'
            changelinkText='Зарегистрироваться'>
            <label className="popup__label">Email</label>
            <input
                className="popup__input"
                type="email"
                name="email"
                placeholder="Введите почту"
                required
                minLength="5"
                maxLength="25"
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
                maxLength="25"
                value={values.password || ''}
                onChange={handleChange}
            ></input>
            <span className="popup__input-error">{ errors.password || ''}</span>

            <h6 className="popup__input-error">{ errorMessageInPopup}</h6>

            <button className={`popup__submit ${isValid ? 'popup__submit_activev' : ''}`} type="submit" disabled={!isValid}>Войти</button>

        </PopupWithForm>
        
            
    )
}

export default PopupWithLogin;