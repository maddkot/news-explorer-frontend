import React from 'react';
import '../NotFound/NotFound.css';
import NotFoundIcon from'../../images/NotFoundIcon.png';

function NotFound({ handleNotFound, errorServer }) {
    
    const errorServerText = `${errorServer ?
        'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
        :
        'К сожалению по вашему запросу ничего не найдено'
     }`

    return (
        <section className={`not-found ${handleNotFound ? '' : 'not-found_off'}`}>
            <div className="not-found__container">
                <img className="not-found__icon" alt="иконка лупы" src={NotFoundIcon}></img>                
                    <h4 className="not-found__title">Ничего не найдено</h4>
                <p className="not-found__subtitle">{errorServerText}</p>
                
            </div>
        </section>
    )
}

export default NotFound;