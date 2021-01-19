import React from 'react'
import '../CardListSaved/CardListSaved.css';
import Card from '../Card/Card';
import articles from '../../utils/articles';

function CardListSaved(){
    return (
        <section className="card-list-saved">
            <div className='card-list-saved__container'>
                {
                    articles.map((card) => (
                        <Card
                            key={card.owner}
                            card={card}
                        />
                    ))
                }
            </div>

        </section>
    )
}

export default CardListSaved;