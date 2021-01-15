import React from 'react';
import './Card.css';
import { useLocation } from 'react-router-dom';

function Card({ card }) {
   
/*const windowWidth = window.innerWidth;*/
    /* let windowSize = window.addEventListener('resize', ()=> window.innerWidth)
    console.log(windowSize); */


    const [windowSize, setwindowSize] = React.useState(0);
    React.useEffect((() => {        
        window.addEventListener('resize', updateWindowSize);
        return () => window.removeEventListener('resize', updateWindowSize);
        function updateWindowSize() {
            setwindowSize(window.innerWidth);
        }
    }), []);
    
    const { pathname } = useLocation();
    const cardTag = `${pathname ==='/saved-news' ? 'card__tag card__tag_active' : 'card__tag' }`
    const savedNews = pathname === '/saved-news';


    return (
    <article className="card">
        <p className={cardTag}>{card.keyword}</p>
            {!savedNews ?
                <button className="card__saved"></button>
                :
                <button className="card__delete"></button>                 
                
        }    
        
        <img className="card__image" src={card.image} alt={card.text}></img>
            <a className="card__link" href={card.link} target="_blank" rel="noreferrer">
                <p className="card__data">{card.data}</p>
                <div className="card_-content">
                    <h3 className='card__title'>{(windowSize <= 896 && card.title.length > 25 ? `${card.title.substring(0, 40) + "..."}`: `${card.title}`)}</h3>
                    <p className="card__subtitle">{(windowSize<= 869 && card.text.length > 60 ? `${card.text.substring(0, 90) + "..."}` : `${card.text}`)}</p>
                    <p className="card__source">{card.source}</p>
                </div>
            </a>
    </article>
        
    )
}

export default Card;