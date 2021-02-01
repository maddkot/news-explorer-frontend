import React from 'react';
import './Card.css';
import { useLocation } from 'react-router-dom';


function Card({ loggedIn, isLoginPopupOpen, ...props }) {
    

    
    const ImgPlug = 'https://i.ibb.co/3SkSn1X/news-default.jpg'
    
    function dateFormatter(date) {
        const month = [
            "января",
            "февраля",
            "марта",
            "апреля",
            "мая",
            "июнья",
            "июля",
            "августа",
            "сентября",
            "октября",
            "ноября",
            "декабря",
        ];
        const dateNow = new Date(date);
        const formatedMonth = `${dateNow.getDate()} ${month[dateNow.getMonth()]}, ${dateNow.getFullYear()}`;
        return formatedMonth;
    }    

    
    const { pathname } = useLocation();
    const cardTag = `${pathname === '/saved-news' ? 'card__tag card__tag_active' : 'card__tag'}`;
    const isLocationSavedNews = pathname === '/saved-news';      
    
    const isSavedCard = props.mySavedArticles.find((item) => {      
        return item.link === props.card.link || item.link === props.card.url;
    });    
    const buttonSwitch = isSavedCard ? (isLocationSavedNews ? 'card__delete' : 'card__favorite') : 'card__saved';
    
    function handleCheckMySaveArticle() {          
        props.checkMySaveArticle(props.card, props.keyword, props.mySavedArticles)
    }    

    return (
    <article className="card">
        <p className={cardTag}>{props.keyword}</p> 
            
            {loggedIn ?
                <button className={buttonSwitch} onClick={handleCheckMySaveArticle}></button>
                :
                <button className='card__saved card__saved_off' onClick={isLoginPopupOpen}></button>               
            }
        
        <img className="card__image" src={props.image || ImgPlug} alt={props.title}></img>
            <a className="card__link" href={props.link} target="_blank" rel="noreferrer">
                <p className="card__data">{dateFormatter(props.date)}</p>
                <div className="card_-content">                    
                    <h3 className='card__title'>{props.title}</h3>
                    <p className="card__subtitle">{props.text || props.title}</p>
                    <p className="card__source">{props.source}</p>
                </div>
            </a>
    </article>
        
    )
}

export default Card;