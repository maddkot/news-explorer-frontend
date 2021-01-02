import React from 'react';
import './Footer.css';
import githublogo from '../../images/github_logo.png';
import instagrammLogo from '../../images/instagramm_logo.png'

function Footer() {
    return (
        <footer className="footer">            
            <p className="footer__copyright">&copy; 2020 Supersite, Powered by News API</p>
            <div className="footer__navigation">
                                
                   <ul className="footer__links">
                        <li className="footer__item">
                            <a className="footer__link" href="https://yandex.ru/" target="_blank" rel="noreferrer">Главная</a>
                        </li>
                        <li className="footer__item">
                            <a className="footer__link"href="https://praktikum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
                        </li>
                    </ul> 
               
                
                   <ul className="footer__links">
                        <li className="footer__item">
                            <a className="footer__link" href="https://github.com/maddkot" target="_blank" rel="noreferrer">
                                <img className="footer__links-img"  alt="Иконка гитхаб" src={githublogo}/>
                            </a>
                        </li>
                        <li className="footer__item">
                            <a className="footer__link" href="https://www.instagram.com/rengevichs" target="_blank" rel="noreferrer">
                                <img className="footer__links-img" alt="Иконка инстаграм" src={ instagrammLogo }/>
                            </a>
                        </li>
                </ul> 
                              
            </div>
        </footer>
    )
}

export default Footer;