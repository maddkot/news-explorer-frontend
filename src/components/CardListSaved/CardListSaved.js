import React from 'react'
import '../CardListSaved/CardListSaved.css';
import Card from '../Card/Card';

function CardListSaved({ mySavedArticle, ...props }) {    
    return (
        <section className = { mySavedArticle.length > 0 ? "card-list-saved" : "card-list-saved_off" } >
            <div className='card-list-saved__container'>
                {
                    mySavedArticle.map((card) => (
                        <Card
                            card={card}
                            loggedIn={props.loggedIn}
                            key={card.link + Math.random()}
                            keyword={card.keyword}
                            title={card.title}
                            date={card.date}
                            image={card.image}
                            link={card.link}
                            description={card.text}
                            source={card.source}
                            checkMySaveArticle={props.checkMySaveArticle}
                            mySavedArticles={mySavedArticle}
                        />
                    ))
                }
            </div>

        </section >
    )
}

export default CardListSaved;