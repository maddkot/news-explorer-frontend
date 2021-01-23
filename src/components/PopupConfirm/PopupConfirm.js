import React from 'react';
import '../PopupConfirm/PopupConfirm.css';
import '../PopupWithForm/PopupWithForm.css';


function PopupConfirm({isOpen, onClose, openPopupLogin }) {
    return (
        <div className={`popup ${isOpen && 'popup_opened'}`}>
            <div className="popup_container">
                <button className="popup__close-button" type="button" arial-label='Close' onClick={onClose}></button>
               <div className="popup__form-container"> 
                <form className="popup__form" action='#'>
                    <h3 className="popup__title">Пользователь успешно зарегистрирован</h3>
                </form>
                    <button className="popup__change-button popup__confirm-login" onClick={openPopupLogin}>Войти</button>
                </div>    
            </div>
        </div>
    )
}

export default PopupConfirm;