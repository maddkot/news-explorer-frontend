import React from 'react';
import '../PopupWithForm/PopupWithForm.css';

function PopupWithForm({nameForm, changelinkText, title, isOpen, onChangePopup, onClose, children}) {
    return (
        <div className={`popup popup_${nameForm} ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button className="popup__close-button" type="button" arial-label="Close" onClick={onClose}></button>
                <div className="popup__form-container">
                    <form className="popup__form" action="#" name={nameForm}>
                    <h3 className="popup__title">{ title}</h3>
                    {children}
                    </form>                    
                    <p className="popup__change-text">или &nbsp;
                    <button className="popup__change-button" onClick={onChangePopup}>{changelinkText}</button> 
                    </p>
                </div>
            </div>

      </div>
    )
}

export default PopupWithForm;