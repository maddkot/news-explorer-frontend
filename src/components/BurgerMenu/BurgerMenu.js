import React, { useContext } from 'react';
import '../BurgerMenu/BurgerMenu.css';
import { Link, useLocation } from 'react-router-dom';
import logoutIcon from '../../images/logoutIcon.png';
import CurrentUserContext from '../../context/CurrentUserContext';

function BurgerMenu({ isLoginPopupOpen, isOpenBurgerMenu, burgerSetStyle, onClose, loggedIn, isLogout}) {

    const { pathname } = useLocation();
    const BurgerMenu = `${pathname === '/saved-news' ? 'burger__button-menu_black' : ''}`;
    //const savedNews = pathname === '/saved-news';
    const user = useContext(CurrentUserContext);
    

    return (
        
        <>        

            <button className={`burger__button ${BurgerMenu}`} onClick={isOpenBurgerMenu}></button>
            <div className={ `burger ${burgerSetStyle && 'burger_open'}`}>
            <div className="burger__container burger__container_black">
                <div className="burger__header">
                    <Link to="/" className="header__logo">NewsExplorer</Link>
                    <button className="burger__button burger__button-close" onClick={onClose}></button>
                </div>
                    <ul className="burger__navigation-list">
                        <li>
                            <Link to="/" className="burger__navigation-item">Главная</Link> 
                        </li>
                        {loggedIn && <li>
                            <Link to="/saved-news" className="burger__navigation-item">Сохранённые статьи</Link>
                        </li>}
                    </ul>
                    {!loggedIn ?
                        <button className="burger__button-auth" onClick={isLoginPopupOpen}>Авторизоваться</button>
                        :
                        <button className="burger__button-logout" onClick={isLogout}>{ user.name}<img className="burger__img-logout" alt="Кнопка выхода" src={logoutIcon}></img></button>
                
                    }
                         
            
            </div>
        
        </div>        
        
        </>
    )
}

export default BurgerMenu;