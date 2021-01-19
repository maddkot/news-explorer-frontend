import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import '../Header/Header.css';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import logoutIcon from '../../images/logoutIcon.png'

function Header({name, isLoginPopupOpen, isOpenBurgerMenu, burgerSetStyle, onClose}) {

    const { pathname } = useLocation();

    const headerLogo = `${pathname === '/saved-news' ? 'header__logo_dark' : ''}`
    const headerItem = `${pathname === '/saved-news' ? 'header__navigation-item_dark' : ''}`       
    const headerItemActive = `${pathname === '/saved-news' ? 'header__navigation-item_active-dark' : ''}`
    const savedNews = pathname === '/saved-news';

    return (
        <header className="header">
            
            <div className="header__container">
                <Link to="/" className={`header__logo ${headerLogo}`}>NewsExplorer</Link>
                <nav className="header__navigation">
                    <ul className="header__navigation-list">
                        <li>
                            <NavLink to="/" className={`${headerItem} header__navigation-item `} activeClassName='header__navigation-item_active'>Главная</NavLink> 
                        </li>
                        <li>
                            <NavLink to="/saved-news" className={`${headerItem} header__navigation-item `} activeClassName={`${headerItemActive} header__navigation-item_active`}>Сохранённые статьи</NavLink>
                        </li>
                    </ul>
                    {!savedNews ?
                        <button className="header__button-auth" onClick={isLoginPopupOpen}>Авторизоваться</button>
                        :
                        <button className="header__button-logout">{ name}<img className="header__img-logout" alt="Кнопка выхода" src={logoutIcon}></img></button>
                    }
                    
                </nav>
                <BurgerMenu
                    name={name}
                    isLoginPopupOpen={isLoginPopupOpen}
                    isOpenBurgerMenu={isOpenBurgerMenu}
                    burgerSetStyle={burgerSetStyle}
                    onClose={onClose}
                />
            </div>         
            
        </header>
    )
}

export default Header;