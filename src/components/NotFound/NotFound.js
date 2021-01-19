import React from 'react';
import '../NotFound/NotFound.css';
import NotFoundIcon from'../../images/NotFoundIcon.png';

function NotFound() {
    return (
        <section className="not-found">
            <div className="not-found__container">
                <img className="not-found__icon" alt="иконка лупы" src={NotFoundIcon}></img>                
                    <h4 className="not-found__title">Ничего не найдено</h4>
                    <p className="not-found__subtitle">К сожалению по вашему запросу ничего не найдено</p>
                
            </div>
        </section>
    )
}

export default NotFound;