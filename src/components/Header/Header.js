import React, { useContext } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import '../Header/Header.css';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import logoutIcon from '../../images/logoutIcon.png';
import logoutIconDark from '../../images/logoutIconWhite.png';
import CurrentUserContext from '../../context/CurrentUserContext';

function Header({ isLoginPopupOpen, isOpenBurgerMenu, burgerSetStyle, onClose, isLogout, loggedIn }) {

    const { pathname } = useLocation();
    const user = useContext(CurrentUserContext);
    const headerLogo = `${pathname === '/saved-news' ? 'header__logo_dark' : ''}`
    const headerItem = `${pathname === '/saved-news' ? 'header__navigation-item_dark' : ''}`       
    const headerItemActive = `${pathname === '/saved-news' ? 'header__navigation-item_active-dark' : ''}`
    const headerButtonLogout = `${pathname === '/saved-news' ? 'header__button-logout' : 'header__button-logout-dark'}`;
    const logoutIconButton = `${pathname === '/saved-news' ? logoutIcon : logoutIconDark}`

    return (
        <header className="header">
            
            <div className="header__container">
                <Link to="/" className={`header__logo ${headerLogo}`}>NewsExplorer</Link>
                <nav className="header__navigation">
                    <ul className="header__navigation-list">
                        <li>
                            <NavLink to="/" className={`${headerItem} header__navigation-item `} activeClassName='header__navigation-item_active'>Главная</NavLink> 
                        </li>
                        { loggedIn && <li>
                            <NavLink to="/saved-news" className={`${headerItem} header__navigation-item `} activeClassName={`${headerItemActive} header__navigation-item_active`}>Сохранённые статьи</NavLink>
                        </li>}
                    </ul>
                    {!loggedIn ?
                        <button className="header__button-auth" onClick={isLoginPopupOpen}>Авторизоваться</button>
                        :
                        <button className={`${headerButtonLogout}`} onClick={isLogout}>{ user.name}<img className="header__img-logout" alt="Кнопка выхода" src={logoutIconButton}></img></button>
                    }
                    
                </nav>
                <BurgerMenu                    
                    isLoginPopupOpen={isLoginPopupOpen}
                    isOpenBurgerMenu={isOpenBurgerMenu}
                    burgerSetStyle={burgerSetStyle}
                    onClose={onClose}
                    loggedIn={loggedIn}
                    isLogout={isLogout}
                />
            </div>         
            
        </header>
    )
}

export default Header;