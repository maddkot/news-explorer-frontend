import React from 'react';
import './CardList.css';
import Card from '../Card/Card';
import articles from '../../utils/articles';

function CardList() {
    return (
        <section className="cardList">
            <h2 className="cardList__title">Результаты поиска</h2>
            <div className="cardList__section">
                {
                    articles.map((card) => (
                        <Card
                            key={card.owner}
                            card={card}
                        />
                    ))
                }
                

            </div>
            <button className="cardList__button">Показать еще</button>
        </section>
    )
}

export default CardList;